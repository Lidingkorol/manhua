/**
 * Created by yang on 2017/2/27.
 */
import Vue from 'vue';
import Config from '../config/config'
import Request from '../config/request'
import Util from '../libs/util';




class User{
    constructor(isLogin=false,userInfo=null,token='',timeout=0,uid='',openid='',isWeixin="micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i),username='',img='',numberInfo=''){
        this.isLogin=isLogin;
        this.userInfo=userInfo;
        this.token=token;
        this.timeout=timeout;
        this.uid=uid;
        this.openid=openid;
        this.isWeixin=isWeixin;
        this.username=username;
        this.img=img;
        this.numberInfo = numberInfo;
        this.toast=1;    //首页弹窗
    }
    init(query){
        let self = this,
            queryData = query,
            userInfo = localStorage.getItem('USER');
        console.log(queryData);

        console.log(queryData.res)
        if (queryData.res == 'clear') {

            localStorage.removeItem('USER');
            // localStorage.removeItem('CART');

            history.replaceState(history.state, null, this.getNoCodeHref(queryData));
        }

        if (!!queryData.token) {
            console.log('存在token')
            this.token = queryData.token;
            this.openid=queryData.openid;
            this.timeout = Date.now() + 86400000;

            this.isLogin=true;

            setTimeout(() => {
                history.replaceState(history.state, null, this.getNoCodeHref(queryData));
            },800)

            return  this.getUser();

        } else {

            return  this.checkUser();

        }
    }
    getNoCodeHref(query) {
        // console.log(query)
        let search = query,
            href = window.location.origin + window.location.pathname;
        delete search.code;
        delete search.state;
        delete search.from;
        delete search.isappinstalled;
        delete search.token;
        delete search.res;
        delete search.openid;
        delete search.isFocus;
        search = Util.objToQueryString(search);
        return href + (search == '' ? '' : '?' + search);
    }
    checkUser() {
        let user = localStorage.getItem('USER');
        if (!!user) {
            user = JSON.parse(user);
            // console.warn(user)
        }

        if (user && user.token && user.timeout > Date.now()) {
            if (user.id && user.img) {
                this.saveUser(user.token, user.timeout, user.id,user.username,user.img);
                return true;
            } else {
                this.token = user.token;
                this.timeout = user.timeout;
                return  this.getUser();
            }
        } else {
            this.removeUser();
            return false;
        }
    }
    saveUser(token, timeout=(Date.now() + 86400000), uid,username,img) {
        if (!token) {
            return;
        }

        let obj = {
            token: token,
            timeout: timeout ,
            id: uid,
            username:username,
            img:img
        };
        localStorage.setItem('USER', JSON.stringify(obj));


        this.token = obj.token;
        this.uid = obj.id;
        this.timeout = obj.timeout;
        this.isLogin = true;
        this.username=obj.username;
        this.img=obj.img;
        return obj;
    }
    removeUser() {
        console.warn('移除User')
        this.isLogin = false;
        this.userInfo = null;
        this.token = '';
        this.timeout = 0;
        this.uid = '';
        localStorage.removeItem('USER');
    }

    //返回user对象
    async getUser() {
        console.log('getUser')
        let res=await Request.post(Config.apiDomain + '/user/getUserInfo?token='+this.token)
        if (res.status == 200 && !!res.data && !!res.data.item && res.data.item.length > 0) {
            this.uid = res.data.item[0].id;
            this.username = res.data.item[0].username;
            this.img = res.data.item[0].img;
            // this.couponNum=Number.parseInt(res.data.item[0].coupon_num);
            // this.isFocus=res.data.item[0].isFocus
            // console.log(this.couponNum)
            console.log(res.data)
            this.saveUser(this.token, this.timeout, this.uid,this.username,this.img);
            return res;
        }
        return false;
    }




    async setUserName(name=''){
        let res=await Request.post(Config.apiDomain + '/Member/setUserName?token='+this.token,{data:{username:name}})
        return res;
    }



    async addAddress(address){
        let res = await Request.post(Config.apiDomain + '/grouporder/addAddress',{data:address})

        return res;

    }

    async updateAddress(address){
        console.log(address)
        let res = await Request.post(Config.apiDomain + '/grouporder/setDefault',{data:address})
        return res;
    }
    async PTupdateAddress(address){
        console.log(address)
        let res = await Request.post(Config.apiDomain + '/Ptdetail/addAddress',{data:address})
        return res;
    }

    async getAddress(){

        let res = await Request.post(Config.apiDomain + '/Member/getUserAddressList?token='+this.token)

        return res;

    }

    async delAddress(id){

        let res = await Request.post(Config.apiDomain + '/Member/delUserAddress?token='+this.token,{data:{addressId:id}});

        return res;

    }

    // 个人中心数字标识

    async getInfo(){
        // if(this.numberInfo!=='' && Config.isCache){
        //     return this.numberInfo;
        // }
        // else {
            let res = await Request.post(Config.apiDomain + '/Ptdetail/getInfo',{data:{token:this.token}});
            this.numberInfo = res.data
            return res
        // }
    }

}


let user=new User();
export default user;