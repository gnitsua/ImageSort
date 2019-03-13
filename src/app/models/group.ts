import {ImageItem} from './image-item';
import {HSLColor} from './HSLColor';

export class Group {
  name: string;
  color: HSLColor;
  images: ImageItem[];
  child: Group;

  constructor(name: string, color: HSLColor, images: ImageItem[], child: Group) {
    this.name = name;
    this.color = color;
    this.images = images;
    this.child = child;
  }
}
