import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { users } from '../data/users';

@Component({
  selector: 'app-pacient',
  imports: [],
  templateUrl: './pacient.html',
  styleUrl: './pacient.css',
})
export class PacientPage {
  user: User | undefined;

  constructor(private route: ActivatedRoute) {
    // Parâmetros obtidos da URL
    const professionalId = this.route.snapshot.paramMap.get('professionalId');
    const userId = this.route.snapshot.paramMap.get('id');

    //
    this.user = users.find(
      // "(user): user is User": Esta função vai verificar alguma condição e, quando ela retornar true, você pode considerar que esse user é do tipo User.
      (user): user is User =>
        user.role === 'user' && user.id === userId && user.professionalId === professionalId,
    );
  }
}
