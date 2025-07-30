import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss']
})
export class CategoryManagerComponent {
  @Output() close = new EventEmitter<void>();
  categories: Category[] = [];
  newCategory = '';
  newType = '';
  selectedCategory: Category | null = null;

  constructor(private taskService: TaskService) {
    this.taskService.getCategories().subscribe(data => this.categories = data);
  }

  addCategory() {
    if (!this.newCategory.trim()) return;
    this.taskService.addCategory(this.newCategory.trim(), []);
    this.newCategory = '';
  }

  selectCategory(cat: Category) {
    this.selectedCategory = cat;
  }

  addTypeToSelected() {
    if (this.selectedCategory && this.newType.trim()) {
      this.taskService.addTypeToCategory(this.selectedCategory.name, this.newType.trim());
      this.newType = '';
    }
  }
}
