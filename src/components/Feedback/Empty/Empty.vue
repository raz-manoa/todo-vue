<template>
  <div class="q-pa-md text-subtitle1">{{ description }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Empty",
  props: {
    description: {
      type: String as PropType<string>,
      default: "No data",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
