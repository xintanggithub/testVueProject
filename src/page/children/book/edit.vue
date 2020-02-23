<template>
    <div v-loading="loading" class="editRoot">
        <div class="editTop">
            <div class="editLog" @click="goHome">
                <img src="../../../res/img/logo_icon.png" class="logoIcon"/>
            </div>
            <el-input type="text" placeholder="请输入内容" v-model="title" maxlength="65" show-word-limit
                      class="editTitleInput editLog">
            </el-input>
            <el-checkbox class="editLog" v-model="checked1" label="公开发布" border></el-checkbox>
            <el-button type="danger" class="editLog editCommit" @click="commit">确认发布</el-button>
            <my-user hideLoginOut></my-user>
            <div style="position: absolute;right: 3vh;top: 2vh;">
                <el-button type="danger" @click="goBack" icon="el-icon-close" circle></el-button>
            </div>
        </div>
        <div class="editContent">
            <mavon-editor :class="editStatus===false?'edit1':'edit2'" v-model="value" :toolbars="toolbars"/>
            <transition name="el-zoom-in-center">
                <div v-show="helpStatus===false" class="topBtnRoot">
                    <div class="topBtn">
                        <el-button @click="close" type="danger" icon="el-icon-close" round>关闭帮助</el-button>
                    </div>
                    <el-card>
                        <span class="helpContent">
                    F8	    开启/关闭导航<br/>
                F9		预览/编辑切换<br/>
                F10		开启/关闭全屏<br/>
                F11		开启/关闭阅读模式<br/>
                F12		单栏/双栏切换<br/>
                TAB		缩进<br/>
                CTRL + S		触发保存<br/>
                CTRL + D		删除选中行<br/>
                CTRL + Z		上一步<br/>
                CTRL + Y		下一步<br/>
                CTRL + BreakSpace		清空编辑<br/>
                CTRL + B		加粗<br/>
                CTRL + I		斜体<br/>
                CTRL + H		# 标题<br/>
                CTRL + 1		# 标题<br/>
                CTRL + 2		## 标题<br/>
                CTRL + 3		### 标题<br/>
                CTRL + U		++下划线++<br/>
                CTRL + M		==标记==<br/>
                CTRL + Q		> 引用<br/>
                CTRL + O		1. 有序列表<br/>
                CTRL + L		链接<br/>
                CTRL + ALT + S		^上角标^<br/>
                CTRL + ALT + U		- 无序列表<br/>
                CTRL + ALT + C		``` 代码块<br/>
                CTRL + ALT + T		表格<br/>
                CTRL + SHIFT + S		下角标<br/>
                CTRL + SHIFT + D		中划线<br/>
                CTRL + SHIFT + C		居中<br/>
                CTRL + SHIFT + L		居左<br/>
                CTRL + SHIFT + R		居右<br/>
                SHIFT + TAB		取消缩进<br/>
                </span>
                    </el-card>
                </div>
            </transition>
            <transition name="el-zoom-in-top">
                <div v-show="openHelpStatus" class="openBtn">
                    <el-button class="openBtnS" @click="open" type="danger"
                               icon="el-icon-plus" circle></el-button>
                </div>
            </transition>
        </div>
        <el-drawer :visible.sync="drawer" :before-close="handleClose" :direction="direction" :modal="modal"
                   :modal-append-to-body="modalAppendToBody" size="50%" :show-close="false">
            <div class="popDiv">
                <div class="popContent">
                    <span>设置标签：</span>
                    <span class="popLabel">
                        说明：最多可以添加6个标签，方便其他人通过感兴趣的标签，快速找到对应的内容。<br/>
                        更容易突出内容要点、关键要素等等。
                    </span>
                    <div class="popTag">
                        <el-tag style="margin-right: 10px;" :key="tag" v-for="tag in dynamicTags" closable
                                :disable-transitions="false"
                                @close="handleClose2(tag)" type="danger">
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
                    <div class="popType">
                        <span>类型：</span>
                        <el-select size="small" v-model="typeValue" placeholder="请选择" clearable value="">
                            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                       :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="popDescription">
                        <span>简述：</span>
                        <el-input style="width: 30vw;font-size: 12px;" type="textarea" placeholder="请简单描述"
                                  v-model="description"
                                  maxlength="150"
                                  show-word-limit></el-input>
                    </div>
                    <div class="popHandle">
                        <el-button type="danger" class="editLog editCommit" @click="submit">提交</el-button>
                        <el-button type="info" class="editLog editCommit" style="margin-left: 4vw;" @click="cancel">
                            取消
                        </el-button>
                    </div>
                </div>

            </div>
        </el-drawer>
        <my-footer></my-footer>
    </div>
</template>
<script>

    import myFooter from '../../common_component/foot/footer'
    import myUser from '../../common_component/user/myUser'
    import {insertBook, insertBookParams} from '../../../api/book'
    import {getLoginInfo} from '../../../utils/loginStatus'

    export default {
        components: {myFooter, myUser},
        name: "edit",
        data() {
            return {
                loading: false,
                description: '',//简述
                typeValue: '',//类型
                typeOptions: [{value: "原创作品", label: "原创作品"}, {value: "博文转载", label: "博文转载"}],
                dynamicTags: [],//标签
                inputVisible: false,
                inputValue: '',
                direction: 'btt',
                modal: false,
                modalAppendToBody: false,
                drawer: false,
                editStatus: false,
                helpStatus: false,
                openHelpStatus: false,
                checked1: false,//true 选择，false 未选择
                title: "",
                value: "",
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
            //type 1 新增 2 编辑
            let type = this.$route.params.type;
            console.log("type ===>  ", type);
            //book id
            let id = this.$route.params.id;
            console.log("id ===>  ", id);
        },
        methods: {
            tipDialog() {
                this.$confirm('提交成功，是否再写一篇？', "提示", {
                    confirmButtonText: '再写一篇',
                    cancelButtonText: '不了',
                    type: 'warning'
                }).then(_ => {
                    //取消显示
                }).catch(_ => {
                    //关闭界面
                    this.$router.go(-1);
                });
            },
            async submitApiData() {
                let tag = '';
                for (let x in this.dynamicTags) {
                    tag += this.dynamicTags[x] + (this.dynamicTags.length === x ? "" : ",")
                }
                let params = insertBookParams(getLoginInfo().id, this.title, this.checked1 ? 1 : 0,
                    tag.substr(0, tag.length - 1), this.description, this.value, this.typeValue);
                console.log("insert params =>", params);
                this.loading = true;
                await insertBook(params).then(data => {
                    this.loading = false;
                    this.drawer = false;
                    this.description = '';
                    this.dynamicTags = [];
                    this.checked1 = false;
                    this.title = '';
                    this.value = '';
                    this.tipDialog()
                }).catch(error => {
                    this.loading = false;
                    this.$notify({
                        title: '错误',
                        message: error.data.resultMessage || "提交发生异常",
                        type: 'error',
                        duration: 2000
                    });
                })
            },
            cancel() {
                this.handleClose();
            },
            goBack(){
                history.back();
            },
            submit() {
                if (this.dynamicTags.length <= 0) {
                    this.$notify({
                        title: '警告',
                        message: '请填写标签',
                        type: 'warning',
                        duration: 2000
                    });
                } else {
                    if (this.typeValue) {
                        if (this.description) {
                            this.submitApiData()
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
            handleClose2(tag) {
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
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleClose() {
                this.$confirm('确认取消提交？')
                    .then(_ => {
                        this.drawer = false;
                    })
                    .catch(_ => {
                    });
            },
            close() {
                this.helpStatus = true;
                setTimeout(() => {
                    this.editStatus = true;
                    this.openHelpStatus = true;
                }, 300);
            },
            open() {
                this.openHelpStatus = false;
                setTimeout(() => {
                    this.helpStatus = false;
                    this.editStatus = false;
                }, 300);
            },
            commit() {
                //value 内容 title 标题
                if (this.title) {
                    if (this.value || this.value === null || this.value === undefined || this.value === " ") {
                        console.log("title ==> ", this.title);
                        console.log("value ==> ", this.value);
                        this.drawer = true;
                    } else {
                        this.$notify({
                            title: '错误',
                            message: '当前还没有书写任何内容哦~',
                            type: 'error',
                            duration: 2000
                        });
                    }
                } else {
                    this.$notify({
                        title: '错误',
                        message: '还没有填写标题哦~',
                        type: 'error',
                        duration: 2000
                    });
                }
            },
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .popHandle {
        display: flex;
        flex-direction: row;
        margin-top: 6vh;
    }

    .popDescription {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
    }

    .popType {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        align-items: center;
    }

    .popTag {
        width: auto;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
    }

    .popLabel {
        color: #C0C4CC;
        font-size: 11px;
        margin-top: 10px;
    }

    .popContent {
        display: flex;
        flex-direction: column;
    }

    .popDiv {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .openBtnS {
        height: 40px;
        width: 40px;
    }

    .openBtn {
        height: 40px;
        width: 40px;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
        border-radius: 50%;
    }

    .helpContent {
        color: #909399;
        font-size: 12px;
    }

    .topBtn {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row-reverse;
    }

    .topBtnRoot {
        width: 19%;
        height: 86vh;
        margin-left: 1%;
        display: flex;
        flex-direction: column;
    }

    .editContent {
        width: 100%;
        height: 88vh;
        display: flex;
        flex-direction: row;
    }

    .logoIcon {
        max-height: 4.5vh;
        margin-top: 0.4vh;
    }

    .edit1 {
        height: 86vh;
        width: 78%;
        margin-left: 1%;
    }

    .edit2 {
        height: 86vh;
        width: 98%;
        margin-left: 1%;
    }

    .editRoot {
        width: 100vw;
        height: 100vh;
    }

    .editTop {
        width: 100vw;
        height: 9vh;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .editLog {
        margin-left: 1vw;
    }

    .editTitleInput {
        width: 50vw;
    }

    .editCommit {
        width: 8vw;
    }
</style>