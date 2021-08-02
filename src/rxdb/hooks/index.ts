import { RxAppDatabase } from "../collections";
import { todoHook } from "./todo.hooks";

export type IRxDBHook = (db: RxAppDatabase) => void;

export const hooks: IRxDBHook[] = [todoHook];
