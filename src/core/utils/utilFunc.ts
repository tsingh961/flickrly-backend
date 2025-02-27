type TValTypes =
  | '_number_'
  | '_string_'
  | '_boolean_'
  | '_include_'
  | '_include_i_'
  | '_exact_';

export const transformObject = (
  obj: any,
  type: TValTypes[] = ['_include_i_'],
): any => {
  if (typeof obj !== 'object' || obj === null) {
    let tempVal = obj;

    if (type.includes('_number_')) {
      tempVal = Number(tempVal);
    } else if (type.includes('_string_')) {
      tempVal = `${tempVal}`;
    } else if (type.includes('_boolean_')) {
      tempVal = JSON.parse(tempVal);
    }

    if (type.includes('_exact_')) {
      return tempVal;
    } else if (!type.includes('_boolean_') && !type.includes('_number_')) {
      if (type.includes('_include_')) {
        tempVal = new RegExp(tempVal);
      } else if (type.includes('_include_i_')) {
        tempVal = new RegExp(tempVal, 'i');
      }
    }

    return tempVal;
  }

  if ('_number_' in obj) {
    return transformObject(obj['_number_'], type.concat('_number_'));
  } else if ('_string_' in obj) {
    return transformObject(obj['_string_'], type.concat('_string_'));
  } else if ('_boolean_' in obj) {
    return transformObject(obj['_boolean_'], type.concat('_boolean_'));
  } else if ('_exact_' in obj) {
    return transformObject(obj['_exact_'], type.concat('_exact_'));
  } else if ('_include_' in obj) {
    return transformObject(obj['_include_'], type.concat('_include_'));
  } else if ('_include_i_' in obj) {
    return transformObject(obj['_include_i_'], type.concat('_include_i_'));
  } else {
    const transformedObj = {};
    for (const key in obj) {
      transformedObj[key] = transformObject(obj[key], type);
    }
    return transformedObj;
  }
};

export const convertObjectToString = (inputObject: any): string => {
  const processNestedObject = (obj: any, prefix = '', first = true): any => {
    let result = '';

    const tempArr = Object.keys(obj);
    for (let i = 0; i < tempArr.length; i++) {
      const key = tempArr[i];
      if (typeof obj[key] === 'object') {
        if (first) {
          result += processNestedObject(obj[key], `${key}`, false);
        } else {
          result += processNestedObject(obj[key], `${prefix}[${key}]`, first);
        }
      } else {
        if (first) {
          result += `${key}=${obj[key]}&`;
        } else {
          result += `${prefix}[${key}]=${obj[key]}&`;
        }
      }
    }

    return result;
  };

  return processNestedObject(inputObject);
};

export function sanitizeDocument(document: any, fields: string[]): any {
  const newDocument = {};
  const source = document._doc || document;
  fields.forEach((field) => {
    const keys = field.split('.'); // Split field path into keys
    let value = source;

    // Traverse nested structure
    for (const key of keys) {
      if (!value) break;
      value = value[key];
    }

    if (value !== undefined) {
      // Reconstruct nested structure in the new document
      keys.reduce((acc, key, index) => {
        acc[key] = index === keys.length - 1 ? value : acc[key] || {};
        return acc[key];
      }, newDocument);
    }
  });

  return newDocument;
}
