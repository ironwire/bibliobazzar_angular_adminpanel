import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imageslider',
  templateUrl: './imageslider.component.html',
  styleUrl: './imageslider.component.css',
})
export class ImagesliderComponent {
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
    if (this.autoPlay) {
      setInterval(() => {
        this.next();
      }, this.autoPlaySpeed);
    }
  }
}
