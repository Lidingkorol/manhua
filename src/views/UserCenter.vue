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
				<i></i>
				<span>充值</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item" v-link="{path:'/rechargeDetails'}">
				<i></i>
				<span>充值记录</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item nb" v-link="{path:'/consumeDetails'}">
				<i></i>
				<span>消费记录</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item mt10" v-link="{path:'/help'}">
				<i></i>
				<span>使用帮助</span>
				<i class="arrow_right"></i>
			</a>
			<a class="item" v-link="{path:'/advice'}">
				<i></i>
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

	export default {
		components:{
			bottomTab
		},
		data () {
			return {
				user: {
					
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