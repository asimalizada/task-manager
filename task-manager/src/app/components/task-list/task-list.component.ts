import { Component, Input, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input({ required: false }) filter: string | null = null;
  tasks = signal<Task[]>([]);
  now = new Date();

  constructor(private taskService: TaskService) {
    effect(() => {
      this.taskService.getTasks().subscribe(data => this.tasks.set(data));
    });
  }

  filteredTasks = computed(() => {
    return this.tasks().filter(task =>
      !this.filter || task.category === this.filter
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
