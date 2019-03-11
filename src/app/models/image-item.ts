import {GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';
import {Image} from './Image';

class ImageItem implements GridsterItem {
  cols: number;
  compactEnabled: boolean;
  dragEnabled: boolean;
  initCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  maxItemArea: number;
  maxItemCols: number;
  maxItemRows: number;
  minItemArea: number;
  minItemCols: number;
  minItemRows: number;
  resizeEnabled: boolean;
  rows: number;
  x: number;
  y: number;
  image: Image;

  constructor(image: Image) {
    this.cols = 1;
    this.rows = 1;
    this.compactEnabled = false;
    this.dragEnabled = true;
    this.maxItemArea = 1;
    this.maxItemCols = 1;
    this.maxItemRows = 1;
    this.minItemArea = 1;
    this.minItemCols = 1;
    this.minItemRows = 1;
    this.resizeEnabled = false;
    this.x = 0;//rely on the compacting to organize things
    this.y = 0;
    this.image = image;


  }

}

export {ImageItem};
