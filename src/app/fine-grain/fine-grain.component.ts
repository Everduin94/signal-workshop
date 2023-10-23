import { Component, WritableSignal, computed, signal } from '@angular/core';

interface Todo {
  title: string,
  complete: WritableSignal<boolean>,
}

@Component({
  selector: 'app-fine-grain',
  templateUrl: './fine-grain.component.html',
  styleUrls: ['./fine-grain.component.css']
})
export class FineGrainComponent {


  hideCompleted = signal(false);

  todoList = signal<Todo[]>([
    {title: 'Feed puppies', complete: signal(true)},
    {title: 'Burp baby', complete: signal(false)},
    {title: 'Clean cat litter', complete: signal(false)},
  ])

  filteredList = computed(() => !this.hideCompleted() ? this.todoList() : this.todoList().filter(t => !t.complete()))

  updateTodo(complete: WritableSignal<boolean>) {
    complete.update(c => !c)
  }

  toggleCompleted() {
    this.hideCompleted.update(c => !c)
  }

  addTodo(title: any) {
    this.todoList.update(v => [...v, {title, complete: signal(false)}])
  }
}
