import type { CourseModule, Lesson, Progress } from '../types';

export function completionPercent(lessons: Lesson[], progress: Progress): number {
  if (lessons.length === 0) return 0;
  const complete = lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
  return Math.round((complete / lessons.length) * 100);
}

export function moduleCompletion(module: CourseModule, progress: Progress): number {
  if (module.lessonIds.length === 0) return 0;
  const complete = module.lessonIds.filter((id) => progress.completedLessons.includes(id)).length;
  return Math.round((complete / module.lessonIds.length) * 100);
}

export function nextLesson(lessons: Lesson[], progress: Progress): Lesson | undefined {
  if (progress.currentLessonId) {
    const current = lessons.find((lesson) => lesson.id === progress.currentLessonId);
    if (current) return current;
  }
  return lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) ?? lessons[0];
}
