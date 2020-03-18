<template>
    <div>
        <el-card class="xs_sc">
            xs
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'xs',
        inject: ['changeIndex'],
        mounted() {
            this.changeIndexMt2();
        },
        methods: {
            changeIndexMt2() {
                this.changeIndex(2)
            },
        }
    }
</script>
<style>
    .xs_sc {
        width: 84vw;
        height: 86vh;
    }
</style>