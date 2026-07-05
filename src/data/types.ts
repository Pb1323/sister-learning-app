export interface Item {
  id: string;
  label: string;
  emoji: string;
  secondaryLabel?: string;
  color?: string;
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  color: string;
  items: Item[];
}

export interface CommItem {
  id: string;
  label: string;
  emoji: string;
}

export interface RoutineStep {
  id: string;
  label: string;
  emoji: string;
}

export interface Routine {
  id: string;
  title: string;
  emoji: string;
  color: string;
  steps: RoutineStep[];
}
