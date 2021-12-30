<template>
  <div>
    <li>
      <span
        class="item"
        :class="todoItem.done ? 'complete' : null"
        @click="toggleItem"
        >{{ todoItem.title }}</span
      >
      <button @click="removeItem">DELETE</button>
    </li>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Todo } from '@/App.vue';

export default Vue.extend({
  props: {
    todoItem: {
      type: Object as PropType<Todo>,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    toggleItem() {
      this.$emit('toggle', this.todoItem, this.index);
    },
    removeItem() {
      this.$emit('remove', this.index);
    },
  },
});
</script>

<style scoped>
.item {
  cursor: pointer;
}
.complete {
  text-decoration: line-through;
}
</style>
