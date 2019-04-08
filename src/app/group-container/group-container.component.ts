import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../services/images.service';
import {GridsterConfig} from 'angular-gridster2';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Group} from '../models/group';
import {HSLColor} from '../models/HSLColor';
import {GroupItem} from '../models/group-item';
import * as uuid from 'node_modules/uuid';
import {Image} from '../models/Image';
import {FileInfo} from '../models/fileInfo';

@Component({
  selector: 'app-group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.css'],
  providers: [ImagesService]
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
  groups: Array<GroupItem> = [];

  rows = 8;
  cols = 4;


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
      compactType: 'none',
      displayGrid: 'none',
    };

    this.imageService.getFolders('1mN3v6Fj497E3ghOueZF26msuxFdGN5Ur').then((folders) => {
      folders.forEach((folder) => this.addGroup(new GroupItem(
        folder.Name,
        folder.Id,
        this.hslColors.pop(),//automatically color the groups in order
        [],
        undefined,
        0,
        0,
        0,
        2,
        this.cols
      )));

    });
  }


  createEmptyChild(color: HSLColor, level: number, x: number, y: number) {
    return new GroupItem(`Group`, uuid.v4(), color, [], undefined, level, x, y, GroupContainerComponent.getItemRows(level), GroupContainerComponent.getItemCols(level));
  }

  addEmptyGroup() {
    if (this.hslColors.length > 0) {
      this.addGroup(this.createEmptyChild(this.hslColors.pop(), 0, 0, 0));//also remove color so it can't be used again
    } else { //TODO: is this the right place for this?
      alert('Already at max number of groups');
    }
  }


  addGroup(group: GroupItem) {
    this.groups.push(group);
  }


  splitVerticalAndAdd(groupId: string, newChild: Group) {
    const groupIndex = this.getGridIndex(groupId);
    const group = this.groups[groupIndex];

    let newChildItem;
    if (newChild !== undefined) {
      newChildItem = new GroupItem(newChild.name, newChild.id, HSLColor.getLightened(group.color), [], undefined, group.level + 2, group.x + GroupContainerComponent.getItemCols(group.level + 2), group.y, GroupContainerComponent.getItemRows(group.level + 2), GroupContainerComponent.getItemRows(group.level + 2));
    } else {
      newChildItem = this.createEmptyChild(HSLColor.getLightened(group.color), group.level + 2, group.x + GroupContainerComponent.getItemCols(group.level + 1), group.y);
    }
    console.log(newChildItem);
    this.groups.splice(groupIndex + 1, 0, newChildItem);
    this.groups[groupIndex].level = group.level + 1;
    this.groups[groupIndex].cols = GroupContainerComponent.getItemCols(group.level);
    this.groups[groupIndex].childId = newChildItem.id;

    this.changedOptions();

  }


  splitHorizontalAndAdd(groupId: string, newChild: Group) {
    const groupIndex = this.getGridIndex(groupId);
    const group = this.groups[groupIndex];
    let newChildItem;
    if (newChild !== undefined) {
      newChildItem = new GroupItem(newChild.name, newChild.id, HSLColor.getLightened(group.color), [], undefined, group.level + 2, group.x , group.y + GroupContainerComponent.getItemRows(group.level + 2), GroupContainerComponent.getItemRows(group.level + 2), GroupContainerComponent.getItemCols(group.level + 2));
    } else {
      newChildItem = this.createEmptyChild(HSLColor.getLightened(group.color), group.level + 2, group.x, group.y + GroupContainerComponent.getItemRows(group.level + 1));
    }
    console.log(newChildItem);
    this.groups.splice(groupIndex + 1, 0, newChildItem);
    this.groups[groupIndex].level = group.level + 1;
    this.groups[groupIndex].rows = GroupContainerComponent.getItemRows(group.level);// mutate the original object
    this.groups[groupIndex].childId = newChildItem.id;

    this.changedOptions();

  }


  addItem(groupAndChild: { group: string, childFolder: FileInfo }) {
    const groupIndex = this.getGridIndex(groupAndChild.group); //TODO: this does the search twice
    console.assert(this.groups[groupIndex].childId === undefined);//should only be able to add to a group without a childId
    if (this.groups[groupIndex].level % 4 !== 0) {
      this.splitHorizontalAndAdd(groupAndChild.group, new Group(groupAndChild.childFolder.Name, groupAndChild.childFolder.Id, undefined, [], undefined)); //TODO: we don't actually know enough to make a group, this should be some other data structure
    } else {
      this.splitVerticalAndAdd(groupAndChild.group, new Group(groupAndChild.childFolder.Name, groupAndChild.childFolder.Id, undefined, [], undefined));
    }
  }

  unSplitVerticalAndRemove(groupId: string) {
    const groupIndex = this.getGridIndex(groupId);
    const group = this.groups[groupIndex];
    this.groups.splice(groupIndex, 1);
    if (groupIndex > 0 && this.groups[groupIndex - 1].level < group.level) {//if this group has a parentIds we need to update it
      this.groups[groupIndex - 1].level = this.groups[groupIndex - 1].level - 1;
      this.groups[groupIndex - 1].childId = undefined;
      this.groups[groupIndex - 1].cols = GroupContainerComponent.getItemCols(this.groups[groupIndex - 1].level);
    } else {//otherwise we are removing an entire group
      console.assert(group.level === 0);
      this.hslColors.push(group.color);//add the color back to the mix
      for (let i = groupIndex; i < this.groups.length; i++) {
        this.groups[i].y -= 2;
      }
    }

    this.changedOptions();
  }


  unSplitHorizontalAndRemove(groupId: string) {
    const groupIndex = this.getGridIndex(groupId);
    const group = this.groups[groupIndex];
    this.groups.splice(groupIndex, 1);
    if (groupIndex > 0 && this.groups[groupIndex - 1].level < group.level) {//if this group has a parentIds we need to update it
      this.groups[groupIndex - 1].level = this.groups[groupIndex - 1].level - 1;
      this.groups[groupIndex - 1].childId = undefined;
      this.groups[groupIndex - 1].rows = GroupContainerComponent.getItemRows(this.groups[groupIndex - 1].level);
    } else {//otherwise we are removing an entire group
      console.assert(group.level === 0);
      this.hslColors.push(group.color);//add the color back to the mix
      for (let i = groupIndex; i < this.groups.length; i++) {
        this.groups[i].y -= 2;
      }
    }
    this.changedOptions();

  }

  removeItem(groupId: string) {
    const groupIndex = this.getGridIndex(groupId); //TODO: this does the search twice
    console.assert(this.groups[groupIndex].childId === undefined);//should only be able to add to a group without a childId
    if (this.groups[groupIndex].level % 4 === 0) {
      this.unSplitHorizontalAndRemove(groupId);
    } else {
      this.unSplitVerticalAndRemove(groupId);
    }
  }

  getGridIndex(groupId: string) {
    return this.groups.map(function (e) {
      return e.id;
    }).indexOf(groupId);
  }


  getImages(): void {
    // this.imageService.getImages()
    // .subscribe(images => this.images = images.map(image => new ImageItem(image)));
  }

  drop(event: CdkDragDrop<Image[]>) {
    // if (event.previousContainer !== event.container) {
    //   // console.log(event.previousContainer.data)
    //   this.transferArrayItem(event.previousContainer.data, event.container.data,
    //     event.previousIndex, event.currentIndex);
    // } else {
    //   this.array_move(this.images, event.previousIndex, event.currentIndex);
    // }
  }

  transferArrayItem(srcContainer: Array<Image>, dstContainer: Array<Image>, srcIndex: number, dstIndex: number) {
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

  // private groupsToGroupItemList(group: Group): void {
  //   console.log(group.name);
  //   if (group === undefined) {
  //     return;
  //   } else {
  //     this.addGroup(new GroupItem(
  //       group.name,
  //       group.id,
  //       this.hslColors.pop(),//automatically color the groups in order
  //       group.images,
  //       undefined,
  //       0,
  //       0,
  //       0,
  //       2,
  //       this.cols
  //     ))
  //     if(group.childId != )
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

}
