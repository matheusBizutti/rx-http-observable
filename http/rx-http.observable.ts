import { RxHttp } from './rx-http';

import { Observable } from 'rxjs';

export class RxHttpObservable {

  private http: RxHttp;

  constructor() {
    this.http = new RxHttp({headers: {}});
  }

  delete(url: string = '', queryParams?, headers?): Observable<any> {
    this.http = this.createHeaderRequest(headers);
    return this.http.delete(url, queryParams);
  }

  get(url: string = '', queryParams?, headers?): Observable<any> {
    this.http = this.createHeaderRequest(headers);
    return this.http.get<Response>(url, queryParams);
  }

  head(url: string = '', queryParams?): Observable<any> {
    return this.http.head<Response>(url, queryParams);
  }

  patch(url: string = '', body?, queryParams?, headers?): Observable<any> {
    this.http = this.createHeaderRequest(headers);
    return this.http.patch<Response>(url, body, queryParams);
  }

  post(url: string = '', body?, queryParams?, headers?): Observable<any> {
    this.http = this.createHeaderRequest(headers);
    return this.http.post<Response>(url, body, queryParams);
  }

  put(url: string = '', body?, queryParams?, headers?): Observable<any> {
    this.http = this.createHeaderRequest(headers);
    return this.http.put<Response>(url, body, queryParams);
  }

  request(method: string = '', url: string = '', body?, queryParams?, headers?): Observable<any> {

    let request;

    this.http = this.createHeaderRequest(headers);

    method = method.toUpperCase();

    switch (method) {
      case 'GET':
        request = this.get(url, { params: queryParams }, headers);
        break;
      case 'HEAD':
        request = this.head(url, { params: queryParams });
        break;
      case 'POST':
        request = this.post(url, body, { params: queryParams }, headers);
        break;
      case 'PUT':
        request = this.put(url, body, { params: queryParams }, headers);
        break;
      case 'PATCH':
        request = this.patch(url, body, { params: queryParams }, headers);
        break;
      case 'DELETE':
        request = this.delete(url, { params: queryParams }, headers);
        break;
      default:
        throw new Error('Http method not supported');
    }

    return request;

  }

  private createHeaderRequest(headers) {
    return headers ? new RxHttp({headers: headers}) : this.http;
  }

}
