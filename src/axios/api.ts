// api.ts
import { Request } from './request';

export default class api {
  /* api接口模块 */
  public static cityInfo = {
    get: () => Request.get('https://restapi.amap.com/v3/ip?key=bc3c92b66e5a89bc22f22bae29b7f574&output=json')
  }

  public static weather = {
    getAll: (city: string) => Request.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=bc3c92b66e5a89bc22f22bae29b7f574&city=${city}&extensions=all`),
    getNow: (city: string) => Request.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=bc3c92b66e5a89bc22f22bae29b7f574&city=${city}&extensions=base`)
  }

  public static weibo = {
    get: () => Request.get('https://api.vvhan.com/api/wbhot')
  }
}
