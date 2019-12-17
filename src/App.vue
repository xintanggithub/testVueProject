<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {}
    }
</script>

<style>
    html {
        overflow-y: scroll;
    }

    :root {
        overflow-y: auto;
        overflow-x: hidden;
    }

    :root body {
        position: absolute;
    }

    body {
        width: 100vw;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #app {
        margin: 0 0 0 0;
    }
</style>
