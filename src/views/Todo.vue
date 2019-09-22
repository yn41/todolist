<template>
  <div class="todo">
    <TodoInput @addItemEvent="addItem" />
    <TodoList :props="todoList" @toggleItemEvent="toggleItem" @resetEvent="resetAll" @deleteEvent="deleteItem" @chageModeEvent="chageMode" @modiEvent="modiItem" />
  </div> 
</template>

<script>
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  data(){
    return{
      todoList: [],
      idx:0
    }
  },
  methods:{
    addItem($item){
      let data = {
        todo : $item,
        key : this.idx, 
        isDone: false,
        isMode: false
      }
      this.todoList.push(data);
      //localstorage 저장
      localStorage.setItem(data.key, JSON.stringify(data));
      
      this.idx += 1;
    },
    toggleItem($key, $idx, $isDone){
      this.todoList[$idx].isDone= $isDone; 
      let data = this.todoList[$idx];
      localStorage.setItem($key, JSON.stringify(data));
    },
    deleteItem($key, $idx){
      this.todoList.splice($idx, 1); 
      localStorage.removeItem($key);
    },
    chageMode($key, $idx, $isMode){
        console.log($isMode);
      if(!$isMode){
        console.log("Fdff");
        this.todoList.forEach(item => {
          item.isMode = false; 
        });
      }
      this.todoList[$idx].isMode = !$isMode;  
      let data = this.todoList[$idx];
    },
    modiItem($key, $idx, $todo){
      this.todoList[$idx].isMode = false;
      this.todoList[$idx].todo = $todo; 
      let data = this.todoList[$idx];
      localStorage.setItem($key, JSON.stringify(data));
    },
    resetAll(){
      this.todoList =[];
      this.idx = 0;
      localStorage.clear();
    }
  },
  created() {
    //페이지가 로딩될때 실행
    //로컬스토리지 세팅
    if(localStorage.length > 0){
      //로컬에 저장된 정보가 있는 경우 불러온다!
      for(let i=0; i<localStorage.length; i++){
        //localStorage.length 가 실제 보다 1많음
        if (localStorage.key(i) !== "loglevel:webpack-dev-server"){
          let str = localStorage[localStorage.key(i)];
          let obj = JSON.parse(str);
          this.todoList.push(obj);  
        }else{
        }
      }
      if(localStorage.length > 1){
        //입력순 sort
        this.todoList.sort(function(val1, val2){
          let x = val1.key;
          let y = val2.key;
          //0 또는 양수를 음수를 반환. 0:동일, 1 : 이상 반환은 무효. 숫자 대신 >사용 가능
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));   
        });
        //idx 맞추기
        this.idx = this.todoList[this.todoList.length-1].key + 1;
      }
    }
  },
  components: { 
    TodoInput,
    TodoList
  }
};
</script>
