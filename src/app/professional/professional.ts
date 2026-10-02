import { Component } from '@angular/core';
import { Professional } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { users } from '../data/users';

@Component({
  selector: 'app-professional',
  imports: [],
  templateUrl: './professional.html',
  styleUrl: './professional.css',
})
export class ProfessionalPage {// Propriedade de 'UserPage' que pode conter um usuário ou 'undefined', caso não seja achado o usuário na lista
  user: Professional | undefined;

  // Possibilita  identificar parâmetros da rota (semelhante ao que é feito em React com useParams(). Isso permitirá, com base no id passado na rota, identificar qual usuário está acessando a aplicação)
  constructor(private route: ActivatedRoute) {
    const userId = this.route.snapshot.paramMap.get('id');
    // o 'this' permite que 'user' seja utilizado fora do constructor
    this.user = users.filter((user)=>user.role !== "user").find((user)=>user.id === userId);
  }}
