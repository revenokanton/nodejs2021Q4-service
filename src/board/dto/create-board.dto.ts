import { IsArray, IsOptional, IsString } from 'class-validator';
import { BoardColumn } from '../../column/entities/column.entity';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsArray()
  @IsOptional()
  columns?: BoardColumn[] = [];
}
