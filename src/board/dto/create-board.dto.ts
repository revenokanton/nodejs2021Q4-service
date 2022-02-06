import { IsArray, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { BoardColumn } from '../../column/entities/column.entity';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsOptional()
  columns?: BoardColumn[] = [];
}
