import { Injectable } from '@angular/core';
// Interface
import { Reflection } from '../models/reflection';
import { reflections } from '../data/reflections';

// Informa ao Angular que essa classe pode participar do sistema de injeção de dependência: um mecanismo em que uma classe recebe de fora as coisas de que precisa, em vez de ser responsável por criá-las..
@Injectable({
  // Significa, neste caso, que o Angular disponibilizará uma única instância desse service para a aplicação.
  providedIn: 'root',
})

// Componentes diferentes vão oder utilizar o mesmo ReflectionService
export class ReflectionService {
  // Cria a chave que será utilizda no localStorage
  private readonly storageKey = 'reflect-me-reflections';

  //   Método que busca o que estiver no localStorage
  getReflections(): Reflection[] {
    const storedReflections = localStorage.getItem(this.storageKey);

    // Caso haja algo no localStorage
    if (storedReflections) {
      // Caso haja algo no localStorage, será transformado em objeto JavaScript
      return JSON.parse(storedReflections) as Reflection[];
    }

    // Caso não haja, então o array 'reflections' será transformado em string (strinify()) e na chave 'this.storageKey'('reflect-me-reflections') será salvo. O 'setItem' recebe dois argumentos: chave e valor
    localStorage.setItem(this.storageKey, JSON.stringify(reflections));

    // Então retorna, caso ainda não tenha sido salvo nada ainda, o próprio array 'reflections'
    return reflections;
  }

  // Método que adiciona a resposta de determinada reflexão
  addResponse(reflectionId: string, response: string) {
    const reflections = this.getReflections();
    const reflection = reflections.find((reflection) => reflection.id === reflectionId);

    if (reflection) {
      reflection.response = response.charAt(0).toUpperCase() + response.slice(1);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(reflections));
  }

  // Método que permite ao usuário editar uma resposta já dada (idêntico ao addResponse. Diferença semântica apenas)
  updateResponse(reflectionId: string, response: string) {
    const reflections = this.getReflections();
    const reflection = reflections.find((reflection) => reflection.id === reflectionId);

    if (reflection) {
      reflection.response = response.charAt(0).toUpperCase() + response.slice(1);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(reflections));
  }

  // Método que deleta uma resposta adicionada
  deleteResponse(reflectionId: string) {
    const reflections = this.getReflections();

    const reflection = reflections.find((reflection) => reflection.id === reflectionId);

    if (reflection) {
      reflection.response = '';
    }

    localStorage.setItem(this.storageKey, JSON.stringify(reflections));
  }
}
