import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  private error$ = new Subject<string>();
  public searchTerm$ = new Subject<string>();
  public search!: string;

  constructor(private http: HttpClient) { }

  setError(err: string) {
    this.error$.next(err);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  sendSearchInfo(term: string) {
    this.searchTerm$.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  getImages(term: string, totalPerPage: number, pageNumber: number): Observable<any> {
    this.search = term
    const key = '29488159-1880c8e57abac8402e021f526';
    const url = 'https://pixabay.com/api/?key=' + key + '&q=' + term + '&per_page=' + totalPerPage + '&page=' + pageNumber;
    
    return this.http.get(url);
  }
 
 
}

