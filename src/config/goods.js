/**
 * Created by yang on 2017/4/12.
 */

import Config from '../config/config'
import User from '../config/user'
import Request from '../config/request'
class Goods {
    constructor(allData={},details={}){
        this.allData=allData;
        this.details=details;
    }




    // 首页数据

    async getIndex(){
        let key = 'index';

        if (Config.isCache && !!this.allData[key]) {
            return this.allData[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptproduct/index',{data:{token:User.token}});

        this.allData[key] = res;
        return res;

    }
	async getBrand(){
		let key = 'getBrand';
		if (Config.isCache && !!this.allData[key]) {
            return this.allData[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptproduct/getBrand');

        this.allData[key] = res;
        return res;
	}
    async getMore(page,bid){
        let key = 'more'+page+'bid'+bid;

        if (Config.isCache && !!this.allData[key]) {
            return this.allData[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptproduct/getProductFromBrand',{data:{page:page,bid:bid}});

        this.allData[key] = res;
        return res;

    }

    async productFromType(page,type){
        let key = 'productFromType'+page+'type'+type;


        if (type!=1 && Config.isCache && !!this.allData[key]) {
            return this.allData[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptproduct/getProductFromType',{data:{page:page,type:type}});

        this.allData[key] = res;
        return res;

    }

    async getBanner(bid){
        let key = 'bannerBid'+bid;

        if (Config.isCache && !!this.allData[key]) {
            return this.allData[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptproduct/banner',{data:{bid:bid}});

        this.allData[key] = res;
        return res;

    }

    async getBanner2(type){
        let key = 'bannerType'+type;

        if (Config.isCache && !!this.allData[key]) {
            return this.allData[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptproduct/banner',{data:{type:type}});


        this.allData[key] = res;
        return res;

    }


    // 商品列表页


    async getItemData(id = 0){
        let key = 'id' + id;

        // if (Config.isCache && !!this.details[key]) {
        //     return this.details[key];
        // }

        let res = await Request.post(Config.apiDomain+'/Ptproduct/productDetail',{data:{id:id}});


        this.details[key] = res;
        return res;

    }

    async getSuggestGroup(id = 0){
        let key = 'suggestGroup' + id;

        if (Config.isCache && !!this.details[key]) {
            return this.details[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptdetail/suggestGroup',{data:{p_id:id}});


        this.details[key] = res;
        return res;

    }

    async getSuggestProduct(id = 0){
        let key = 'suggestProduct' + id;

        if (Config.isCache && !!this.details[key]) {
            return this.details[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptdetail/suggestProduct',{data:{p_id:id}});


        this.details[key] = res;
        return res;

    }

    async getComment(id = 0){
        let key = 'comment' + id;

        if (Config.isCache && !!this.details[key]) {
            return this.details[key];
        }

        let res = await Request.post(Config.apiDomain+'/Ptcomment/getNewcomment',{data:{token:User.token,p_id:id}});


        this.details[key] = res;
        return res;

    }


}


let goods =new Goods();
export default goods;