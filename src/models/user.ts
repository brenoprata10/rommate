export enum UserRole {
  Viewer = "viewer",
  Editor = "editor",
  Admin = "admin",
}

export type User = {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  role: UserRole;
  avatarPath?: string;
  raUsername?: string;
  raProgression: RAProgression | null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  lastActive: string;
};

export type RAProgression = {
  total: number;
  results: RAResults[];
};

export type RAResults = {
  romRaId: number;
  maxPossible: number;
  numAwarded: number;
  numAwardedHardcore: number;
  mostRecentAwardedDate: string;
  earnedAchievements: Array<{
    id: string;
    date: string;
  }>;
};
