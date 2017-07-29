<style scoped lang="less">
	.header {
		position: relative;
		margin-bottom: 1rem;
    	.bg {
    		background-image: url(https://img.alicdn.com/imgextra/i1/913571587/TB2SRogrtRopuFjSZFtXXcanpXa_!!913571587.png);
			-webkit-filter: blur(20px); /* Chrome, Safari, Opera */
    		filter: blur(20px);
    		width: 100%;
    		height: 3.3rem;
    	}
		>img {
			bottom: -.5rem;
			left: .5rem;
			width:2rem;
			-webkit-filter: drop-shadow(3px 3px 3px gray); /* Chrome, Safari, Opera */
    		filter: drop-shadow(3px 3px 3px gray);
    		position:absolute;
    		border-radius: 5px;
		}
		.msgBox {
			position: absolute;
			left: 2.5rem;
			right: 0;
			bottom: 0;
			height: 2rem;
			padding: 0 .2rem;
			box-sizing: border-box;
			color: #fff;
			display: flex;
			flex-direction: column;
			.auth {
				margin-top: .1rem;
				font-size: .28rem;
			}
			.label {
				margin-top: .1rem;
				span {
					border-radius: 10px;
					margin: 0 .1rem;
					padding: 0 .2rem;
					line-height: .4rem;
					height: .4rem;
					text-align: center;
					background-color: rgba(71,83,89,.6);
					font-size: .26rem;
				}
			}
			.detail {
				margin-top: .1rem;
				font-size: .26rem;
			}
		}
	}
	.tab {
		position: relative;
		background-color: ;
		.item {
			display: flex;
			align-items: center;
			border-bottom:1px solid rgb(222,222,222);
			a {
				line-height: .8rem;
				flex: 1;
				text-align: center;
				font-size: .3rem;
				color:rgb(71,83,89);
			}
			a.active {
				color: rgb(249,55,79);
			}
		}
		span {
			position: absolute;
			bottom: 0;
			border: 1px solid rgb(249,55,79);
			width:15%;
			transition: left 0.5s cubic-bezier(0.68, 0.22, 0.27, 1.55);
		}
		
	}
	.tabList {
		padding: .2rem;
		box-sizing: border-box;
		.detail {
			padding-bottom:.2rem;
			border-bottom:1px solid rgb(222,222,222);
			p {
				line-height: .4rem;
				color:rgb(135,145,148);
				font-size: .28rem;
			}
			
		}
		.chapter {
			.chapter_hd {
				padding: .2rem 0;
				display: flex;
				font-size: .3rem;
				color:rgb(71,83,89);
				span:nth-child(1){
					flex: 1;
				}
			}
			.chapter_bd {
				ul {
					list-style: none;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					li {
						padding: 0 .2rem;
						border: 1px solid rgb(222,222,222);
						line-height: .5rem;
						border-radius: 5px;
						width: 1rem;
						text-align: center;
						margin-top: .1rem;
						color:rgb(135,145,148);
					}
				}
			}
		}
		.comment {
			.comment_hd {
				display: flex;
				padding-bottom: .2rem;
				font-size: .3rem;
				color:rgb(71,83,89);
				.add {
					flex: 1;
					text-align: right;
				}
			}
			.comment_bd {
				li {
					border-top:1px solid rgb(222,222,222);
					
					.item_hd {
						display: flex;
						align-items: center;
						img {
							border-radius: 50%;
							width: .8rem;
							height: .8rem;
						}
						.name {
							flex: 1;
							padding: 0 .2rem;
							p:first-child {
								color:rgb(253,135,48);
								font-size: .28rem;
							}
							p:last-child {
								margin-top: .1rem;
								font-size: .26rem;
								color:rgb(135,145,148);
							}
						}
						.addLove {
							width: .8rem;
							font-size: .26rem;
							color:rgb(135,145,148);
							
						}
					}
					.item_bd {
						padding:.2rem 0;
						font-size: .28rem;
					}
				}
				li:last-child {
					border-bottom: 1px solid rgb(222,222,222);
				}
			} 
		}
	}
	.bottomBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1rem;
		background:rgb(246,246,247);
		display: flex;
		align-items: center;
		a {
			flex: 1;
			text-align: center;
			height: 1rem;
			line-height: 1rem;
			font-size: .32rem;
			color:rgb(71,83,89);
		}
		a.look {
			background: rgb(249,55,79);
			color: #fff;
		}
	}
