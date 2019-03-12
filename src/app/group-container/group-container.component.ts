import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../services/images.service';
import {GridsterConfig} from 'angular-gridster2';
import {ImageItem} from '../models/image-item';
import {Image} from '../models/Image';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Group} from '../models/group';

@Component({
  selector: 'app-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.css']
})
export class GroupContainerComponent implements OnInit {

  colors = ['#A1BF36', '#482667', '#F28627', '#039FE3', 'FF4C96'];
  options: GridsterConfig;
  groups: Array<Group>;

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }


  constructor(private imageService: ImagesService) {
  }

  ngOnInit() {
    // this.getImages();
    this.options = {
      itemChangeCallback: GroupContainerComponent.itemChange,
      itemResizeCallback: GroupContainerComponent.itemResize,
      margin: 10,
      gridType: 'fit',
      mobileBreakpoint: 100,
      minRows: 6,
      minCols: 4,
      compactType: 'compactLeft&Up',
      displayGrid: 'always'
    };
    this.groups = [
      {name: 'Goats', color: this.colors[0], images: [], x: 0, y: 0, rows: 6, cols: 4}

    ];

  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    // this.images.splice(this.images.indexOf(item), 1);
  }

  addItem(image: Image) {
    // this.images.push(new ImageItem(image));
  }

  getImages(): void {
    // this.imageService.getImages()
    // .subscribe(images => this.images = images.map(image => new ImageItem(image)));
  }

  drop(event: CdkDragDrop<ImageItem[]>) {
    // if (event.previousContainer !== event.container) {
    //   // console.log(event.previousContainer.data)
    //   this.transferArrayItem(event.previousContainer.data, event.container.data,
    //     event.previousIndex, event.currentIndex);
    // } else {
    //   this.array_move(this.images, event.previousIndex, event.currentIndex);
    // }
  }

  transferArrayItem(srcContainer: Array<ImageItem>, dstContainer: Array<ImageItem>, srcIndex: number, dstIndex: number) {
    const item = srcContainer.splice(srcIndex, 1)[0];
    dstContainer.splice(dstIndex, 0, item);
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };

}
