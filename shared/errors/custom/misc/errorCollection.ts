/**
 * @abstract ErrorCollection
 */
export abstract class ErrorCollection {
  public errors: Error[];

  public constructor() {
    this.errors = [];
  }
}
