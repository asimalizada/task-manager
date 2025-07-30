import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private storageKey = 'dark-mode';

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'true') {
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(this.storageKey, String(isDark));
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}
