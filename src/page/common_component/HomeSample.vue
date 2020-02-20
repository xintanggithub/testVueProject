<template>
    <div>
        <div style="width: 49.2vw;height: 40vh;background-color: antiquewhite;margin-left: 2vw;margin-top: 1vh;">
            <div style="width: 100%;height: 100%;background-color: beige;">
            </div>
        </div>
        <el-input style="width: 100vw;" type="textarea" :rows="20" placeholder="请输入内容" v-model="htmlValue">
        </el-input>
        <el-button @click="submit">确定</el-button>
    </div>
</template>
<script>
    export default {
        name: 'HomeSample',
        data() {
            return {
                htmlValue: ""
            }
        },
        methods: {
            submit() {

            },
        }
    }

</script>