<template>
    <div class="bx_ipt">  
        <!-- event v-on or @사용  ex) v-on:click @click -->
        <form @submit.prevent="addItem"> 
            <!-- @submit.prevent=... form 기본은 페이지를 리로드 하는데, 그것 x -->
            <!-- v-model 사용하여  input, textarea 엘리먼트에 양방향 데이터 가능 -->
            <!-- ref를 이용하여, input 조작 -->
            <!-- autofocus 사파리 작동안함 -->
            <input type="text" name="" id="" class="ipt" v-model="todo" ref="ipt" placeholder="할일을 입력해 주세요!!" autofocus="autofocus" v-focus>
            <button type="submit" class="btn_com">입력</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            todo:""
        }
    },
    methods:{
        addItem(){
            var str = (this.todo).trim();
            if(str !== ""){
                //위로 값 보내기! 
                this.$emit("addItemEvent", str); 
                this.todo = "";
            }else{
                this.todo = str;
                alert("할일을 입력해 주세요!!");
            }
            this.$refs.ipt.focus();
        }
    }
}
</script>