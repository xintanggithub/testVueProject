<template>
    <div>
        <div class="rootDivForget">
            <transition name="el-fade-in">
                <div v-show="cardShow" class="childrenLogin">
                    <div class="closeForget">
                        <img @click="close" src="../../res/img/close.png" class="closeImg">
                    </div>
                    <el-card class="box-card"
                             style="width: 50vw;height: 45vh;background-color: #c2e8f5;">

                        <el-steps :active="active" finish-status="success" style="margin-top: 3vh;margin-left: 0.5vw;">
                            <el-step title="填写账号"></el-step>
                            <el-step title="验证"></el-step>
                            <el-step title="重置"></el-step>
                        </el-steps>

                        <div v-show="active===0">
                            <div class="forgerTip">
                                <span class="forgerTipChildren">
                                1.请填写需要找回密码的邮箱<br/>
                                2.点击下一步<br/>
                                </span>
                            </div>
                            <div class="fromStyle">
                                <el-form :rules="rules" :model="userCodeFrom" ref="forgetUserCodeForm" label-width="0vh"
                                         style="margin-top:20px" label-position="left">
                                    <el-form-item label=' ' prop="userCode">
                                        <div class="fromChildren">
                                            <img src="../../res/img/user_center.png"
                                                 style="width: 3.5vh;height: 3.5vh;">
                                            <el-input class="inline-input inputMg"
                                                      v-model="userCodeFrom.userCode"
                                                      placeholder="请输入账号/邮箱号"
                                                      prop="userCode"/>
                                            <el-button :loading="sendVerifyCodeLoading" @click="userCodeNext">
                                                下一步
                                            </el-button>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>

                        <div v-show="active===1">
                            <div class="forgerTip">
                                <span class="forgerTipChildren">
                                验证码已经发送到您的邮箱，请注意查收<br/><br/>
                                1.请输入邮件内的验证码<br/>
                                2.点击下一步<br/>
                                </span>
                            </div>
                            <div class="fromStyle">
                                <el-form :rules="rules2" :model="verifyCodeFrom" ref="verifyCodeFrom" label-width="0vh"
                                         style="margin-top:20px" label-position="left">
                                    <el-form-item label=' ' prop="verifyCode">
                                        <div class="fromChildren">
                                            <img src="../../res/img/verifycide.png" style="width: 3.5vh;height: 3.5vh;">
                                            <el-input class="inline-input inputMg"
                                                      v-model="verifyCodeFrom.verifyCode"
                                                      placeholder="请输入验证码"
                                                      prop="userCode"/>
                                            <el-button :loading="checkVerifyCodeLoading" @click="verifyCodeNext">
                                                下一步
                                            </el-button>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>

                        <div v-show="active===2">
                            <div class="forgerTip">
                                <span class="forgerTipChildren">
                                    1.请输入您的新密码<br/>
                                    2.点击重置按钮以完成密码找回
                                </span>
                            </div>
                            <div class="fromStyle">
                                <el-form ref="changeFrom" :rules="rules3" :model="changePasswordFrom">
                                    <el-form-item label=" " prop="password">
                                        <div class="fromChildren">
                                            <img src="../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
                                            <el-input class="inline-input inputMg"
                                                      v-model="changePasswordFrom.password"
                                                      :type="showPassword?'text':'password'"
                                                      prop="password"
                                                      autocomplete="off"
                                                      placeholder="请输入密码">
                                                <el-button slot="append" @click="showPassword=!showPassword"
                                                           :icon="showPassword?'el-icon-open-export':'el-icon-close-export'"></el-button>
                                            </el-input>
                                            <el-button
                                                    style="border-color: transparent;background-color:transparent;
                                                    color: transparent;cursor: default;">
                                                重置密码
                                            </el-button>
                                        </div>
                                    </el-form-item>
                                    <!--确认密码-->
                                    <el-form-item label=" " prop="checkPassword">
                                        <div class="fromChildren">
                                            <img src="../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
                                            <el-input class="inline-input inputMg"
                                                      v-model="changePasswordFrom.checkPassword"
                                                      :type="showCheckPassword?'text':'password'"
                                                      prop="password"
                                                      autocomplete="off"
                                                      placeholder="请再次输入密码">
                                                <el-button slot="append" @click="showCheckPassword=!showCheckPassword"
                                                           :icon="showCheckPassword?'el-icon-open-export':'el-icon-close-export'"></el-button>
                                            </el-input>
                                            <el-button :loading="resetLoading" @click="resetPassword">
                                                重置密码
                                            </el-button>
                                        </div>
                                    </el-form-item>
                                </el-form>
                            </div>

                        </div>
                        <div v-show="active===3">
                            <div class="forgerTip">
                                <span class="forgerTipChildren">
                                    恭喜您！密码重置完成
                                </span>
                            </div>
                            <div class="fromStyle">
                                <el-button type="success" style="margin-top: 5vh;" @click="close" round>完　　成</el-button>
                            </div>
                        </div>
                        <!--<el-button @click="next">next</el-button>-->
                    </el-card>
                </div>

            </transition>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'
    import {checkRegister, checkVerificationCode, sendVerificationCode, updatePassword} from '../../api/login'

    export default {
        components: {myFooter},
        name: 'forget',
        data() {
            let checkEmail = (rule, value, callback) => {
                const myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if (!myreg.test(value)) {
                    callback(new Error("请输入有效的邮箱号"))
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.changePasswordFrom.checkPassword !== '') {
                        this.$refs.changeFrom.validateField('checkPassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.changePasswordFrom.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                resetLoading: false,
                showPassword: false,
                showCheckPassword: false,
                cardShow: false,
                active: 0,
                sendVerifyCodeLoading: false,
                checkVerifyCodeLoading: false,
                changePasswordFrom: {
                    password: '',
                    checkPassword: ''
                },
                verifyCodeFrom: {
                    verifyCode: ''
                },
                userCodeFrom: {
                    userCode: ''
                },
                rules: {
                    userCode: [
                        {required: true, message: "账号不可为空", trigger: "blur"},
                        {validator: checkEmail, trigger: 'blur'}
                    ]
                },
                rules2: {
                    verifyCode: [
                        {required: true, message: "验证码不能为空", trigger: "blur"},
                        {min: 6, max: 6, message: "请输入6位数验证码", trigger: "blur"}
                    ]
                },
                rules3: {
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, max: 20, message: "密码长度不足，最少6位", trigger: "blur"}
                    ],
                    checkPassword: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 6, max: 20, message: "密码长度不足，最少6位", trigger: "blur"}
                    ]
                }
            }
        },
        created() {
            let v = this;
            setTimeout(() => {
                v.cardShow = true
            }, 200);
        },
        methods: {
            resetPassword() {
                let v = this;
                this.$refs.changeFrom.validate(async valid => {
                    if (valid) {
                        this.resetLoading = true;
                        const params = {};
                        params['userCode'] = this.userCodeFrom.userCode;
                        params['password'] = this.changePasswordFrom.password;
                        await updatePassword(params).then(response => {
                            this.resetLoading = false;
                            v.next()
                        }).catch(() => {
                            this.resetLoading = false;
                        })
                    } else {
                        return false;
                    }
                })
            },
            close() {
                this.$router.go(-1)
            },
            next() {
                this.active++;
            },
            userCodeNext() {
                let v = this;
                this.$refs.forgetUserCodeForm.validate(async valid => {
                    if (valid) {
                        this.sendVerifyCodeLoading = true;
                        //1.验证是否已注册
                        await checkRegister({'userCode': this.userCodeFrom.userCode}).then(async result => {
                            console.log('checkRegister ===>', result.data.data);
                            if (result.data.data) {
                                //2.发送验证码
                                console.log('send verify code ===>', '==');
                                await sendVerificationCode({'userCode': v.userCodeFrom.userCode}).then(response => {
                                    console.log('sendVerificationCode success ===>', response.data.data);
                                    v.sendVerifyCodeLoading = false;
                                    v.next()
                                }).catch(() => {
                                    console.log('send verify error ===>', '==');
                                    v.sendVerifyCodeLoading = false;
                                })
                            } else {
                                v.sendVerifyCodeLoading = false;
                                v.$confirm('该账户并未注册，是否马上去注册？', '提示', {
                                    confirmButtonText: '现在就去',
                                    cancelButtonText: '再想想',
                                    type: 'warning'
                                }).then(() => {
                                    //确定
                                    v.$router.push("/register")
                                }).catch(() => {
                                    //取消
                                });
                            }
                        }).catch(() => {
                            this.sendVerifyCodeLoading = false;
                        })

                    } else {
                        return false;
                    }
                });
            },
            verifyCodeNext() {
                let v = this;
                this.$refs.verifyCodeFrom.validate(async valid => {
                    if (valid) {
                        this.checkVerifyCodeLoading = true;
                        //校验验证码是否正确
                        await checkVerificationCode({
                            'userCode': v.userCodeFrom.userCode,
                            'verificationCode': v.verifyCodeFrom.verifyCode
                        }).then(result => {
                            v.checkVerifyCodeLoading = false;
                            v.next()
                        }).catch(() => {
                            v.checkVerifyCodeLoading = false;
                        })
                    } else {
                        return false;
                    }
                });
            }

        }
    }

</script>
<style>
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

    .fromStyle {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 3vh;
    }

    .forgerTipChildren {
        color: #606266;
        font-size: 13px;
    }

    .forgerTip {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 7vh;
    }

    .inputMg {
        margin-left: 1vh;
        width: 16vw;
    }

    .fromChildren {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .closeForget {
        display: flex;
        flex-direction: row-reverse;
        width: 53vw
    }

    .closeImg {
        width: 5vh;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);
        background-color: transparent;
        border-radius: 50%;
    }

    .rootDivForget {
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

</style>