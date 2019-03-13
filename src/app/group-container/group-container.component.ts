import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../services/images.service';
import {GridsterConfig} from 'angular-gridster2';
import {ImageItem} from '../models/image-item';
import {Image} from '../models/Image';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Group} from '../models/group';
import {HSLColor} from '../models/HSLColor';
import {GroupItem} from '../models/group-item';


@Component({
  selector: 'app-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.css']
})
export class GroupContainerComponent implements OnInit {

  colors = [
    ['#A1BF36'],
    ['#482667'],
    ['#F28627'],
    ['#039FE3'],
    ['#FF4C96']];


  hslColors = [
    new HSLColor(73, 56, 48),
    new HSLColor(271, 46, 28),
    new HSLColor(28, 89, 55),
    new HSLColor(198, 97, 45),
    new HSLColor(335, 100, 65),
  ];

  tempStruture = [];

  options: GridsterConfig;
  groups: Array<GroupItem>;

  rows = 8;
  cols = 4;

  static itemChange(item, itemComponent) {
    // console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    // console.log('itemResized', item, itemComponent);
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
      minRows: this.rows,
      maxRows: this.rows,
      minCols: this.cols,
      maxCols: this.cols,
      compactType: 'compactLeft&Up',
      displayGrid: 'none'
    };

    let groupsJson = [
      {
        name: 'Regular Goats', color: this.hslColors[0], images: [], child:
          {
            name: 'Big Goats', color: this.hslColors[0], images: [], child:
              {
                name: 'Scary Goats',
                color: this.hslColors[0],
                images: [],
                child:
                  {
                    name: 'Scary and Hairy Goats',
                    color: this.hslColors[0],
                    images: [],
                    child: undefined
                  },
              }
          }
      },
      {
        name: 'Sheep',
        color: this.hslColors[1],
        images: [],
        child: {
          name: 'Big Sheep', color: HSLColor.getLightened(this.hslColors[1]), images: [], child: undefined
        }
      }
    ];

    this.groups = [];
    const numGroups = groupsJson.length;
    const rootHeight = Math.floor(this.rows / numGroups);//how many columns can we fit and use all of the available rows
    groupsJson.forEach((groupJson, groupNumber) =>
      this.groups = this.groups.concat(this.groupsToGroupItemList(groupJson, rootHeight * groupNumber, 0, rootHeight, this.cols, 0)));

    console.log(this.groups);
  }

  private groupsToGroupItemList(group: Group, x: number, y: number, rows: number, cols: number, level: number): GroupItem[] {
    console.log(group.name);
    if (group === undefined) {
      return [];
    } else {
      let result = [];
      console.log(group.child === undefined);
      if (group.child === undefined) {
        //If there is not child just create an item that takes up the entire space
        result.push(new GroupItem(group.name, group.color, group.images, group.child, level, x, y, rows, cols));
      } else {
        //Otherwise split the space in 2 and recursively call the function on the child (which will return on or many items)
        if (level % 2 !== 0) {// for even levels, split horizontally
          result.push(new GroupItem(group.name, group.color, group.images, group.child, level, x, y, Math.floor(rows / 2), cols));
          group.child.color = HSLColor.getLightened(group.color);
          result = result.concat(this.groupsToGroupItemList(group.child, x + Math.floor(rows / 2), y, Math.floor(rows / 2), cols, level + 1));
        } else {
          result.push(new GroupItem(group.name, group.color, group.images, group.child, level, x, y, rows, Math.floor(cols / 2)));
          group.child.color = HSLColor.getLightened(group.color);
          result = result.concat(this.groupsToGroupItemList(group.child, x, y + Math.floor(cols / 2), rows, Math.floor(cols / 2), level + 1));
        }


      }
      return result;
    }


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
