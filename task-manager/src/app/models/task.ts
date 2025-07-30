export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  remindAt?: Date;
  isCompleted: boolean;
}
