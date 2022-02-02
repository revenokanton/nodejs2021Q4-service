export class CreateTaskDto {
  title: string;

  description: string;

  order: number;

  userId?: string | null;

  boardId?: string | null;

  columnId?: string | null;
}
