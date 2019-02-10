export class ResponseJSON {
  public readonly body: string;
  public readonly statusCode: number;

  constructor(body: string, statusCode: number) {
    this.body = body;
    this.statusCode = statusCode;
  }
}