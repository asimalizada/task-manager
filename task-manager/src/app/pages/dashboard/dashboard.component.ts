import { Component, effect } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { CategoryManagerComponent } from '../../components/category-manager/category-manager.component';
import { Category } from '../../models/category';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TaskFormComponent,
    TaskListComponent,
    CategoryManagerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showCategoryModal = false;
  categories: Category[] = [];
  selectedCategory: string | null = null;
  showDrawer = false;

  constructor(
    private taskService: TaskService,
    private darkService: DarkModeService
  ) {
    this.taskService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  openCategoryModal() {
    this.showCategoryModal = true;
  }

  closeCategoryModal() {
    this.showCategoryModal = false;
  }

  selectCategory(name: string | null) {
    this.selectedCategory = name;
  }

  refreshTasks() {
    // no-op for now, will trigger if needed in list
  }

  toggleDark() {
    this.darkService.toggleDarkMode();
  }

  onTaskCreated() {
    this.refreshTasks();
    this.showDrawer = false;
  }

  deleteCategory(name: string) {
    if (confirm(`Delete category "${name}"? This will not delete tasks.`)) {
      this.taskService.deleteCategory(name);
      this.categories = this.categories.filter((c) => c.name !== name);
      if (this.selectedCategory === name) {
        this.selectedCategory = null;
      }
    }
  }
}
