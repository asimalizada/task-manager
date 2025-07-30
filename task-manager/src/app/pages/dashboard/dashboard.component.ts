import { Component } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { CategoryManagerComponent } from '../../components/category-manager/category-manager.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent, CategoryManagerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  onTaskAdded(task: any) {
    console.log('Task added:', task);
  }
}
