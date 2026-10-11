import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Professional, User } from '../models/user';
import { users } from '../data/users';
import { RouterLink } from '@angular/router';
import { Reflection } from '../models/reflection';
import { ReflectionService } from '../services/reflection.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pacient',
  imports: [RouterLink, FormsModule],
  templateUrl: './pacient.html',
  styleUrl: './pacient.css',
})
export class PacientPage {
  user: User | undefined;
  professional: Professional | undefined;
  userReflections: Reflection[] = [];
  totalReflections = 0;
  pendingReflections = 0;
  answeredReflections = 0;
  showReflectionForm = false;
  reflectionText = '';

  constructor(
    private route: ActivatedRoute,
    private reflectionService: ReflectionService,
  ) {
    // Parâmetros obtidos da URL
    const professionalId = this.route.snapshot.paramMap.get('professionalId');
    const userId = this.route.snapshot.paramMap.get('id');

    this.professional = users.find(
      (user): user is Professional => user.role === 'professional' && user.id === professionalId,
    );

    this.user = users.find(
      (user): user is User =>
        user.role === 'user' && user.id === userId && user.professionalId === professionalId,
    );

    if (this.user) {
      this.userReflections = this.reflectionService
        .getReflections()
        .filter(
          (reflection) =>
            reflection.professionalId === this.professional?.id &&
            reflection.userId === this.user?.id,
        );
    }

    this.totalReflections = this.userReflections.length;

    this.pendingReflections = this.userReflections.filter(
      (reflection) => reflection.response === '',
    ).length;

    this.answeredReflections = this.userReflections.filter(
      (reflection) => reflection.response !== '',
    ).length;
  }
}
