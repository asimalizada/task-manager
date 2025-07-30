import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ReminderService } from './app/services/reminder.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ReminderService
  ]
});
