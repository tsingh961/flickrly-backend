import { isNotEmpty } from 'class-validator';
import { comparisonOperators, TComparisonOperators } from './utilVars';
import { ObjectId } from 'mongodb'; // Import ObjectId from MongoDB

export function getFilters(query: any): any {
  const filters: any = {};
  const excludedFields = [
    'page',
    'sort',
    'limit',
    'fields',
    'sortOrder',
    'searchTerm',
  ];

  Object.keys(query).forEach((key) => {
    if (!excludedFields.includes(key)) {
      const value = query[key];

      // Ensure the value is not empty before proceeding
      if (isNotEmpty(value)) {
        // Handle range queries like createdAt.gte, createdAt.lte
        const parts = key.split('.');
        // Check if the key is split into exactly two parts and if the second part is one of the comparison operators.
        // This allows handling of fields with dot notation where the second part is an operator such as gte, gt, lte, or lt.
        // Handle multiple values separated by commas
        if (typeof value === 'string' && value.includes(',')) {
          const valuesArray = value.split(',').map((val) => val.trim());
          filters[key] = { $in: valuesArray };
        } else if (
          parts.length === 2 &&
          comparisonOperators.includes(parts[1] as TComparisonOperators)
        ) {
          const [field, operator] = parts;
          if (!filters[field]) filters[field] = {};
          filters[field][`$${operator}`] = value;
        } else if (key === 'createdAt') {
          // Handle day-based date filter for createdAt field
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
          filters[key] = { $gte: startOfDay, $lt: endOfDay };
        } else if (key === 'lastId') {
          // Handle lastId as a MongoDB ObjectId and add $gt filter
          if (ObjectId.isValid(value)) {
            filters['_id'] = { $gt: new ObjectId(value) };
          }
        } else {
          // Handle wildcard searches
          if (typeof value === 'string' && value.includes('*')) {
            filters[key] = {
              $regex: `^${value.replace(/\*/g, '.*')}`,
              $options: 'i',
            };
          } else {
            filters[key] = value;
          }
        }
      }
    }
  });

  return filters;
}
