import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { ImageProcessingServiceService } from '../../services/image-processing-service.service';
import { Slide } from '../../../../common/slide.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';

@Component({
  selector: 'app-show-book-images-dialog',
  templateUrl: './show-book-images-dialog.component.html',
  styleUrl: './show-book-images-dialog.component.css',
})
export class ShowBookImagesDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public slides: any) {}

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages() {
    console.log(this.slides.slides);
  }
}
