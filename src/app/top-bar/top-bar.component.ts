import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Output() addGroup = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  add() {
    this.addGroup.emit();
  }

}
