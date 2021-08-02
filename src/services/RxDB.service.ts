import { RxAppDatabase } from "@/rxdb/collections";
import { createRxDB } from "@/rxdb/index";

const RxDbService = {
  DB_CREATE_PROMISE: createRxDB(),
  get(): Promise<RxAppDatabase> {
    return this.DB_CREATE_PROMISE;
  },
};

export default RxDbService;
