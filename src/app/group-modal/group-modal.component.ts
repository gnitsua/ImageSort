import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Group} from '../models/group';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css'],
})
export class GroupModalComponent implements OnInit {

  @Input() group: Group;

  // constructor(public activeModal: NgbActiveModal, private imageService: ImagesService) {
  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  deleteItem(index:number){
    // this.imageService.addImage(this.group.images[index]);//be sure to put it back before we delete
    this.group.images.splice(index,1)
  }

}
