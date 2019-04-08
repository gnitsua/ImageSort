import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../models/Image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() image: Image;
  @Input() square: boolean;
  @Input() draggable: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
