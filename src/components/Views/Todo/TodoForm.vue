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
import useTodo from "@/composable/Todos/useTodo";

interface ISetup {
  name: Ref<string>;
  onSubmit: () => void;
  onReset: () => void;
}

export default defineComponent({
  name: "TodoForm",
  setup(): ISetup {
    const { notify } = useQuasar();
    const { insert } = useTodo();

    const name = ref<string>("");

    const onReset = () => {
      name.value = "";
    };

    return {
      name,
      async onSubmit() {
        const item = await insert(name.value);

        if (item) {
          onReset();
        } else {
          notify({
            type: "negative",
            message: "Error during creation",
          });
        }
      },

      onReset,
    };
  },
});
</script>

<style scoped></style>
