export enum ETodoStatus {
  COMPLETED = "COMPLETED",
  ACTIVE = "ACTIVE",
}

export interface ITodo {
  id: string;
  name: string;
  status: ETodoStatus;
}
