import { IsArray, IsOptional, IsString } from 'class-validator';
import { BoardColumn } from '../../column/entities/column.entity';

export class UpdateBoardDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  columns?: BoardColumn[] = [];
}
