import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageItem} from '../models/image-item';
import {GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';
import {HSLColor} from '../models/HSLColor';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupModalComponent} from '../group-modal/group-modal.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, GridsterItem {


  constructor(private modalService: NgbModal) {


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
  closeResult: string;
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

  wasPressed($event, group){
    console.log($event)
    console.log(group)
    const modalRef = this.modalService.open(GroupModalComponent,{windowClass:'group-modal'});
    modalRef.componentInstance.group = group;
    // modalRef.componentInstance.name = 'World';
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
