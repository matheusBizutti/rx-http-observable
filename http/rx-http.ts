import Axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

import { Observable } from 'rxjs';

export interface RxHttpConfig extends AxiosRequestConfig {
  localCache?: boolean;
}

class RxHttp {

  private http: AxiosInstance;

  constructor(private options: RxHttpConfig = {}) {
    this.http = Axios.create(options);
  }

  private createRequest<T>(method: string, url: string, queryParams?: object, body?: object) {
    let request: AxiosPromise<T>;
    switch (method) {
      case 'GET':
        request = this.http.get<T>(url, {params: queryParams});
        break;
      case 'HEAD':
        request = this.http.head(url, {params: queryParams});
        break;
      case 'POST':
        request = this.http.post<T>(url, body, {params: queryParams});
        break;
      case 'PUT':
        request = this.http.put<T>(url, body, {params: queryParams});
        break;
      case 'PATCH':
        request = this.http.patch<T>(url, body, {params: queryParams});
        break;
      case 'DELETE':
        request = this.http.delete(url, {params: queryParams});
        break;

      default:
        throw new Error('Method not supported');
    }

    return new Observable<T>(subscriber => {
      request.then(response => {
        subscriber.next(response.data);
        subscriber.complete();
      }).catch((err: Error) => {
        subscriber.error(err);
        subscriber.complete();
      });
    });
  }

  public get<T>(url: string, queryParams?: object) {
    return this.createRequest<T>('GET', url, queryParams);
  }

  public head<T>(url: string, queryParams?: object) {
    return this.createRequest<T>('HEAD', url, queryParams);
  }

  public post<T>(url: string, body: object, queryParams?: object) {
    return this.createRequest<T>('POST', url, queryParams, body);
  }

  public put<T>(url: string, body: object, queryParams?: object) {
    return this.createRequest<T>('PUT', url, queryParams, body);
  }

  public patch<T>(url: string, body: object, queryParams?: object) {
    return this.createRequest<T>('PATCH', url, queryParams, body);
  }

  public delete(url: string, queryParams?: object) {
    return this.createRequest('DELETE', url, queryParams);
  }
}

export { RxHttp };
