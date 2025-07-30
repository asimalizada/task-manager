import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.scss'
})
export class CategoryManagerComponent {
  newCategory?: Category;
  categories: Category[] = [];

  addCategory() {
    if (this.newCategory && this.newCategory.name) {
      this.categories.push({ ...this.newCategory });
      this.newCategory = undefined; // Reset after adding
    }
  }
}
