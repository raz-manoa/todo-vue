<template>
  <q-item
    v-if="item"
    tag="label"
    v-ripple
    :active="isActive"
    active-class="active-todo"
  >
    <q-item-section side top>
      <q-checkbox
        v-model="status"
        @update:model-value="handleStatusChange"
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
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  Ref,
  ref,
} from "vue";
import { ETodoStatus } from "@/interfaces/Todo";
import { RxTodoDocument } from "@/rxdb/collections/todo.collection";

interface ISetup {
  item: Ref<RxTodoDocument>;
  status: Ref<ETodoStatus>;
  isActive: ComputedRef<boolean>;
  ETodoStatus: typeof ETodoStatus;
  handleRemove: () => void;
  handleStatusChange: (a: ETodoStatus) => void;
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
    const status = ref(props.data.status);
    const { emit } = context;
    const isActive = computed(() => status.value === ETodoStatus.ACTIVE);

    return {
      ETodoStatus,
      status,
      isActive,
      item: item as ISetup["item"],
      handleRemove() {
        emit("remove", item.value);
      },
      async handleStatusChange(data) {
        await item.value.atomicPatch({ status: data });
      },
    };
  },
});
</script>

<style scoped lang="scss">
.q-item {
  &:not(.active-todo) {
    .q-item__label {
      text-decoration: line-through;
    }
  }
}
</style>
