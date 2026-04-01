import { Course } from '../types';

/**
 * Convert a percentage grade (0-100) to a letter grade and GPA points.
 */
export function getGradeDetails(percentage: number): { letter: string; points: number } {
  if (percentage >= 93) return { letter: 'A', points: 4.0 };
  if (percentage >= 90) return { letter: 'A-', points: 3.7 };
  if (percentage >= 87) return { letter: 'B+', points: 3.3 };
  if (percentage >= 83) return { letter: 'B', points: 3.0 };
  if (percentage >= 80) return { letter: 'B-', points: 2.7 };
  if (percentage >= 77) return { letter: 'C+', points: 2.3 };
  if (percentage >= 73) return { letter: 'C', points: 2.0 };
  if (percentage >= 70) return { letter: 'C-', points: 1.7 };
  if (percentage >= 67) return { letter: 'D+', points: 1.3 };
  if (percentage >= 60) return { letter: 'D', points: 1.0 };
  return { letter: 'F', points: 0.0 };
}

/**
 * Calculate the overall GPA across all courses
 */
export function calculateGPA(courses: Course[]): string {
  if (!courses || courses.length === 0) return '0.00';

  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach((course) => {
    totalCredits += course.credits;
    const { points } = getGradeDetails(course.gradeProgress);
    totalGradePoints += points * course.credits;
  });

  if (totalCredits === 0) return '0.00';
  return (totalGradePoints / totalCredits).toFixed(2);
}

/**
 * Calculate the required final exam score to achieve a target letter grade
 */
export function calculateRequiredFinal(
  currentProgress: number,
  finalWeight: number,
  targetPercentage: number
): number | null {
  // If the final is 0 weight, we can't change the grade
  if (finalWeight <= 0) return null;

  // The grade we currently have mapping to 100% total
  // E.g., if we have 54 out of 60 possible points (where final is 40%)
  const percentageWithoutFinal = 100 - finalWeight;
  const currentActualPoints = (currentProgress * percentageWithoutFinal) / 100;
  
  const pointsNeededFromFinal = targetPercentage - currentActualPoints;
  
  if (pointsNeededFromFinal <= 0) return 0; // Already have the grade
  if (pointsNeededFromFinal > finalWeight) return null; // Impossible
  
  // Calculate percentage needed ON the final itself
  const requiredPercentageOnFinal = (pointsNeededFromFinal / finalWeight) * 100;
  
  return Number(requiredPercentageOnFinal.toFixed(1));
}
