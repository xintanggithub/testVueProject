import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/router'
import VueParticles from 'vue-particles'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(VueParticles);
Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
    el: '#app',
    render: h => h(App),
    router
});
