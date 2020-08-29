import { Injectable, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(public spinner: NgxSpinnerService) { }

  public show() {
    const element = document.querySelectorAll('.sidebar-menu')[0];
    element.classList.remove('ng-sidebar');
    this.spinner.show();
    setTimeout(() => this.overlay(), 0.000000001);
  }

  public hide() {
    this.spinner.hide();
  }

  private overlay() {
    const element = document.querySelectorAll('.overlay')[0];
    element.setAttribute('style', (element.getAttribute('style') + 'z-index: 99999999999999 !important;'));
    const menu = document.querySelectorAll('.sidebar-menu')[0];
    menu.classList.add('ng-sidebar');
  }

}
