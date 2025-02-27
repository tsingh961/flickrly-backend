// request-utils.ts

import { UAParser } from 'ua-parser-js';
// import { lookup } from 'geoip-lite';
import * as geoip from 'geoip-lite';
import { LocationDto } from '@core/interfaces/location.interface';
import { UserAgentInfoDto } from '@core/interfaces/userAgent.interface';
import { Request } from 'express';
import { DeviceType } from '@core/constants/enums.constants';

export class RequestUtils {
  getUserAgent(request: any): string {
    return request.headers['user-agent'] || '';
  }

  getIpAddress(request: any): string {
    const ipAddresses =
      request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      '';

    return ipAddresses.split(',')[0];
  }

  getIpLocation(ipAddress: string): LocationDto {
    const geo = geoip.lookup(ipAddress);

    return geo || null;
  }

  parseUserAgent(userAgentString: string): UserAgentInfoDto {
    try {
      const parser = new UAParser(userAgentString);

      parser.setUA(userAgentString);
      const result = parser.getResult();
      const data: UserAgentInfoDto = {
        browserName: result.browser.name,
        browserVersion: result.browser.version,
        engineName: result.engine.name,
        engineVersion: result.engine.version,
        osName: result.os.name,
        osVersion: result.os.version,
        vendor: result.device.vendor,
        model: result.device.model,
        type: result.device.type,
        architecture: result.cpu.architecture || '',
      };

      return data;
    } catch (err) {
      console.log('Error parsing user agent:', err);
    }
  }

  public getDeviceDetails(req: Request): any {
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
}
