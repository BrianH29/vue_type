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
            :index="index"
            :todoItem="todoItem"
            @toggle="toggleTodoItemComplete"
            @remove="removeTodoItem"
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
  save(todoItems: Todo[]) {
    const parse = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parse);
  },
  fetch(): Todo[] {
    const todoItems = localStorage.getItem(STORAGE_KEY) || '[]';
    return JSON.parse(todoItems);
  },
};

export interface Todo {
  title: string;
  done: boolean;
}

export default Vue.extend({
  components: { TodoListItem, TodoInput },
  data() {
    return {
      todoText: '',
      todoItems: [] as Todo[],
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
      const todo: Todo = {
        title: this.todoText,
        done: false,
      };
      this.todoItems.push(todo);
      storage.save(this.todoItems);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = '';
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch().sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    toggleTodoItemComplete(todoItem: Todo, index: number) {
      this.todoItems.splice(index, 1, {
        ...todoItem,
        done: !todoItem.done,
      });
      storage.save(this.todoItems);
    },
    removeTodoItem(index: number) {
      console.log('remove Item', index);
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    },
  },
});
</script>

<style scoped></style>
