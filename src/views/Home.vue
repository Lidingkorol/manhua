<style scoped lang="less">
	.tabList {
		display: flex;
		.item {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding:.3rem 0;
			align-items: center;
			span {
				text-align: center;
				color:rgb(135,145,148);
				font-size: .38rem;
				margin-top: .1rem;
			}
			i {
				background-size: 100%;
				width: 1rem;
				height: 1rem;
			}
			i.classify {
				background-image: url(../images/1.png);
			}
			i.rank {
				background-image: url(../images/2.png);
			}
			i.search {
				background-image: url(../images/3.png);
			}
			i.recharge {
				background-image: url(../images/4.png);
			}
		}
	}
	.cart {
		.update {
			.title {
				position:relative;
				display: flex;
				align-items: center;
				i {
					position: absolute;
					width: .1rem;
					height: .3rem;
					background-color:rgb(253,135,48);
					display: block;
					top: .15rem;
				}
				span {
					line-height: .6rem;
					padding: 0 .4rem;
					flex: 1;
					color: #000;
					font-size: .34rem;
				}
				a {
					width: .8rem;
					text-align: center;
					line-height: .4rem;
					height: .4rem;
					margin: 0 .1rem;
					border-radius: 10px;
					color: #fff;
				}
				a:nth-child(3) {
					background-color: rgba(164,25,234,1);
				}
				a:nth-child(4) {
					background-color: rgba(234,25,151,1);
				}
				a:nth-child(5) {
					background-color: rgba(232,121,26,1);
				}
			}
			ul {
				li {
				
				}
			}
			
		}
	}
</style> 
<template>
	<div class="container">
		<header-component :status="status"></header-component>
		<!--  banner 焦点  -->
        <div class="swiper-container sw">
            <div class="swiper-wrapper">
                <a class="swiper-slide" v-for="item in dataList.banner" :href="item.link">
                	<img class="slide" :src="item.img">
                </a>

            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
		<div class="tabList">
			<a class="item" v-link="{path:'/classify'}">
				<i class="classify"></i>
				<span>分类</span>
			</a>
			<a class="item" v-link="{path:'/rank'}">
				<i class="rank"></i>
				<span>排行</span>
			</a>
			<a class="item" v-link="{path:'/search'}">
				<i class="search"></i>
				<span>搜索</span>
			</a>
			<a class="item" v-link="{path:'/recharge'}">
				<i class="recharge"></i>
				<span>充值</span>
			</a>
		</div>
		<div class="cart">
			<div class="update">
				<div class="title">
					<i></i>
					<span>最近更新</span>
					<a>昨天</a>
					<a>前天</a>
					<a>更早</a>
				</div>
				<ul>
					<li v-for="item in dataList.last">
						<div class="imgBox">
							<img :src="item.cover_img">
							<span>{{item.updatetime}}</span>
						</div>
						<div class="contentBox">
							<span><i></i>{{item.t_click_num}}</span>
							<p>{{item.c_name}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
	import bottomTab from '../components/bottomTab'
	import noMore from '../components/nomore'
	import headerComponent from '../components/header'

	export default {
		components:{
			bottomTab,
			noMore,
			headerComponent
		},
		data () {
			return {
				dataList:{},
				status:{
					c:true,
					h:false,
					b:false
				}
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			await this.getData();
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {

		},
		methods: {
			async getData(){
				let res = await Request.post(Config.apiDomain + '/comics/home',{data:{token:User.token}})
				if (res.status === 200) {
					this.dataList = res.data;
					console.log(this.dataList)
				}
			},
		}
	}
</script>