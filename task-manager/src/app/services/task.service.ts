import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Category } from '../models/category';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);
  private categories$ = new BehaviorSubject<Category[]>([
    { id: 1, name: 'General' }
  ]);

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    const savedCats = localStorage.getItem('categories');
    if (savedTasks) this.tasks$.next(JSON.parse(savedTasks));
    if (savedCats) this.categories$.next(JSON.parse(savedCats));
  }

  getTasks() {
    return this.tasks$.asObservable();
  }

  getCategories() {
    return this.categories$.asObservable();
  }

  addTask(task: Task) {
    const updated = [...this.tasks$.value, task];
    this.tasks$.next(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  }

  updateTask(task: Task) {
    const updated = this.tasks$.value.map(t => t.id === task.id ? task : t);
    this.tasks$.next(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  }

  deleteTask(id: number) {
    const updated = this.tasks$.value.filter(t => t.id !== id);
    this.tasks$.next(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  }

  addCategory(name: string) {
    const updated = [...this.categories$.value, { id: Date.now(), name }];
    this.categories$.next(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  }
}
