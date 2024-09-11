import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public showSpinner: boolean = false;

  constructor() { }

  toggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }
}
