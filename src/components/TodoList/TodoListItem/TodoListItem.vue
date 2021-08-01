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
import { ETodoStatus, RxTodoDocument } from "@/interfaces/Todo";

interface ISetup {
  item: Ref<RxTodoDocument>;
  ETodoStatus: typeof ETodoStatus;
  handleRemove: () => void;
}

export default defineComponent({
  name: "TodoListItem",
  props: {
    data: {
      type: Object as PropType<RxTodoDocument>,
      required: true,
    },
  },
  setup(props, context): ISetup {
    const item = ref<RxTodoDocument>(props.data);
    const { emit } = context;

    return {
      ETodoStatus,
      item: item as ISetup["item"],
      handleRemove() {
        emit("remove", item.value);
      },
    };
  },
});
</script>

<style scoped></style>
