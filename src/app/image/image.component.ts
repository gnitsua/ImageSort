import {Component, Input, OnInit} from '@angular/core';
import {ImageItem} from '../models/image-item';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() image: ImageItem;

  constructor() {
  }

  ngOnInit() {
  }

  onPress(event:ImageItem){
    event.dragEnabled = true
  }

  onRelease(event:ImageItem){
    event.dragEnabled = false
  }

}
