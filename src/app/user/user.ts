import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Arquivo importado para buscar o usuário pelo 'id' passado nos parâmetros da URL
import { users } from '../data/users';
// Interface que discrimina os dados esperados de um usuário
import { User } from '../models/user';


@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserPage {
  // Propriedade de 'UserPage' que pode conter um usuário ou 'undefined', caso não seja achado o usuário na lista
  user: User | undefined;

  // Possibilita  identificar parâmetros da rota (semelhante ao que é feito em React com useParams(). Isso permitirá, com base no id passado na rota, identificar qual usuário está acessando a aplicação)
  constructor(private route: ActivatedRoute) {
    const userId = this.route.snapshot.paramMap.get('id');
    // o 'this' permite que 'user' seja utilizado fora do constructor
    this.user = users.filter((user)=>user.role !== "professional").find((user)=>user.id === userId);
  }
}
