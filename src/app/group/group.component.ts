import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageItem} from '../models/image-item';
import {GridsterConfig, GridsterItem, GridsterItemComponentInterface} from 'angular-gridster2';
import {HSLColor} from '../models/HSLColor';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupModalComponent} from '../group-modal/group-modal.component';
import {ImagesService} from '../services/images.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Group} from '../models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group:Group;
  closeResult:string;

  constructor(private modalService: NgbModal, private imageService: ImagesService) {
  }

  ngOnInit() {
  }

  // delete(groupId: string) {
  //   if (this.hasChildren === false) {//we are only allow to delete groups without children
  //     this.images.map(imageItem => this.imageService.addImage(imageItem.image));// put all the images back into the image service
  //     this.deleteGroupItem.emit(groupId);
  //   }
  // }

  // add(groupId: string) {
  //   if (this.hasChildren === false && this.level < 5) {//we are only allow to delete groups without children
  //     this.addGroupItem.emit(groupId);
  //   }
  // }

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
    return 100
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

  // getImages(): void {
  //   this.imageService.getImages()
  //     .subscribe(images => this.images = images.map(image => new ImageItem(image)));
  // }


  drop(event: CdkDragDrop<ImageItem[]>) {
    if (event.previousContainer !== event.container) {
      this.transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    } else {
      this.array_move(this.group.images, event.previousIndex, event.currentIndex);
    }
  }

  transferArrayItem(srcContainer: Array<ImageItem>, dstContainer: Array<ImageItem>, srcIndex: number, dstIndex: number) {
    this.imageService.moveImages(srcIndex);
    const item = srcContainer.splice(srcIndex, 1)[0];
    // dstContainer.splice(dstIndex, 0, item);
    this.group.images.unshift(item);//the dst container is not real
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
