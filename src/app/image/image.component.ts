import {Component, Input, OnInit} from '@angular/core';
import {ImageItem} from '../models/image-item';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() image: ImageItem;
  @Input() square: boolean;
  @Input() draggable: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
