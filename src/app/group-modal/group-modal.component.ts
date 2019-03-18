import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Group} from '../models/group';
import {ImagesService} from '../services/images.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css']
})
export class GroupModalComponent implements OnInit {

  @Input() group: Group;

  constructor(public activeModal: NgbActiveModal, private imageService: ImagesService) {
  }

  ngOnInit() {
  }

  deleteItem(index:number){
    this.imageService.addImage(this.group.images[index].image);//be sure to put it back before we delete
    this.group.images.splice(index,1)
  }

}
