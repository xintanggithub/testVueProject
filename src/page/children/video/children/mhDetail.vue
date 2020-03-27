<template>
    <div>
        <div class="dt_mh_t">
            <div class="mh_dt_lg_ml" @click="goHome">
                <img src="../../../../res/img/logo_icon.png" class="logo_rt"/>
            </div>
            <my-user hideLoginOut></my-user>
            <div style="position: absolute;right: 3vh;top: 2.5vh;">
                <el-button type="danger" @click="goBack" icon="el-icon-close" circle></el-button>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myUser from '../../../common_component/user/myUser'
    import myFooter from '../../../common_component/foot/footer'

    export default {
        components: {myFooter, myUser},
        name: 'mhDetail',
        inject: ['closeMh'],
        data() {
            return {
                itemData: {},
            }
        },
        methods: {
            loadDetail(itemData) {
                console.log("itemData ===>", itemData);
                this.itemData = itemData;
            },
            goBack() {
                console.log("22323");
                try {
                    this.closeMh();
                } catch (e) {
                    console.log(e)
                }
            },
            goHome() {
                this.$router.push('/')
            },
        }
    }
</script>
<style>
    .dt_mh_t {
        width: 100vw;
        height: 9vh;
        display: flex;
        margin-top: -5vh;
        flex-direction: row;
        align-items: center;
        background-color: white;
    }

    .mh_dt_lg_ml {
        margin-left: 8vw;
    }

    .logo_rt {
        max-height: 4.5vh;
        margin-top: 0.4vh;
    }
</style>