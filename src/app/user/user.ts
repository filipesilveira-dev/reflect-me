import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Arquivo importado para buscar o usuário pelo 'id' passado nos parâmetros da URL
import { users } from '../data/users';
// Interface que discrimina os dados esperados de um usuário
import { User } from '../models/user';
import { Reflection } from '../models/reflection';
// Arquivo de dados ** Sua importação se tornou obsoleta por conta da injeção de dependências. '
// import { reflections } from '../data/reflections';
import { FormsModule } from '@angular/forms';
// Arquivo que fornece informações por meio de Injeção de Dependências (DI)
import { ReflectionService } from '../services/reflection.service';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserPage {
  // Propriedade de 'UserPage' que pode conter um usuário ou 'undefined', caso não seja achado o usuário na lista
  user: User | undefined;
  reflections: Reflection[] | undefined;
  // Para identificar qual reflexãa está sendo editada
  editingReflectionId: string | null = null;

  // Possibilita  identificar parâmetros da rota (semelhante ao que é feito em React com useParams(). Isso permitirá, com base no id passado na rota, identificar qual usuário está acessando a aplicação)
  constructor(
    private route: ActivatedRoute,
    private reflectionService: ReflectionService,
  ) {
    const userId = this.route.snapshot.paramMap.get('id');
    const reflections = this.reflectionService.getReflections();

    // *** Tornou-se obsoleto com o uso da injeção de Dependências: a parte do código que consome dados de algum lugar (servidor de API, arquivo local, localStorage) está agora localizada em 'reflection.service.ts' ***

    // o 'this' permite que 'user' seja utilizado fora do constructor
    this.user = users
      .filter((user) => user.role !== 'professional')
      .find((user) => user.id === userId);

    // // Procura todas as reflexões daquele usuário especificado na rota
    this.reflections = reflections.filter((refletion) => refletion.userId === userId);
  }

  onSubmit(event: Event, reflectionId: string) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const response = form.elements.namedItem('response') as HTMLTextAreaElement;

    // Persiste a nova resposta no localStorage
    this.reflectionService.addResponse(reflectionId, response.value);

    response.value = '';

    const reflections = this.reflectionService.getReflections();

    // Atualiza a interface atualizando o 'this.reflections' com o novo dado inserido no usuário
    this.reflections = reflections.filter((reflection) => reflection.userId === this.user?.id);
  }

  onDelete(reflectionId: string) {
    this.reflectionService.deleteResponse(reflectionId);

    const reflections = this.reflectionService.getReflections();

    this.reflections = reflections.filter((reflection) => reflection.userId === this.user?.id);
  }

  // Atribui à reflexão o status de "estar em edição"
  onEdit(reflectionId: string) {
    this.editingReflectionId = reflectionId;
  }

  // Método semelhante ao "onSubmit", mas ocorre quando o usuário atualiza a resposta de uma reflexão em específico
  onUpdate(event: Event, reflectionId: string) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const response = form.elements.namedItem('editedResponse') as HTMLTextAreaElement;

    this.reflectionService.updateResponse(reflectionId, response.value);

    const reflections = this.reflectionService.getReflections();

    this.reflections = reflections.filter((reflection) => reflection.userId === this.user?.id);

    // Retorna a reflexão ao status de não estar em edição 
    this.editingReflectionId = null;
  }

  // Método para o botão de cancelar no modo de edição
  onCancelEdit() {
  this.editingReflectionId = null;
}
}
