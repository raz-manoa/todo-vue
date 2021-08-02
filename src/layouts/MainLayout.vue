<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Todo App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item header> Menu </q-item>
        <RouteLinkItem
          v-for="menu in mainMenu"
          :key="menu.title"
          v-bind="menu"
          :to="'todo'"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import RouteLinkItem from "@/components/Nav/RouteLinkItem.vue";

interface IMainLink {
  title: string;
  to: string;
  caption?: string;
  icon: string;
}

const mainMenu: IMainLink[] = [
  {
    title: "todo",
    to: "todo",
    icon: "list",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    RouteLinkItem,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      mainMenu: mainMenu,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
