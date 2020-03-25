<template>
    <div style="height: 100%;" v-loading="firstLoading">
        <div class="tabsDiv">
            <el-button @click="allBook" icon="el-icon-document-copy" class="marginLeftSt">笔记广场</el-button>
            <el-button @click="jp" icon="el-icon-star-on">精品推荐</el-button>
            <el-button type="danger" icon="el-icon-document">我的笔记</el-button>
            <el-button icon="el-icon-edit" type="warning" @click="addBook">新增笔记</el-button>
            <el-button type="success" icon="el-icon-star-on" @click="showCollectionMy">我的收藏</el-button>
            <el-autocomplete class="searchInput" v-model="state" :fetch-suggestions="queryMySearchAsync"
                             placeholder="请输入搜索内容" @keyup.enter.native="enter"
                             :trigger-on-focus="false" @select="handleSelect">
                <el-button slot="append" icon="el-icon-search" @click="enter"></el-button>
            </el-autocomplete>
        </div>
        <div class="detail_content_a_style list_root_style allListDiv" @scroll="orderScroll" ref="Box">
            <div v-show="firstMessage===''" v-for="(itemData,index) in listData" :key="index">
                <el-card shadow="hover" class="allListCard">
                    <div class="allListTitle">
                        <el-tooltip class="item" effect="dark"
                                    content="对内容和设置进行修改"
                                    placement="top">
                            <i class="el-icon-edit" style="color: #409EFF;cursor: pointer;font-size: 14px;"
                               @click="editBook(itemData)">编辑</i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark"
                                    content="删除"
                                    placement="top">
                            <i @click="deleteShow(itemData,index)" class="el-icon-delete"
                               style="color: #F56C6C;cursor: pointer;font-size: 14px;"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark"
                                    :content="itemData.openType===1?'已公开':'私密'"
                                    placement="top">
                            <i :class="itemData.openType===1?'el-icon-folder-opened':'el-icon-folder'"
                               :style="itemData.openType===1?'color: #67C23A;':'color: #E6A23C;'"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark"
                                    content="已被设为精品推荐"
                                    placement="top">
                            <i v-show="itemData.splash==='1'" class="el-icon-star-on"
                               @click="itemClick(itemData.bookId)"
                               style="color: #409EFF;"></i>
                        </el-tooltip>
                        <el-link @click="itemClick(itemData.bookId)">{{itemData.title}}</el-link>
                    </div>
                    <div class="allListDescription" @click="itemClick(itemData.bookId)">
                        <span class="popLabel">{{itemData.description}}</span>
                    </div>
                    <div class="allListTag">
                        <el-tag type="warning" size="mini" :style="index!==0?'margin-left: 0.5vw;':''" :key="index"
                                v-for="(tag,index) in loadTag(itemData.img)" :disable-transitions="false">
                            <i v-show="index===0" class="el-icon-collection-tag"></i>
                            {{tag}}
                        </el-tag>
                    </div>
                    <div class="allListUser">
                        <el-avatar size="small" :src="itemData.userHead">
                            <img :src="require('../../../../res/img/user_center.png')"/>
                        </el-avatar>
                        <div style="display: flex;flex-direction: column;">
                            <el-link type="info"
                                     style="width:auto;margin-left: 1vw;font-size: 13px;justify-content: start;">
                                {{itemData.userName}}
                            </el-link>
                            <span style="font-size: 11px;;color: #909399;margin-left: 1vw;">{{formatTime(itemData.updateTime)}}</span>
                        </div>
                    </div>
                </el-card>
            </div>
            <div v-show="firstMessage!==''" class="errorView">
                <div class="errorContent">
                    <i class="el-icon-warning" style="color:#F56C6C;"> {{firstMessage}}</i>
                </div>
            </div>
        </div>
        <div v-show="showBootLoading"
             style="width: 100%;height: auto;display: flex;flex-direction: row;justify-content: center;">
            <i v-show="loading" class="el-icon-loading"></i><span style="font-size: 11px;">{{noMore?"正在加载更多...":"已经加载完了"}}</span>
        </div>

        <el-drawer :visible.sync="drawerDetail" :direction="direction"
                   :modal-append-to-body="false" :show-close="false" size="100%">
            <detail ref="child" :book-id="bookId"></detail>
        </el-drawer>

        <el-drawer :visible.sync="drawerEdit" :direction="directionEdit" :close-on-press-escape="false"
                   :modal-append-to-body="false" :show-close="false" size="100%">

            <div style="width: 98%;margin-left: 1%;display: flex;flex-direction: row;margin-top: -3vh;">
                <el-input type="text" placeholder="请输入内容" v-model="editItem.title" maxlength="65" show-word-limit
                          class="editTitleInput editLog">
                </el-input>
                <el-checkbox style="margin-left: 1vw;" class="editLog" v-model="checkEdit" label="公开发布"
                             border></el-checkbox>
                <el-button :icon="showMore?'el-icon-caret-top':'el-icon-caret-bottom'" style="margin-left: 1vw;"
                           @click="showMore=!showMore" circle></el-button>
                <div style="width: 38%;display: flex;flex-direction: row-reverse;">
                    <el-button type="danger" @click="editCommit">确认修改</el-button>
                    <el-button style="margin-right: 1vw;" type="warning" @click="drawerEdit=false">取消修改</el-button>
                </div>
            </div>
            <div v-show="showMore"
                 style="width: 100%;display: flex;flex-direction: row;height: 16vh;background-color: rgba(255,248,231,0.53)">
                <div style="width: 50%;display: flex;flex-direction: column;padding-left: 1.5vw;margin-top: 2vh;">
                    <span>设置标签：</span>
                    <span class="popLabel">
                        说明：最多可以添加6个标签，方便其他人通过感兴趣的标签，快速找到对应的内容。<br/>
                        更容易突出内容要点、关键要素等等。
                    </span>
                    <div class="popTag">
                        <el-tag style="margin-right: 10px;" :key="tag" v-for="tag in dynamicTags" closable
                                :disable-transitions="false"
                                @close="handleClose3(tag)" type="danger">
                            {{tag}}
                        </el-tag>
                        <el-input v-show="dynamicTags.length<6" style="width: 6vw;" class="input-new-tag" maxlength="20"
                                  v-if="inputVisible" v-model="inputValue" show-word-limit ref="saveTagInput"
                                  size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-show="dynamicTags.length<6" v-else class="button-new-tag" size="small"
                                   @click="showInput">+ 添加标签
                        </el-button>
                    </div>
                </div>
                <div style="width: 50%;display: flex;flex-direction: column;">
                    <div class="popType">
                        <span>类型：</span>
                        <el-select size="small" v-model="typeValue" placeholder="请选择" clearable value="">
                            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                       :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="popDescription">
                        <span>简述：</span>
                        <el-input style="width: 45.3vw;font-size: 12px;" type="textarea" placeholder="请简单描述"
                                  v-model="editItem.description"
                                  maxlength="150"
                                  show-word-limit></el-input>
                    </div>
                </div>
            </div>
            <mavon-editor :class="showMore?'edit2e':'edit2e2'" v-model="editItem.content" :toolbars="toolbars"/>
        </el-drawer>
    </div>
