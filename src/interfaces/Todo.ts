import { RxDocument, RxCollection, RxDatabase } from "rxdb";

export enum ETodoStatus {
  COMPLETED = "COMPLETED",
  ACTIVE = "ACTIVE",
}

export interface ITodo {
  id: string;
  name: string;
  status: ETodoStatus;
}

//
/**
 * custom typings so typescript knows about the schema-fields
 */

export type RxTodoDocumentType = ITodo;

// ORM methods
interface RxTodoDocMethods {
  isCompleted(): boolean;
}

export type RxTodoDocument = RxDocument<RxTodoDocumentType, RxTodoDocMethods>;

export type RxTodoCollection = RxCollection<
  RxTodoDocumentType,
  RxTodoDocMethods,
  Record<string, never>
>;

export interface RxTodosCollections {
  todos: RxTodoCollection;
}

export type RxTodosDatabase = RxDatabase<RxTodosCollections>;
