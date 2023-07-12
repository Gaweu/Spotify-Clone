import { Injectable } from '@angular/core';
import { AuthenticationService } from './Authentication.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

constructor(private auth: AuthenticationService, private http: HttpClient) { }

url = "https://api.spotify.com/v1/me/player/play";

playTrack(token: string, context: string): Observable<any> {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  })

  const body = {
    context_uri: context
  };
  return this.http.put(this.url, body, { headers });
}
}
