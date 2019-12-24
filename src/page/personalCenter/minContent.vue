<template>
    <div v-loading="loading">
        <div style="width: 84vw;margin-left: 8vw;padding-top: 4vh;">
            <div style="width: 100%;height: 81vh;box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);background-color: white;border-radius: 5px;">
                <!--head-->
                <div style="margin-left: 6vh;padding-top:6vh;display: flex;flex-direction: row;">
                    <img :src="userInfo.img" style="width: 23vh;height: 23vh;border-radius: 50%;"/>
                    <div style="height: 23vh;display: flex;flex-direction: column;justify-content: center;">
                        <div>
                            {{userInfo.name}}
                        </div>
                        <div>
                            {{userInfo.userCode}}
                        </div>
                        <div>
                            {{userInfo.id}}
                        </div>
                        <div>
                            {{userData.createTime}}
                        </div>
                    </div>
                </div>
                <!--content-->
                <div style="margin-left: 6vh;display: flex;flex-direction: column;">
                    <div>
                        11111
                    </div>
                    <div>
                        22222
                    </div>
                    <div>
                        33333
                    </div>
                    <div>
                        44444
                    </div>
                    <div>
                        框框
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getLoginInfo,} from '../../utils/loginStatus'
    import {queryUserInfo} from '../../api/login'

    export default {
        name: 'minContent',
        data() {
            return {
                loading: false,
                userInfo: {},
                userData: {}
            }
        },
        created() {
            this.userInfo = getLoginInfo();
            console.log('userInfo ===>', this.userInfo);
            this.queryUserInfoMt();
        },
        methods: {
            async queryUserInfoMt() {
                this.loading = true;
                await queryUserInfo({'userId': this.userInfo.id}).then(info => {
                    this.loading = false;
                    console.log("queryUserInfo success ===>", info.data.data);
                    this.userData = info.data.data;
                }).catch(() => {
                    this.loading = false;
                });
            }
        }
    }

</script>
<style>

</style>