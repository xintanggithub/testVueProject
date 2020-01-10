<template>
    <div>
        <div style="width: 100vw;height: 8vh;background-color: antiquewhite;display: flex;flex-direction: row;align-items: center;">
            <el-button type="danger" class="marginLeftSt" @click="allbook">全部</el-button>
            <el-button type="danger" >我的</el-button>
        </div>
        myBook
    </div>
</template>
<script>
    export default {
        name: "bookMyBook",
        data() {
            return {}
        },
        methods: {
            allbook() {
                if (this.defaultIndex === 1) {
                    return
                }
                this.defaultIndex = 1;
                this.$router.push({name: 'bookAll'});
            }
        },
    }
</script>
<style>

</style>