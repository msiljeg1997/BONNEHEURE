import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UiComponent } from './ui.component';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public previewImage: boolean = false;
  public imagePath: string = "";

  public requestCount: number = 0;

  // We are setting this in the uicomponent as uiService.uiComponent = this; ergo !
  public uiComponent!: UiComponent;

  constructor(
    private messageService: MessageService,
  ) {
  }

  countRequestUp() {
    this.requestCount++;
  }

  countRequestDown() {
    this.requestCount--;
  }

  public showSuccess(msg: string): void {
    this.messageService.add({ severity: 'success', summary: '', detail: msg });
  }

  public showInfo(msg: string): void {
    this.messageService.add({ severity: 'info', summary: '', detail: msg });
  }

  public showWarn(msg: string): void {
    this.messageService.add({ severity: 'warn', summary: '', detail: msg });
  }

  public showError(msg: string): void {
    this.messageService.add({ severity: 'error', summary: '', detail: msg });
  }

  public confirmDialog(header: string, message: string, accept: () => void): void {
    this.uiComponent.confirmationService.confirm({
      header: header,
      message: message,
      accept: () => {
        accept();
      }
    });
  }

  public togglePreviewImage($path: string = ""): void {
    this.previewImage = !this.previewImage;
    this.imagePath = $path;
  }
}
