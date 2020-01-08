<template>
    <div>
        <mavon-editor
                class="md"
                :value="mdValue"
                :subfield = "false"
                :defaultOpen = "'preview'"
                :toolbarsFlag = "false"
                :editable="false"
                :scrollStyle="true"
                :ishljs = "true"
        >

        </mavon-editor>
    </div>
</template>
<script>
    export default {
        name: "detail",
        data() {
            return {
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
        methods: {}
    }
</script>
<style>

</style>