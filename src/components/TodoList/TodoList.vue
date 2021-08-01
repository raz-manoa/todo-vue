<template>
  <div>
    <q-list bordered padding>
      <TodoListItem
        v-for="item in list"
        :key="item.id"
        :data="item"
        @remove="handleRemoveItem"
      />
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, Ref, ref } from "vue";
import { ITodo, RxTodoDocument } from "@/interfaces/Todo";
import TodoListItem from "./TodoListItem/TodoListItem.vue";
import TodoDatabaseService from "@/services/TodoDatabase.service";
import { tap } from "rxjs/operators";
import { Subscription } from "rxjs";

interface ISetup {
  list: Ref<RxTodoDocument[]>;
  handleRemoveItem: (item: ITodo) => void;
}

export default defineComponent({
  components: { TodoListItem },
  name: "TodoList",
  setup(): ISetup {
    const loading = ref(false);
    const list = ref<RxTodoDocument[]>([]);
    const sub = ref<Subscription | null>(null);

    onMounted(async () => {
      loading.value = true;
      const db = await TodoDatabaseService.get();
      sub.value = db.todos
        .find({
          selector: {},
          sort: [{ name: "asc" }],
        })
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
      list: list as ISetup["list"],
      handleRemoveItem: (item) => {
        console.log("item", item);
      },
    };
  },
});
</script>

<style scoped></style>
