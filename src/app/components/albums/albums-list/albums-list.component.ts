import { Component, Input, OnInit } from '@angular/core';
import { IAlbum } from 'src/app/interfaces/IAlbum';
import { AuthenticationService } from 'src/app/services/Authentication.service';
import { PlayerService } from 'src/app/services/Player.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  constructor(private auth: AuthenticationService, private player: PlayerService) { }

  @Input() albums: IAlbum[] = [];
  token: string = '';

  ngOnInit() {
    console.log(this.albums);
    this.token = this.auth.getAccessToken();
  }

  playMusic(album: IAlbum) {
    console.log(album);
    this.player.playTrack(this.token, album.context).subscribe();
  }

}
