<style scoped lang="less">
	.tabList {
		display: flex;
		.item {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding:.3rem 0;
			span {
				text-align: center;
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
		<!--  banner 焦点  -->
        <div class="swiper-container sw">
            <div class="swiper-wrapper">
                <div class="swiper-slide" >
                    <img class="slide">
                </div>

            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
		<div class="tabList">
			<a class="item" v-link="{path:'/classify'}">
				<i></i>
				<span>分类</span>
			</a>
			<a class="item" v-link="{path:'/rank'}">
				<i></i>
				<span>排行</span>
			</a>
			<a class="item" v-link="{path:'/search'}">
				<i></i>
				<span>搜索</span>
			</a>
			<a class="item" v-link="{path:'/recharge'}">
				<i></i>
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
					<li>
						<div class="imgBox">
							<img src="">
							<span></span>
						</div>
						<div class="contentBox">
							
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

	export default {
		components:{
			bottomTab,
			noMore
		},
		data () {
			return {}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		ready () {
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {

		},
		methods: {}
	}
</script>