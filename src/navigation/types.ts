export type RootStackParamList = {
  Home: undefined;
  CategoryHub: undefined;
  LevelSelect: { categoryId: string };
  Activity: { categoryId: string; level: 1 | 2 | 3 | 4 };
  CommunicationBoard: undefined;
  Routines: undefined;
  RoutineDetail: { routineId: string };
  ParentDashboard: undefined;
  Settings: undefined;
  BonusGames: undefined;
  OddOneOut: undefined;
  FindColour: undefined;
  Counting: undefined;
  LetterCaseMatch: undefined;
  IFeel: undefined;
};
