import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Image} from '../models/Image';
import {UserService} from './user.service';
import {FileInfo, MIME_TYPE_FOLDER} from '../models/fileInfo';
import {Group} from '../models/group';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class ImagesService {
  images: Image[] = [];
  observableImages: BehaviorSubject<Image[]>;

  constructor(private http: HttpClient, userService: UserService, private zone: NgZone) {

    try {
      // console.log(this.getFiles('1mN3v6Fj497E3ghOueZF26msuxFdGN5Ur'))
      gapi.client.load('drive', 'v2');
      // this.getImages('1mN3v6Fj497E3ghOueZF26msuxFdGN5Ur');
    } catch (e) {
      console.log(e);
      // userService.signIn();
      // userService.getToken()
    }


    this.observableImages = new BehaviorSubject<Image[]>(this.images);
    this.init();

  }

  init(): void {
    /** GET images from the server */

    // this.http.get<Image[]>(this.goatsUrl)
    //   .pipe(
    //     tap(_ => console.log('fetched heroes')),
    //     catchError(this.handleError('getHeroes', []))
    //   ).subscribe(res => {
    //   this.images = res;
    //   this.eventChange();
    // });
  }

  eventChange() {
    this.observableImages.next(this.images);
  }


  // getImages(): Image[] {
  //   return this.images;
  // }

  addImage(image: Image) {
    this.images.push(image);
    this.eventChange();
  }

  moveImages(index: number) {
    this.images.splice(index, 1);//for now just delete it
  }

  getImages(folderId: string): Promise<void> {
    return gapi.client.request({
      'path': '/drive/v2/files',
      'method': 'GET',
      'params': {'maxResults': '100', 'q': `'${folderId}' in parents and mimeType contains 'image' and trashed = false`},
    }).then((res) => {
      this.zone.run(() => {
        console.log(res);
        let files: Image[] = [];
        res.result.items.forEach((file) => files.push(ImagesService.googleFileToImage(file)));
        console.log(files)
        this.observableImages.next(files);
      });
    });
  }

  getFolders(folderId: string): Promise<FileInfo[]> {
    return gapi.client.request({
      'path': '/drive/v2/files',
      'method': 'GET',
      'params': {'maxResults': '5', 'q': `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`}
    }).then((res) => {
      let files: FileInfo[] = [];
      res.result.items.forEach((file) => files.push(FileInfo.fromGoogleFile(file)));
      console.log(files);
      return files;
    });
  }

  createFolder(name:string, parentID:string):Promise<FileInfo>{
    const folder = {
      name: name,
      mimeType: MIME_TYPE_FOLDER,
      parents: [parentID]
    };
    return gapi.client.request(
      {
        'path': '/drive/v3/files',
        'method': 'POST',
        'params': folder
      }).then((res)=>{
      console.log(res);
      return FileInfo.fromGoogleFile(res.result)
      })

  }

  static googleFileToImage(item) {
    console.assert(item.hasOwnProperty('mimeType') && item.mimeType.match('image/'), item);
    return new Image(item.id, this.googleParentsToId(item.parents), item.thumbnailLink);
  }

  static googleParentsToId(googleParents): Array<string> {// Strip all of the extra information off of the parents array because we don't need it
    return googleParents.map((googleParent) => googleParent.id);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
