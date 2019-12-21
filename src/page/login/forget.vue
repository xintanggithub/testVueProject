<template>
    <div>
        <div class="rootDivForget">

            <el-carousel :interval="4000" type="card" height="40vh" style="width: 80%;margin-top: 3vh;">
                <el-carousel-item v-for="item in 6" :key="item">
                    <div style="width: 100%;height: 100%;background-color: antiquewhite;">
                        {{item}}
                    </div>
                </el-carousel-item>
            </el-carousel>

        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'

    export default {
        components: {myFooter},
        name: 'forget'
    }

</script>
<style>
    .rootDivForget {
        width: 100vw;
        height: 97vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    /*↓*/
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