</template>
<script>

    import {queryBookByUser, queryBookByUser2, queryBookByUserParams} from "../../../../api/book"
    import {loginStatus} from '../../../../utils/loginStatus'
    import {formatTime} from '../../../../utils/formatUtils'
    import detail from '../detail'
    import {updateBook, updateBookParams, deleteBook} from "~/api/book";
    import {getLoginInfo} from "~/utils/loginStatus";

    export default {
        components: {detail},
        name: "bookMyBook",
        provide() {
            return {
                closeAll: this.closeAll
            }
        },
        data() {
            return {
                showMore: false,
                typeValue: '',//类型
                typeOptions: [{value: "原创作品", label: "原创作品"}, {value: "博文转载", label: "博文转载"}],
                inputValue: '',
                inputVisible: false,
                dynamicTags: [],//标签
                checkEdit: false,
                editItem: {
                    title: '',
                    content: '',
                    description: ''
                },
                drawerEdit: false,
                directionEdit: 'btt',
                bookId: '',
                direction: 'btt',
                selectId: "",
                drawerDetail: false,
                firstLoading: false,
                firstMessage: "",
                restaurants: [],
                state: '',
                timeout: null,
                noMore: true,
                loading: false,
                showBootLoading: false,
                listData: [],
                page: 1,
                pageSize: 20,
                openType: 2,//2所有
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    // imagelink: true, // 图片链接
                    code: false, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    navigation: false, // 导航目录
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        },
        created() {
            this.loadListData(true);
        },
        methods: {
            async deleteBookMt(bookId, success, fail) {
                const params = {};
                params['userId'] = getLoginInfo().id;
                params['bookId'] = bookId;
                await deleteBook(params).then(data => {
                    success(data)
                }).catch(err => {
                    fail(err)
                })
            },
            deleteShow(itemData, index) {
                this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let v = this;
                    this.deleteBookMt(itemData.bookId, function (data) {
                        v.listData.splice(index, 1);
                        v.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }, function (err) {
                        v.$message({
                            type: 'error',
                            message: '删除失败' | err
                        });
                    })

                }).catch(() => {
                });
            },
            showCollectionMy() {
                if (loginStatus()) {
                    this.$router.push({
                        name: 'collection',
                        query: {
                            key: "collectionIndex",
                            msgKey: '1'
                        }
                    });
                } else {
                    this.$router.push('/login');
                }
            },
            closeAll() {
                this.drawerDetail = false;
            },
            async editCommit() {
                if (this.dynamicTags.length <= 0) {
                    this.$notify({
                        title: '警告',
                        message: '请填写标签',
                        type: 'warning',
                        duration: 2000
                    });
                } else {
                    if (this.typeValue) {
                        if (this.editItem.description) {
                            let tag = '';
                            for (let x in this.dynamicTags) {
                                tag += this.dynamicTags[x] + (this.dynamicTags.length === x ? "" : ",")
                            }
                            let params = updateBookParams(getLoginInfo().id, this.editItem.bookId, this.editItem.title, this.checkEdit ? 1 : 0,
                                tag.substr(0, tag.length - 1), this.editItem.description, this.editItem.content, this.typeValue);
                            console.log("updateBook params =>", params);
                            this.loading = true;
                            await updateBook(params).then(data => {
                                this.drawerEdit = false;
                                this.dynamicTags = [];
                                this.checkEdit = false;
                                this.editItem = {};
                                this.$notify({
                                    title: '提示',
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            }).catch(error => {
                                this.loading = false;
                                this.$notify({
                                    title: '错误',
                                    message: error.data.message || "提交发生异常",
                                    type: 'error',
                                    duration: 2000
                                });
                            })
                        } else {
                            this.$notify({
                                title: '警告',
                                message: '请填写简介',
                                type: 'warning',
                                duration: 2000
                            });
                        }
                    } else {
                        this.$notify({
                            title: '警告',
                            message: '请选择类型',
                            type: 'warning',
                            duration: 2000
                        });
                    }
                }
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleClose3(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            editBook(itemData) {
                this.checkEdit = (itemData.openType === 1 || itemData.openType === '1');
                this.editItem = itemData;
                this.dynamicTags = this.loadTag(itemData.img);
                this.typeValue = itemData.bookType;
                this.drawerEdit = true;
            },
            formatTime,
            itemClick(id) {
                this.bookId = id;
                this.drawerDetail = true;
                this.$refs.child.test(id);
            },
            jp() {
                this.$router.push({name: 'jp'});
            },
            addBook() {
                if (loginStatus()) {
                    this.$router.push({
                        name: 'edit',
                        params: {
                            type: 1
                        }
                    });
                } else {
                    this.$router.push('/login');
                }
            },
            loadTag(val) {
                if (null === val || "" === val || undefined === val) {
                    return ["暂无标签"]
                }
                return val.split(",");
            },
            orderScroll(e) {
                let a = this.$refs.Box.scrollHeight;
                let b = this.$refs.Box.clientHeight;
                let c = this.$refs.Box.scrollTop;
                console.log("====> a", a);
                console.log("====> b+c", b + c);
                this.showBootLoading = (b + c >= a - 3);
                if (this.showBootLoading) {
                    if (!this.noMore) {
                        this.loading = false;
                        this.showBootLoading = true;
                    } else {
                        if (!this.loading) {
                            this.loading = true;
                            this.loadListData(false);
                        }
                    }
                }
            },
            async loadListData(refresh) {
                if (refresh) {
                    this.firstLoading = true;
                    this.page = 1;
                } else {
                    this.page++;
                    this.loading = true;
                    this.showBootLoading = true;
                }
                let v = this;
                const params = queryBookByUserParams(this.state, this.openType, this.page, this.pageSize);
                console.log("queryBookByUser params ===> ", params);
                await queryBookByUser(params).then(data => {
                    v.firstMessage = "";
                    console.log("queryBookByUser success ===> ", data);
                    this.firstLoading = false;
                    this.loading = false;
                    this.showBootLoading = false;
                    if (refresh) {
                        v.listData = data.data.data.lists;
                    } else {
                        v.listData = this.listData.concat(data.data.data.lists);
                    }
                    v.noMore = data.data.data.totalCount > data.data.data.page * data.data.data.pageSize;
                    if (v.noMore) {
                        this.showBootLoading = true;
                    }
                }).catch(error => {
                    v.firstLoading = false;
                    this.loading = false;
                    this.showBootLoading = false;
                    console.log("queryBookByUser error ===> ", error);
                    if (refresh) {
                        v.firstMessage = error.message;
                    }
                });
            },
            allBook() {
                this.$router.push({name: 'bookAll'});
            },
            enter() {
                this.loadListData(true)
            },
            async queryMySearchAsync(queryString, cb) {
                const params = queryBookByUserParams(queryString, this.openType, 1, 20);
                await queryBookByUser2(params).then(data => {
                    let list = data.data.data.lists;
                    this.restaurants = [];
                    for (let a in list) {
                        const p = {};
                        p["value"] = list[a].title;
                        p["address"] = list[a].bookId;
                        this.restaurants.push(p);
                    }
                    let restaurants = this.restaurants;
                    let results = queryString ? restaurants.filter(this.createMyStateFilter(queryString)) : restaurants;
                    cb(results);
                }).catch(error => {
                    this.restaurants = [];
                    let restaurants = this.restaurants;
                    let results = queryString ? restaurants.filter(this.createMyStateFilter(queryString)) : restaurants;
                    cb(results);

                });
            },
            createMyStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.itemClick(item.address)
            }
        }
    }
</script>
<style>

    .edit2e2 {
        height: 91vh;
        width: 98%;
        margin-top: 1vh;
        margin-left: 1%;
    }

    .edit2e {
        height: 75vh;
        width: 98%;
        margin-top: 1vh;
        margin-left: 1%;
    }

    .errorContent {
        width: auto;
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .errorView {
        width: 80vw;
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .allListUser {
        display: flex;
        flex-direction: row;
        margin-top: 0.7vh;
        align-items: center;
    }

    .allListTag {
        display: flex;
        flex-direction: row;
        margin-top: 0.3vh;
    }

    .allListDescription {
        margin-top: 0.2vh;
        max-lines: 2;
        min-height: 5vh;
        max-height: 5vh;
        display: -webkit-box;
        text-overflow: ellipsis;
        width: 39.5vw;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
    }

    .allListTitle {
        max-lines: 1;
        max-height: 2.2vh;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        width: 39.5vw;
        white-space: nowrap;
        margin-top: -1vh;
    }

    .allListCard {
        width: 41.5vw;
        height: 17vh;
        margin: 10px;
    }

    .allListDiv {
        padding-left: 7.2vw;
        margin-top: -1vh;
    }

    .searchInput {
        margin-left: 2vw;
        width: 45vw;
    }

    .tabsDiv {
        width: 100vw;
        height: 8vh;
        display: flex;
        flex-direction: row;
        padding-top: 1vh;
        align-items: center;
    }

    .popLabel {
        color: #909399;
        font-size: 11px;
        margin-top: 10px;
    }

    .popTag {
        width: auto;
        display: flex;
        flex-direction: row;
        margin-top: 1.5vh;
    }

    .popType {
        display: flex;
        flex-direction: row;
        margin-top: 2vh;
        align-items: center;
    }

    .popDescription {
        display: flex;
        flex-direction: row;
        margin-top: 2.5vh;
    }

</style>