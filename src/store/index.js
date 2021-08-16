
import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: null,
    },
    mutations: {
        // 登录成功将, token保存在localStorage和sessionStorage中
        login: (state, data) => {
            state.token = data;
            localStorage.token = data;
        },
        // 退出登录将, token清空
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('User');
            localStorage.removeItem('socket_id');
            localStorage.removeItem('wx_id');
            localStorage.removeItem('settleShop');
            localStorage.removeItem('settle_order');
            localStorage.removeItem('userInfo')
            state.token = null
        },
    }
})