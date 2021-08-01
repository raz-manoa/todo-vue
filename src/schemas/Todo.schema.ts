import { RxTodoDocumentType } from "@/interfaces/Todo";
import { RxJsonSchema } from "rxdb";
const TodoSchema: RxJsonSchema<RxTodoDocumentType> = {
  title: "hero schema",
  description: "describes a simple hero",
  version: 0,
  keyCompression: false,
  primaryKey: "name",
  type: "object",
  properties: {
    id: {
      type: "string",
      default: "",
    },
    name: {
      type: "string",
      default: "",
    },
    status: {
      type: "string",
      default: "",
    },
  },
  required: ["name"],
};

export default TodoSchema;
