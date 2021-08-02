import {
  RxAppDatabase,
  RxAppCollections,
  collectionCreators,
} from "./collections";
import { createRxDatabase, addRxPlugin } from "rxdb/plugins/core";
import { addPouchPlugin, getRxStoragePouch } from "rxdb/plugins/pouchdb";

// import modules
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBValidatePlugin } from "rxdb/plugins/validate";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { RxDBReplicationCouchDBPlugin } from "rxdb/plugins/replication-couchdb";
import * as PouchdbAdapterHttp from "pouchdb-adapter-http";
import * as PouchdbAdapterIdb from "pouchdb-adapter-idb";
import { hooks } from "./hooks";

if (process.env.NODE_ENV === "development") {
  // in dev-mode we add the dev-mode plugin
  // which does many checks and adds full error messages
  addRxPlugin(RxDBDevModePlugin);
}

addRxPlugin(RxDBValidatePlugin);

addRxPlugin(RxDBLeaderElectionPlugin);

addRxPlugin(RxDBReplicationCouchDBPlugin);

// always needed for replication with the node-server
addPouchPlugin(PouchdbAdapterHttp);

addPouchPlugin(PouchdbAdapterIdb);
const useAdapter = "idb";

console.log("hostname: " + window.location.hostname);
const syncURL = "http://" + window.location.hostname + ":10101/";

/**
 * creates the database
 */
export async function createRxDB(): Promise<RxAppDatabase> {
  const db = await createRxDatabase<RxAppCollections>({
    name: "todos",
    storage: getRxStoragePouch(useAdapter),
    // password: 'myLongAndStupidPassword' // no password needed
  });

  // eslint-disable-next-line
  (window as any).db = db; // write to window for debugging

  // create collections
  await db.addCollections(collectionCreators);

  // hooks
  hooks.forEach((hook) => {
    hook(db);
  });

  // sync with server
  console.log("DatabaseService: sync");
  await db.todos.syncCouchDB({
    remote: syncURL + "/todo",
  });

  return db;
}
