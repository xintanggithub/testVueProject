<template>
    <div>
        <div v-for="(itemData,index) in listData" :key="index">
            <div style="width: 18vw;height: 20vh;">
                {{itemData.title}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'book',
        data() {
            return {
                listData: [
                    {title: "1"},
                    {title: "2"},
                    {title: "3"},
                    {title: "4"},
                ]
            }
        }
    }

</script>
<style>

</style>