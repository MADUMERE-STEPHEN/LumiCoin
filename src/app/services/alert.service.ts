import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new Subject<{ message: string, type: 'error' | 'info' }>();
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string, type: 'error' | 'info' = 'error') {
    this.alertSubject.next({ message, type });
  }
}
