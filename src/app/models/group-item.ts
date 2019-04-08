import {Group} from './group';
import {HSLColor} from './HSLColor';
import {GridsterItem} from 'angular-gridster2';
import {Image} from './Image';

export class GroupItem extends Group implements GridsterItem {
  level: number;
  x: number;
  y: number;
  rows: number;
  cols: number;

  constructor(name: string, id: string, color: HSLColor, images: Image[], childId: string, level: number, x: number, y: number, rows: number, cols: number) {
    super(name, id, color, images, childId);
    this.level = level;
    this.x = x;
    this.y = y;
    this.rows = rows;
    this.cols = cols;
  }
}
