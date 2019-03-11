import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Image} from '../models/Image';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})
export class ImagesService {
  private goatsUrl = 'api/goats';

  constructor(private http: HttpClient) {
  }

  /** GET images from the server */
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.goatsUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
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
