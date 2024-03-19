import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css',
})
export class ImageCarouselComponent {
  @Input() slides: any[] = [];
  @Input() animationSpeed = 200;
  @Input() indicatiorsVisible = true;
  @Input() autoPlay = true;
  @Input() autoPlaySpeed = 3000;

  currentSlide = 0;
  hidden = false;
  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    // this.jumpToSlide(currentSlide);
  }

  previous() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;

    // this.jumpToSlide(currentSlide);
  }

  jumpToSlide(index: number) {
    this.hidden = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    }, this.animationSpeed);
  }

  constructor() {
    // console.log(this.slides);
    // if (this.autoPlay) {
    //   setInterval(() => {
    //     this.next();
    //   }, this.autoPlaySpeed);
    // }
  }
}
