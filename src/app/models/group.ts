import {ImageItem} from './image-item';
import {HSLColor} from './HSLColor';

export class Group {
  name: string;
  id: string;
  color: HSLColor;
  images: ImageItem[];
  child: Group;

  constructor(name: string, id:string, color: HSLColor, images: ImageItem[], child: Group) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.images = images;
    this.child = child;
  }
}
