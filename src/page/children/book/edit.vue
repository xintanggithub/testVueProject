<template>
    <div class="editRoot">
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
                        <el-input v-show="dynamicTags.length<6" style="width: 6vw;" class="input-new-tag" maxlength="6"
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
                                  maxlength="50"
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

    export default {
        components: {myFooter, myUser},
        name: "edit",
        data() {
            return {
                description: '',
                typeValue: '',
                typeOptions: [{value: "1", label: "原创作品"}, {value: "2", label: "博文转载"}],
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                direction: 'btt',
                modal: false,
                modalAppendToBody: false,
                drawer: false,
                editStatus: false,
                helpStatus: false,
                openHelpStatus: false,
                checked1: false,
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
                    imagelink: true, // 图片链接
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
        methods: {
            cancel() {
                this.handleClose()
            },
            submit() {
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
                this.drawer = true;
                console.log("value ===》 ", this.value);
                console.log("checked1 ===》 ", this.checked1);
                console.log("render ===》 ", this.render);
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