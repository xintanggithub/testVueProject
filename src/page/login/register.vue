<template>
    <div>
        <div class="rootDivRegister">
            <transition name="el-zoom-in-top">
                <div v-show="cardShow" class="childrenRegister">
                    <div class="closeRegister">
                        <img @click="close" src="../../res/img/close.png" class="closeRegisterImg">
                    </div>

                    <el-card v-loading="loading" class="box-card cardStyle" style="">
                        <div class="loginBox">
                            <span class="loginTitle">
                                <img src="../../res/img/logo_icon.png" style="height: 5.5vh;">
                            </span>
                            <div class="lines"></div>
                            <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="0px"
                                     style="margin-top: 3vh;">
                                <!--用户名-->
                                <el-form-item label=' ' prop="userCode">
                                    <div class="fromChildren">
                                        <img src="../../res/img/user_center.png" style="width: 3.5vh;height: 3.5vh;">
                                        <el-input placeholder="请输入邮箱" class="inputMg"
                                                  v-model="registerForm.userCode"></el-input>
                                    </div>
                                </el-form-item>
                                <!--密码-->
                                <el-form-item label=" " prop="password">
                                    <div class="fromChildren">
                                        <img src="../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
                                        <el-input class="inline-input inputMg"
                                                  v-model="registerForm.password"
                                                  :type="showPassword?'text':'password'"
                                                  prop="password"
                                                  autocomplete="off"
                                                  placeholder="请输入密码">
                                            <el-button slot="append" @click="showOrHide"
                                                       :icon="showPassword?'el-icon-open-export':'el-icon-close-export'"></el-button>
                                        </el-input>
                                    </div>
                                </el-form-item>
                                <!--确认密码-->
                                <el-form-item label=" " prop="checkPassword">
                                    <div class="fromChildren">
                                        <img src="../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
                                        <el-input class="inline-input inputMg"
                                                  v-model="registerForm.checkPassword"
                                                  :type="showCheckPassword?'text':'password'"
                                                  prop="password"
                                                  autocomplete="off"
                                                  placeholder="请再次输入密码">
                                            <el-button slot="append" @click="showCheckPassword=!showCheckPassword"
                                                       :icon="showCheckPassword?'el-icon-open-export':'el-icon-close-export'"></el-button>
                                        </el-input>
                                    </div>
                                </el-form-item>
                                <!--验证码-->
                                <el-form-item label=" " prop="verifyCode">
                                    <div class="fromChildren" style="width: 16vw;margin-left: 3.1vw;">
                                        <el-input class="inline-input"
                                                  style="width: 17vh;"
                                                  v-model="registerForm.verifyCode"
                                                  prop="password"
                                                  autocomplete="off"
                                                  placeholder="请输入验证码">
                                        </el-input>
                                        <el-button :disabled="show" style="width: 15vh;" type=""
                                                   :loading="loadingVerify"
                                                   @click="sendVerify">{{show?count+'s':'发送验证码'}}
                                        </el-button>
                                    </div>
                                </el-form-item>
                                <div style="width: 100%;display: flex;flex-direction: row;justify-content: center">
                                    <span style="width:40%;display: flex;flex-direction: row-reverse;cursor: pointer;"
                                          @click="login_th"><u>已有账号？</u></span>
                                    <div @click="registerMt"
                                         style="width: 60%;display: flex;flex-direction: row-reverse;align-items: center;margin-top: 3vh;cursor: pointer;">
                                        <img src="../../res/img/log-in.png" style="height: 3.2vh;width: 3.8vh;">
                                        确认注册
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
    import {checkRegister, register, sendVerificationCode} from '../../api/login'

    export default {
        components: {myFooter},
        name: 'register',
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkPassword !== '') {
                        this.$refs.registerForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let checkEmail = (rule, value, callback) => {
                const myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (!myreg.test(value)) {
                    callback(new Error("请输入有效的邮箱号"))
                } else {
                    callback();
                }
            };
            return {
                showPassword: false,
                showCheckPassword: false,
                loadingVerify: false,
                show: false,
                count: "",
                timer: null,
                registerForm: {
                    userCode: '',
                    password: '',
                    checkPassword: '',
                    verifyCode: ''
                },
                rules: {
                    userCode: [
                        {required: true, message: "账号不可为空", trigger: "blur"},
                        {validator: checkEmail, trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, max: 20, message: "密码长度不足，最少6位", trigger: "blur"}
                    ],
                    checkPassword: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 6, max: 20, message: "密码长度不足，最少6位", trigger: "blur"}
                    ],
                    verifyCode: [
                        {required: false, message: "验证码不能为空", trigger: "blur"},
                        {min: 6, max: 6, message: "请输入6位数验证码", trigger: "blur"}
                    ]
                },
                cardShow: false,
                loading: false
            }
        },
        created() {
            let v = this;
            setTimeout(() => {
                v.cardShow = true
            }, 200);
        },
        methods: {
            registerMt() {
                let v = this;
                this.$refs.registerForm.validate(async valid => {
                    if (valid) {
                        if (this.registerForm.verifyCode === '' || this.registerForm.verifyCode === null ||
                            this.registerForm.verifyCode === undefined || this.registerForm.verifyCode === 'undefined') {
                            this.$refs.registerForm.fields[3].error = "请输入验证码";
                        } else {
                            let regEn = /^[0-9]*$/;
                            if (this.registerForm.verifyCode.length !== 6 || !regEn.test(this.registerForm.verifyCode)) {
                                this.$refs.registerForm.fields[3].error = "请输入正确的验证码";
                            } else {
                                this.loading = true;
                                const params = {};
                                params['password'] = this.registerForm.password;
                                params['userCode'] = this.registerForm.userCode;
                                params['verificationCode'] = this.registerForm.verifyCode;
                                //注册
                                await register(params).then(result => {
                                    console.log('register result===>', result.data);
                                    this.loading = false;
                                    v.close();
                                }).catch(() => {
                                    this.loading = false;
                                })
                            }
                        }
                    } else {
                        return false;
                    }
                });
            },
            sendVerify() {
                let v = this;
                const h = this.$createElement;
                this.$refs.registerForm.validate(async valid => {
                    if (valid) {
                        this.loadingVerify = true;
                        await checkRegister({'userCode': this.registerForm.userCode}).then(async info => {
                            console.log("checkRegister success ===>", info.data.data);
                            if (info.data.data) {
                                this.loadingVerify = false;
                                //已注册
                                v.$notify({
                                    title: '提示：',
                                    type: 'warning',
                                    message: h('i', {style: 'color: black'}, '该邮箱已被注册，请使用其他邮箱注册或使用该邮箱登录~')
                                });
                            } else {
                                await sendVerificationCode({'userCode': this.registerForm.userCode}).then(send => {
                                    console.log("sendVerificationCode success ===>", send.data.data);
                                    if (!v.timer) {
                                        const TIME_COUNT = 60;
                                        v.count = TIME_COUNT;
                                        v.show = true;
                                        v.timer = setInterval(() => {
                                            if (v.count > 0 && v.count <= TIME_COUNT) {
                                                v.count--;
                                            } else {
                                                v.show = false;
                                                clearInterval(v.timer);
                                                v.timer = null;
                                            }
                                        }, 1000);
                                    }
                                    v.loadingVerify = false;
                                }).catch(() => {
                                    v.loadingVerify = false;
                                })
                            }
                        }).catch(() => {
                            this.loadingVerify = false;
                        });

                    } else {
                        return false;
                    }
                });
            },
            showOrHide() {
                this.showPassword = !this.showPassword;
            },
            close() {
                this.$router.go(-1);
            },
            login_th() {
                this.$router.push("/login")
            }
        }
    }
</script>
<style>
    .inputMg {
        margin-left: 1vh;
        width: 16vw;
    }

    .fromChildren {
        display: flex;
        flex-direction: row;
        align-items: center;
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

    .lines {
        background-color: #F2F6FC;
        width: 100%;
        height: 1px;
        margin-top: 2vh;
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

    .cardStyle {
        width: 22vw;
        height: 53vh;
        background-color: #c2e8f5;
    }

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