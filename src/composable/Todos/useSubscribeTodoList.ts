import { RxTodoDocument, RxTodoDocumentType } from "@/interfaces/Todo";
import TodoDatabaseService from "@/services/TodoDatabase.service";
import { MangoQuery } from "rxdb";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { onMounted, onUnmounted, Ref, ref } from "vue";

interface IUseSubscribeTodoList {
  list: Ref<RxTodoDocument[]>;
  loading: Ref<boolean>;
}

const useSubscribeTodoList = (
  query: MangoQuery<RxTodoDocumentType>
): IUseSubscribeTodoList => {
  const loading = ref(false);
  const list = ref<RxTodoDocument[]>([]);
  const sub = ref<Subscription | null>(null);

  onMounted(async () => {
    loading.value = true;
    const db = await TodoDatabaseService.get();
    sub.value = db.todos
      .find(query)
      .$.pipe(
        tap(() => {
          // debounce to simulate slow load
          setTimeout(() => (loading.value = false), 1000);
        })
      )
      .subscribe((todos) => {
        list.value = todos;
      });
  });
  onUnmounted(() => {
    if (sub.value) {
      sub.value.unsubscribe();
    }
  });

  return {
    // eslint-disable-next-line
    list: list as IUseSubscribeTodoList["list"],
    loading,
  };
};

export default useSubscribeTodoList;
