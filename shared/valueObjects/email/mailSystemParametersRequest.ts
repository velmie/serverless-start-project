import {IsArray, IsString, IsBoolean, ArrayUnique, IsNotEmpty} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MailSystemParametersRequest {
  @Expose()
  @IsArray()
  @ArrayUnique()
  public readonly emails: string[] = [];

  @Expose()
  @IsArray()
  @ArrayUnique()
  public readonly languages: string[] = [];

  @Expose()
  @IsArray()
  @ArrayUnique()
  public readonly gyms: number[] = [];

  @Expose()
  @IsArray()
  @ArrayUnique()
  public readonly institutions: number[] = [];

  @Expose()
  @IsString()
  public readonly newsletterType: string = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly subject: string = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly body: string = '';

  @Expose()
  @IsString()
  public readonly title: string = '';

  @Expose()
  @IsString()
  public readonly templateTheme: string = '';

  @Expose()
  @IsBoolean()
  public readonly onlyForInstitutionAdmin: boolean = false;

  @Expose()
  @IsBoolean()
  public readonly onlyForGymStaff: boolean = false;

  @Expose()
  @IsBoolean()
  public readonly isUseNotRegisteredEmails: boolean = false;
}
