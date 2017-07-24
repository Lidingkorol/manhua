<style scoped>
    @import '../styles/common.css';

    /*  back to top  */

    .touch-back {
        position: fixed;
        bottom: 2.20rem;
        right: 0.20rem;
        height: .8rem;
        width: .8rem;
        border-radius: 50%;
        background: rgba(0,0,0,.5);
        color: #fff;
        text-align: center;
        z-index: 999;
    }
    .touch-back span {
        display: block;
        height: .44rem;
        line-height: .44rem;
    }

    .touch-back:before {
        content: '';
        display: block;
        height: .26rem;
        width: .26rem;
        background: transparent;
        border: 2px solid #fff;
        border-bottom: transparent;
        border-left: transparent;
        position: absolute;
        top: 58%;
        left: 50%;
        -webkit-transform: translate3d(-50%,-50%,0) rotate(-45deg);
        transform: translate3d(-50%,-50%,0) rotate(-45deg);
    }
</style>
<template>
    <div style="height: 100%">
        <router-view transition="ani-opacity2" transition-mode="out-in"></router-view>
        <div style="position:fixed; top: 0;width:100%; height: 100vh; background: rgba(255,255,255,0); z-index: 10000;"  v-show="indexLoading" transition="ani-opacity" transition-mode="out-in" @touchmove.prevent>
            <mt-spinner :type="2" color="#26a2ff" :size="60"></mt-spinner>
        </div>




        <div class="touch-back" v-tap.prevent="cnzz('返回顶部','返回顶部')" v-tap="backTop" v-show="scrolledTop>200"  transition="ani-in"></div>
    </div>
</template>

<script>
    //import Weixin from '../libs/wxShare';
    import { Spinner } from 'mint-ui';
    import Config from '../config/config'
    import Request from '../config/request'
    import User from '../config/user'
    import { Bounce } from '../libs/tween'

    export default {
        components: {
            Spinner,

        },
        data () {
            return {
                indexLoading: true,
                scrolledTop: 0,
            }
        },
        async created () {

//            if(Weixin.isWeixin) Weixin.init();
            //User.init(this.$route.query);
            //if(!User.isLogin) window.location.href = Config.apiDomain+'/weixin/siteAuth';


        },

        ready () {
            this.$nextTick(()=>{
                window.addEventListener('scroll',this.throttle(this.handleScroll,500,1000));
            })
        },
        beforeDestroy () {
			
        },
        methods: {
        	async getUser(){
        		window.location.href=Config.apiDomain+'?o_token=oiL_jjmF58lQA_76tZzb39Mlf7sA';
        	},
            backTop(){
                /*console.log(Weixin.isAndroid)
                if(Weixin.isAndroid)  window.scrollTo(0,0);
                else this.backTopEvent();*/
               	this.backTopEvent();
            },

            backTopEvent(){

                let [t,b,c,d]=[600/1000,window.scrollY,-window.scrollY,0.9]

                let x=Bounce.easeIn(t,b,c,d);
                window.scrollTo(0,x);
                if(x<=0){
                    return false;
                }
                requestAnimationFrame(this.backTopEvent);
            },
            handleScroll(){
                this.scrolledTop = window.scrollY;
            },
            throttle(func, wait, mustRun) {
                let timeout,
                    startTime = new Date();

                return function() {
                    let context = this,
                        args = arguments,
                        curTime = new Date();

                    clearTimeout(timeout);
                    if(curTime - startTime >= mustRun){
                        func.apply(context,args);
                        startTime = curTime;
                    }else{
                        timeout = setTimeout(func, wait);
                    }
                };
            },
        },
        events:{
            isLoading(value){
                this.indexLoading=value;
            }
        }
    }
</script>
