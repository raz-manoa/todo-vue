import { RxCollectionCreator, RxDatabase } from "rxdb";
import { RxTodoCollection, todoCollection } from "./todo.collection";

export type RxDbCollectionsCreator = typeof collectionCreators;

export interface RxAppCollections {
  todos: RxTodoCollection;
}

export type RxAppDatabase = RxDatabase<RxAppCollections>;

export const collectionCreators: Record<string, RxCollectionCreator> = {
  todos: todoCollection,
};
