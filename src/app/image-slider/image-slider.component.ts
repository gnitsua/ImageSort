import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';
import {Hero} from '../models/hero';
import {Image} from '../models/Image';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  images: Image[];
  constructor(private imageService: ImagesService) { }

  ngOnInit() {
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => this.images = images);
  }

}
