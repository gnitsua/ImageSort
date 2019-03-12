import {Input} from '@angular/core';
import {ImageItem} from './image-item';

export class Group {
  name: string;
  color: string;
  images: ImageItem[];
  x: number;
  y: number;
  cols: number;
  rows: number;
}
