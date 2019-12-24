<template>
    <div>
        <div class="rootDivLogin">

            <transition name="el-zoom-in-center">
                <div v-show="cardShow" class="childrenLogin">
                    <div class="closeLogin">
                        <img @click="close" src="../../res/img/close.png" class="closeImg">
                    </div>
                    <el-card v-loading="loading" class="box-card"
                             style="width: 22vw;height: 45vh;background-color: #c2e8f5;">
                        <div class="loginBox">
                        <span class="loginTitle">
                            <img src="../../res/img/logo_icon.png" style="height: 5.5vh;">
                        </span>
                            <div class="lines"></div>
                            <el-form :rules="rules"
                                     :model="loginForm"
                                     ref="loginForm"
                                     label-width="0vh"
                                     style="margin-top:20px"
                                     label-position="left"
                            >
                                <div class="inputStyle">
                                    <el-form-item
                                            label=' '
                                            prop="userCode"
                                    >
                                        <div class="fromChildren">
                                            <img src="../../res/img/user_center.png"
                                                 style="width: 3.5vh;height: 3.5vh;">
                                            <el-autocomplete class="inline-input inputMg"
                                                             v-model="loginForm.userCode"
                                                             :fetch-suggestions="querySearch"
                                                             placeholder="请输入账号"
                                                             :trigger-on-focus="false"
                                                             ref="inputUserCode"
                                                             prop="userCode"
                                                             @select="handleSelect"/>
                                        </div>
                                    </el-form-item>
                                </div>
                                <div class="inputStyle">
                                    <el-form-item
                                            label=' '
                                            prop="password"
                                    >
                                        <div class="fromChildren">
                                            <img src="../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
                                            <el-input class="inline-input inputMg"
                                                      v-model="loginForm.password"
                                                      :type="showPassword?'text':'password'"
                                                      prop="password"
                                                      placeholder="请输入密码">
                                                <el-button slot="append" @click="showOrHide"
                                                           :icon="showPassword?'el-icon-open-export':'el-icon-close-export'"></el-button>
                                            </el-input>
                                        </div>
                                    </el-form-item>
                                </div>
                                <div style="display: flex;flex-direction: column;">
                                    <div style="width: 100%;display: flex;flex-direction: row;align-items: center;margin-left: 3.3vw;margin-top: 1vh;">
                                        <span @click="register"><u style="color: #909399;cursor:pointer;">注册</u></span>
                                        <span @click="forget"><u
                                                style="color: #909399;margin-left: 2vw;cursor:pointer;">忘记密码</u></span>
                                    </div>
                                    <div @click="loginMt"
                                         style="display: flex;flex-direction: row-reverse;width: 100%;align-items: center;margin-top: 2vh;cursor: pointer;">
                                        <img src="../../res/img/log-in.png" style="height: 3.2vh;width: 3.8vh;">
                                        <span style="cursor: pointer;color: #606266">登录</span>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </el-card>
                </div>
            </transition>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'
    import {addLoginList, getLoginListCache, loginIn} from '../../utils/loginStatus'
    import {login, queryUserInfo} from '../../api/login'

    export default {
        components: {myFooter},
        name: 'login',
        data() {
            return {
                cardShow: false,
                loading: false,
                //联想数据
                restaurants: [],
                showPassword: false,
                loginForm: {
                    userCode: '',
                    password: ''
                },
                rules: {
                    userCode: [{
                        required: true, message: "账号不可为空", trigger: "blur"
                    }],
                    password: [{
                        required: true, message: "密码不可为空", trigger: "blur"
                    }, {
                        min: 6, max: 20, message: "密码长度不足，最少6位", trigger: "blur"
                    }]
                }
            }
        },
        created() {
            let v = this;
            setTimeout(() => {
                v.cardShow = true
            }, 200);
            this.notifyData();
        },
        methods: {
            forget() {
                this.$router.push({name: 'forget'});
            },
            register() {
                this.$router.push({name: 'register'});
            },
            notifyData() {
                let cache = getLoginListCache();
                let i;
                this.restaurants = [];
                for (i = 0; i < cache.length; i++) {
                    const pp = {};
                    pp['value'] = cache[i].userCode;
                    pp['password'] = cache[i].password;
                    this.restaurants.push(pp);
                }
            },
            handleSelect(item) {
                this.loginForm.password = item.password;
                this.$refs.inputUserCode.focus();
                //loginForm
            },
            querySearch(queryString, cb) {
                const restaurants = this.restaurants;
                const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            showOrHide() {
                this.showPassword = !this.showPassword;
            },
            loginMt() {
                let v = this;
                this.$refs.loginForm.validate(async valid => {
                    console.log("valid===>", valid);
                    if (valid) {
                        this.loading = true;
                        const params = {};
                        params['password'] = this.loginForm.password;
                        params['userCode'] = this.loginForm.userCode;
                        const res = await login(params).then(async data => {
                            console.log("login success ===>", data.data.data.userId);
                            const userInfo = await queryUserInfo({'userId': data.data.data.userId}).then(info => {
                                console.log("queryUserInfo success ===>", info.data.data);
                                loginIn(info.data.data.userId, info.data.data.userName, info.data.data.img, v.loginForm.userCode);
                                v.$router.go(-1);
                            }).catch(() => {
                                this.loading = false;
                            });
                            addLoginList(this.loginForm.userCode, this.loginForm.password);
                            this.notifyData();
                            this.$refs.loginForm.resetFields();
                        }).catch(() => {
                            this.loading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            close() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
    .fromChildren {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .el-icon-login-export:before {
        content: "　";
        font-size: 16px;
        visibility: hidden;
    }

    .el-icon-close-export {
        background: url('../../res/img/eye_close.png') center no-repeat;
        background-size: cover;
    }

    .el-icon-close-export:before {
        content: "　";
        font-size: 16px;
        visibility: hidden;
    }

    .el-icon-open-export {
        background: url('../../res/img/eye_open.png') center no-repeat;
        background-size: cover;
    }

    .el-icon-open-export:before {
        content: "　";
        font-size: 16px;
        visibility: hidden;
    }

    .inputMg {
        margin-left: 1vh;
        width: 16vw;
    }

    .loginBox {
        display: flex;
        flex-direction: column;
    }

    .loginTitle {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 4vh;
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
        margin-top: 1vh;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .closeLogin {
        display: flex;
        flex-direction: row-reverse;
        width: 24vw
    }

    .closeImg {
        width: 5vh;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);
        background-color: transparent;
        border-radius: 50%;
    }

</style>