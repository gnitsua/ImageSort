import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../services/images.service';
import {GridsterConfig} from 'angular-gridster2';
import {ImageItem} from '../models/image-item';
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
      // compactType: 'compactLeft&Up',
      compactType: 'none',
      displayGrid: 'none'
    };

    const groupsJson = [
      {
        name: 'Regular Goats', id: '1', color: this.hslColors[0], images: [], child:
          {
            name: 'Big Goats', id: '2', color: this.hslColors[0], images: [], child:
              {
                name: 'Scary Goats',
                id: '3',
                color: this.hslColors[0],
                images: [],
                child:
                  {
                    name: 'Scary and Hairy Goats',
                    id: '4',
                    color: this.hslColors[0],
                    images: [],
                    child: undefined
                  },
              }
          }
      },
      {
        name: 'Sheep',
        id: '5',
        color: this.hslColors[1],
        images: [],
        child: {
          name: 'Big Sheep', id: '6', color: HSLColor.getLightened(this.hslColors[1]), images: [], child: undefined
        }
      }
    ];

    this.groups = [];
    const numGroups = groupsJson.length;
    const rootHeight = Math.floor(this.rows / numGroups); // how many columns can we fit and use all of the available rows
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
        // If there is not child just create an item that takes up the entire space
        result.push(new GroupItem(group.name, group.id, group.color, group.images, group.child, level, x, y, rows, cols));
      } else {
        // Otherwise split the space in 2 and recursively call the function on the child (which will return on or many items)
        if (level % 2 !== 0) {// for even levels, split horizontally
          result.push(new GroupItem(group.name, group.id, group.color, group.images, group.child, level + 1, x, y, Math.floor(rows / 2), cols));
          group.child.color = HSLColor.getLightened(group.color);
          result = result.concat(this.groupsToGroupItemList(group.child, x + Math.floor(rows / 2), y, Math.floor(rows / 2), cols, level + 1));
        } else {
          result.push(new GroupItem(group.name, group.id, group.color, group.images, group.child, level + 1, x, y, rows, Math.floor(cols / 2)));
          group.child.color = HSLColor.getLightened(group.color);
          result = result.concat(this.groupsToGroupItemList(group.child, x, y + Math.floor(cols / 2), rows, Math.floor(cols / 2), level + 1));
        }


      }
      return result;
    }


  }

  // changedOptions() {
  //   this.options.api.optionsChanged();
  // }

  removeItem(groupId: string) {
    for (let i = 0; i < this.groups.length; i++) {
      console.log(this.groups[i].id);
      console.log(groupId);
      if (this.groups[i].id === groupId) {
        console.assert(this.groups[i].child === undefined);//should never be able to delete a group with a child
        const group_to_delete = this.groups[i];// save it so we can use it's information after we delete it
        this.groups.splice(i, 1);//delete it first because we need to have room in the grid
        if (i == 0) {//special case for deleting the top left

        } else if (this.groups[i - 1].level <= group_to_delete.level) {// if is parent
          if (this.groups[i - 1].level % 2 !== 0) {
            this.groups[i - 1].cols = this.groups[i - 1].cols * 2;
            this.groups[i - 1].child = undefined;
            this.groups[i - 1].level -= 1;
            this.changedOptions();
            // this.groups.splice(i - 1, 1, new GroupItem(oldParent.name, oldParent.id, oldParent.color, oldParent.images, undefined, oldParent.level, oldParent.x, oldParent.y, oldParent.rows, oldParent.cols * 2));
          } else {
            this.groups[i - 1].rows = this.groups[i - 1].rows * 2;
            this.groups[i - 1].child = undefined;
            this.groups[i - 1].level -= 1;
            this.changedOptions();
            // this.groups.splice(i - 1, 1, new GroupItem(oldParent.name, oldParent.id, oldParent.color, oldParent.images, undefined, oldParent.level, oldParent.x, oldParent.y, oldParent.rows * 2, oldParent.cols));
          }
        } else {
          //TODO: resize the entire previous group
        }
        break; // stop the for loop
      }
    }
  }

  addItem(groupId: string) {
    for (let i = 0; i < this.groups.length; i++) {
      console.log(this.groups[i].id);
      if (this.groups[i].id === groupId) {
        console.assert(this.groups[i].child === undefined);//should only be able to add to a group without a child
        if (this.groups[i].level % 2 === 0) {
          const newChild = new GroupItem('Group', this.groups[i].id + '-child', HSLColor.getLightened(this.groups[i].color), [], undefined, this.groups[i].level+1, this.groups[i].x, this.groups[i].y + Math.floor(this.groups[i].cols / 2), this.groups[i].rows, Math.floor(this.groups[i].cols / 2))
          this.groups[i].cols = Math.floor(this.groups[i].cols / 2);
          this.groups[i].level += 1;
          this.groups[i].child = newChild;
          this.changedOptions();
          this.groups.splice(i + 1, 0,
            newChild);
        } else {
          const newChild = new GroupItem('Group', this.groups[i].id + '-child', HSLColor.getLightened(this.groups[i].color), [], undefined, this.groups[i].level+1, this.groups[i].x + Math.floor(this.groups[i].rows / 2), this.groups[i].y, Math.floor(this.groups[i].rows / 2), this.groups[i].cols)
          this.groups[i].rows = Math.floor(this.groups[i].rows / 2);
          this.groups[i].level += 1;
          this.groups[i].child = newChild;
          this.changedOptions();
          this.groups.splice(i + 1, 0,
            newChild);

          break; // stop the for loop
        }
      }
    }
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
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

}
