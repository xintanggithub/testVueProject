import Vue from 'vue';
import Router from 'vue-router';
import home from "~/page/home";
import login from '~/page/login/login'
import game from '~/page/children/game/game'
import book from '~/page/children/book/book'
import homeContent from '~/page/homeContent'
import register from '~/page/login/register'
import forget from '~/page/login/forget'

Vue.use(Router);

export const commonRouterMap = [
    {
        path: '/',
        name: 'home',
        component: home,
        redirect: '/homeContent',
        children: [{
            path: 'homeContent',
            name: 'homeContent',
            component: homeContent
        }, {
            path: 'game',
            name: 'game',
            component: game
        }, {
            path: 'book',
            name: 'book',
            component: book
        }]
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/register',
        name: 'register',
        component: register
    }, {
        path: '/forget',
        name: 'forget',
        component: forget
    }];

const createRouter = () => new Router({
    scrollBehavior: () => ({y: 0}),
    routes: commonRouterMap
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher
}

export default router;