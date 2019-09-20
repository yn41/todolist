<template>
    <div class="bx_ipt">  
        <!-- event v-on or @사용  ex) v-on:click @click -->
        <form @submit.prevent="addItem"> 
            <!-- @submit.prevent=... form 기본은 페이지를 리로드 하는데, 그것 x -->
            <!-- v-model 사용하여  input, textarea 엘리먼트에 양방향 데이터 가능 -->
            <input type="text" name="" id="" class="ipt" v-model="newItem" placeholder="할일을 입력해 주세요!!" autofocus="autofocus">
            <button type="submit" class="btn_com">입력</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            newItem:""
        }
    },
    methods:{
        addItem(){
            var str = (this.newItem).trim();
            if(str !== ""){
                //위로 값 보내기! 
                this.$emit("addItemEvent", str); 
            }else{
                thi.newItem.focus();
                alert("할일을 입력해 주세요!!");
            }
        }
    }
}
</script>