export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  gradeProgress: number;
  color: string;
  grade: string;
  weightage: {
    quizzes: number;
    assignments: number;
    midterm: number;
    final: number;
    project: number;
  };
}

export interface Deadline {
  id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  priority: 'urgent' | 'moderate' | 'normal';
}

export interface Stat {
  label: string;
  value: string;
  color: string;
}
