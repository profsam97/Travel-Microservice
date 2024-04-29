import { IsString } from 'class-validator';

export abstract class PaginationQueryDto {
  @IsString()
  public page?: number;

  @IsString()
  public perPage?: number;

  [keys: string]: any;
}
