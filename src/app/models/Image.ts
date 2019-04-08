export class Image {
  id: number;
  parentIds: string[];
  url: string;

  constructor(id: number, parentIds: string[], url: string) {
    this.id = id;
    this.parentIds = parentIds;
    this.url = url;
  }
}
