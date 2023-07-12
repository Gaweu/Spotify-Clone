import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
