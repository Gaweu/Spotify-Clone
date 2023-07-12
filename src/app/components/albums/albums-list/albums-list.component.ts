import { Component, Input, OnInit } from '@angular/core';
import { IAlbum } from 'src/app/interfaces/IAlbum';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  constructor() { }

  @Input() albums: IAlbum[] = [];

  ngOnInit() {
    console.log(this.albums);
  }

}
