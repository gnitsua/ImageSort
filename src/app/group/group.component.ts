import {Component, Input, OnInit} from '@angular/core';
import {ImageItem} from '../models/image-item';
import {GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, GridsterItem {
  @Input() name: string;
  @Input() color: number[]; //TODO: make class
  @Input() images: ImageItem[];
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



  constructor() {


  }

  ngOnInit() {
    this.compactEnabled = false;
    this.dragEnabled = false;
    // initCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    this.maxItemArea = 100;
    this.maxItemCols = 10;
    this.maxItemRows = 10;
    this.minItemArea = 10;
    this.minItemCols = 10;
    this.minItemRows = 10;
    this.resizeEnabled = false;
  }


}
