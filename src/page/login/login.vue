<template>
    <div>
        <div class="rootDivLogin">
            <div class="childrenLogin">
                <el-card class="box-card" style="width: 23vw;height: 45vh;">
                    <div class="loginBox">
                        <span class="loginTitle"><b class="fontStyle">登录</b></span>
                        <div class="lines"></div>
                        <div class="inputStyle">
                            <img src="../../res/img/user_center.png" style="width: 3.5vh;height: 3.5vh;">
                            <el-autocomplete class="inline-input inputMg"
                                             v-model="loginForm.userCode"
                                             :fetch-suggestions="querySearch"
                                             placeholder="请输入账号"
                                             :trigger-on-focus="true"
                                             @select="handleSelect"/>
                        </div>
                        <div class="inputStyle">
                            <img src="../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
                            <el-input class="inline-input inputMg"
                                      v-model="loginForm.password"
                                      placeholder="请输入密码">
                                <el-button slot="append" @click="showOrHide"
                                           :icon="showPassword?'el-icon-search':'el-icon-date'"></el-button>
                            </el-input>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'

    export default {
        components: {myFooter},
        name: 'login',
        data() {
            return {
                //联想数据
                restaurants: [
                    {value: "970827351@qq.com", password: "22222"}
                ],
                showPassword: false,
                loginForm: {
                    userCode: '',
                    password: ''
                },
            }
        },
        methods: {
            handleSelect(item) {
                //选择联想的值
                console.log(item);
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            showOrHide() {
                this.showPassword = !this.showPassword;
            }
        }
    }
</script>

<style>

    .inputMg {
        margin-left: 1vh;
        width: 18vw;
    }

    .loginBox {
        display: flex;
        flex-direction: column;
    }

    .fontStyle {
        color: #606266;
        font-size: 1.3rem;
    }

    .loginTitle {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .rootDivLogin {
        width: 100vw;
        height: 97vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .childrenLogin {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 97vh;
    }

    .lines {
        background-color: #F2F6FC;
        width: 100%;
        height: 1px;
        margin-top: 2vh;
    }

    .inputStyle {
        margin-top: 4vh;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

</style>