<template>
    <div>
        <div v-if="todoList.length < 1" class="no_data">
            등록된 할일이 없습니다.
        </div>
        <div class="content" v-else>
            <div class="sort">
                <select name="slct" id="#sort" class="slct" @change="chageSort($event.target.value,'slct')" v-model="slct">
                    <option value="regi">등록순</option>
                    <option value="new">최신순</option>
                    <option value="abc">가나다순</option>
                    <option value="comp">완료순</option>
                    <option value="ing">진행순</option>
                    <option value="user">사용자모드</option>
                </select>
            </div>
            <draggable class="lst" ghost-class="ghost" v-model="list" @start="chageSort('user')" @end="updateList"> 
                <div class="unit" v-for="(item, i) in todoList" :key="item.key" v-bind:class="item.isDone?'done':''">
                    <div v-if="!item.isMode" class="view"  @click="toggleItem(item.key, i,item.isDone)">
                        <span class="txt">{{item.todo}}</span>
                        <button type="button" class="btn_modi"  @click="chageMode(item.key, i, item.isMode)">수정</button>
                        <button type="button" class="btn_delete" @click="deleteItem(item.key, i)">삭제</button>
                        <span class="date">
                            {{item.date}}
                        </span>
                    </div>
                    <div v-else class="modi">
                        <!-- form 2개 이상 일때 해결 방법을 못찾음 -->
                        <form @submit.prevent="modiItem(item.key, i)">
                          <input type="text" name="" id="" class="ipt" placeholder="할일을 입력해주세요!"  v-focus v-bind:value="item.todo" ref="todo_modi" >
                          <button type="button" class="btn_cancle" @click="chageMode(item.key, i, item.isMode)"><span>취소</span></button>
                          <button type="submit" class="btn_com" @click="modiItem(item.key, i)">수정 완료</button>
                        </form>
                    </div>
                </div>
            </draggable>
            <p class="bx_total">총 {{cnt.total}}개, 완료 {{cnt.comp}}개, 진행 {{cnt.ing}}개</p>
            <button class="btn_reset" @click="resetAll">Reset</button>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      list:this.todoList,
      slct:this.sort,
    };
  },
  props: ['todoList', 'cnt', 'sort'],
  methods: {
    toggleItem($key, $idx, $isDone) {
      event.stopPropagation();
      // let state ="";
      $isDone = !($isDone);
      this.$emit('toggleItemEvent', $key, $idx, $isDone);
    },
    chageMode($key, $idx, $isMode) {
      event.stopPropagation();
      this.$emit('chageModeEvent', $key, $idx, $isMode);
    },
    modiItem($key, $idx) {
      event.stopPropagation();
      this.$emit('modiEvent', $key, $idx, this.$refs.todo_modi[0].value);
    },
    deleteItem($key, $idx) {
      event.stopPropagation();
      this.$emit('deleteEvent', $key, $idx);
    },
    resetAll() {
      event.stopPropagation();
      this.$emit('resetEvent');
    },
    chageSort($val, $mode) { 
      if($val == "user" && $mode=="slct"){
        alert("사용자 모드는 드래그앤드랍시 자동 선택 됩니다.");
        this.slct = this.sort;
      }
      else this.$emit('chageSortEvent', $val);
    },
    updateList(){
      this.$emit('updateListEvent', this.list);
      this.slct = this.sort
    }
  },
  components:{
    draggable
  },
};
</script>
