/**
 * Created by Sherry on 2016/9/27.
 */
import config from '../config/config';
import Request from '../config/request';
import wx from 'weixin-js-sdk';

var shareWx={
    isAndroid : navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1, //android终端
    isiOS : !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    isWeixin: "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i),
    pcWeixin: "windowswechat" == window.navigator.userAgent.toLowerCase().match(/WindowsWechat/i),
    signatureInterface:'/Weixin/getSignPackage',
    shareConf: {
        title: config.appName + '等你来！',
        desc: '我在'+config.appName+'发现了一个不错的商品，赶快来看看吧。',
        link: (function(){
            return window.location.origin + "?invite=1";
        })(),
        imgUrl: 'http://ww1.sinaimg.cn/mw690/006BEJyMgw1fag5tzhj13j30p00p0dil.jpg',
        success: function() {
        },
        cancel: function() {
        }
    },
    signatureUrl : location.href.replace(/#.*$/, ""),
    async init(callback){
        var _this = this,
            setings = "onMenuShareTimeline onMenuShareAppMessage chooseImage previewImage uploadImage downloadImage translateVoice getNetworkType openLocation getLocation hideOptionMenu showOptionMenu hideMenuItems showMenuItems closeWindow",
            signatureUrl = location.href.replace(/#.*$/, "");

        this.isiOS ? signatureUrl = this.signatureUrl : '';

        let res=await Request.post(config.apiDomain+this.signatureInterface,{data:{'url':encodeURIComponent(signatureUrl)}});
        if(res.status!=200){
            return false;
        }
        wx.config({
            debug: false,
            appId: res.data.signature.appId,
            timestamp: res.data.signature.timestamp,
            nonceStr: res.data.signature.nonceStr,
            signature: res.data.signature.signature,
            jsApiList: setings.split(" ")
        });
        wx.ready(function() {
            if(callback){
                callback();
            }
            else{
                _this.updateShare()
            }
            // callback&&callback()
        });
        wx.error(function(res) {
            console.log('微信验证失败');
        });


    },
    updateShare:function(conf){
        console.count('updata')
        var setings = "onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone",
            thisConf = this.shareConf,
            obj = {},
            Conf = conf || {};


        for (var k in thisConf) {
            if (Conf.hasOwnProperty(k)) {
                obj[k] = Conf[k];
            } else {
                obj[k] = thisConf[k];
            }
        }

        console.warn(obj)

        setings.split(" ").forEach(function(e) {
            if(e == 'onMenuShareTimeline'){
                wx[e]({
                    title: obj['title'],
                    link: obj['link'],
                    imgUrl: obj['imgUrl'],
                    fun_name: 'onMenuShareTimeline',
                    success: obj['success'],
                    cancel: obj['cancel']
                });
            }else if(e=='onMenuShareAppMessage'){
                wx[e]({
                    title: obj['title'],
                    link: obj['link'],
                    desc:obj['desc'],
                    imgUrl: obj['imgUrl'],
                    fun_name: 'onMenuShareAppMessage',
                    success: obj['success'],
                    cancel: obj['cancel']
                });
            } else {
                obj['fun_name'] = e;
                wx[e](obj);
            }
        });
    }
};

export default shareWx;