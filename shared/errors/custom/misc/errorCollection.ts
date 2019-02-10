/**
 * @abstract ErrorCollection
 */
export abstract class ErrorCollection {

  protected errors: Error[];

  public constructor() {
    this.errors = [];
  }
}
