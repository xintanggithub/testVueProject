<template>
    <div id="app" style="position: relative;width: 100vw;height: 100vh;">
        <div style="position: absolute;z-index: 1;width: 100vw;height: 100vh;">
            <vue-particles
                    color="#909399"
                    linesColor="#909399"
                    clickMode="push"
                    :moveSpeed=2
                    :particlesNumber=70
                    :particleSize=3>
            </vue-particles>
        </div>
        <div style="position: absolute;z-index: 2;">
            <router-view></router-view>
        </div>
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
