import { Component, signal } from '@angular/core';
// Arquivo com as variáveis
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Funciona com o useState em React. Aqui recebe o que for inserido pelo usuário
  username = signal('');
  // Dá acesso ao objeto responsável pela navegação
  constructor(private router: Router) {}

  onSubmit(event: Event) {
    // Evita o recarregamento da página ao submeter formulário
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const usernameInput = form.elements.namedItem('username');
    const passwordInput = form.elements.namedItem('password');

    const username = (usernameInput as HTMLInputElement).value;
    const password = (passwordInput as HTMLInputElement).value;

    if (username === environment.professionalUsername && password === environment.password) {
      // Indica o componente a ser renderizado se a condição for satisfeita 
      this.router.navigate(['/professional']);
    } else if (username === environment.userUsername && password === environment.password) {
      this.router.navigate(['/user']);
    } else {
      console.log('Usuário ou senha inválidos');
      // Método que limpa os campos de input
      form.reset();
    }
  }
}
