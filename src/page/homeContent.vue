<template>
    <div style="display: flex;flex-direction: column;">
        tab content--->
        <el-button @click="edit">edit</el-button>
        <el-button @click="queryDetail">queryDetail</el-button>
    </div>
</template>
<script>
    export default {
        name: 'homeContent',
        data() {
            return {}
        },
        methods: {
            edit(){
                this.$router.push('/edit');
            },
            queryDetail(){
                this.$router.push('/detail');
            }
        }
    }
</script>
<style>
</style>