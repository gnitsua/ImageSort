import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Image} from '../models/Image';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})
export class ImagesService {
  private goatsUrl = 'api/goats';
  images: Image[] = [];
  observableImages: BehaviorSubject<Image[]>;

  constructor(private http: HttpClient) {
    this.observableImages = new BehaviorSubject<Image[]>(this.images);
    this.init()

  }

  init(): void {
    /** GET images from the server */
    this.http.get<Image[]>(this.goatsUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      ).subscribe(res => {this.images = res;this.eventChange()});
  }

  eventChange() {
    this.observableImages.next(this.images);
  }


  getImages(): Image[] {
    return this.images;
  }

  addImage(image: Image) {
    this.images.push(image);
    this.eventChange();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
