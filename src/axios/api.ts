// api.ts
import { Request } from './request';

export default class api {
  /* api接口模块 */
  public static cityInfo = {
    get: () => Request.get('https://restapi.amap.com/v3/ip?key=78b177c7430f35b6d38c1739dd6895fc&output=json')
  }

  public static weather = {
    getAll: (city:string) => Request.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=78b177c7430f35b6d38c1739dd6895fc&city=${city}&extensions=all`),
    getNow: (city:string) => Request.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=78b177c7430f35b6d38c1739dd6895fc&city=${city}&extensions=base`)
  }
}