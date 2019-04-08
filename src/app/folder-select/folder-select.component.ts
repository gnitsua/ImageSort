import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-folder-select',
  templateUrl: './folder-select.component.html',
  styleUrls: ['./folder-select.component.css']
})
export class FolderSelectComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {

  }

  signin(){
    this.userService.signIn();
  }

}
