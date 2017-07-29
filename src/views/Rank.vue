<style scoped lang="less">
	.tab {
		position: relative;
		background-color: ;
		.item {
			display: flex;
			align-items: center;
			a {
				line-height: .8rem;
				flex: 1;
				text-align: center;
				color:rgb(71,83,89);
				font-size: .32rem;
			}
			a.active {
				color: rgb(249,55,79);
			}
		}
		span {
			position: absolute;
			bottom: 0;
			border: 1px solid rgb(249,55,79);
			width:25%;
			transition: left 0.5s cubic-bezier(0.68, 0.22, 0.27, 1.55);
		}
		
	}
	.tabList {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0 .2rem;
		background-color:#fff;
		.type {
			padding: .2rem 1rem;
			display:flex;
			align-items: center;
			just-content:center;
			border-bottom:1px  solid rgb(222,222,222);
			a {
				width: 2rem;
				text-align: center;
				line-height: .6rem;
				color:#000;
				font-size: .30rem;
				background-color: #fff;
				border: 1px solid rgb(249,55,79);
			}
			a.active {
				color: #fff;
				background-color: rgb(249,55,79);
			}
			a:nth-child(1) {
				border-bottom-left-radius: 20px;
				border-top-left-radius: 20px;
				
			}
			a:nth-child(3) {
				border-bottom-right-radius: 20px;
				border-top-right-radius: 20px;
			}
			
		}
		.item {
			border-bottom: 1px solid rgb(222,222,222);
			display: flex;
			align-items: center;
			padding: .2rem 0;
			position: relative;
			>i {
				position: absolute;
				right: .2rem;
				top: .2rem;
				width: .4rem;
				height: .4rem;
				line-height: .4rem;
				border-radius: 50%;
				text-align: center;
			}
			>i:nth-child(1) {
				background-color: rgb(249,55,79);
				color: #fff;
			}
			>i:nth-child(2) {
				background-color: rgb(253,135,48);
				color: #fff;
			}
			>i:nth-child(3) {
				background-color: rgb(66,148,199);
				color: #fff;
			}
			.imgBox {
				position: relative;
				img {
					width: 1.8rem;
					border-radius: 10px;
				}
				span {
					position: absolute;
					bottom: .2rem;
					width: 100%;
					text-align: center;
					color: #fff;
					line-height: .5rem;
					background-color: rgba(51,51,51,0.6);
				}
			}
			.contentBox {
				padding: 0 .1rem;
				flex: 1;
				display: flex;
				flex-direction: column;
				p {
					line-height: 0.4rem;
			        overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					margin-top: .1rem;
					font-size: .26rem;
					color:rgb(135,145,148);
					font-size: .28rem;
					color:rgb(71,83,89);
				}
				>span {
					margin-top: .1rem;
				}
				.classify {
					margin-top: .1rem;
					display: flex;
					align-items: center;
					span {
						text-align: right;
						flex: 1;
						font-size: .26rem;
						color:rgb(135,145,148);
					}
				}
				
			}
			
		}
		.noBook {
			span {
				margin: 1.5rem auto;
				display: block;
				text-align: center;
			}
		}
	}
