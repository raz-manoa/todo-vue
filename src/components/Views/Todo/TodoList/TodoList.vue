<template>
  <div>
    <q-list bordered padding>
      <template v-if="!loading">
        <template v-if="list.length">
          <TodoListItem
            v-for="item in list"
            :key="item.id"
            :data="item"
            @remove="handleRemoveItem"
          />
        </template>
        <Empty v-else />
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
import { defineComponent, Ref } from "vue";
import TodoListItem from "./TodoListItem/TodoListItem.vue";
import useSubscribeTodoList from "@/composable/Todos/useSubscribeTodoList";
import { RxTodoDocument } from "@/rxdb/collections/todo.collection";
import Empty from "@/components/Feedback/Empty/Empty.vue";

interface ISetup {
  list: Ref<RxTodoDocument[]>;
  loading: Ref<boolean>;
  handleRemoveItem: (item: RxTodoDocument) => void;
}

export default defineComponent({
  components: { TodoListItem, Empty },
  name: "TodoList",
  setup(): ISetup {
    const { loading, list } = useSubscribeTodoList({
      selector: {},
      sort: [{ name: "asc" }],
    });

    return {
      // eslint-disable-next-line
      list: list as ISetup["list"],
      loading,
      handleRemoveItem: async (item) => {
        await item.remove();
      },
    };
  },
});
</script>

<style scoped></style>
