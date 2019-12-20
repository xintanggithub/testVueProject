<template>
    <div>
        <div class="rootDivRegister">
            <transition name="el-zoom-in-top">
                <div v-show="cardShow"  class="childrenRegister">
                    <div class="closeRegister">
                        <img @click="close" src="../../res/img/close.png" class="closeRegisterImg">
                    </div>

                    <el-card v-show="true" v-loading="loading" class="box-card"
                             style="width: 22vw;height: 45vh;background-color: #c2e8f5;">


                    </el-card>
                </div>
            </transition>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'

    export default {
        components: {myFooter},
        name: 'register',
        data() {
            return {
                cardShow: false,
            }
        },
        created() {
            let v = this;
            setTimeout(() => {
                v.cardShow = true
            }, 200);
        },
        methods: {}
    }
</script>
<style>
    .rootDivRegister {
        width: 100vw;
        height: 97vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .childrenRegister {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 97vh;
    }

    .closeRegister {
        display: flex;
        flex-direction: row-reverse;
        width: 24vw
    }

    .closeRegisterImg {
        width: 5vh;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);
        background-color: transparent;
        border-radius: 50%;
    }
</style>