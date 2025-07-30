import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { Category } from '../../models/category';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  task: Task;
  categories: Category[] = [];

  constructor() {
    this.task = {
      title: '',
      description: '',
      dueDate: new Date(),
      category: '',
      id: 0,
      isCompleted: false,
      priority: 'Medium',
      remindAt: undefined
    }
  }

  submitForm() {
    
  }
}
