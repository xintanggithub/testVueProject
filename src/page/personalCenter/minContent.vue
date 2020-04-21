<template>
    <div v-loading="loading">
        <div class="jsd">
            <div class="plo">
                <!--head-->
                <div class="topDiv">
                    <div style="height: auto;margin-top: -1vh;">
                        <el-card shadow="hover" class="mkj">
                            <div class="ppi">
                                <img :src="formatUrl(userInfo.img)" class="headD"/>
                                <div class="liy">
                                    <div class="qer">
                                        <el-tooltip effect="dark" content="退出登录" placement="top">
                                            <el-button circle icon="el-icon-right" style="margin-left: 1vw;"
                                                       @click="dialogVisible=true"></el-button>
                                        </el-tooltip>
                                        <el-popover placement="bottom" title="请选择新头像：" width="650" trigger="click">
                                            <div v-loading="loadingPop" element-loading-text=" "
                                                 element-loading-spinner="el-icon-loading" class="lh">
                                                <div v-for="(header,index) in headerList" :key="index">
                                                    <el-card shadow="hover" class="headPop" style="margin: 2px;">
                                                        <div class="xk" style="position: relative;">
                                                            <img @mouseover="mouseover(index)" class="lu"
                                                                 :src="formatUrl(header.head)" style="z-index: 2;">
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
                                            被赞：{{startCount}}
                                        </div>
                                        <div>
                                            笔记：{{bookCount}}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </el-card>
                        <!--content-->
                        <div class="tg">
                            <span style="margin-left: 1.5vw;">历史记录：</span>
                            <el-timeline v-show="historyList.length>0"
                                         style="margin-top: 1vh;margin-left:-1vw;width: 21.9vw;">
                                <el-timeline-item
                                        v-for="(history, index) in historyList"
                                        :key="index">
                                    <el-card shadow="hover" style="height: 9vh;">
                                        <el-link type="info" class="titleDDD" @click="historyClick(history)">
                                            <el-tag effect="plain" size="mini" style="margin-right: 10px;">
                                                {{history.type}}
                                            </el-tag>
                                            {{history.businessName}}
                                        </el-link>
                                        <br/>
                                        <span class="textColor margin1">{{formatTimeA(history.updateTime)}}</span>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                            <div v-show="historyList.length<=0"
                                 style="width: 21.9vw;display: flex;flex-direction: row;justify-content: center;height: 8vh;padding-top: 8vh;">
                                <i v-show="loadingHistory" class="el-icon-loading"></i>
                                {{loadingHistory?'加载中...':'暂无数据'}}
                            </div>
                            <div v-show="historyList.length>=3" class="textColor gf">
                                <el-link type="info" @click="queryHistoryListMore">更多记录 <i
                                        class="el-icon-arrow-down"></i>
                                </el-link>
                            </div>
                        </div>
                    </div>
                    <div class="titleD" style="width: 63%;margin-top: -1vh;">
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
                                        <span v-show="!showEditName"
                                              class="LStyle">{{(userData.sex==='1' || userData.sex===1 )?'男':'女'}}</span>
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
                                        <span v-show="!showEditAddress" class="LStyle">{{userData.address}}</span>
                                        <el-input size="mini" v-model="changeInfo.address" style="width: 15vw;"
                                                  v-show="showEditAddress" :placeholder="userData.address"></el-input>
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
                                <div class="float5">
                                    <div class="titleStyle2">
                                        <span class="rTitle2">个人简介：</span>
                                        <div class="jjw">
                                            <span v-show="!showEditDescription"
                                                  class="LStyle">{{userData.description}}</span>
                                            <el-input v-show="showEditDescription" type="textarea"
                                                      :placeholder="userData.description"
                                                      style="width: 38vw;" rows="4"
                                                      v-model="changeInfo.description" maxlength="150" show-word-limit>
                                            </el-input>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="nameJ || showEditDescription" class="editBtn">
                                    <el-button :icon="showEditDescription?'el-icon-close':'el-icon-edit'" circle
                                               style="margin-left: 1vw;" @click="changeDescription"></el-button>
                                    <el-button v-show="showEditDescription" icon="el-icon-check" circle
                                               :loading="saveDescriptionLoading"
                                               style="margin-left: 1vw;" @click="saveChangeDescription"></el-button>
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

        <el-drawer :visible.sync="drawer2" :direction="direction" :before-close="handleCloseDrawerMin"
                   :modal-append-to-body="false" :show-close="false" size="100%"
                   style="padding-left: 8vw;padding-right: 8vw;padding-top: 7.6vh;">
            <div style="display: flex;flex-direction: row;align-items: baseline;">
                <div style="width: 80%">
                    <span class="rTitle" style="margin-left: 5.5vw;">历史记录:</span>
                </div>
                <div style="width: 20%;display: flex;flex-direction: row-reverse;padding-right: 5vw;">
                    <el-button icon="el-icon-close" circle @click="drawer2=false"></el-button>
                </div>
            </div>
            <div class="detail_content_a_style2 list_root_style2"
                 style="justify-content: start;padding-left: 5vw;max-height: 79vh;overflow-y: scroll;"
                 ref="Box3" @scroll="orderScroll3">
                <div v-for="(history, index) in moreHistoryList" :key="index">
                    <el-card shadow="hover" style="height: 9vh;width: 36vw;margin: 10px;">
                        <el-link type="info" class="titleDDD2" @click="historyClick(history)">
                            <el-tag effect="plain" size="mini" style="margin-right: 10px;">
                                {{history.type}}
                            </el-tag>
                            {{history.businessName}}
                        </el-link>
                        <br/>
                        <span class="textColor margin1">{{formatTimeA(history.updateTime)}}</span>
                    </el-card>
                </div>
            </div>
            <div style="width: 100%;display: flex;flex-direction: row;justify-content: center;font-size: 14px;color: rgba(0,0,0,0.53);">
                <p v-if="loadingDrawer && !noMoreLoadingDrawer">加载中...</p>
                <p v-if="noMoreLoadingDrawer">没有更多了</p>
            </div>
        </el-drawer>
        <el-drawer :visible.sync="drawerDetail" :direction="direction2"
                   :modal-append-to-body="false" :show-close="false" size="100%">
            <detail ref="childAll" :book-id="bookId"></detail>
        </el-drawer>
    </div>
