<template>
    <div class="editRoot">
        <div class="editTop">
            <div class="editLog" @click="goHome">
                <img src="../../res/img/logo_icon.png" class="logoIcon"/>
            </div>
            <el-input
                    type="text"
                    placeholder="请输入内容"
                    v-model="title"
                    maxlength="100"
                    show-word-limit
                    class="editTitleInput editLog"
            >
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
        <my-footer></my-footer>
    </div>
</template>
<script>
    import myFooter from '../common_component/foot/footer'
    import myUser from '../common_component/user/myUser'

    export default {
        components: {myFooter, myUser},
        name: "edit",
        data() {
            return {
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
    .openBtnS {
        height: 40px;
        width: 40px;
    }

    .openBtn {
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        padding: 2px;
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