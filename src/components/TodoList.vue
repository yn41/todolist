<template>
    <div class="wrap">
        <ul class="lst">
            <li v-for="(item, i) in props" :key="item.key" v-bind:class="item.isDone?'done':''">
                <div v-if="!item.isMode">
                    <span @click="toggleItem(item.key, i,item.isDone)">{{item.todo}}</span>
                    <button type="button" class="btn_modi"  @click="chageMode(item.key, i, item.isMode)">수정</button>
                    <button type="button" class="btn_delete" @click="deleteItem(item.key, i)">삭제</button>
                </div>
                <div v-else>
                    <!-- form 2개 이상 일때 해결 방법을 못찾음 -->
                    <input type="text" name="" id="" class="ipt" placeholder="할일을 입력해주세요!"  v-focus v-bind:value="item.todo" ref="todo_modi" @keyup.enter="modiItem(item.key, i)">
                    <button type="button" class="btn_cancle" @click="chageMode(item.key, i, item.isMode)"><span>취소</span></button>
                    <button type="button" class="btn_com" @click="modiItem(item.key, i)">수정 완료</button>
                </div>
            </li>
        </ul>
        <p class="bx_total">총 {{props.length}}</p>
        <button class="btn_reset" @click="resetAll">Reset</button>
    </div>
</template>
<script> 
export default {
    props:["props"],
    methods:{
        toggleItem($key, $idx, $isDone){
            event.stopPropagation();
            // let state ="";
            $isDone = ($isDone)?false:true;
            this.$emit("toggleItemEvent", $key, $idx, $isDone);
        },
        chageMode($key, $idx, $isMode){
            this.$emit("chageModeEvent", $key, $idx, $isMode);
        },
        modiItem($key, $idx){
            this.$emit("modiEvent", $key, $idx, this.$refs.todo_modi[0].value);
        },
        deleteItem($key, $idx){
            this.$emit("deleteEvent", $key, $idx);
        },
        resetAll(){
            this.$emit("resetEvent");
        }
    },
}
</script>
