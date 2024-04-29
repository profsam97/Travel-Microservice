import { IsString, Length } from 'class-validator';

export abstract class GetCustomerParams {
  @IsString()
  @Length(1, 106)
  public id: string;
}