</template>
<script>

    import axios from 'axios'
    import {changeImg, getLoginInfo, loginOut, setUserName} from '../../utils/loginStatus'
    import {queryUserInfo} from '../../api/login'
    import {formatTime} from '../../utils/formatUtils'
    import {changeHead, getHeaderList, queryStarCount} from '../../api/user'
    import {changeUserInfo, getAccountParams, getAddressParams, getDescriptionParams, getNameParams} from "~/api/user";
    import {queryBookByUser2} from '../../api/book'
    import {getHistoryParamsByUser, queryHistoryList} from '../../api/history'
    import {queryBookByUserParams2} from "~/api/book";
    import detail from '../../page/children/book/detail'

    export default {
        components: {detail},
        name: 'minContent',
        inject: ['changeIndex22'],
        provide() {
            return {
                closeAll: this.closeAll
            }
        },
        data() {
            return {
                bookId: '',
                direction2: 'btt',
                selectId: "",
                drawerDetail: false,
                morePage: 0,
                moreHistoryList: [],
                loadingDrawer: false,
                noMoreLoadingDrawer: false,
                direction: 'btt',
                drawer2: false,
                loadingHistory: true,
                bookCount: 0,
                startCount: 0,
                saveDescriptionLoading: false,
                showEditDescription: false,
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
                    address: "",
                    description: ""
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
                historyList: []
            }
        },
        created() {
            this.userInfo = getLoginInfo();
            console.log('userInfo ===>', this.userInfo);
            axios.get(this.jsonUrl).then(res => {
                this.addressJson = res.data;
            });
            this.queryUserInfoMt();
            this.queryStarCountMt();
            this.queryBookCount();
            this.queryHistoryList();
        },
        mounted() {
            this.changeTwos();
        },
        methods: {
            formatUrl(url) {
                return this.$global.formatUrl(url);
            },
            closeAll() {
                this.drawerDetail = false;
            },
            changeTwos() {
                this.changeIndex22();
            },
            orderScroll3(e) {
                let a = this.$refs.Box3.scrollHeight;
                let b = this.$refs.Box3.clientHeight;
                let c = this.$refs.Box3.scrollTop;
                console.log("====> a", a);
                console.log("====> b+c", b + c);
                let abls = (b + c >= a - 3);
                if (abls && !this.loadingDrawer) {
                    if (!this.noMoreLoadingDrawer) {
                        this.queryHistoryListMore(false)
                    }
                }
            },
            handleCloseDrawerMin(done) {
                done();
            },
            historyClick(history) {
                if (history.type === "book") {
                    this.bookId = history.businessId;
                    this.drawerDetail = true;
                    this.$refs.childAll.test(history.businessId);
                } else if (history.type === "game") {
                    window.open(this.$global.formatUrl(history.businessId));
                }
            },
            async queryHistoryListMore(refresh) {
                this.loadingDrawer = true;
                if (refresh) {
                    this.drawer2 = true;
                    this.morePage = 1;
                } else {
                    this.morePage++;
                }
                let params = getHistoryParamsByUser(this.userInfo.id, this.morePage, 20);
                await queryHistoryList(params).then(data => {
                    this.loadingDrawer = false;
                    if (refresh) {
                        this.moreHistoryList = data.data.data.lists;
                    } else {
                        this.moreHistoryList = this.moreHistoryList.concat(data.data.data.lists)
                    }
                    this.noMoreLoadingDrawer = data.data.data.lists.length < 20;
                }).catch(() => {
                    this.loadingDrawer = false;
                })
            },
            async queryHistoryList() {
                this.loadingHistory = true;
                let params = getHistoryParamsByUser(this.userInfo.id, 1, 3);
                await queryHistoryList(params).then(data => {
                    this.historyList = data.data.data.lists;
                    this.loadingHistory = false;
                }).catch(() => {
                    this.loadingHistory = false;
                })
            },
            async queryBookCount() {
                let params = queryBookByUserParams2(this.userInfo.id, "", 2, 1, 1);
                await queryBookByUser2(params).then(data => {
                    this.bookCount = data.data.data.totalCount;
                })
            },
            async queryStarCountMt() {
                let params = {};
                params["userId"] = this.userInfo.id;
                await queryStarCount(params).then(data => {
                    this.startCount = data.data.data;
                }).catch(() => {
                    console.log("start error")
                });
            },
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
                this.showEditDescription = !this.showEditDescription;
                if (!this.showEditDescription) {
                    this.changeInfo.description = "";
                }
            },
            async saveChangeDescription() {
                //修改简介
                if (this.changeInfo.description) {
                    this.saveDescriptionLoading = true;
                    let descriptionParams = getDescriptionParams(this.userInfo.id, this.changeInfo.description);
                    console.log("descriptionParams==>", descriptionParams);
                    await changeUserInfo(descriptionParams).then(() => {
                        if (descriptionParams.description) {
                            this.userData.description = descriptionParams.description;
                        }
                        this.changeInfo.description = "";
                        this.saveDescriptionLoading = false;
                        this.showEditDescription = false;
                    }).catch(() => {
                        this.saveDescriptionLoading = false;
                        this.showEditDescription = false;
                    });
                } else {
                    this.$notify({
                        title: '警告',
                        message: '无修改内容',
                        type: 'warning',
                        duration: 2000
                    });
                }
            },
            changeAddress() {
                this.showEditAddress = !this.showEditAddress;
                if (this.showEditAddress) {
                } else {
                    this.selectAddressValue = [];
                    this.changeInfo.province = "";
                    this.changeInfo.city = "";
                    this.changeInfo.area = "";
                    this.changeInfo.address = "";
                }
            },
            async saveChangeAddress() {
                //修改地址信息
                if (this.changeInfo.province === "" && this.changeInfo.city === "" && this.changeInfo.area === ""
                    && this.changeInfo.address === "") {
                    //如果都为空，说明没有修改
                    this.$notify({
                        title: '警告',
                        message: '无修改内容',
                        type: 'warning',
                        duration: 2000
                    });
                } else {
                    this.saveAddressLoading = true;
                    let changeAddressParams = getAddressParams(this.userInfo.id, this.changeInfo.province,
                        this.changeInfo.city, this.changeInfo.area, this.changeInfo.address);
                    console.log("changeAddressParams==>", changeAddressParams);
                    await changeUserInfo(changeAddressParams).then(() => {
                        this.selectAddressValue = [];
                        this.changeInfo.province = "";
                        this.changeInfo.city = "";
                        this.changeInfo.area = "";
                        this.changeInfo.address = "";
                        if (changeAddressParams.province) {
                            this.userData.province = changeAddressParams.province;
                            this.userData.city = changeAddressParams.city;
                            this.userData.area = changeAddressParams.area;
                        }
                        if (changeAddressParams.address) {
                            this.userData.address = changeAddressParams.address;
                        }
                        this.saveAddressLoading = false;
                        this.showEditAddress = false;
                    }).catch(() => {
                        this.saveAddressLoading = false;
                        this.showEditAddress = false;
                    })
                }
            },
            changeAccount() {
                this.showEditAccount = !this.showEditAccount;
                if (this.showEditAccount) {
                    this.changeInfo.tel = "";
                }
            },
            async saveChangeAccount() {
                //修改账号信息
                if (this.changeInfo.tel) {
                    this.saveAccountLoading = true;
                    let accountParams = getAccountParams(this.userInfo.id, this.changeInfo.tel);
                    console.log("changeAccountParams==>", accountParams);
                    await changeUserInfo(accountParams).then(data => {
                        if (accountParams.tel) {
                            this.userData.tel = accountParams.tel;
                        }
                        this.changeInfo.tel = "";
                        this.saveAccountLoading = false;
                        this.showEditAccount = false;
                    }).catch(error => {
                        this.saveAccountLoading = false;
                        this.showEditAccount = false;
                    });
                } else {
                    this.$notify({
                        title: '警告',
                        message: '没有填写电话',
                        type: 'warning',
                        duration: 2000
                    });
                }
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
                let params = getNameParams(this.userInfo.id, this.changeInfo.name, this.changeInfo.sex);
                console.log("saveChangeName  params => ", params);
                await changeUserInfo(params).then(data => {
                    this.userData.sex = this.changeInfo.sex;
                    if (params.userName) {
                        this.userData.userName = params.userName;
                        setUserName(params.userName);
                    }
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
            formatTimeA(ns) {
                return new Date(parseInt(ns) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
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
    .detail_content_a_style2 {
        width: 84vw;
        height: auto;
        max-height: 80vh;
        background-color: rgba(255, 255, 255, 0.5);
        overflow-y: scroll;
    }

    .list_root_style2 {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap
    }

    .titleDDD {
        width: 18vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        white-space: nowrap;
        margin-top: -0.8vh;
    }

    .titleDDD2 {
        width: 34vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        white-space: nowrap;
        margin-top: -0.8vh;
    }

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

    .float5 {
        position: absolute;
        z-index: 6;
        width: 85%;
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

    .rTitle2 {
        width: 5vw;
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