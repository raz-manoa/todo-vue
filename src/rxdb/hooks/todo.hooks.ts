import { IRxDBHook } from ".";
import {
  RxTodoDocument,
  RxTodoDocumentType,
} from "../collections/todo.collection";

export const todoHook: IRxDBHook = (db) => {
  db.collections.todos.preInsert((docObj: RxTodoDocumentType) => {
    const name = docObj.name;
    return db.collections.todos
      .findOne({
        selector: {
          name,
        },
      })
      .exec()
      .then((has: RxTodoDocument | null) => {
        if (has != null) {
          alert("another todo already has the name " + name);
          throw new Error("name already there");
        }
        return db;
      });
  }, true);
};
