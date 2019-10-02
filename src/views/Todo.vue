<template>
  <div class="todo">
    <TodoInput @addItemEvent="addItem" />
    <TodoList :todoList="todoList" :cnt="cnt" :sort="sort" @toggleItemEvent="toggleItem" @resetEvent="resetAll" @deleteEvent="deleteItem" @chageModeEvent="chageMode" @modiEvent="modiItem" @chageSortEvent="chageSort" @updateListEvent="updateList" />
  </div>
</template>

<script>
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  data() {
    return {
      todoList: [],
      cnt: [],
      idx: 0,
      sort: 'regi',
    };
  },
  methods: {
    addItem($item) {
      const date = new Date();
      const today = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const data = {
        todo: $item,
        key: this.idx,
        date: today,
        isDone: false,
        isMode: false,
      };
      this.todoList.push(data);
      // localstorage 저장
      localStorage.setItem(data.key, JSON.stringify(data));
      this.chageSort(this.sort);
      this.idx += 1;
      this.getCnt();
    },
    toggleItem($key, $idx, $isDone) {
      this.todoList[$idx].isDone = $isDone;
      const data = this.todoList[$idx];
      localStorage.setItem($key, JSON.stringify(data));
      this.getCnt();
    },
    deleteItem($key, $idx) {
      this.todoList.splice($idx, 1);
      localStorage.removeItem($key);
      this.getCnt();
    },
    chageMode($key, $idx, $isMode) {
      if (!$isMode) {
        this.todoList.forEach((item) => {
          item.isMode = false;
        });
      }
      this.todoList[$idx].isMode = !$isMode;
      const data = this.todoList[$idx];
    },
    modiItem($key, $idx, $todo) {
      this.todoList[$idx].isMode = false;
      this.todoList[$idx].todo = $todo;
      const data = this.todoList[$idx];
      localStorage.setItem($key, JSON.stringify(data));
    },
    resetAll() {
      this.todoList = [];
      this.idx = 0;
      localStorage.clear();
      this.getCnt();
    },
    chageSort($type) {
      this.sort = $type;
      if (localStorage.length > 1) {
        // 등록순 & 최신순
        if ($type == 'regi' || $type == 'new') {
          this.todoList.sort((val1, val2) => {
            const x = new Date(val1.date).getTime();
            const y = new Date(val2.date).getTime();
            // 0 또는 양수를 음수를 반환. 0:동일, 1 : 이상 반환은 무효. 숫자 대신 >사용 가능
            if ($type == 'regi') // 등록순
            { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); } // 오름차순
            return ((x < y) ? 1 : ((x > y) ? -1 : 0)); // 내림차순
          });
        }else if ($type == 'abc') {
        // 가나다순
          this.todoList.sort((val1, val2) => {
            const x = val1.todo;
            const y = val2.todo;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          });
        }else if ($type == 'comp' || $type == 'ing') {
        // 완료순
          this.todoList.sort((val1, val2) => {
            const x = val1.isDone;
            const y = val2.isDone;
            const z = new Date(val1.date).getTime();
            const w = new Date(val2.date).getTime();
            if ($type == 'comp') // 완료순
            { return ((x < y) ? 1 : ((x > y) ? -1 : ((z > w) ? 1 : ((z > w) ? -1 : 0)))); } // 내림차순
            return ((x < y) ? -1 : ((x > y) ? 1 : ((z > w) ? 1 : ((z > w) ? -1 : 0)))); // 내림차순
          });
        }
      }
    },
    getCnt() {
      // cnt 세팅
      const cnt = {
        total: this.todoList.length,
        ing: 0,
        comp: 0,
      };
      this.todoList.forEach((item) => {
        item.isDone ? cnt.comp++ : cnt.ing++;
      });
      this.cnt = cnt;
    },
    updateList($list){
      this.todoList = $list;
    }
  },
  created() {
    // 페이지가 로딩될때 실행
    // 로컬스토리지 세팅
    if (localStorage.length > 0) {
      // 로컬에 저장된 정보가 있는 경우 불러온다!
      for (let i = 0; i < localStorage.length; i++) {
        // localStorage.length 가 실제 보다 1많음
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          const str = localStorage[localStorage.key(i)];
          const obj = JSON.parse(str);
          this.todoList.push(obj);
        }
      }
      this.chageSort('regi');
      this.getCnt();
      // idx 맞추기
      if(this.todoList.length > 0)
        this.idx = this.todoList[this.todoList.length - 1].key + 1;
    };
    
  },
  components: {
    TodoInput,
    TodoList
  },
};
</script>
