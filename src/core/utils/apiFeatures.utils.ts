import { isNotEmpty } from 'class-validator';
import {
  comparisonOperators,
  DATE_FIELDS,
  TComparisonOperators,
} from '@core/utils/utilVars';
import { Model, Types } from 'mongoose';
import { PAGINATION } from '@core/constants/enums.constants';

export class APIFeatures<T> {
  private _query: any;

  constructor(
    private _model: Model<T>,
    private _queryObj: any,
  ) {
    this._query = this._model.find();
  }
  filter(): this {
    const filters = { ...this._queryObj };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'sortOrder',
      'searchTerm',
      'lastId',
    ];
    excludedFields.forEach((el) => delete filters[el]);

    // Handle wildcard searches, date range filters, and day-based date checks separately
    Object.keys(filters).forEach((field) => {
      const value = filters[field];

      // Check if value is not empty
      if (isNotEmpty(value)) {
        // Handle multiple values separated by commas
        if (typeof value === 'string' && value.includes('*')) {
          filters[field] = {
            $regex: `^${value.replace(/\*/g, '.*')}`,
            $options: 'i',
          };
        } else if (typeof value === 'string' && value.includes(',')) {
          const valuesArray = value.split(',').map((val) => val.trim());
          filters[field] = { $in: valuesArray };
        } else if (comparisonOperators.some((op) => field.includes(`.${op}`))) {
          // Handle range queries like createdAt.gte
          const [fieldName, operator] = field.split('.');
          const dateValue = new Date(value);
          switch (operator) {
            case TComparisonOperators.GTE:
              filters[fieldName] = { ...filters[fieldName], $gte: dateValue };
              break;
            case TComparisonOperators.LTE:
              // Adjust the date to end of the day for inclusive filtering
              const endOfDay = new Date(dateValue);
              // Set the time to 23:59:59.999 to include the entire last day
              endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day in UTC
              filters[fieldName] = { ...filters[fieldName], $lt: endOfDay };
              break;
            case TComparisonOperators.GT:
              filters[fieldName] = { ...filters[fieldName], $gt: dateValue };
              break;
            case TComparisonOperators.LT:
              // Adjust the date to start of the day for exclusive filtering
              const startOfDay = new Date(dateValue);
              startOfDay.setHours(0, 0, 0, 0);
              filters[fieldName] = { ...filters[fieldName], $lt: startOfDay };
              break;
            default:
              break;
          }
          delete filters[field];
        } else if (DATE_FIELDS.includes(field)) {
          let dateValue;
          if (!value.includes('T')) {
            dateValue = new Date(value + 'T00:00:00.000Z');
          } else {
            dateValue = new Date(value);
          }
          const startOfDay = new Date(
            Date.UTC(
              dateValue.getFullYear(),
              dateValue.getMonth(),
              dateValue.getDate(),
            ),
          );
          const endOfDay = new Date(
            Date.UTC(
              dateValue.getFullYear(),
              dateValue.getMonth(),
              dateValue.getDate() + 1,
            ),
          );
          filters[field] = { $gte: startOfDay, $lt: endOfDay };
        } else {
          filters[field] = value;
        }
      } else {
        // Remove the field if value is empty
        delete filters[field];
      }
    });
    if (
      this._queryObj.lastId &&
      Types.ObjectId.isValid(this._queryObj.lastId)
    ) {
      filters['_id'] = { $gt: new Types.ObjectId(this._queryObj.lastId) };
    }

    if (Object.keys(filters).length > 0) {
      this._query.find(filters);
    }

    return this;
  }

  search(): this {
    if (this._queryObj.searchTerm) {
      const searchQuery = Object.keys(this._queryObj)
        .filter(
          (field) =>
            !['page', 'sort', 'limit', 'fields', 'sortOrder'].includes(field),
        )
        .map((field) => {
          const searchTerm = this._queryObj.searchTerm.replace(/\*/g, '.*');
          return {
            [field]: { $regex: `^${searchTerm}`, $options: 'i' },
          };
        });

      if (searchQuery.length > 0) {
        this._query.or(searchQuery);
      }
    }
    return this;
  }

  sort(): this {
    if (this._queryObj.sort) {
      const sortBy = this._queryObj.sort.replace(/,/g, ' ');
      const sortOrder = this._queryObj.sortOrder === 'desc' ? '-' : '';
      this._query.sort(`${sortOrder}${sortBy}`);
    } else {
      this._query.sort('-updatedAt');
    }
    return this;
  }

  limitFields(): this {
    if (this._queryObj.fields) {
      const fields = this._queryObj.fields.split(',').join(' ');
      this._query.select(fields);
    } else {
      this._query.select('-__v');
    }
    return this;
  }
  paginate(): this {
    const page = this._queryObj.page
      ? this._queryObj.page
      : PAGINATION.DEFAULT_PAGE;
    const limit = this._queryObj.limit
      ? this._queryObj.limit
      : PAGINATION.DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    this._query.skip(skip).limit(limit);

    return this;
  }

  getQuery(): any {
    return this._query;
  }
}
export function validateAndTransformName(value: string): string {
  // Trim the value
  const trimmedValue = value.trim();

  // Check for leading/trailing commas or empty values
  if (
    trimmedValue === '' ||
    trimmedValue.startsWith(',') ||
    trimmedValue.endsWith(',') ||
    /^,+$/.test(trimmedValue)
  ) {
    throw new Error(
      'Name must be a non-empty string without leading or trailing commas.',
    );
  }

  return trimmedValue; // Return the cleaned value
}
