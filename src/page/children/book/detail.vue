<template>
    <div>
        <mavon-editor :value="mdValue" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false"
                      :editable="false" :scrollStyle="true" :ishljs="true"></mavon-editor>
    </div>
</template>
<script>
    export default {
        name: "detail",
        data() {
            return {
                id: "",
                mdValue: "12312313wqeqeqeq\n" +
                    "\n" +
                    "```\n" +
                    "public void a(){\n" +
                    "\n" +
                    "}\n" +
                    "```\n" +
                    "\n" +
                    "### 哈哈\n" +
                    "\n" +
                    "##### 哦哦"
            }
        },
        created() {
            this.id = this.$route.params.id;
            console.log("====> detail id === ", this.id)
        },
        methods: {}
    }
</script>
<style>

</style>