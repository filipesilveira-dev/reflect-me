import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Welcome } from './welcome/welcome';
import { Professional } from './professional/professional';
import { User } from './user/user';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'login', component: Login },
  { path: 'professional', component: Professional },
  { path: 'user', component: User },
];
