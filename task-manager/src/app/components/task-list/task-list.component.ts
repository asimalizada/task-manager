import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  private _filter = signal<string | null>(null);

  @Input()
  set filter(value: string | null) {
    this._filter.set(value);
  }
  tasks = signal<Task[]>([]);
  now = new Date();

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks.set(data);
    });
  }

  filteredTasks = computed(() => {
    const currentFilter = this._filter();
    return this.tasks().filter(
      (task) => !currentFilter || task.category === currentFilter
    );
  });

  toggleComplete(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task);
  }

  deleteTask(id: number) {
    if (confirm('Are you sure to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }

  isOverdue(due: string): boolean {
    return new Date(due) < new Date() && !this.isToday(due);
  }

  isToday(dateStr: string): boolean {
    const d = new Date(dateStr);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }
}
