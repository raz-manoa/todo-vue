<template>
  <div>
    <q-list bordered padding>
      <template v-if="!loading">
        <TodoListItem
          v-for="item in list"
          :key="item.id"
          :data="item"
          @remove="handleRemoveItem"
        />
      </template>
      <template v-else>
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, Ref, ref } from "vue";
import { RxTodoDocument } from "@/interfaces/Todo";
import TodoListItem from "./TodoListItem/TodoListItem.vue";
import TodoDatabaseService from "@/services/TodoDatabase.service";
import { tap } from "rxjs/operators";
import { Subscription } from "rxjs";

interface ISetup {
  list: Ref<RxTodoDocument[]>;
  loading: Ref<boolean>;
  handleRemoveItem: (item: RxTodoDocument) => void;
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
      loading,
      handleRemoveItem: (item) => {
        item.remove();
        console.log("remove item", item.name);
      },
    };
  },
});
</script>

<style scoped></style>
