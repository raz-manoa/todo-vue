import { ETodoStatus } from "@/interfaces/Todo";
import { RxTodoDocument } from "@/rxdb/collections/todo.collection";
import RxDbService from "@/services/RxDB.service";

interface IUseTodo {
  insert: (todoName: string) => Promise<RxTodoDocument | null>;
}

const useTodo = (): IUseTodo => {
  const insert = async (todoName: string) => {
    try {
      const db = await RxDbService.get();
      const obj = {
        id: todoName,
        name: todoName,
        status: ETodoStatus.ACTIVE,
      };

      const todo = await db.todos.insert(obj);
      console.log("Inserted new todo: " + todoName);
      return todo;
    } catch (error) {
      console.error("error", error);
      return null;
    }
  };

  return {
    insert,
  };
};

export default useTodo;
