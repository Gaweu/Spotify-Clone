import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

constructor(private router: Router, private http: HttpClient) { }

CLIENT_ID = "4f67542c99344940ac68332ef6b692f6";
REDIRECT_URI = "http://localhost:4200";
AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
RESPONSE_TYPE = "token";
SCOPES = 'streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read user-library-read';
authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
accessToken = "";
url = "https://api.spotify.com/v1/me/albums";


login(): void {
  location.href=`${this.AUTH_ENDPOINT}?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=${this.RESPONSE_TYPE}&scope=${this.SCOPES}`;
}

logout(): void {
  this.authenticated$.next(false);
  window.localStorage.removeItem('token');
  this.router.navigate(['/login'])
}

isLoggedIn(): void {
  if(window.localStorage.getItem('token') !== null) {
    this.authenticated$.next(true);
  }
  else {
    console.log("No token");
  }
}

getAccessToken(): string {
  if(window.location.hash) {
    let hash = window.location.hash.substring(1);
    let index = hash.indexOf("&");
    let stringToReplace = "access_token=";
    if(index >= 0)
      this.accessToken = hash.substring(0, index).replace(stringToReplace, "");
      window.location.hash = "";
      window.localStorage.setItem("token", this.accessToken);
      return  this.accessToken;
  }
  else if(window.localStorage.getItem('token') !== null)
  {
    return this.accessToken = window.localStorage.getItem('token')!; 
  }
  return '';
}

getPlaylist(token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  })
  return this.http.get(this.url, { headers });
}

}
