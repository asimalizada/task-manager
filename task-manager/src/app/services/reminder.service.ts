import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private checkedTaskIds = new Set<number>();

  constructor(private taskService: TaskService) {
    this.requestPermission();
    setInterval(() => this.checkReminders(), 60_000);
  }

  private requestPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  private checkReminders() {
    if (Notification.permission !== 'granted') return;

    const now = new Date().toISOString();
    this.taskService.getTasks().subscribe(tasks => {
      tasks.forEach(task => {
        if (
          task.remindAt &&
          task.remindAt <= now &&
          !this.checkedTaskIds.has(task.id)
        ) {
          this.sendNotification(task);
          this.checkedTaskIds.add(task.id);
        }
      });
    });
  }

  private sendNotification(task: Task) {
    new Notification(`🔔 Reminder: ${task.title}`, {
      body: task.description || 'You have a task due soon!',
      icon: '/assets/notify.png'
    });
  }
}
