import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { AuthenticationService } from 'src/app/services/Authentication.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) { }

  accessToken: string = '';
  info: any;
  albums: IAlbum[] = [];

  ngOnInit() {
    this.accessToken = this.auth.getAccessToken();
    this.auth.getPlaylist(this.accessToken).subscribe((data => {
      data.items.forEach((element: any) => {
          let artists: string[] = [];
          let tracks: string[] = [];
          element.album.artists.forEach((artist: any) => {
            artists.push(artist.name);
          })
          element.album.tracks.items.forEach((track: any) => {
            tracks.push(track.uri);
          })
          this.albums.push({
            albumName: element.album.name,
            image: element.album.images[0].url,
            artists: artists,
            context: element.album.uri,
            tracks: tracks
          });
      });
    }))
  }


}
