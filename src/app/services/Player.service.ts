import { Injectable } from '@angular/core';
import { AuthenticationService } from './Authentication.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var Spotify:any;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

constructor(private auth: AuthenticationService, private http: HttpClient) { }

url = "https://api.spotify.com/v1/me/player/play";
urlDevices = "https://api.spotify.com/v1/me/player/devices";
player: typeof Spotify;
token = this.auth.getAccessToken();
defaultDevice: any;
headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + this.token,
})

connectToPlayer(token: string) {
  (<any>window).onSpotifyWebPlaybackSDKReady = () => {
    this.player = new Spotify.Player({
      name: 'TrackVibe',
      getOAuthToken: (cb:any) => { cb(token); },
      volume: 0.5
});

this.player.connect();
}
}

togglePlay() {
  this.player.togglePlay();
}

playTrack(token: string, context: string): Observable<any> {

  const body = {
    context_uri: context
  };
  let headers = this.headers
  this.getDefaultDevice();
  return this.http.put(this.url + "?device_id=" + `${this.defaultDevice.id}`, body, { headers });
}

getDevices(token: string) {
  let headers = this.headers
  return this.http.get(this.urlDevices, { headers });
}

private getDefaultDevice() {
  this.getDevices(this.token).subscribe((data:any) => {
    this.defaultDevice = data.devices.find((e:any) => e.name === "TrackVibe")
  })
}

disconnect() {
  this.player.disconnect();
}

}
