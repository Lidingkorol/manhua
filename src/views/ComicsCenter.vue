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
				}
			}
			.detail {
				margin-top: .1rem;
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
			}
			
		}
		.chapter {
			.chapter_hd {
				padding: .2rem 0;
				display: flex;
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
					}
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
					<span><i></i>{{comicsData.t_love_num}}次</span>
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
							<li v-for="item in charpterList" v-link="{path:'/chapter',query:{ charpterId:item.id}}">
								{{item.ch_name}}
							</li>
						</ul>
					</div>
				</div>
			</template>
		</div>
		<div class="bottomBtn">
			<a>
				<i></i>
				<span>书架</span>
			</a>
			<a>
				<i></i>
				<span>收藏</span>
			</a>
			<a>
				<i></i>
				<span>充值</span>
			</a>
			<a class="look">开始阅读</a>
		</div>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
	import bottomTab from '../components/bottomTab'


	export default {
		components:{
			bottomTab
		},
		data () {
			return {
				listData:[],
				comicsData:{},
				signList:[],
				charpterList:[],
				nav:0,
				sort:'asc'
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			let query = this.$route.query
			this.id = query.id;
			await this.getSign();
			await this.getComics();
			await this.getChapter();
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
					this.charpterList = res.data;
				}
			},
			chooseNav:function(i){
				this.nav = i;
			},
			async changeSort (i){
				console.log(i)
				console.log(this.charpterList)
			}

		}
	}
</script>