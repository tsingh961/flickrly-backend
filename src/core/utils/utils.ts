import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { phone } from 'phone';
import { v4 as uuidv4 } from 'uuid';
import { APIFeatures } from './apiFeatures.utils';
import slugify from 'slugify';
import * as geoip from 'geoip-lite';
import { Request } from 'express';
import { UAParser }  from 'ua-parser-js';
import {
  DeviceType,
  Gender,
  ModuleName,
} from '@core/constants/enums.constants';
import { BadRequestException } from '@nestjs/common';

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate phone numbers
export function isValidPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
}

export function parsePhoneNumber(input: string): {
  countryPrefix: string;
  fullNumber: string;
  number: string;
} {
  if (input.length == 10) input = '+91' + input;

  if (input.length == 12) input = '+' + input;
  const result = phone(input);

  if (result.isValid) {
    const countryPrefix = result.countryCode;
    const fullNumber = result.phoneNumber;
    const number = fullNumber.replace(countryPrefix, '');

    return {
      countryPrefix,
      fullNumber,
      number,
    };
  } else {
    throw new BadRequestException('Invalid phone number format');
  }
}

export const expireTime5M = '5m';

export const expireTime1H = '1h';

const SALT_ROUNDS = 10;

export async function generateSecretToken(): Promise<string> {
  return uuidv4();
}

export async function hashToken(token: string): Promise<string> {
  return bcrypt.hash(token, SALT_ROUNDS);
}

export async function compareTokens(
  token: string,
  hashedToken: string,
): Promise<boolean> {
  return await bcrypt.compare(token, hashedToken);
}

export function detectAndDecodeString(input: string): {
  emailContent: string;
  isHtml: boolean;
} {
  // Regular expressions to identify Base64 encoded strings and HTML content
  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}(?:==)?|[A-Za-z0-9+/]{3}=?)?$/;
  const htmlRegex = /<[^>]+>/;

  // Helper function to decode Base64
  // const decodeBase64 = (str: string): string => atob(str);
  const decodeBase64 = (str: string): string =>
    Buffer.from(str, 'base64').toString('utf-8');

  let finalString = input;
  let isHtml = false;

  // Check if the input is Base64 encoded
  if (base64Regex.test(input)) {
    try {
      const decoded = decodeBase64(input);
      // If decoding is successful and changes the string, update finalString
      if (decoded !== input) {
        finalString = decoded;
      }
    } catch (e) {
      // If Base64 decoding fails, retain the original string
    }
  }

  // Check if the final string is HTML
  isHtml = htmlRegex.test(finalString);

  return { emailContent: finalString, isHtml };
}

export function isURLEncoded(input: string): boolean {
  if (!input || input == '') return false;
  // Regular expression to match a percent-encoded triplet
  const percentEncodedRegex = /%(?:[0-9A-Fa-f]{2})/g;

  // Check if input contains any percent-encoded sequences
  const matches = input.match(percentEncodedRegex);

  if (!matches) {
    // If no matches found, input is not URL encoded
    return false;
  }

  // Iterate through matched percent-encoded sequences
  for (const match of matches) {
    try {
      // Attempt to decode the matched sequence
      decodeURIComponent(match);
    } catch (error) {
      // If decoding fails, input is not properly URL encoded
      return false;
    }
  }

  // If all sequences decode successfully, input is URL encoded
  return true;
}
export function parseRecipient(phoneNumber: string): any {
  const phoneNumberRegex = /^(\+?(\d{1,2}))(.*$)/;
  // Regex pattern to match phone number
  // ^ matches the start of the string
  // (\+?(\d{1,2})) captures a group (group 1) that matches:
  //   \+? matches an optional + character (0 or 1 times)
  //   (\d{1,2}) captures a group (group 2) that matches 1 or 2 digits (the country code)
  // (.*) captures a group (group 3) that matches any characters (including none) until the end of the string
  // $ matches the end of the string
  const match = phoneNumberRegex.exec(phoneNumber);

  if (phoneNumber.length === 10) {
    return {
      countryPrefix: '',
      number: phoneNumber,
      fullNumber: phoneNumber,
    };
  }
  let countryPrefix = match[2];
  const fullNumberWithoutCountryCode = match[3];
  const number = fullNumberWithoutCountryCode.replace(/[^0-9]/g, '');
  const fullNumber = `+${countryPrefix}${number}`;
  countryPrefix = `+${countryPrefix}`;

  const recipientObject = {
    countryPrefix,
    number,
    fullNumber,
  };

  return recipientObject;
}

// export function slugify(text: string): string {
//   return text
//     .toString() // Convert to string
//     .normalize('NFD') // Normalize the string
//     .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
//     .toLowerCase() // Convert to lowercase
//     .trim() // Trim whitespace
//     .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
//     .replace(/\s+/g, '-') // Replace spaces with hyphens
//     .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
// }

export function customUrlEncode(str) {
  const specialChars = {
    ' ': '%20',
    '!': '%21',
    '"': '%22',
    '#': '%23',
    $: '%24',
    '%': '%25',
    '&': '%26',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A',
    '+': '%2B',
    ',': '%2C',
    '-': '%2D',
    '.': '%2E',
    '/': '%2F',
    ':': '%3A',
    ';': '%3B',
    '<': '%3C',
    '=': '%3D',
    '>': '%3E',
    '?': '%3F',
    '@': '%40',
    '[': '%5B',
    '\\': '%5C',
    ']': '%5D',
    '^': '%5E',
    _: '%5F',
    '`': '%60',
    '{': '%7B',
    '|': '%7C',
    '}': '%7D',
    '~': '%7E',
  };

  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code < 128) {
        // Use special character map for ASCII characters
        return specialChars[char] || char;
      } else {
        // Encode non-ASCII characters using UTF-8
        return encodeURIComponent(char);
      }
    })
    .join('');
}

