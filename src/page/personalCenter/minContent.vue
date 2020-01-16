<template>
    <div v-loading="loading">
        <div class="jsd">
            <div class="plo">
                <!--head-->
                <div class="topDiv">
                    <div style="height: auto;">
                        <el-card shadow="hover" class="mkj">
                            <div class="ppi">
                                <img :src="userInfo.img" class="headD"/>
                                <div class="liy">
                                    <div class="qer">
                                        <el-button circle icon="el-icon-right" style="margin-left: 1vw;"
                                                   @click="dialogVisible=true"></el-button>
                                        <el-popover placement="bottom" title="请选择新头像：" width="650" trigger="click">
                                            <div v-loading="loadingPop" element-loading-text=" "
                                                 element-loading-spinner="el-icon-loading" class="lh">
                                                <div v-for="(header,index) in headerList" :key="index">
                                                    <el-card shadow="hover" class="headPop" style="margin: 2px;">
                                                        <div class="xk" style="position: relative;">
                                                            <img @mouseover="mouseover(index)" class="lu"
                                                                 :src="header.head" style="z-index: 2;">
                                                            <div @mouseout="mouseout" v-show="HIndex===index"
                                                                 class="cb">
                                                                <el-button @click="changeHead(header.head)"
                                                                           :loading="changeHeadLoading">更换
                                                                </el-button>
                                                            </div>
                                                        </div>
                                                    </el-card>
                                                </div>
                                            </div>
                                            <el-button slot="reference" icon="el-icon-edit" circle
                                                       @click="showPop"></el-button>
                                        </el-popover>
                                    </div>
                                    <div class="textColor ap">
                                        <div style="margin-top: 1vh;">
                                            点赞：9999
                                        </div>
                                        <div>
                                            笔记：9999
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </el-card>
                        <!--content-->
                        <div class="tg">
                            <span style="margin-left: 1.5vw;">历史记录：</span>
                            <el-timeline style="margin-top: 1vh;margin-left:-1vw;width: 21vw;" reverse="false">
                                <el-timeline-item
                                        v-for="(history, index) in historyList"
                                        :key="index">
                                    <el-card shadow="hover">
                                        <el-tag effect="plain" size="mini">{{history.type}}</el-tag>
                                        <el-link type="info">{{history.name}}</el-link>
                                        <br/>
                                        <span class="textColor margin1">{{formatTime(history.updateTime)}}</span>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                            <div v-show="historyList.length>=3" class="textColor gf">
                                <el-link type="info">更多历史 <i class="el-icon-arrow-down"></i></el-link>
                            </div>
                        </div>
                    </div>
                    <div class="titleD" style="width: 63%;">
                        <!--name-->
                        <el-card shadow="hover">
                            <div @mouseout="nameM=false" @mouseover="nameM=true" class="float0">
                                <div class="float2">
                                    <div class="titleStyle" style="width: 100%;">
                                        <span class="rTitle">昵称：</span>
                                        <span v-show="!showEditName" class="names">{{userData.userName}}</span>
                                        <el-input style="width: 15vw;" v-show="showEditName" type="text"
                                                  :placeholder="userData.userName" v-model="changeInfo.name"
                                                  maxlength="12" show-word-limit size="small">
                                        </el-input>
                                    </div>
                                    <div class="titleStyle titleMarginTop">
                                        <span class="rTitle">性别：</span>
                                        <span v-show="!showEditName" class="LStyle">{{userData.sex===1?'男':'女'}}</span>
                                        <el-select v-show="showEditName" v-model="changeInfo.sex"
                                                   :placeholder="userData.sex===1?'男':'女'" value=""
                                                   style="width: 6vw;" size="mini">
                                            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label"
                                                       :value="item.value"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div v-show="nameM || showEditName" class="editBtn">
                                    <el-button :icon="showEditName?'el-icon-close':'el-icon-edit'" circle
                                               style="margin-left: 1vw;" @click="changeName"></el-button>
                                    <el-button v-show="showEditName" icon="el-icon-check" circle
                                               :loading="saveNameLoading"
                                               style="margin-left: 1vw;" @click="saveChangeName"></el-button>
                                </div>
                            </div>
                        </el-card>

                        <!--account-->
                        <el-card shadow="hover" class="titleMarginTop3">
                            <div @mouseout="nameZ=false" @mouseover="nameZ=true" class="float1">
                                <div class="float2">
                                    <div class="titleStyle titleMarginTop">
                                        <span class="rTitle">账号：</span>
                                        <span class="LStyle">{{userInfo.userCode}}</span>
                                    </div>
                                    <div class="titleStyle titleMarginTop">
                                        <span class="rTitle">用户ID：</span>
                                        <span class="LStyle">{{userInfo.id}}</span>
                                    </div>
                                    <div class="titleStyle titleMarginTop">
                                        <span class="rTitle">电话：</span>
                                        <span v-show="!showEditAccount" class="LStyle">{{userData.tel}}</span>
                                        <el-input style="width: 15vw;" v-show="showEditAccount" type="text"
                                                  :placeholder="userData.tel" v-model="changeInfo.tel"
                                                  show-word-limit size="mini">
                                        </el-input>
                                    </div>
                                    <div class="titleStyle titleMarginTop">
                                        <span class="rTitle">注册时间：</span>
                                        <span class="LStyle">{{userData.createTime}}</span>
                                    </div>
                                </div>
                                <div v-show="nameZ || showEditAccount" class="editBtn">
                                    <el-button :icon="showEditAccount?'el-icon-close':'el-icon-edit'" circle
                                               style="margin-left: 1vw;" @click="changeAccount"></el-button>
                                    <el-button v-show="showEditAccount" icon="el-icon-check" circle
                                               :loading="saveAccountLoading"
                                               style="margin-left: 1vw;" @click="saveChangeAccount"></el-button>
                                </div>
                            </div>
                        </el-card>

                        <!--address-->
                        <el-card shadow="hover" class="titleMarginTop3">
                            <div @mouseout="nameA=false" @mouseover="nameA=true" class="float3">
                                <div class="float2">
                                    <div class="titleStyle titleMarginTop">
                                        <span v-show="!showEditAddress" class="rTitle">省：</span>
                                        <span v-show="showEditAddress" class="rTitle">省市区：</span>
                                        <span v-show="!showEditAddress" class="LStyle">{{userData.province}}</span>
                                        <el-cascader id="addressRef" v-show="showEditAddress"
                                                     v-model="selectAddressValue" size="mini"
                                                     :options="addressJson" @change="handleAddressChange"
                                                     style="width: 20vw;"></el-cascader>
                                    </div>
                                    <div v-show="!showEditAddress" class="titleStyle titleMarginTop">
                                        <span class="rTitle">城市：</span>
                                        <span class="LStyle">{{userData.city}}</span>
                                    </div>
                                    <div v-show="!showEditAddress" class="titleStyle titleMarginTop">
                                        <span class="rTitle">区域：</span>
                                        <span class="LStyle">{{userData.area}}</span>
                                    </div>
                                    <div class="titleStyle titleMarginTop">
                                        <span class="rTitle">详细地址：</span>
                                        <span class="LStyle">{{userData.address}}</span>
                                    </div>
                                </div>
                                <div v-show="nameA || showEditAddress" class="editBtn">
                                    <el-button :icon="showEditAddress?'el-icon-close':'el-icon-edit'" circle
                                               style="margin-left: 1vw;" @click="changeAddress"></el-button>
                                    <el-button v-show="showEditAddress" icon="el-icon-check" circle
                                               :loading="saveAddressLoading"
                                               style="margin-left: 1vw;" @click="saveChangeAddress"></el-button>
                                </div>
                            </div>
                        </el-card>

                        <!--description-->
                        <el-card shadow="hover" class="titleMarginTop3" style="height: 15vh;">
                            <div @mouseout="nameJ=false" @mouseover="nameJ=true" class="float4">
                                <div class="float2">
                                    <div class="titleStyle2">
                                        <span class="rTitle">个人简介：</span>
                                        <div class="jjw">
                                            <span class="LStyle"></span>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="nameJ" class="editBtn">
                                    <el-button icon="el-icon-edit" circle style="margin-left: 1vw;"
                                               @click="changeDescription"></el-button>
                                </div>
                            </div>
                        </el-card>

                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="25%" :modal-append-to-body="false" style="top: 20%;">
            <span>请确认是否需要退出登录？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="loginOutMtM">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {changeImg, getLoginInfo, loginOut, setUserName} from '../../utils/loginStatus'
    import {queryUserInfo} from '../../api/login'
    import {formatTime} from '../../utils/formatUtils'
    import {changeHead, getHeaderList} from '../../api/user'
    import {changeUserInfo, getNameParams} from "~/api/user";
    import axios from 'axios'

    export default {
        name: 'minContent',
        data() {
            return {
                selectAddressValue: [],
                addressJson: [],
                jsonUrl: '../../../src/assets/json/address.json',
                saveAddressLoading: false,
                showEditAddress: false,
                saveAccountLoading: false,
                showEditAccount: false,
                saveNameLoading: false,
                showEditName: false,
                nameJ: false,
                nameA: false,
                nameZ: false,
                nameM: false,
                dialogVisible: false,
                changeHeadLoading: false,
                HIndex: 999,
                loadingPop: false,
                changeInfo: {
                    name: "",
                    sex: "",
                    tel: "",
                    province: "",
                    city: "",
                    area: "",
                    address: ""
                },
                headerList: [],
                loading: false,
                sexOptions: [
                    {
                        value: '1',
                        label: '男'
                    }, {
                        value: '0',
                        label: '女'
                    }
                ],
                userInfo: {},
                userData: {},
                historyList: [
                    {
                        type: "类型1",
                        updateTime: 1578466191000,
                        name: "记录1"
                    }, {
                        type: "类型2",
                        updateTime: 1578466191000,
                        name: "记录2"
                    }, {
                        type: "类型3",
                        updateTime: 1578466191000,
                        name: "记录3"
                    }
                ]
            }
        },
        created() {
            this.userInfo = getLoginInfo();
            console.log('userInfo ===>', this.userInfo);
            axios.get(this.jsonUrl).then(res => {
                this.addressJson = res.data;
            });
            this.queryUserInfoMt();
        },
        methods: {
            handleAddressChange(val) {
                console.log("====address select=>", val);
                let pid = val[0];
                let cid = val[1];
                let aid = val[2];
                for (let index in this.addressJson) {
                    let itemP = this.addressJson[index];
                    if (itemP.value === pid) {
                        this.changeInfo.province = itemP.label;
                        let itemC = itemP.children;
                        for (let index2 in itemC) {
                            let itemAP = itemC[index2];
                            if (itemAP.value === cid) {
                                this.changeInfo.city = itemAP.label;
                                let itemA = itemAP.children;
                                for (let index3 in itemA) {
                                    let itemAc = itemA[index3];
                                    if (itemAc.value === aid) {
                                        this.changeInfo.area = itemAc.label;
                                    }
                                }
                            }
                        }
                    }
                }
                console.log("changeInfo ====> select ==> ", this.changeInfo)
            },
            changeDescription() {
                //修改简介
                // changeUserInfo
                //getDescriptionParams
            },
            changeAddress() {
                //修改地址信息
                // changeUserInfo
                //getAddressParams
                this.showEditAddress = !this.showEditAddress;
                if (this.showEditAddress) {
                } else {
                    this.selectAddressValue = [];
                }
            },
            saveChangeAddress() {

            },
            changeAccount() {
                this.showEditAccount = !this.showEditAccount;
                if (this.showEditAccount) {
                    this.changeInfo.tel = "";
                }
            },
            async saveChangeAccount() {
                //修改账号信息
                // changeUserInfo
                //getAccountParams
            },
            changeName() {
                this.showEditName = !this.showEditName;
                if (this.showEditName) {
                    this.changeInfo.sex = "";
                    this.changeInfo.name = "";
                }
            },
            async saveChangeName() {
                //修改名称、性别
                this.saveNameLoading = true;
                let params = getNameParams(this.userInfo.id, this.changeInfo.name, this.changeInfo.sex === "男" ? 1 : 0);
                console.log("saveChangeName  params => ", params);
                await changeUserInfo(params).then(data => {
                    this.userData.sex = params.sex;
                    this.userData.userName = params.userName;
                    setUserName(params.userName);
                    this.changeInfo.sex = "";
                    this.changeInfo.name = "";
                    this.showEditName = false;
                    this.saveNameLoading = false;
                }).catch(error => {
                    this.showEditName = false;
                    this.saveNameLoading = false;
                })
            },
            loginOutMtM() {
                this.dialogVisible = false;
                loginOut();
                this.$router.push('/')
            },
            async changeHead(img) {
                console.log('img ===>', img);
                this.changeHeadLoading = true;
                const params = {};
                params["userId"] = getLoginInfo().id;
                params["img"] = img;
                await changeHead(params).then(data => {
                    console.log("change ==> success");
                    this.changeHeadLoading = false;
                    this.userInfo.img = img;
                    changeImg(img);
                    this.queryUserInfoMt()
                }).catch(error => {
                    console.log("change ==> error");
                    this.changeHeadLoading = false;

                });
            },
            mouseout() {
                this.HIndex = 999;
            },
            mouseover(index) {
                console.log('index ===>', index);
                this.HIndex = index;
            },
            async showPop() {
                this.loadingPop = true;
                await getHeaderList({}).then(data => {
                    this.loadingPop = false;
                    this.headerList = data.data.data.lists;
                    console.log("list ==> ", this.headerList)
                }).catch(error => {
                    this.loadingPop = false;
                })
            },
            formatTime,
            async queryUserInfoMt() {
                this.loading = true;
                await queryUserInfo({'userId': this.userInfo.id}).then(info => {
                    this.loading = false;
                    console.log("queryUserInfo success ===>", info.data.data);
                    this.userData = info.data.data;
                    setUserName(info.data.data.userName)
                }).catch(() => {
                    this.loading = false;
                });
            }
        }
    }

