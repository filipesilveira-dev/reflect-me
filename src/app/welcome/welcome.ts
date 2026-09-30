import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  // Permite o uso de "title" ao invés de escrever o nome sempre que for utilizar
  title = signal('Reflect Me');

  // Método criado para demonstrar reatividade com event binding
  changeTitle() {
    this.title.set('Vamos refletir juntos.');
  }
}
