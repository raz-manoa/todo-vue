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
import { defineComponent, PropType } from "vue";
import { ITodo } from "@/interfaces/Todo";
import TodoListItem from "./TodoListItem/TodoListItem.vue";

interface ISetup {
  handleRemoveItem: (item: ITodo) => void;
}

export default defineComponent({
  components: { TodoListItem },
  name: "TodoList",
  props: {
    list: {
      type: Array as PropType<ITodo[]>,
      default: () => [],
    },
  },
  setup(): ISetup {
    return {
      handleRemoveItem: (item) => {
        console.log("item", item);
      },
    };
  },
});
</script>

<style scoped></style>
