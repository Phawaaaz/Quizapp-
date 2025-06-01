export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

export interface Course {
  id: string;
  title: string;
  year: number;
  questionCount: number;
  timeInMinutes: number;
}

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  timeInMinutes: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  courseId: string;
  title: string;
  date: Date;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface UserProfile {
  user: User;
  stats: {
    quizzesTaken: number;
    bestScore: number;
    totalPoints: number;
    streak: number;
  };
  achievements: Achievement[];
}