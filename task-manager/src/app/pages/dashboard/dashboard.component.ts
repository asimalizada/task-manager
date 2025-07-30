import { Component, effect } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { CategoryManagerComponent } from '../../components/category-manager/category-manager.component';
import { Category } from '../../models/category';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent, CategoryManagerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showCategoryModal = false;
  categories: Category[] = [];
  selectedCategory: string | null = null;
  
  constructor(private taskService: TaskService) {
    effect(() => {
      this.taskService.getCategories().subscribe(data => this.categories = data);
    });
  }

  openCategoryModal() {
    this.showCategoryModal = true;
  }

  closeCategoryModal() {
    this.showCategoryModal = false;
  }

  selectCategory(name: string) {
    this.selectedCategory = name;
  }

  refreshTasks() {
    // no-op for now, will trigger if needed in list
  }
}