</style>
<template>
	<div class="container">
		<div class="header">
			<div class="bg"></div>
			<div class="msgBox">
				<h2>{{comicsData.c_name}}</h2>
				<span class="auth">{{comicsData.c_auth}}</span>
				<div class="label">
					<span v-for="item in signList">
						{{item}}
					</span>
				</div>
				<div class="detail">
					<span>点击:{{comicsData.t_click_num}}次</span>
					<span @click="addLove(1,id)"><i></i>{{comicsData.t_love_num}}次</span>
				</div>
			</div>
			<img :src="comicsData.cover_img">
		</div>
		<div class="tab">
			<div class="item">
				<a :class="{active:nav===0}" @click="chooseNav(0)">目录</a>
				<a :class="{active:nav===1}" @click="chooseNav(1)">吐槽</a>
			</div>
			<span class="curBg" :style="{left:nav*50+17.5+'%'}">
		</div>
		<div class="tabList">
			<template v-if="nav===0">
				<div class="detail">
					<p>{{comicsData.c_info}}</p>
				</div>
				<div class="chapter">
					<div class="chapter_hd">
						<span v-if="comicsData.status===1">连载中</span>
						<span v-if="comicsData.status===2">已完结</span>
						<span>{{comicsData.updatetime}}</span>
						<span v-if="sort==='desc'" @click="changeSort('asc')">正序</span>
						<span v-if="sort==='asc'" @click="changeSort('desc')">倒序</span>
					</div>
					<div class="chapter_bd">
						<ul>
							<li v-for="item in chapterList" v-link="{path:'/chapter',query:{ chapterId:item.id}}">
								{{item.ch_name}}
							</li>
						</ul>
					</div>
				</div>
			</template>
			<template v-if="nav===1">
				<div class="comment">
					<div class="comment_hd">
						<span>最新</span>
						<span>最热</span>
						<div class="add">
							<i></i>
							<span v-link="{path:'/comment',query:{ comicsId:this.id}}">发表评论</span>
						</div>
					</div>
					<ul class="comment_bd">
						<li class="item" v-for="item in commentData">
							<div class="item_hd">
								<img :src="item.u_logo">
								<div class="name">
									<p>{{item.u_name}}</p>
									<p>{{item.addtime}}</p>
								</div>
								<div class="addLove" @click="addLove(2,item.id)">
									<i>aaaaa</i>
									<span>{{item.love_num}}</span>
								</div>
							</div>
							<div class="item_bd">
								{{item.content}}
							</div>
						</li>
					</ul>
				</div>
			</template>
		</div>
		<div class="bottomBtn">
			<a v-link="{path:'/bookcase'}">
				<i></i>
				<span>书架</span>
			</a>
			<a @click="addKeep(id)">
				<i></i>
				<span>收藏</span>
			</a>
			<a v-link="{path:'/recharge'}">
				<i></i>
				<span>充值</span>
			</a>
			<a class="look" v-link="{path:'/chapter',query:{chapterId:chapterId}}">开始阅读</a>
		</div>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
	import bottomTab from '../components/bottomTab'
	import { Toast,Indicator,MessageBox } from 'mint-ui';

	export default {
		components:{
			bottomTab
		},
		data () {
			return {
				listData:[],
				comicsData:{},
				signList:[],
				chapterList:[],
				commentData:[],
				chapterId:'',
				nav:0,
				sort:'asc',
				id:'',
				comment:{
					id:'',
					sort:'addtime',
					page:1,
					token:User.token
				}
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			let query = this.$route.query
			this.id = query.id;
			this.comment.id = query.id;
			await this.getSign();
			await this.getComics();
			await this.getChapter();
			await this.getComment();
			this.chapterId = this.chapterList[0].id;
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {
			
		},
		methods: {
			async getSign(){
				let res = await Request.post(Config.apiDomain + '/comics/getSignById',{data:{token:User.token,id:this.id}})
				if (res.status === 200&&res.data) {
					this.signList.push(...res.data)
				}
			},
			async getComics(){
				let res = await Request.post(Config.apiDomain + '/comics/getComicsById',{data:{token:User.token,id:this.id}})
				if (res.status === 200&&res.data) {
					this.comicsData = res.data;
				}
			},
			async getChapter(){
				let res = await Request.post(Config.apiDomain + '/comics/getChapterListById',{data:{token:User.token,id:this.id,sort:this.sort}})
				if (res.status === 200&&res.data) {
					for(let i in res.data) {
						this.chapterList.push(res.data[i]);
					}
				}
			},
			async getComment(){
				let res = await Request.post(Config.apiDomain + '/comics/getCommentById',{data:this.comment})
				if (res.status === 200&&res.data) {
					this.commentData = res.data;
					console.log(this.commentData)
				}
			},
			async addLove(type,id){
				let res = await Request.post(Config.apiDomain + '/comics/addLove',{data:{type:type,id:id,token:User.token}})
				if (res.status === 200) {
					Toast('点赞成功！');
					if(type==2) {
						await this.getComment();
					}else {
						await this.getComics();
					}
					
				}
			},
			async addKeep(id){
				let res = await Request.post(Config.apiDomain + '/comics/addKeep',{data:{id:id,token:User.token}})
				if (res.status === 200) {
					Toast('收藏成功！');
					
					
				}
			},
			chooseNav:function(i){
				this.nav = i;
			},
			async changeSort (i){
				this.sort = i;
				this.chapterList.reverse();
			}

		}
	}
</script>