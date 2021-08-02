<template>
  <router-view />
</template>

<script lang="ts">
import { Ref, ref } from "vue";

interface IAppSetupReturn {
  leftDrawerOpen: Ref<boolean>;
}

export default {
  name: "LayoutDefault",

  components: {},

  setup(): IAppSetupReturn {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
