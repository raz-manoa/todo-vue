<template>
  <div class="q-mb-xl">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="What is todo ?"
        hint="Todo name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, Ref, ref } from "vue";
import TodoDatabaseService from "@/services/TodoDatabase.service";
import { ETodoStatus, RxTodosDatabase } from "@/interfaces/Todo";

interface ISetup {
  name: Ref<string>;
  onSubmit: () => void;
  onReset: () => void;
}

export default defineComponent({
  name: "TodoForm",
  setup(): ISetup {
    const $q = useQuasar();

    const name = ref<string>("");

    const onReset = () => {
      name.value = "";
    };

    return {
      name,
      async onSubmit() {
        console.log("OnSubmit");
        console.dir(this);
        const db: RxTodosDatabase = await TodoDatabaseService.get();
        const obj = {
          id: name.value,
          name: name.value,
          status: ETodoStatus.ACTIVE,
        };
        console.dir(obj);
        await db.todos.insert(obj);
        console.log("Inserted new todo: " + name.value);

        //
        $q.notify({
          icon: "warning",
          message: name.value,
        });
        onReset();
      },

      onReset,
    };
  },
});
</script>

<style scoped></style>
