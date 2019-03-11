import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../services/images.service';
import {GridsterConfig} from 'angular-gridster2';
import {ImageItem} from '../models/image-item';
import {Image} from '../models/Image';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  images: Image[];
  options: GridsterConfig;

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }


  constructor(private imageService: ImagesService) {
  }

  ngOnInit() {
    this.getImages();
    this.options = {
      itemChangeCallback: GroupComponent.itemChange,
      itemResizeCallback: GroupComponent.itemResize,
      margin: 10,
      gridType: 'fit',
      maxItemArea: 1,
      fixedColWidth: 100,
      fixedRowHeight: 100,
      mobileBreakpoint: 100,
      minRows: 4,
      maxRows: 4,
      minCols: 6,
      maxCols: 6,
      draggable: {
        enabled: true
      },
      compactType: 'compactLeft&Up',
      displayGrid: 'none'
    };

  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.images.splice(this.images.indexOf(item), 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    // this.addItem(event.previousContainer.data[event.previousIndex]);
  }

  addItem(image:Image) {
    // this.images.push(new ImageItem(image));
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => this.images = images);
  }

}
