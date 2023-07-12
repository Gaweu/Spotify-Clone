import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { GeneralLayoutComponent } from './components/general-layout/general-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { AlbumsListComponent } from './components/albums/albums-list/albums-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneralLayoutComponent,
    MainPanelComponent,
    AlbumsListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
