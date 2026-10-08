import { Component } from '@angular/core';
import { Professional, User } from '../models/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { users } from '../data/users';
import { Reflection } from '../models/reflection';
import { ReflectionService } from '../services/reflection.service';

@Component({
  selector: 'app-professional',
  imports: [RouterLink],
  templateUrl: './professional.html',
  styleUrl: './professional.css',
})
export class ProfessionalPage {
  professional: Professional | undefined;
  reflections: Reflection[] = [];
  users: User[] = [];
  totalReflections = 0;
  pendingReflections = 0;
  answeredReflections = 0;

  // Possibilita  identificar parâmetros da rota (semelhante ao que é feito em React com useParams(). Isso permitirá, com base no id passado na rota, identificar qual usuário está acessando a aplicação)
  constructor(
    private route: ActivatedRoute,
    private reflectionService: ReflectionService,
  ) {
    // Busca na URL quem é o profissional que está acessando
    const professionalId = this.route.snapshot.paramMap.get('professionalId');

    // o 'this' permite que 'user' seja utilizado fora do constructor
    this.professional = users
      .filter((user) => user.role !== 'user')
      .find((user) => user.id === professionalId);

    // busca apenas os usuários do profissional filtrado acima. Dessa maneira, garantimos que cada profissional só terá acesso aos seus cliente
    if (this.professional) {
      this.users = users.filter(
        (user): user is User =>
          user.role === 'user' && user.professionalId === this.professional?.id,
      );
    }

    // Filtra apenas as reflexões criadas e atreladas aos cleinte do profissional filtrados acima
    if (this.professional) {
      this.reflections = this.reflectionService
        .getReflections()
        .filter(
          (reflection) =>
            reflection.professionalId === this.professional?.id &&
            this.users.some((user) => user.id === reflection.userId),
        );
    }

    // Retorna a quantidade de elemento no array Reflections[]
    this.totalReflections = this.reflections.length;
    // Retorna as reflexões pendentes com base em um array criado tendo por base um filtro por reflexões sem resposta
    this.pendingReflections = this.reflections.filter(
      (reflection) => reflection.response === '',
    ).length;
    // Retorna as reflexões respondidas de maneira semelhante ao que foi feito acima com as pendentes
    this.answeredReflections = this.reflections.filter(
      (reflection) => reflection.response !== '',
    ).length;
  }
}
