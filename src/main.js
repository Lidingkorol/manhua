/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from 'components/app.vue';
import Routers from './router';
import MintUI from 'mint-ui'
import setWechatTitle from './libs/setWechatTitle'
// import FastClick from './libs/fastclick'
import vueTap from 'v-tap';
import Weixin from './libs/wxShare'
import Config from './config/config'

Vue.use(vueTap);
Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueResource);

// FastClick.attach(document.body)

Vue.http.options.xhr = {withCredentials: true};

// post的时候会把JSON对象转成formdata
Vue.http.options.emulateJSON=true;
Vue.http.options.emulateHTTP = true;

// 在拦截其中添加此属性即可

Vue.http.interceptors.push((request, next) => {
    // request.credentials = true
    next()
})





// 开启debug模式
Vue.config.debug = false;

Vue.prototype.cnzz = function(a,b){
    _czc.push(['_trackEvent',a , b,'', '','']);
};

// 路由配置
let router = new VueRouter({
    // 是否开启History模式的路由,默认开发环境开启,生产环境不开启。如果生产环境的服务端没有进行相关配置,请慎用
    // history: Env != 'production'
    history:true
});

router.map(Routers);

router.beforeEach(() => {
    window.scrollTo(0, 0);
});

router.afterEach((transition) => {
    let title = transition.to.title || Config.appName
    let nameTo = transition.to.matched[0].handler.path

    setWechatTitle(title)

    console.warn(nameTo)

    /*if( nameTo != '/groupItem' && nameTo != '/groupStatus' && nameTo != '/cutShare' ){
        Weixin.init(()=>{
            Weixin.updateShare()
        });
    }*/
})

router.redirect({
    '*': "/"
});
router.start(App, '#app');
