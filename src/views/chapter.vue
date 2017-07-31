<style scoped lang="less">
	.content {
		li {
			img {
				width: 100%;
			}
		}
	}
	.swBox {
		img {
			width: 100%;
			height: 100%;
		}
	}
	.bottomBar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		background-color: rgba(49,62,67,.9);
		a {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #fff;
			padding: .1rem 0;
		}
		i {
			color: #fff;
		}
		
	}
	.topBar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		background-color: rgba(49,62,67,.9);
		a {
			display: flex;
			align-items: center;
			color: #fff;
			padding: .2rem 0;
			width: 1rem;
			text-align: center;
		}
		a:first-child {
			flex: 1;
			text-align: left;
			padding: .1rem;
		}
		i {
			color: #fff;
			font-size: .3rem;
		}
		span {
			margin-left: .1rem;
		}
		.detail,.home{
			margin-left:0;
			justify-content: center;
		}
	}
	.clickBox {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 4rem;
		height:4rem;
		transform: translate(-50%,-50%);
	}
</style>
<template>
	<div class="container">

    	<div class="content">
			<ul>
				<li v-for="item in chapterList">
					<img v-lazy="item">
				</li>
			</ul>
		</div>
		
		<div class="clickBox" @click="showBar"></div>
		<bottom-tab></bottom-tab>
		<template v-if="bar">
			<div class="bar">
				<div class="bottomBar">
					<a @click="change(1)">
						<i class="fa fa-reply" aria-hidden="true"></i>
						<span>上一页</span>
					</a>
					<a v-link="{path:'/comment',query:{comicsId:comicsId}}">
						<i class="fa fa-commenting-o" aria-hidden="true"></i>
						<span>评论</span>
					</a>
					<a v-link="{path:'/recharge'}">
						<i class="fa fa-jpy" aria-hidden="true"></i>
						<span>充值</span>
					</a>
					<!--<a>
						<i class="fa fa-exchange" aria-hidden="true"></i>
						<span>竖向翻页</span>
					</a>-->
					<a @click="change(2)">
						<i class="fa fa-share" aria-hidden="true"></i>
						<span>下一话</span>
					</a>
				</div>
				<div class="topBar">
					<a>
						<i class="fa fa-chevron-left" aria-hidden="true"  @click="back()"></i>
						<span  @click="back()">{{dataList.chapter.ch_name}}</span>
					</a>
					<a class="detail" v-link="{path:'/comicsCenter',query:{id:comicsId}}">
						详情
					</a>
					<a class="home" v-link="{path:'/home'}">
						<i class="fa fa-home" aria-hidden="true"></i>
					</a>
				</div>
			</div>
		</template>
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
				chapterId:'',
				dataList:{},
				chapterList:[],
				sw:'',
				showSw:false,
				comicsId:'',
				bar:false
				
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			let query = this.$route.query
			this.chapterId = query.chapterId;
			await this.getComics();
			this.comicsId = this.dataList.chapter.c_id
			
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {
			
		},
		methods: {
			async getComics(){
				let res = await Request.post(Config.apiDomain + '/chapter/getChapterDetail',{data:{token:User.token,ch_id:this.chapterId}})
				if (res.status === 200&&res.data) {
					this.dataList = res.data
					//console.log(this.dataList.chapter.content.split(','))
					let urlList  =  this.dataList.chapter.content.split(',')
					console.log(urlList)
					for(let i=0;i<urlList.length;i++) {
						urlList[i] = Config.apiDomain + '/Chapter/show?token=' + User.token + '&url=' + encodeURIComponent(urlList[i]);
					}
					console.log(urlList)
					//this.chapterList=Config.apiDomain + '/Chapter/show?url=' + encodeURIComponent(this.dataList.chapter.content.split(','));
					//this.chapterList = this.dataList.chapter.content.split(',')
					this.chapterList = urlList
					
				}
				
			},
			async change (i) {
				switch(i) {
					case 1:
					this.$router.go({path: 'chapter', query:{chapterId:this.dataList.before_and_next.before}})
					break;
					case 2:
					this.$router.go({path: 'chapter', query:{chapterId:this.dataList.before_and_next.next}});
					break;
					
				}
				window.location.reload();
			},
			back:function(){
				history.back();
				window.location.reload();
			},
			showBar:function() {
				this.bar = !this.bar
			},
			/*look:function(){
				this.showSw = !this.showSw
				if(this.showSw==true) {
					console.log('1')
					this.sw = new Swiper('.home-sw',{
		                pagination: '.swiper-pagination',
		                bulletActiveClass : 'bullet-active',
		                bulletClass : 'bullet',
		                paginationClickable: true,
		                observer:true,//修改swiper自己或子元素时，自动初始化swiper
		    			observeParents:true,//修改swiper的父元素时，自动初始化swiper
		            });
		            console.log(this.sw)
				}
				console.log(this.showSw)
			}*/
		}
	}
</script>