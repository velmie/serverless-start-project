import {IsArray, IsString, IsBoolean, ArrayUnique, IsNotEmpty} from 'class-validator';
import {FillableObjectWithValidation} from '@valueObjects/fillableObjectWithValidation';

export class MailSystemParametersRequest extends FillableObjectWithValidation {
  @IsArray()
  @ArrayUnique()
  public readonly emails: string[] = [];

  @IsArray()
  @ArrayUnique()
  public readonly languages: string[] = [];

  @IsArray()
  @ArrayUnique()
  public readonly gyms: number[] = [];

  @IsArray()
  @ArrayUnique()
  public readonly institutions: number[] = [];

  @IsString()
  public readonly newsletterType: string = '';

  @IsString()
  @IsNotEmpty()
  public readonly subject: string = '';

  @IsString()
  @IsNotEmpty()
  public readonly body: string = '';

  @IsString()
  public readonly title: string = '';

  @IsString()
  public readonly templateTheme: string = '';

  @IsBoolean()
  public readonly onlyForInstitutionAdmin: boolean = false;

  @IsBoolean()
  public readonly onlyForGymStaff: boolean = false;

  @IsBoolean()
  public readonly isUseNotRegisteredEmails: boolean = false;

  /**
   * @param {object} data
   */
  constructor(data: object) {
    super();
    this.fillObjectWithData(data);
    this.validateObject();
    this.emails = this.emails.map((email: string) => {
      return email;
    });
  }
}
