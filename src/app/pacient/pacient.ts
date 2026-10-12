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
  editingReflectionId: string | null = null;
  editedReflectionText = '';

  // Adiciona uma nova reflexão ao paciente
  saveReflection(): void {
    const text = this.reflectionText.trim();

    if (!text || !this.user || !this.professional) {
      return;
    }

    const reflection: Reflection = {
      id: crypto.randomUUID(),
      professionalId: this.professional.id,
      userId: this.user.id,
      text: text.charAt(0).toUpperCase() + text.slice(1),
      response: '',
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }),
    };

    this.reflectionService.addReflection(reflection);

    this.userReflections = this.reflectionService
      .getReflections()
      .filter(
        (item) => item.professionalId === this.professional?.id && item.userId === this.user?.id,
      );

    this.totalReflections = this.userReflections.length;

    this.pendingReflections = this.userReflections.filter((item) => item.response === '').length;

    this.answeredReflections = this.userReflections.filter((item) => item.response !== '').length;

    this.reflectionText = '';
    this.showReflectionForm = false;
  }

  // Deleta uma reflexão ainda não respondida
  deleteReflection(reflection: Reflection): void {
    if (reflection.response !== '') return;

    const confirmed = window.confirm(
      'Tem certeza de que deseja apagar esta reflexão? Esta ação não pode ser desfeita.',
    );

    if (!confirmed) return;

    const deleted = this.reflectionService.deleteReflection(reflection.id);

    if (!deleted) return;

    this.userReflections = this.userReflections.filter((item) => item.id !== reflection.id);

    this.totalReflections = this.userReflections.length;
    this.pendingReflections = this.userReflections.filter((item) => item.response === '').length;
    this.answeredReflections = this.userReflections.filter((item) => item.response !== '').length;

    if (this.editingReflectionId === reflection.id) {
      this.cancelEditingReflection();
    }
  }

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

  startEditingReflection(reflection: Reflection): void {
    if (reflection.response !== '') return;

    this.editingReflectionId = reflection.id;
    this.editedReflectionText = reflection.text;
  }

  cancelEditingReflection(): void {
    this.editingReflectionId = null;
    this.editedReflectionText = '';
  }

  saveEditedReflection(reflection: Reflection): void {
    const text = this.editedReflectionText.trim();

    if (!text || reflection.response !== '') return;

    const formattedText = text.charAt(0).toUpperCase() + text.slice(1);

    const saved = this.reflectionService.updateReflectionText(reflection.id, formattedText);

    if (!saved) {
      this.userReflections = this.reflectionService
        .getReflections()
        .filter(
          (item) => item.professionalId === this.professional?.id && item.userId === this.user?.id,
        );

      this.cancelEditingReflection();
      return;
    }

    this.userReflections = this.userReflections.map((item) =>
      item.id === reflection.id ? { ...item, text: formattedText } : item,
    );

    this.cancelEditingReflection();
  }
}
