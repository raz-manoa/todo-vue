<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <div class="q-pa-md" style="max-width: 600px; width: 100%">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import TodoList from "@/components/Views/Todo/TodoList/TodoList.vue";
import TodoForm from "@/components/Views/Todo/TodoForm.vue";

export default {
  components: { TodoList, TodoForm },
  name: "Todo",
};
</script>
