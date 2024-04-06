import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private dataSubject: ReplaySubject<number> = new ReplaySubject<number>();

  constructor() { }

  setData(data: number) {
    this.dataSubject.next(data);
  }

  getData(): Observable<number> {
    return this.dataSubject.asObservable();
  }


}
