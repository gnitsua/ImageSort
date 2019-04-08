import {HSLColor} from './HSLColor';
import {Image} from './Image';

export class Group {
  name: string;
  id: string;
  color: HSLColor;
  images: Image[];
  childId: string;

  constructor(name: string, id:string, color: HSLColor, images: Image[], childId: string) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.images = images;
    this.childId = childId;
  }
}
