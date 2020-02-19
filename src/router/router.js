import Vue from 'vue';
import Router from 'vue-router';
import home from "~/page/home";
import login from '~/page/login/login'
import game from '~/page/children/game/game'
import book from '~/page/children/book/book'
import homeContent from '~/page/homeContent'
import register from '~/page/login/register'
import forget from '~/page/login/forget'
import mine from '~/page/personalCenter/mine'
import minContent from '~/page/personalCenter/minContent'
import setting from '~/page/personalCenter/setting'
import mobile from '~/mobile/mobileHome'
import edit from '~/page/children/book/edit'
import bookAll from '~/page/children/book/children/all'
import bookMyBook from '~/page/children/book/children/myboot'
import jp from '~/page/children/book/children/jp'
import HomeSample from "~/page/common_component/HomeSample";

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
            component: book,
            redirect: '/book/bookAll',
            children: [{
                path: 'bookAll',
                name: 'bookAll',
                component: bookAll
            }, {
                path: 'bookMyBook',
                name: 'bookMyBook',
                component: bookMyBook,
            }, {
                path: 'jp',
                name: 'jp',
                component: jp
            }]
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
    }, {
        path: '/mine',
        name: 'mine',
        component: mine,
        redirect: '/mine/minContent',
        children: [{
            path: 'minContent',
            name: 'minContent',
            component: minContent
        }, {
            path: 'setting',
            name: 'setting',
            component: setting
        }]
    },
    {
        path: '/m',
        name: 'mobile',
        component: mobile
    },
    {
        path: "/edit",
        name: "edit",
        component: edit
    },
    {
        path: "/HomeSample",
        name: "HomeSample",
        component: HomeSample
    }
];

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