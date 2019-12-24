<template>
    <div id="app" style="position: relative;width: 100vw;height: 100vh;">
        <div v-show="isPc" style="position: absolute;z-index: 1;width: 100vw;height: 100vh;">
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
        data() {
            return {
                isPc: true
            }
        },
        mounted() {
            if (this._isMobile()) {
                this.isPc = false;
                this.$router.replace('/m');
            } else {
                this.isPc = true;
                this.$router.replace('/');
            }
        },
        methods: {
            _isMobile() {
                return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            }
        }
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
