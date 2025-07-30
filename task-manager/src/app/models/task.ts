export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  remindAt?: string;
  isCompleted: boolean;
}
