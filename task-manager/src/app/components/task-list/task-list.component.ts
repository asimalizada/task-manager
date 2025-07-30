import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [];

  toggleComplete(task: Task) {
    task.isCompleted = !task.isCompleted;
  }

  delete(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
