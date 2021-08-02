import {
  ETodoStatus,
  RxTodoDocument,
  RxTodosDatabase,
} from "@/interfaces/Todo";
import TodoDatabaseService from "@/services/TodoDatabase.service";

interface IUseTodo {
  insert: (todoName: string) => Promise<RxTodoDocument | null>;
}

const useTodo = (): IUseTodo => {
  const insert = async (todoName: string) => {
    try {
      const db: RxTodosDatabase = await TodoDatabaseService.get();
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
