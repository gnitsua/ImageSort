import { Component, OnInit } from '@angular/core';
import {HSLColor} from '../models/HSLColor';
import {Group} from '../models/group';

@Component({
  selector: 'app-image-sort',
  templateUrl: './image-sort.component.html',
  styleUrls: ['./image-sort.component.css']
})
export class ImageSortComponent implements OnInit {

  group:Group;
  colors:string[];

  constructor() { }

  ngOnInit() {
    this.group = {
      name:'root',
      id:'0',
      level:0,
      color: undefined,
      images: [],
      children:[
      {
        name: 'Regular Goats', id: '1', level:1, color:undefined, images: [], children:
          [{
            name: 'Big Goats', id: '2', level:2, color: undefined, images: [], children:
              [{
                name: 'Scary Goats',
                id: '3',
                level:3,
                color:undefined,
                images: [],
                children:
                  [{
                    name: 'Scary and Hairy Goats',
                    id: '4',
                    level:4,
                    color: undefined,
                    images: [],
                    children: []
                  }],
              }]
          }]
      },
      {
        name: 'Sheep',
        id: '5',
        level:1,
        color: undefined,
        images: [],
        children: [{
          name: 'Big Sheep', id: '6', level:2,color: undefined, images: [], children: []
        }]
      }]};
    this.colors = ["#A1BF36","#482667","#F28627","#039FE3","FF4C96"]
  }

}
