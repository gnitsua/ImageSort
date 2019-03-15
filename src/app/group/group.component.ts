import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageItem} from '../models/image-item';
import {GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';
import {HSLColor} from '../models/HSLColor';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, GridsterItem {


  constructor() {


  }

  @Input() name: string;
  @Input() id: string;
  @Input() color: HSLColor;
  @Input() images: ImageItem[];
  @Input() hasChildren: boolean;
  @Input() x: number;
  @Input() y: number;
  @Input() cols: number;
  @Input() rows: number;
  @Input() level: number;
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
  @Output() deleteGroupItem = new EventEmitter<string>();
  @Output() addGroupItem = new EventEmitter<string>();



  ngOnInit() {
    this.compactEnabled = true;
    this.dragEnabled = false;
    // initCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    this.maxItemArea = 100;
    this.maxItemCols = 10;
    this.maxItemRows = 10;
    this.minItemArea = 10;
    this.minItemCols = 10;
    this.minItemRows = 10;
    this.resizeEnabled = true;
    // this.resizable.handles = {
    //   s: false,
    //   e: false,
    //   n: false,
    //   w: false,
    //   se: false,
    //   ne: false,
    //   sw: false,
    //   nw: false
    // }
  }

  delete(groupId: string) {
    if (this.hasChildren === false) {//we are only allow to delete groups without children
      this.deleteGroupItem.emit(groupId);
    }
  }

  add(groupId: string) {
    if (this.hasChildren === false && this.level < 5) {//we are only allow to delete groups without children
      this.addGroupItem.emit(groupId);
    }
  }

  getGroupClass(level: number) {
    if (level > 5) {
      return 'd-flex x-small-group-name';
    } else if (level > 2) {
      return 'd-flex small-group-name';
    } else {
      return 'd-flex group-name';
    }
  }


}