</script>
<style>
    .editBtn {
        position: absolute;
        z-index: 5;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row-reverse;
    }

    .float1 {
        position: relative;
        width: 100%;
        height: 14vh;
    }

    .float3 {
        position: relative;
        width: 100%;
        height: 13vh;
    }

    .float4 {
        position: relative;
        width: 100%;
        height: 13vh;
    }

    .float0 {
        position: relative;
        width: 100%;
        height: 7vh;
    }

    .float2 {
        position: absolute;
        z-index: 6;
        width: 80%;
        height: 60px;
    }

    .cb {
        border-radius: 10%;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 3;
        display: flex;
        flex-direction: column-reverse;
        background-color: rgba(0, 0, 0, 0.53)
    }

    .ap {
        height: 16vh;
        display: flex;
        flex-direction: column-reverse;
        font-size: 13px;
    }

    .gf {
        justify-content: center;
        display: flex;
        flex-direction: row;
    }

    .tg {
        height: 40vh;
        width: 25vw;
        margin-left: 6vh;
        display: flex;
        flex-direction: column;
        margin-top: 3vh;
    }

    .lu {
        width: 73px;
        height: 73px;
        border-radius: 10%;
        margin: 5px;
    }

    .xk {
        display: flex;
        flex-direction: column;
    }

    .lh {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap
    }

    .qer {
        width: 6.8vw;
        display: flex;
        flex-direction: row-reverse;
    }

    .liy {
        height: 20vh;
        display: flex;
        flex-direction: column;
        padding-left: 2vw;
    }

    .ppi {
        display: flex;
        flex-direction: row;
        height: 20vh;
    }

    .mkj {
        margin-left: 4.5vw;
        width: 22vw;
    }

    .plo {
        width: 100%;
        height: 81vh;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.07);
        background-color: white;
        border-radius: 5px;
    }

    .jsd {
        width: 84vw;
        margin-left: 8vw;
        padding-top: 4vh;
    }

    .headPop {
        border-radius: 20%;
    }

    .topDiv {
        padding-top: 6vh;
        display: flex;
        flex-direction: row;
    }

    .headD1 {
        width: 22.1vh;
        height: 22.1vh;
        margin-left: 4.5vw;
        border-radius: 50%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .headD {
        width: 20vh;
        height: 20vh;
        border-radius: 50%;
    }

    .titleD {
        display: flex;
        flex-direction: column;
    }

    .names {
        font-size: 1.4rem;
        color: #606266;
    }

    .rTitle {
        font-size: 0.9rem;
    }

    .LStyle {
        font-size: 1rem;
        color: #909399;
    }

    .textColor {
        color: #909399;
    }

    .margin1 {
        margin-top: 0.5vh;
        margin-left: 2px;
    }

    .titleMarginTop {
        margin-top: 1vh;
    }

    .titleMarginTop3 {
        margin-top: 3vh;
    }

    .titleStyle {
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .titleStyle2 {
        display: flex;
        flex-direction: row;
    }

    .jjw {
        max-width: 45vw;
    }

</style>