import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../services/images.service';
import {GridsterConfig} from 'angular-gridster2';
import {ImageItem} from '../models/image-item';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Group} from '../models/group';
import {HSLColor} from '../models/HSLColor';
import {GroupItem} from '../models/group-item';
import * as uuid from 'node_modules/uuid';

@Component({
  selector: 'app-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.css']
})
export class GroupContainerComponent implements OnInit {


  constructor(private imageService: ImagesService) {
  }

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

  options: GridsterConfig;
  groups: Array<GroupItem>;

  rows = 8;
  cols = 4;

  parentGroups = 0;

  static itemChange(item, itemComponent) {
    // console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    // console.log('itemResized', item, itemComponent);
  }

  static getItemRows(level: number) {
    if (level > 2) {
      return 1;
    } else {
      return 2;
    }

  }

  static getItemCols(level: number) {
    if (level === 0) {
      return 4;
    } else if (level < 5) {
      return 2;
    } else {
      return 1;
    }
  }

  ngOnInit() {
    // this.getImages();
    this.options = {
      itemChangeCallback: GroupContainerComponent.itemChange,
      itemResizeCallback: GroupContainerComponent.itemResize,
      margin: 10,
      minCols: 4,
      maxCols: 4,
      gridType: 'fit',
      mobileBreakpoint: 0,
      compactType: 'compactUp',
      displayGrid: 'always',
    };

    const groupsJson = [
      {
        name: 'Regular Goats', id: '1', images: [], child:
          {
            name: 'Big Goats', id: '2', images: [], child:
              {
                name: 'Scary Goats',
                id: '3',
                images: [],
                child:
                  {
                    name: 'Scary and Hairy Goats',
                    id: '4',
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
    // groupsJson.forEach((groupJson, groupNumber) =>
    //   this.groups = this.groups.concat(this.groupsToGroupItemList(groupJson, 0, 0, 2, this.cols, 0)));

    groupsJson.forEach((groupJson, groupNumber) => this.addGroup(new GroupItem(
      groupJson.name,
      groupJson.id,
      this.hslColors.pop(),//automatically color the groups in order
      groupJson.images,
      undefined,
      0,
      0,
      0,
      2,
      this.cols
    )));
  }

  createEmptyChild(color: HSLColor, level: number) {
    return new GroupItem(`Group`, uuid.v4(), color, [], undefined, level, 0, 0, GroupContainerComponent.getItemRows(level), GroupContainerComponent.getItemCols(level));
  }

  addEmptyGroup() {
    if (this.parentGroups < 5) {
      this.addGroup(this.createEmptyChild(this.hslColors.pop(), 0));//also remove color so it can't be used again
    }
  }


  addGroup(group: GroupItem) {

    if (this.parentGroups < 5) {
      this.parentGroups += 1;
      ;
      // then add the group
      this.groups.push(group);
    } else {
      alert('Already at max number of groups');
    }

  }

  // removeGroup(groupId: string) {
  //   const groupIndex = this.getGridIndex(groupId);
  //   const group = this.groups[groupIndex];
  //   console.assert(group.level === 0);//only allowed to remove
  //   // first delete the group
  //   this.removeItem(groupId); //TODO: this is not safe if groupId is not root or has children
  //   // then update the number of rows
  //   // this.options.minRows = (this.groups.length) * 2;
  //   // this.options.maxRows = (this.groups.length) * 2;
  //   this.changedOptions();
  // }

  // private groupsToGroupItemList(group: Group, x: number, y: number, rows: number, cols: number, level: number): GroupItem[] {
  //   console.log(group.name);
  //   if (group === undefined) {
  //     return [];
  //   } else {
  //     let result = [];
  //     console.log(group.childId === undefined);
  //     if (group.childId === undefined) {
  //       // If there is not childId just create an item that takes up the entire space
  //       result.push(new GroupItem(group.name, group.id, group.color, group.images, group.childId, level, x, y, rows, cols));
  //     } else {
  //       // Otherwise split the space in 2 and recursively call the function on the childId (which will return on or many items)
  //       if (level % 2 !== 0) {// for even levels, split horizontally
  //         result.push(new GroupItem(group.name, group.id, group.color, group.images, group.childId, level + 1, x, y, Math.floor(rows / 2), cols));
  //         group.childId.color = HSLColor.getLightened(group.color);
  //         result = result.concat(this.groupsToGroupItemList(group.childId, x + Math.floor(rows / 2), y, Math.floor(rows / 2), cols, level + 1));
  //       } else {
  //         result.push(new GroupItem(group.name, group.id, group.color, group.images, group.childId, level + 1, x, y, rows, Math.floor(cols / 2)));
  //         group.childId.color = HSLColor.getLightened(group.color);
  //         result = result.concat(this.groupsToGroupItemList(group.childId, x, y + Math.floor(cols / 2), rows, Math.floor(cols / 2), level + 1));
  //       }
  //
  //
  //     }
  //     return result;
  //   }
  //
  //
  // }

  removeItem(groupId: string) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === groupId) {
        console.assert(this.groups[i].childId === undefined);//should never be able to delete a group with a childId
        const group_to_delete = this.groups[i];// save it so we can use it's information after we delete it
        this.groups.splice(i, 1);//delete it first because we need to have room in the grid
        if (i - 1 > 0 && this.groups[i - 1].level < group_to_delete.level) {// if is parent
          if (this.groups[i - 1].level % 2 !== 0) {
            this.groups[i - 1].cols = this.groups[i - 1].cols * 2;
            this.groups[i - 1].childId = undefined;
            this.groups[i - 1].level -= 1;
            this.changedOptions();
          } else {
            this.groups[i - 1].rows = this.groups[i - 1].rows * 2;
            this.groups[i - 1].childId = undefined;
            this.groups[i - 1].level -= 1;
            this.changedOptions();
          }
        } else {
          console.log(this.parentGroups);
        }
        break; // stop the for loop
      }
    }
  }

  splitVerticalAndAdd(groupId: string, newChild: Group) {
    const groupIndex = this.getGridIndex(groupId);
    const group = this.groups[groupIndex];
    // console.assert(group.level % 2 === 0);
    let newChildItem;
    if (newChild !== undefined) {
      newChildItem = new GroupItem('Group', group.id + '-childId', HSLColor.getLightened(group.color), [], undefined, group.level + 2, 0, 0, GroupContainerComponent.getItemRows(group.level + 2), GroupContainerComponent.getItemRows(group.level + 2));
    } else {
      newChildItem = this.createEmptyChild(HSLColor.getLightened(group.color), group.level + 2);
    }
    this.groups[groupIndex].level = group.level + 1;
    this.groups[groupIndex].cols = GroupContainerComponent.getItemCols(group.level);
    this.groups[groupIndex].childId = newChildItem.id;

    this.changedOptions();
    this.groups.splice(groupIndex + 1, 0, newChildItem);
  }

  splitHorizontalAndAdd(groupId: string, newChild: Group) {

    const groupIndex = this.getGridIndex(groupId);
    const group = this.groups[groupIndex];

    // console.assert(group.level % 2 !== 0);
    let newChildItem;
    if (newChild !== undefined) {
      newChildItem = new GroupItem('Group', group.id + '-childId', HSLColor.getLightened(group.color), [], undefined, group.level + 2, 0, 0, GroupContainerComponent.getItemRows(group.level + 2), GroupContainerComponent.getItemCols(group.level + 2));
    } else {
      newChildItem = this.createEmptyChild(HSLColor.getLightened(group.color), group.level + 2);
    }
    this.groups[groupIndex].level = group.level + 1;
    this.groups[groupIndex].rows = GroupContainerComponent.getItemRows(group.level);// mutate the original object
    this.groups[groupIndex].childId = newChildItem.id;

    this.changedOptions();
    this.groups.splice(groupIndex + 1, 0, newChildItem);
  }

  getGridIndex(groupId: string) {
    return this.groups.map(function (e) {
      return e.id;
    }).indexOf(groupId);
  }

  addItem(groupId: string) {
    const groupIndex = this.getGridIndex(groupId); //TODO: this does the search twice
    console.assert(this.groups[groupIndex].childId === undefined);//should only be able to add to a group without a childId
    if (this.groups[groupIndex].level % 4 !== 0) {
      this.splitHorizontalAndAdd(groupId, undefined);
    } else {
      this.splitVerticalAndAdd(groupId, undefined);
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
