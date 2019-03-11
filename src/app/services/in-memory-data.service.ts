import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const goats = [
      {id: 1, parent: 'root', url: 'assets/images/goat1.jpeg'},
      {id: 2, parent: 'root', url: 'assets/images/goat2.jpeg'},
      {id: 3, parent: 'root', url: 'assets/images/goat3.jpeg'},
      {id: 4, parent: 'root', url: 'assets/images/goat4.jpeg'},
      {id: 5, parent: 'root', url: 'assets/images/goat5.jpeg'},
      {id: 6, parent: 'root', url: 'assets/images/goat6.jpeg'},
      {id: 7, parent: 'root', url: 'assets/images/goat7.jpeg'},
      {id: 8, parent: 'root', url: 'assets/images/goat8.jpeg'},
      {id: 9, parent: 'root', url: 'assets/images/goat9.jpeg'},
      {id: 10, parent: 'root', url: 'assets/images/sheep1.jpg'},
      {id: 11, parent: 'root', url: 'assets/images/sheep2.jpg'},
      {id: 12, parent: 'root', url: 'assets/images/sheep3.jpg'},
      {id: 13, parent: 'root', url: 'assets/images/sheep4.jpg'},
      {id: 14, parent: 'root', url: 'assets/images/sheep5.jpg'},

    ];
    return {goats};
  }
}
