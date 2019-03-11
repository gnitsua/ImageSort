import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-sort',
  templateUrl: './image-sort.component.html',
  styleUrls: ['./image-sort.component.css']
})
export class ImageSortComponent implements OnInit {

  groups:string[];
  colors:string[];

  constructor() { }

  ngOnInit() {
    this.groups = ["Goats","Sheep"]
    this.colors = ["#A1BF36","#482667","#F28627","#039FE3","FF4C96"]
  }

}
