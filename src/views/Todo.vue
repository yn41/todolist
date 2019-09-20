<template>
  <div class="todo">
    <TodoInput @addItemEvent="addItem" />
    <TodoList/>
  </div> 
</template>

<script>
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  data(){
    return{
      todoList: [],
    }
  },
  methods:{
    addItem($item){
      console.log("들어옴!!");
      console.log($item);
      // var data 
    }
  },
  components: { 
    TodoInput,
    TodoList
  }
};
</script>
