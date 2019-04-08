import {ImageItem} from './image-item';
import {HSLColor} from './HSLColor';

export class Group {
  name: string;
  id: string;
  level: number;
  color: HSLColor;
  images: ImageItem[];
  children: Group[];

  constructor(name: string, id:string, level:number, color: HSLColor, images: ImageItem[], children:Group[]) {
    this.name = name;
    this.id = id;
    this.level = level;
    this.color = color;
    this.images = images;
    this.children = children;
  }
}
