import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SingComponent} from "./sing/sing.component";
import {MainhomeComponent} from "./mainhome/mainhome.component";

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'sing',
    component: SingComponent
  },
  {
    path:'',
    component: MainhomeComponent
  }
];
