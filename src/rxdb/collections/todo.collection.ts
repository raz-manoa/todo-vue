import { ETodoStatus, ITodo } from "@/interfaces/Todo";
import { RxCollection, RxCollectionCreator, RxDocument } from "rxdb";
import TodoSchema from "../schema/Todo.schema";

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

export const todoCollection: RxCollectionCreator = {
  schema: TodoSchema,
  methods: {
    isCompleted(this: RxTodoDocument): boolean {
      return this.status === ETodoStatus.COMPLETED;
    },
  },
};
