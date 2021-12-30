<template>
  <div>
    <h1>Vue Todo with TypeScript</h1>
    <!--    다른 방법으로 작성하기 - notion 정리 -->
    <!--    <TodoInput v-model="todoText" @add="addTodoItem"></TodoInput>-->
    <TodoInput
      :item="todoText"
      @input="updateTodoText"
      @add="addTodoItem"
    ></TodoInput>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoInput from '@/components/TodoInput.vue';

export default Vue.extend({
  components: { TodoInput },
  data() {
    return {
      todoText: '',
    };
  },
  methods: {
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      localStorage.setItem(value, value);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = '';
    },
  },
});
</script>

<style scoped></style>
