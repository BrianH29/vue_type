<template>
  <div>
    <label for="todo-input">TODO TODAY : </label>
    <input
      id="todo-input"
      type="text"
      :value="item"
      @input="handleInput"
      @keyup.enter="addTodo"
    />
    <button @click="addTodo" type="button">add</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VueEvent } from '@/types';

export default Vue.extend({
  props: {
    item: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleInput(event: VueEvent.Input<HTMLInputElement>) {
      event.target.value;
      this.$emit('input', event.target.value);

      // const eventTarget = event.target as HTMLInputElement;
      // this.$emit('input', eventTarget.value);
    },
    addTodo() {
      this.$emit('add');
    },
  },
});
</script>

<style scoped></style>
