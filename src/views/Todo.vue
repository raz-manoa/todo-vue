<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <div class="q-pa-md" style="max-width: 400px; width: 100%">
        <TodoForm />
        <TodoList :list="list" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import TodoList from "@/components/TodoList/TodoList.vue";
import { ETodoStatus, ITodo } from "@/interfaces/Todo";
import TodoForm from "@/components/TodoForm.vue";
import { useStore } from "vuex";

interface ISetup {
  list: Ref<ITodo[]>;
}

export default {
  components: { TodoList, TodoForm },
  name: "Todo",
  setup(): ISetup {
    const store = useStore();
    store.state.todo;
    const list = ref<ITodo[]>([
      {
        id: "1",
        name: "Test",
        status: ETodoStatus.COMPLETED,
      },
      {
        id: "2",
        name: "Test 2",
        status: ETodoStatus.ACTIVE,
      },
    ]);

    return {
      list,
    };
  },
};
</script>
