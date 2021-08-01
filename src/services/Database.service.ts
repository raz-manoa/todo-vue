// import typings
import {
  RxHeroDocument,
  RxHeroesDatabase,
  RxHeroesCollections,
  RxHeroDocumentType,
} from "./../RxDB.d";

import heroSchema from "../schemas/Hero.schema";

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
async function _create(): Promise<RxHeroesDatabase> {
  console.log("DatabaseService: creating database..");
  const db = await createRxDatabase<RxHeroesCollections>({
    name: "heroes",
    storage: getRxStoragePouch(useAdapter),
    // password: 'myLongAndStupidPassword' // no password needed
  });
  console.log("DatabaseService: created database");
  (window as any).db = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log("isLeader now");
    document.title = "♛ " + document.title;
  });

  // create collections
  console.log("DatabaseService: create collections");

  await db.addCollections({
    heroes: {
      schema: heroSchema,
      methods: {
        hpPercent(this: RxHeroDocument): number {
          return (this.hp / this.maxHP) * 100;
        },
      },
    },
  });

  // hooks
  console.log("DatabaseService: add hooks");
  db.collections.heroes.preInsert((docObj: RxHeroDocumentType) => {
    const color = docObj.color;
    return db.collections.heroes
      .findOne({
        selector: {
          color,
        },
      })
      .exec()
      .then((has: RxHeroDocument | null) => {
        if (has != null) {
          alert("another hero already has the color " + color);
          throw new Error("color already there");
        }
        return db;
      });
  }, true);

  // sync with server
  console.log("DatabaseService: sync");
  await db.heroes.syncCouchDB({
    remote: syncURL + "/hero",
  });

  return db;
}

const DatabaseService = {
  DB_CREATE_PROMISE: _create(),
  get(): Promise<RxHeroesDatabase> {
    return this.DB_CREATE_PROMISE;
  },
};

export default DatabaseService;
