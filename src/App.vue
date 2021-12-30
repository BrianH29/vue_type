<template>
  <div>
    <header>
      <h1>Vue Todo with TypeScript</h1>
    </header>
    <!--    다른 방법으로 작성하기 - notion 정리 -->
    <!--    <TodoInput v-model="todoText" @add="addTodoItem"></TodoInput>-->

    <main>
      <TodoInput
        :item="todoText"
        @input="updateTodoText"
        @add="addTodoItem"
      ></TodoInput>
      <div>
        <ul>
          <TodoListItem
            v-for="(todoItem, index) in todoItems"
            :key="index"
            :todoItem="todoItem"
          ></TodoListItem>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoListItem from '@/components/TodoListItem.vue';

const STORAGE_KEY = 'vue-todo-ts-v1';
const storage = {
  save(todoItems: any[]) {
    const parse = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parse);
  },
  fetch() {
    const todoItems = localStorage.getItem(STORAGE_KEY) || '[]';
    const result = JSON.parse(todoItems);
    return result;
  },
};

export default Vue.extend({
  components: { TodoListItem, TodoInput },
  data() {
    return {
      todoText: '',
      todoItems: [] as any[],
    };
  },
  created() {
    this.fetchTodoItems();
  },
  methods: {
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      this.todoItems.push(value);
      storage.save(this.todoItems);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = '';
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch();
    },
  },
});
</script>

<style scoped></style>
