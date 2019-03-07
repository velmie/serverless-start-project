import { ResponceInterface } from '@shared/http/response/responceInterface';

export class ResponseJSON implements ResponceInterface {
  public readonly body: string;
  public readonly statusCode: number;

  constructor(body: string, statusCode: number) {
    this.body = body;
    this.statusCode = statusCode;
  }
}
