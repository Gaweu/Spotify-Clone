import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Authentication.service';
import { PageHeaders } from 'src/app/constants/PageHeaders';
import { PlayerService } from 'src/app/services/Player.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.scss']
})
export class GeneralLayoutComponent implements OnInit {

  constructor(private router: Router, public auth: AuthenticationService, private cdr: ChangeDetectorRef, private player: PlayerService, private fb:FormBuilder) { }

  pageHeaders = new PageHeaders();
  public href: string = "";
  pageHeader: string|undefined = "";
  searchField = new FormControl('');

  ngOnInit() {
  }



  ngAfterViewChecked(): void {
    this.auth.isLoggedIn();
    this.getHeaderName();
    this.cdr.detectChanges();
  }

  getHeaderName(): void {
    this.href = window.location.pathname;
    let header = this.pageHeaders.PageHeaders.find(e => e.path === this.href)
    if(header !== null)
    {
      this.pageHeader = header?.headerName;
    }
  }

  togglePlay() {
    this.player.togglePlay();
  }

  logout() {
    this.auth.logout();
    this.player.disconnect();
  }

  
}
