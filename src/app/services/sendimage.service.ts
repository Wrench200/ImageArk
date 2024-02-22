import { Observable, Subject } from 'rxjs';
import { Image } from './../interfaces/image-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendimageService {
  public imageid$ = new Subject<number>()
  private error$ = new Subject<string>();
  public id!: string | null;
  constructor(private http: HttpClient) {
    
  }
  setError(err: string) {
    this.error$.next(err);
  }
  getError(): Observable<string> {
    return this.error$.asObservable();
  }
  sendImageInfo(term: number) {
  
    this.imageid$.next(term);
  }

  getImageinfo(): Observable<number> {
    return this.imageid$.asObservable();
  }
  getimage(id: string | null): Observable<any> {
    this.id = id
   
    
    const key = '29488159-1880c8e57abac8402e021f526';
    const url = 'https://pixabay.com/api/?key=' + key + '&id=' + id;
    console.log(url);
    return this.http.get(url);
    
  };
}
