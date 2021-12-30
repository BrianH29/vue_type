<template>
  <div>
    <li>
      <span>{{ todoItem }}</span>
      <button @click="removeItem">DELETE</button>
    </li>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    todoItem: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    removeItem() {
      this.$emit('remove', this.index);
    },
  },
});
</script>

<style scoped></style>
