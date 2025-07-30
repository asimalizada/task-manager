import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Category } from '../../models/category';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<void>();

  task: Task = {
    id: Date.now(),
    title: '',
    description: '',
    category: '',
    type: '',
    priority: 'Medium',
    dueDate: '',
    remindAt: '',
    isCompleted: false,
  };

  categories: Category[] = [];
  selectedTypes: string[] = [];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];

  constructor(private taskService: TaskService) {
    this.taskService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange() {
    const found = this.categories.find(cat => cat.name === this.task.category);
    this.selectedTypes = found?.types || [];
    this.task.type = '';
  }

  submitForm() {
    if (!this.task.title || !this.task.dueDate) return;
    this.task.id = Date.now();
    this.taskService.addTask(this.task);
    this.task = {
      id: Date.now(),
      title: '',
      description: '',
      category: '',
      type: '',
      priority: 'Medium',
      dueDate: '',
      remindAt: '',
      isCompleted: false,
    };
    this.selectedTypes = [];
    this.taskCreated.emit();
  }
}
