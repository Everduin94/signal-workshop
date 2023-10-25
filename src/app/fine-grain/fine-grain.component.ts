import { Component, WritableSignal, computed, signal } from '@angular/core';

interface Todo {
  title: string;
  complete: WritableSignal<boolean>;
}

@Component({
  selector: 'app-fine-grain',
  templateUrl: './fine-grain.component.html',
  styleUrls: ['./fine-grain.component.css'],
})
export class FineGrainComponent {
  hideCompleted = signal(false);

  todoList = signal<Todo[]>([
    { title: 'Refactor entire app', complete: signal(true) },
    { title: '????', complete: signal(false) },
    { title: 'Profit!!!', complete: signal(false) },
  ]);

  filteredList = computed(() =>
    !this.hideCompleted()
      ? this.todoList()
      : this.todoList().filter((t) => !t.complete())
  );

  updateTodo(complete: WritableSignal<boolean>) {
    complete.update((c) => !c);
  }

  toggleCompleted() {
    this.hideCompleted.update((c) => !c);
  }

  addTodo(title: string) {
    this.todoList.update((v) => [...v, { title, complete: signal(false) }]);
  }
}
