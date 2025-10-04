import type { Course } from "./types";

const KEY = "analiticacarrera:courses";

export function loadCourses(): Course[] | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Course[];
  } catch (e) {
    console.error("loadCourses failed", e);
    return null;
  }
}

export function saveCourses(courses: Course[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(courses));
  } catch (e) {
    console.error("saveCourses failed", e);
  }
}
