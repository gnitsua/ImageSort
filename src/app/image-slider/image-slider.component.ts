import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../services/images.service';
import {Image} from '../models/Image';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ImageItem} from '../models/image-item';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  providers: [ImagesService]
})
export class ImageSliderComponent implements OnInit {

  images: Image[];

  constructor(private imageService: ImagesService) {
  }

  ngOnInit() {
    this.getImages();
  }

  getImages(): void {
    // TODO: this root folder is hard coded
    this.imageService.observableImages
      .subscribe(images => this.images = images);
    this.imageService.getImages('1mN3v6Fj497E3ghOueZF26msuxFdGN5Ur');
  }

  drop(event: CdkDragDrop<Image[]>) {
    console.log(event);
    if (event.previousContainer !== event.container) {
      // console.log(event.previousContainer.data)
      this.transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    } else {
      // this.array_move(this.images, event.previousIndex, event.currentIndex);
    }
  }

  transferArrayItem(srcContainer: Array<Image>, dstContainer: Array<Image>, srcIndex: number, dstIndex: number) {
    const item = srcContainer.splice(srcIndex, 1)[0];
    dstContainer.splice(dstIndex, 0, item);
  }

  // array_move(arr, old_index, new_index) {
  //   if (new_index >= arr.length) {
  //     var k = new_index - arr.length + 1;
  //     while (k--) {
  //       arr.push(undefined);
  //     }
  //   }
  //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  //   return arr; // for testing
  // };


}
