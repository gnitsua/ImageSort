import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageItem} from '../models/image-item';
import {GridsterConfig, GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';
import {HSLColor} from '../models/HSLColor';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupModalComponent} from '../group-modal/group-modal.component';
import {ImagesService} from '../services/images.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, GridsterItem {


  constructor(private modalService: NgbModal, private imageService: ImagesService) {


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
  closeResult: string;
  options: GridsterConfig;
  @Output() deleteGroupItem = new EventEmitter<string>();
  @Output() addGroupItem = new EventEmitter<string>();


  ngOnInit() {
    // this.options = {
    //   margin: 10,
    //   minCols: 2,
    //   maxCols: 4,
    //   minRows: 1,
    //   maxRows: 2,
    //   fixedRowHeight:100,
    //   fixedColWidth:100,
    //   gridType: 'fit',
    //   mobileBreakpoint: 0,
    //   compactType: 'compactLeft&Up',
    //   displayGrid: 'none',
    // };

    this.compactEnabled = true;
    this.dragEnabled = false;
    // initCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
    this.maxItemArea = 100;
    this.maxItemCols = 10;
    this.maxItemRows = 10;
    this.minItemArea = 10;
    this.minItemCols = 10;
    this.minItemRows = 10;
    this.getImages();
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

  getImageCols(level: number) {
    if (level > 4) {
      return 1;
    } else if (level > 0) {
      return 2;
    } else {
      return 4;
    }
  }

  getNumImagesToShow(level: number) {
    if (level > 4) {
      return 1;
    } else if (level > 2) {
      return 2;
    } else if (level > 0) {
      return 4;
    } else {
      return 8;
    }
  }

  wasPressed($event, group) {
    const modalRef = this.modalService.open(GroupModalComponent, {windowClass: 'group-modal'});
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
      return `with: ${reason}`;
    }
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => this.images = images.map(image => new ImageItem(image)));
  }


  drop(event: CdkDragDrop<ImageItem[]>) {
    console.log(event)
    if (event.previousContainer !== event.container) {
      console.log(event.previousContainer.data)
      this.transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    } else {
      this.array_move(this.images, event.previousIndex, event.currentIndex);
    }
  }

  transferArrayItem(srcContainer: Array<ImageItem>, dstContainer: Array<ImageItem>, srcIndex: number, dstIndex: number) {
    const item = srcContainer.splice(srcIndex, 1)[0];
    // dstContainer.splice(dstIndex, 0, item);
    this.images.unshift(item);//the dst container is not real
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
