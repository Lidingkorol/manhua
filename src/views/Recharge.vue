<style scoped lang="less">
	.mt20 {
		margin-top: .4rem;
	}
	.tips {
		padding: .2rem;
		background-color: #fff;
		padding-top: 0;
		
		.tips_hd {
			position:relative;
			
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
				font-size: .30rem;
				color:rgb(71,83,89);
			}
		} 
		.tips_bd {
			border-top: 1px solid rgb(222,222,222);
			padding-top:.2rem;
			p {
				color:rgb(135,145,148);
				font-size: .28rem;
			}
		}
	}
	.recharge {
		padding: .2rem;
		background-color: #fff;
		padding-top: 0;
		margin-top: .2rem;
		.recharge_hd {
			span {
				line-height: .6rem;
				padding: 0 .2rem;
				font-size: .30rem;
				color:rgb(71,83,89);
			}
		}
		.recharge_bd {
			border-top: 1px solid rgb(222,222,222);
			padding-top:.2rem;
		}
	}	
	
</style>
<template>
	<div class="container">
		<header-component :status="status"></header-component>
		<div class="tips">
			<div class="tips_hd">
				<i></i>
				<span>温馨提示</span>
			</div>
			<div class="tips_bd">
				<span></span>
				<p>1：尊敬的读者您好,进入VIP章节后需充值购买正版漫画图书,才能继续阅读</p>
				<p>2：未完本的作品会持续更新，您的支持是画手创作的最大动力,衷心感谢您对正版的支持！</p>
			</div>
			
		</div>
		<div class="recharge">
			<div class="recharge_hd">
				<i></i>
				<span>微信充值</span>
			</div>
			<div class="recharge_bd">
				<a></a>
			</div>
		</div>
		<div class="tips mt20">
			<div class="tips_hd">
				<i></i>
				<span>建议您关注</span>
			</div>
			<div class="tips_bd">
				<p>右下角公众号</p>
				<p>以方便您的阅读和充值，每天还有更多精彩漫画推荐哦！~</p>
			</div>
			
		</div>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import bottomTab from '../components/bottomTab'
	import headerComponent from '../components/header'
	
	export default {
		components:{
			bottomTab,
			headerComponent
		},
		data () {
			return {
				status:{
					c:true,
					b:false,
					h:false
				}
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},		
		async ready () {
			this.$dispatch('isLoading',false);
		},
		beforeDestroy () {

		},
		methods: {}
	}
</script>