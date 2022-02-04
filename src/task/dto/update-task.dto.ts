import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  userId?: string | null;

  @IsString()
  @IsOptional()
  boardId?: string | null;

  @IsString()
  @IsOptional()
  columnId?: string | null;
}
