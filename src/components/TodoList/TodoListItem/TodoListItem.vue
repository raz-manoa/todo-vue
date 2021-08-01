<template>
  <q-item v-if="item" tag="label" v-ripple>
    <q-item-section side top>
      <q-checkbox
        v-model="item.status"
        :true-value="ETodoStatus.COMPLETED"
        :false-value="ETodoStatus.ACTIVE"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ item.name }}</q-item-label>
    </q-item-section>

    <q-item-section center side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="delete"
          @click="handleRemove"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import { ETodoStatus, ITodo } from "@/interfaces/Todo";

interface ISetup {
  item: Ref<ITodo>;
  ETodoStatus: typeof ETodoStatus;
  handleRemove: () => void;
}

export default defineComponent({
  name: "TodoListItem",
  props: {
    data: {
      type: Object as PropType<ITodo>,
      required: true,
    },
  },
  setup(props, context): ISetup {
    const item = ref<ITodo>(props.data);
    const { emit } = context;

    return {
      ETodoStatus,
      item,
      handleRemove() {
        emit("remove", item.value);
      },
    };
  },
});
</script>

<style scoped></style>
