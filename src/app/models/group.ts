import {ImageItem} from './image-item';
import {HSLColor} from './HSLColor';

export class Group {
  name: string;
  id: string;
  color: HSLColor;
  images: ImageItem[];
  childId: string;

  constructor(name: string, id:string, color: HSLColor, images: ImageItem[], childId: string) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.images = images;
    this.childId = childId;
  }
}
