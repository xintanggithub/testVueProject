<template>
    <div style="width: 100%;height: 75vh;display: flex;flex-direction: row;justify-content: center;">
        <div style="height: 75vh;display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <el-card>
                <div style="padding: 55px;">
                    <span style="margin-right: 3vw;"><b>请输入您的新密码</b></span><br><br><br>
                    <el-form ref="changeFrom" :rules="rules3" :model="changePasswordFrom">
                        <el-form-item label=" " prop="password">
                            <div class="fromChildren">
                                <img src="../../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
                                <el-input class="inline-input inputMg" v-model="changePasswordFrom.password"
                                          :type="showPassword?'text':'password'" prop="password" autocomplete="off"
                                          placeholder="请输入密码">
                                    <el-button slot="append" @click="showPassword=!showPassword"
                                               :icon="showPassword?'el-icon-open-export':'el-icon-close-export'"></el-button>
                                </el-input>
                                <el-button style="border-color: transparent;background-color:transparent;
                                                    color: transparent;cursor: default;">
                                    重置密码
                                </el-button>
                            </div>
                        </el-form-item>
                        <!--确认密码-->
                        <el-form-item label=" " prop="checkPassword">
                            <div class="fromChildren">
                                <img src="../../../res/img/password.png" style="width: 3.5vh;height: 3.5vh;">
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
            </el-card>
        </div>
    </div>
</template>
<script>

    import {getLoginInfo, loginOut} from '../../../utils/loginStatus'
    import {updatePassword} from "~/api/login";

    export default {
        name: 'changePassword',
        inject: ['changeStTwo'],
        data() {
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
                showCheckPassword: false,
                showPassword: false,
                changePasswordFrom: {
                    password: '',
                    checkPassword: ''
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
        mounted() {
            this.change();
        },
        methods: {
            change() {
                this.changeStTwo();
            },
            resetPassword() {
                this.$refs.changeFrom.validate(async valid => {
                    if (valid) {
                        this.resetLoading = true;
                        const params = {};
                        params['userCode'] = getLoginInfo().userCode;
                        params['password'] = this.changePasswordFrom.password;
                        await updatePassword(params).then(() => {
                            this.resetLoading = false;
                            loginOut();
                            this.$alert('密码重置成功，请重新登录~', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/login');
                                }
                            });
                        }).catch(() => {
                            this.resetLoading = false;
                        })
                    } else {
                        return false;
                    }
                })
            },
        }
    }
</script>
<style>
    .el-icon-close-export {
        background: url('../../../res/img/eye_close.png') center no-repeat;
        background-size: cover;
    }

    .el-icon-close-export:before {
        content: "　";
        font-size: 16px;
        visibility: hidden;
    }

    .el-icon-open-export {
        background: url('../../../res/img/eye_open.png') center no-repeat;
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

    .fromChildren {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>