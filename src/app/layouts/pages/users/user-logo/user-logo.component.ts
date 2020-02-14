import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';
import { CrudService } from 'src/app/shared/service/crud.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Global } from 'src/app/global';
import { TokenStorage } from '../../../../auth/token.storage';

@Component({
  selector: 'app-user-logo',
  templateUrl: './user-logo.component.html',
  styleUrls: ['./user-logo.component.scss'],
})

export class UserLogoComponent implements OnInit {

  cropperRes: string;
  showCropper: boolean;
  companyId = localStorage.getItem('IMAGE_ID');
  userID = JSON.parse(this.token.getUser()).id;
  cropperConfig: object = {
    // minCropBoxHeight: 100,
    // minCropBoxWidth: 100,
     cropBoxResizable: true,
    // aspectRatio: 9 / 9,
     autoCropArea: 0,
     movable: true,
     scalable: true,
     zoomable: true,
     viewMode: 2,
     checkCrossOrigin: true,
   };
  imageUrl: any;
  imageLink = this.global.baseUrl  + '/api/user/logo/' + this.userID;
  @ViewChild('angularCropper', { static: false })
  public angularCropper: CropperComponent;

  constructor(private service: CrudService, private token: TokenStorage,
     private notification: NzNotificationService, public global: Global) {}

  ngOnInit() {
    this.refreshCrop(this.imageLink);
  }

  onFileSelected(event) {
    const that = this;
    if (event.target.files && event.target.files[0]) {
      let fileName: File = event.target.files[0].name;
      console.log(fileName);
      const reader = new FileReader();
      that.showCropper = false;
      reader.onload = (eventCurr: ProgressEvent) => {
        that.imageUrl = (eventCurr.target as FileReader).result;
        setTimeout(function() {
          that.refreshCrop(that.imageUrl);
        }, 2000);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  refreshCrop(img) {
    this.imageUrl = img;
    this.showCropper = true;
  }

  cropendImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  readyImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  rotate(turn) {
    turn = turn === 'left' ? -45 : 45;
    this.angularCropper.cropper.rotate(turn);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  destroy() {
    this.angularCropper.cropper.destroy();
  }

  zoomManual() {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  zoom(status) {
    status = status === 'positive' ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(status);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  move(offsetX, offsetY) {
    this.angularCropper.cropper.move(offsetX, offsetY);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  scale(offset) {
    if (offset === 'x') {
      this.angularCropper.cropper.scaleX(-1);
    } else {
      this.angularCropper.cropper.scaleY(-1);
    }
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  clear() {
    this.angularCropper.cropper.clear();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  disable() {
    this.angularCropper.cropper.disable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  enable() {
    this.angularCropper.cropper.enable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  reset() {
    this.angularCropper.cropper.reset();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }
  save() {

    this.angularCropper.cropper.getCroppedCanvas().toBlob(blob => {
       this.saveImage(blob);
    });
  }
  saveImage(blob: Blob) {
    // const id = localStorage.getItem('IMAGE_ID');
    // console.log(id);
    // console.log(blob.type);
    this.service.saveImage(blob, '/user/image', this.userID).subscribe(
      result => {
        console.log(result);
        this.notification.info(
          'Notification',
           result.message,
        );
      },
      error => {
        this.notification.error(
          'Error Encountered',
           error.message,
        );
      }
    );
  }
}
