import {Injectable} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static SESSION_STORAGE_KEY: string = 'AIzaSyBuz9jQGu1PVU4t3B-Nt9mlY3grtwOsqQQ';
  // @ts-ignore
  private user: GoogleUser;

  constructor(private googleAuth: GoogleAuthService) {
  }

  public getToken(): string {
    let token: string = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res));
      });
  }

  // @ts-ignore
  private signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    sessionStorage.setItem(
      UserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }
}
