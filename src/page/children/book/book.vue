<template>
    <div element-loading-spinner="el-icon-loading"
         style="width: 100vw;height: 81vh;">
        <div style="width: 100vw;height: 8vh;background-color: antiquewhite;">
            <el-button type="danger" class="editLog editCommit" @click="all">全部</el-button>
            <el-button type="danger" class="editLog editCommit" @click="my">我的</el-button>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'book',
        data() {
            return {
                defaultIndex: 1
            }
        },
        methods: {
            all() {
                if (this.defaultIndex === 1) {
                    return
                }
                this.defaultIndex = 1;
                this.$router.push({name: 'bookAll'});
            },
            my() {
                if (this.defaultIndex === 2) {
                    return
                }
                this.defaultIndex = 2;
                this.$router.push({name: 'bookMyBook'});
            }
        }
    }

</script>
<style>
    .detail_content_a_style {
        width: 94vw;
        height: 80vh;
        background-color: rgba(255, 255, 255, 0.5);
        overflow-y: scroll;
    }

    .list_root_style {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap
    }
</style>