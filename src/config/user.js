

import Vue from 'vue';
import Config from '../config/config'
import Request from '../config/request'
import Util from '../libs/util';


class User{
	constructor(
		isLogin=false,
		token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEwMDAwMDE6MTUwMDk2ODMxNiI.ocXxBFLAntMZ-k2oBkQd90To7bAWScMjRYhN0dbgH7o',
		timeout=0,
		uid='',
		openid='',
		isWeixin="micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i),
		username='',
		logo='',
		score='',
		numberInfo=''){
			this.isLogin=isLogin;
	        this.token=token;
	        this.timeout=timeout;
	        this.uid=uid;
	        this.openid=openid;
	        this.isWeixin=isWeixin;
	        this.username=username;
	        this.logo=logo;
        	this.score=score;
		}
	init(query) {
		let self = this,
            queryData = query,
            userInfo = localStorage.getItem('USER');
        
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
}






let user=new User();

export default user;