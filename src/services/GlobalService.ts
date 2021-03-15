import { ApiUrl } from './ApiConfig';
import { POST } from './AxiosInstance';

export class GlobalService {

  public static auth(params: any): Promise<any> {
    return POST(ApiUrl.auth, params);
  }

}
