export type Lesson = {
  id: string;
  title: string;
  levelRequired: number;
  duration: string;
};

export const lessons: Lesson[] = [
  { id: "variables", title: "Variables & Memory", levelRequired: 1, duration: "15 min" },
  { id: "control-flow", title: "If Statements & Logic", levelRequired: 1, duration: "20 min" },
  { id: "loops", title: "Loops & Iteration", levelRequired: 2, duration: "25 min" },
  { id: "functions", title: "Functions & Stack", levelRequired: 3, duration: "30 min" },
];
