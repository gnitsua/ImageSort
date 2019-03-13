import {Group} from './group';
import {HSLColor} from './HSLColor';
import {ImageItem} from './image-item';

export class GroupItem extends Group {
  level: number;
  x: number;
  y: number;
  rows: number;
  cols: number;

  constructor(name: string, color: HSLColor, images: ImageItem[], child: Group, level: number, x: number, y: number, rows: number, cols: number) {
    super(name, color, images, child);
    this.level = level;
    this.x = x;
    this.y = y;
    this.rows = rows;
    this.cols = cols;
  }
}
