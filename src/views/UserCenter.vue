<style scoped lang="less">
	.container {
		background: #f2f2f2;
        min-height: 100vh;
        box-sizing: border-box;
	}
	
	.msgBox {
		background-color: #fff;
		display: flex;
		width:100%;
		box-sizing: border-box;
		padding:.5rem .2rem;
		align-items: center;
		img {
			width:1rem;
			height:1rem;
			border-radius: 50%;
		}
		.item {
			margin-left:.2rem;
			display: flex;
			flex-direction: column;
			span{
				margin-top: .1rem;
			}
			span:first-child {
				margin-top: none;
			}
		}
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		a {
			padding: .2rem;
			box-sizing: border-box;
			align-items: center;
			background-color: #fff;
			display: flex;
			border-bottom: 1px solid rgb(222,222,222);
			span {
				flex: 1;
				padding: 0 .2rem;
				color: #000;
			}
			
		}
		a:last-child {
			border-bottom:none;
			
		}
		.mt10 {
			margin-top:.1rem;
		}
		.nb {
			border:none;
		}
		i.icon {
			width: .5rem;
			height: .5rem;
		}
		i.icon-recharge {
			background: url(../images/充值.png);
			background-size: 100%;
		}
		i.icon-detail1 {
			background:url(../images/充值记录2.png);
			background-size: 100%;
		}
		i.icon-detail2 {
			background: url(../images/消费记录 .png);
			background-size: 100%;
		}
		i.icon-help {
			background: url(../images/使用帮助.png);
			background-size: 100%;
		}
		i.icon-advice {
			background:url(../images/意见反馈 .png);
			background-size: 100%;
		}
	}
	
	.arrow_right {
		display: inline-block;
		width: 0.1rem;
		height: 0.1rem;
		border-style: solid;
		border-width: 2px 0 0 2px;
		color: #8a8a8a;
		-moz-transform: rotate(135deg);
		-ms-transform: rotate(135deg);
		-o-transform: rotate(135deg);
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
		transition: all .3s;
		-webkit-transition: all .3s;
		vertical-align: middle;
	}
</style>
<template>
	<div class="container">
		<header-component :status="status"></header-component>
		<div class="msgBox">
			<img :src="user.logo">
			<div class="item">
				<span>{{user.nickname}}</span>
				<span>ID:{{user.id}}</span>
				<span>我的余额:{{user.score}}</span>
			</div>
		</div>
		<div class="list">
			<a class="item mt10" v-link="{path:'/recharge'}">
				<i class="icon icon-recharge"></i>
				<span>充值</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item" v-link="{path:'/rechargeDetails'}">
				<i class="icon icon-detail1"></i>
				<span>充值记录</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item nb" v-link="{path:'/consumeDetails'}">
				<i class="icon icon-detail2"></i>
				<span>消费记录</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item mt10" v-link="{path:'/help'}">
				<i class="icon icon-help"></i>
				<span>使用帮助</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item" v-link="{path:'/advice'}">
				<i class="icon icon-advice"></i>
				<span>意见反馈</span>
				<i class="arrow_right"></i>
			</a>
		</div>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
	import bottomTab from '../components/bottomTab'
	import headerComponent from '../components/header'

	export default {
		components:{
			bottomTab,
			headerComponent
		},
		data () {
			return {
				user: {},
				status:{
					c:false,
					h:true,
					b:true
				}
			}
		},
		created(){

			this.$dispatch('isLoading',true)

		},
		async ready () {
			await this.getData();
			this.$dispatch('isLoading',false);
		},
		beforeDestroy () {

		},
		methods: {
			async getData(){
				let res = await Request.get(Config.apiDomain + '/user/getUserInfo?token='+User.token)
				if (res.status === 200&&res.data) {
					this.user = res.data
					console.log(this.user)
				}
			}
		}
	}
</script>