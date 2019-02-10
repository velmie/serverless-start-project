import {ErrorTarget} from '@constants/errors';
import {CustomErrorInterface, isCustomErrorInterface} from '@errors/custom/misc/customErrorInterface';

export class ResponseSingleError implements CustomErrorInterface {
  public readonly code: string;
  public readonly target: string;
  public readonly message?: string;
  public readonly source?: object;

  constructor(code: string | CustomErrorInterface, target?: string, message?: string) {
    if (typeof(code) === 'object' && isCustomErrorInterface(code)) {
      this.code = code.code;
      this.target = code.target;
      this.message = code.message;
      if (code.source) {
        const source: any = JSON.parse(JSON.stringify(code.source));
        if (source.hasOwnProperty('privateCriteria')) {
          delete source.privateCriteria;
        }

        this.source = source;
      }
    } else if (typeof(code) === 'string') {
      this.code = code;
      this.target = target ? target : ErrorTarget.COMMON;
      this.message = message;
    }
  }
}
