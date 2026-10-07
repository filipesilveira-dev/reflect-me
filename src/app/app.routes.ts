import { Routes } from '@angular/router';
import { Login } from './login/login';
// import { Welcome } from './welcome/welcome';
import { ProfessionalPage } from './professional/professional';
import { UserPage } from './user/user';

export const routes: Routes = [
  // Redireciona a rota vazia para a tela de login. O 'full' diz para o Angular considerar a rota vazia como correspondência apenas quando a URL inteira estiver vazia. 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  // O ':id' indica que é um valor que pode variar. Cada usuário (profissional ou usuário) tem o próprio 'id'. Torna as rotas dinâmicas
  { path: 'professional/:professionalId', component: ProfessionalPage },
  { path: 'user/:id', component: UserPage },
];
