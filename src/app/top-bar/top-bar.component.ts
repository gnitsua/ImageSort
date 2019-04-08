import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FolderSelectComponent} from '../folder-select/folder-select.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() addGroup = new EventEmitter<string>();

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  add() {
    this.addGroup.emit();
  }

  openSettings() {
    const modalRef = this.modalService.open(FolderSelectComponent);
    modalRef.componentInstance.name = 'World';
  }

}
