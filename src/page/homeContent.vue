<template>
    <div style="display: flex;flex-direction: column;padding-top: 2vh; width:100vw;height: auto;max-height: 88vh;overflow-y: scroll;">
        <div style="padding-left: 0.5vw;padding-right: 0.5vw;">
            <el-carousel :interval="4000" type="card" height="40vh">
                <el-carousel-item v-for="item in topList" :key="item">
                    <div v-html="item.content">
                        {{item.content}}
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div>

            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'homeContent',
        data() {
            return {
                topList: [
                    {content: "66666<span>66666</span><el-button>66666</el-button>"},
                    {content: "66666<span>66666</span><el-button>66666</el-button>"},
                    {content: "66666<span>66666</span><el-button>66666</el-button>"},
                ]
            }
        },
        methods: {}
    }
</script>
<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>