</style>
<template>
	<div class="container">
		<div class="tab">
			<div class="item">
				<a :class="{active:nav===0}" @click="chooseNav(0)">人气</a>
				<a :class="{active:nav===1}" @click="chooseNav(1)">点赞</a>
				<a :class="{active:nav===2}" @click="chooseNav(2)">收藏</a>
			</div>
			<span class="curBg" :style="{left:nav*33.3+4+'%'}">
		</div>
		<div class="tabList">
				<div class="type">
					<a :class="{active:type===0}" @click="chooseType(0)">周排行榜</a>
					<a :class="{active:type===1}" @click="chooseType(1)">月排行榜</a>
					<a :class="{active:type===2}" @click="chooseType(2)">总排行榜</a>
				</div>
			<template v-if="hasBook">
				<div class="item" v-for="item in listData" v-link="{path:'/comicsCenter',query:{ id:item.id}}">
					<i>{{$index+1}}</i>
					<div class="imgBox">
						<img :src="item.cover_img">
						<span>更新至第{{item.total_chapter}}话</span>
					</div>
					<div class="contentBox">
						<h2>{{item.c_name}}</h2>
						<span>{{item.c_auth}}</span>
						<p>{{item.c_info}}</p>
						<div class="classify">
							<template v-if="formData.rank=='click'">
								<span v-if="formData.sort=='w'">{{item.w_click_num}}人点击</span>
								<span v-if="formData.sort=='m'">{{item.m_click_num}}人点击</span>
								<span v-if="formData.sort=='t'">{{item.t_click_num}}人点击</span>
							</template>
							<template v-if="formData.rank=='love'">
								<span v-if="formData.sort=='w'">{{item.w_love_num}}人点赞</span>
								<span v-if="formData.sort=='m'">{{item.m_love_num}}人点赞</span>
								<span v-if="formData.sort=='t'">{{item.t_love_num}}人点赞</span>
							</template>
							<template v-if="formData.rank=='keep'">
								<span v-if="formData.sort=='w'">{{item.w_keep_num}}人收藏</span>
								<span v-if="formData.sort=='m'">{{item.m_keep_num}}人收藏</span>
								<span v-if="formData.sort=='t'">{{item.t_keep_num}}人收藏</span>
							</template>
						</div>
					</div>
					
				</div>
			</template>
			<template v-if="!hasBook">
				<div class="noBook">
					<span>还木有哦O(∩_∩)O~ 赶快去看漫画吧~~</span>
				</div>
			</template>
			<template v-if="!!length">
	            <no-more v-el:get-more>
	                <span v-if="hasMore">加载更多...</span>
	                <span v-if="!hasMore">客官，到底啦</span>
	            </no-more>
	        </template>
		</div>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
	import { Toast,Indicator,MessageBox } from 'mint-ui';
	import bottomTab from '../components/bottomTab'
	import noMore from '../components/nomore'

	export default {
		components:{
			bottomTab,
			noMore
		},
		data () {
			return {
				nav:0,
				type:0,
				loading: false,
                hasMore:true,
                listData: [],     
                length: 0,
                fun:'',
                hasBook:false,
                formData:{
                	token:User.token,
                	sort:'w',
                	rank:'click',
                	page:1
                }
			}
		},
		created(){

			this.$dispatch('isLoading',true)

		},
		async ready () {
			this.chooseNav(0);
			window.addEventListener('scroll', this.throttle(this.loadMore,250,500));
			this.$dispatch('isLoading',false);
			
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.fun);
		},
		methods: {
			async chooseNav(i){
				this.nav=i;
				this.formData.page=1;
				this.loading=false;
				this.hasMore=true;
				this.listData=[];
				this.length=0;
				this.hasBook=false;
				switch(this.nav){
					case 0:
						this.formData.rank='click';break;
					case 1:
						this.formData.rank='love';break;
					case 2:
						this.formData.rank='keep';break;
				}
				await this.getData();
				if(this.listData.length>0) {
					this.hasBook=true;
				}
			},
			async chooseType(i) {
				this.type=i;
				this.formData.page=1;
				this.loading=false;
				this.hasMore=true;
				this.listData=[];
				this.length=0;
				this.hasBook=false;
				switch(this.type){
					case 0:
						this.formData.sort='w';break;
					case 1:
						this.formData.sort='m';break;
					case 2:
						this.formData.sort='t';break;
				}
				await this.getData();
				if(this.listData.length>0) {
					this.hasBook=true;
				}
			},
			async getData(){
                if (this.loading) {
                    return false;
                }
                this.loading = true;

                let res = await Request.post(Config.apiDomain + '/comics/getRanking',{data:this.formData});
                if(res.status == 200 && !!res) {
                    this.formData.page++;
                    this.listData.push(...res.data);

                    let len = 0;
                    if(res) len += res.data.length;
                    this.length+= len
                    if(res.data.length<6) {
                    	
                    	this.hasMore=false;
                    
                    }
                }
                else {
                    this.hasMore = false;
                }
                this.loading=false;
            },
            async loadMore(){
                var pos = this.$els.getMore.getBoundingClientRect();

                if (this.hasMore &&
                    ((pos.top> 0 && window.innerHeight - pos.top> 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                    await this.getData();
                }
            },
            throttle(func, wait, mustRun) {
                // 节流
                let timeout,
                    startTime = new Date();

                return this.fun = function() {
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
            }
		}
	}
</script>