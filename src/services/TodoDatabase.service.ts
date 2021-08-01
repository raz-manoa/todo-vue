// batteries-included
// import RxDB from 'rxdb';

/**
 * custom build
 */
import { createRxDatabase, addRxPlugin } from "rxdb/plugins/core";

import { addPouchPlugin, getRxStoragePouch } from "rxdb/plugins/pouchdb";

// import modules
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

if (process.env.NODE_ENV === "development") {
  // in dev-mode we add the dev-mode plugin
  // which does many checks and adds full error messages
  addRxPlugin(RxDBDevModePlugin);
}

import { RxDBValidatePlugin } from "rxdb/plugins/validate";
addRxPlugin(RxDBValidatePlugin);

import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
addRxPlugin(RxDBLeaderElectionPlugin);

import { RxDBReplicationCouchDBPlugin } from "rxdb/plugins/replication-couchdb";
addRxPlugin(RxDBReplicationCouchDBPlugin);

// always needed for replication with the node-server
import * as PouchdbAdapterHttp from "pouchdb-adapter-http";
addPouchPlugin(PouchdbAdapterHttp);

import * as PouchdbAdapterIdb from "pouchdb-adapter-idb";
import {
  ETodoStatus,
  RxTodoDocument,
  RxTodoDocumentType,
  RxTodosCollections,
  RxTodosDatabase,
} from "@/interfaces/Todo";
import TodoSchema from "@/schemas/Todo.schema";
addPouchPlugin(PouchdbAdapterIdb);
const useAdapter = "idb";

console.log("hostname: " + window.location.hostname);
const syncURL = "http://" + window.location.hostname + ":10101/";

/* let doSync = true;
if (window.location.hash === "#nosync") {
  doSync = false;
} */

/**
 * creates the database
 */
async function _create(): Promise<RxTodosDatabase> {
  console.log("DatabaseService: creating database..");
  const db = await createRxDatabase<RxTodosCollections>({
    name: "todos",
    storage: getRxStoragePouch(useAdapter),
    // password: 'myLongAndStupidPassword' // no password needed
  });
  console.log("DatabaseService: created database");
  // eslint-disable-next-line
  (window as any).db = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log("isLeader now");
    document.title = "♛ " + document.title;
  });

  // create collections
  console.log("DatabaseService: create collections");

  await db.addCollections({
    todos: {
      schema: TodoSchema,
      methods: {
        isCompleted(this: RxTodoDocument): boolean {
          return this.status === ETodoStatus.COMPLETED;
        },
      },
    },
  });

  // hooks
  console.log("DatabaseService: add hooks");
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

  // sync with server
  console.log("DatabaseService: sync");
  await db.todos.syncCouchDB({
    remote: syncURL + "/todo",
  });

  return db;
}

const TodoDatabaseService = {
  DB_CREATE_PROMISE: _create(),
  get(): Promise<RxTodosDatabase> {
    return this.DB_CREATE_PROMISE;
  },
};

export default TodoDatabaseService;