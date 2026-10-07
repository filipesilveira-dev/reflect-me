import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
// Arquivo importado para buscar o usuário pelo 'id' passado nos parâmetros da URL
import { users } from '../data/users';
// Interface que discrimina os dados esperados de um usuário
import { User } from '../models/user';
import { Reflection } from '../models/reflection';
// Arquivo de dados. Sua importação se tornou obsoleta por conta da injeção de dependências.
// import { reflections } from '../data/reflections';
import { FormsModule } from '@angular/forms';
// Arquivo que fornece informações por meio de Injeção de Dependências (DI)
import { ReflectionService } from '../services/reflection.service';

@Component({
  selector: 'app-user',
  imports: [FormsModule, DatePipe],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserPage {
  // Propriedade de 'UserPage' que pode conter um usuário ou 'undefined',
  // caso não seja achado o usuário na lista
  user: User | undefined;

  reflections: Reflection[] = [];

  // Para identificar qual reflexão está sendo editada
  editingReflectionId: string | null = null;

  // Controla a exibição do aviso de alteração não salva
  showEditWarning = false;

  // Armazena temporariamente a reflexão que o usuário deseja editar
  pendingEditReflectionId: string | null = null;

  today= new Date();

  // Possibilita identificar parâmetros da rota (semelhante ao que é feito
  // em React com useParams()). Isso permitirá, com base no id passado
  // na rota, identificar qual usuário está acessando a aplicação.
  constructor(
    private route: ActivatedRoute,
    private reflectionService: ReflectionService,
  ) {
    const userId = this.route.snapshot.paramMap.get('id');

    const reflections = this.reflectionService.getReflections();

    // A parte do código que consome dados das reflexões
    // está localizada no 'reflection.service.ts'.

    // O 'this' permite que 'user' seja utilizado fora do constructor.
    this.user = users
      .filter((user) => user.role !== 'professional')
      .find((user) => user.id === userId);

    // Procura todas as reflexões daquele usuário especificado na rota.
    this.reflections = reflections.filter(
      (reflection) => reflection.userId === userId,
    );
  }

  onSubmit(event: Event, reflectionId: string) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const response = form.elements.namedItem(
      'response',
    ) as HTMLTextAreaElement;

    // Persiste a nova resposta no localStorage.
    this.reflectionService.addResponse(reflectionId, response.value);

    response.value = '';

    const reflections = this.reflectionService.getReflections();

    // Atualiza a interface com o novo dado inserido pelo usuário.
    this.reflections = reflections.filter(
      (reflection) => reflection.userId === this.user?.id,
    );
  }

  onDelete(reflectionId: string) {
    this.reflectionService.deleteResponse(reflectionId);

    const reflections = this.reflectionService.getReflections();

    this.reflections = reflections.filter(
      (reflection) => reflection.userId === this.user?.id,
    );
  }

  // Atribui à reflexão o estado de "estar em edição".
  onEdit(reflectionId: string) {
    // Verifica se já existe uma reflexão sendo editada.
    if (this.editingReflectionId) {
      // Guarda a reflexão que o usuário tentou editar.
      this.pendingEditReflectionId = reflectionId;

      // Exibe o aviso sobre a alteração não salva.
      this.showEditWarning = true;

      return;
    }

    // Caso nenhuma reflexão esteja sendo editada,
    // inicia diretamente a edição da reflexão selecionada.
    this.editingReflectionId = reflectionId;
  }

  // Mantém a reflexão atual em edição e fecha o aviso.
  onContinueEditing() {
    this.showEditWarning = false;
    this.pendingEditReflectionId = null;
  }

  // Descarta a edição atual e inicia a edição da reflexão
  // que o usuário tentou selecionar.
  onDiscardChanges() {
    this.editingReflectionId = this.pendingEditReflectionId;

    this.showEditWarning = false;
    this.pendingEditReflectionId = null;
  }

  // Método semelhante ao "onSubmit", mas ocorre quando o usuário
  // atualiza a resposta de uma reflexão específica.
  onUpdate(event: Event, reflectionId: string) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const response = form.elements.namedItem(
      'editedResponse',
    ) as HTMLTextAreaElement;

    this.reflectionService.updateResponse(
      reflectionId,
      response.value,
    );

    const reflections = this.reflectionService.getReflections();

    this.reflections = reflections.filter(
      (reflection) => reflection.userId === this.user?.id,
    );

    // Retorna a reflexão ao estado de não estar em edição.
    this.editingReflectionId = null;
  }

  // Método para o botão de cancelar no modo de edição.
  onCancelEdit() {
    this.editingReflectionId = null;
  }
}