import { FileHandle } from './file-handle.model';

export class BookImage {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public image: FileHandle,
    public imagePath: string
  ) {}
}
