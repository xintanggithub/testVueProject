<template>
    <div element-loading-spinner="el-icon-loading" style="width: 100vw;height: 81vh;">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'book',
        inject: ['changeIndex1'],
        data() {
            return {
            }
        },
        mounted() {
            this.changeThree();
        },
        methods: {
            changeThree() {
                this.changeIndex1(3);
            },
        }
    }

</script>
<style>
    .detail_content_a_style {
        width: 93vw;
        height: auto;
        max-height: 80vh;
        background-color: rgba(255, 255, 255, 0.5);
        overflow-y: scroll;
    }

    .list_root_style {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap
    }
    .marginLeftSt{
        margin-left: 8vw;
    }
</style>