export function templateMessageCreator(
  message: string,
  templateParams: null | string[],
): string {
  if (!templateParams) return message;
  templateParams.forEach((param, index) => {
    const placeholder = `{{${index + 1}}}`;
    message = message.replace(placeholder, param);
  });

  return message;
}
export function templateMessageFor2Factor(
  message: string,
  templateParams: null | string[],
): string {
  if (!templateParams) return message;

  templateParams.forEach((param, index) => {
    const placeholder = `#VAR${index + 1}#`;
    message = message.replace(new RegExp(placeholder, 'g'), param);
  });

  return message;
}
export function buildUserMetadata(user: any): {
  userId: string;
  userName: string;
  userType: string;
} {
  return {
    userId: user?.sub || 'System',
    userName: user?.name || 'System',
    userType: user?.userType || 'System',
  };
}
export async function getModelWithFeatures<T>(
  model: Model<T>,
  queryParams: any,
): Promise<any> {
  const features = new APIFeatures(model, queryParams)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();
  return await features.getQuery().exec();
}

// Define the interface for the slug document if needed

export async function generateUniqueSlug(
  name: string,
  model: Model<any>,
  user: any,
  moduleType: ModuleName,
): Promise<string> {
  // Step 1: Create the initial slug using slugify
  let slug = slugify(name, { lower: true });

  // Step 2: Check if the generated slug already exists in the Slug collection
  let slugExists = await model.findOne({ slug });

  if (!slugExists) {
    // If the slug doesn't exist, store it in the database
    await model.create({
      slug,
      type: moduleType,
      createdBy: {
        userId: user.sub,
        userName: user.name,
        userType: user.userType,
        profileId: user.profileId,
      },
      updatedBy: {
        userId: user.sub,
        userName: user.name,
        userType: user.userType,
        profileId: user.profileId,
      },
    });
    return slug;
  }

  // Step 3: If the slug exists, modify the slug by appending/incrementing the number
  while (slugExists) {
    const slugParts = slug.split('-');
    const lastPart = slugParts[slugParts.length - 1];

    let newSlug: string;
    if (!isNaN(parseInt(lastPart))) {
      // If the last part is a number, increment it
      const lastNumber = parseInt(lastPart);
      slugParts[slugParts.length - 1] = (lastNumber + 1).toString();
      newSlug = slugParts.join('-');
    } else {
      // If no number at the end or '-' not present, append "-1"
      newSlug = `${slug}-1`;
    }

    slug = newSlug;
    slugExists = await model.findOne({ slug });
  }

  // Step 4: Store the new unique slug in the database
  await model.create({
    slug,
    type: moduleType,
    createdBy: {
      userId: user.sub,
      userName: user.name,
      userType: user.userType,
      profileId: user.profileId,
    },
    updatedBy: {
      userId: user.sub,
      userName: user.name,
      userType: user.userType,
      profileId: user.profileId,
    },
  });

  // Return the modified or unique slug
  return slug;
}
export function extractModule(summary: string): string {
  const moduleTypes = Object.values(ModuleName);
  for (const moduleType of moduleTypes) {
    if (summary.toLowerCase().includes(moduleType)) {
      return moduleType;
    }
  }
  return 'item'; // Default return value if no match found
}

export function getDeviceDetails(req: Request): any {
  const ipAddress = req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for'].toString().split(',')[0]
    : req.ip;
  // Extract country code based on IP address
  let countryCode = null;
  const geo = geoip.lookup(ipAddress);
  if (geo && geo.country) {
    countryCode = geo.country;
  } else {
    countryCode = 'IN'; // Default country code
  }

  // Extract user-agent header from the request
  const userAgent = req.headers['user-agent'];

  // Parse the user-agent string using ua-parser-js
  const parser = new UAParser();
  const uaResult = parser.setUA(userAgent).getResult();

  let type = DeviceType.OTHER;
  if (userAgent && userAgent.includes('okhttp/')) {
    type = DeviceType.PHONE; // Set device type to phone if OkHttp is detected
    uaResult.os.name = DeviceType.ANDROID; // Set platform to Android for OkHttp requests
  } else if (uaResult.os && uaResult.os.name) {
    const osName = uaResult.os.name.toLowerCase();
    switch (osName) {
      case DeviceType.WINDOW:
      case DeviceType.MAC:
      case DeviceType.LINUX:
        type = DeviceType.DESKTOP;
        break;
      case DeviceType.ANDROID:
      case DeviceType.IOS:
        type = DeviceType.PHONE;
        break;
    }
  }

  // Extract device details from the parsed result
  const device = {
    countryCode: countryCode,
    ip: ipAddress,
    userAgent: userAgent,
    name: uaResult.device.model || '',
    platform: uaResult.os.name || '',
    browser: uaResult.browser.name || '',
    type: type,
    dummy: '', // Add logic to determine dummy value
  };

  return device;
}
