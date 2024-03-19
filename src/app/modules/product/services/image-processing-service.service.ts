import { Injectable } from '@angular/core';
import { FileHandle } from '../../../common/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImageProcessingServiceService {
  constructor(private sanitizer: DomSanitizer) {}

  public createBookImages(bookImages: any[]) {
    const imagesToFilehandle: FileHandle[] = [];

    for (let i = 0; i < bookImages.length; i++) {
      const imageFileData = bookImages[i];
      const imageBlob = this.dataURIToBlob(
        imageFileData.picByte,
        imageFileData.type
      );

      const imageFile = new File([imageBlob], imageFileData.name, {
        type: imageFileData.type,
      });

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        ),
      };
      imagesToFilehandle.push(finalFileHandle);
    }

    return imagesToFilehandle;
  }

  public dataURIToBlob(picBytes, imageType) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
