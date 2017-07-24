<style scoped lang="less">
	.tab {
		
	}
	.tabList {
		padding: .2rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		.item {
			border-bottom: 1px solid rgb(222,222,222);
			display: flex;
			align-items: center;
			img {
				width: 1.5rem;
			}
			.contentBox {
				padding: 0 .1rem;
				flex: 1;
				span {
					margin-top: .1rem;
				}
				
			}
			a {
				width: .8rem;
			}
		}
	}
</style>
<template>
	<div class="container">
		<div class="tab">
			<a>最近阅读</a>
			<a>全部书架</a>
			<a>订阅作品</a>
		</div>
		<div class="tabList">
			<div class="item">
				<img>
				<div class="contentBox">
					<p>asdasdasdasdasdasdasd</p>
					<span>上次看到<font></font></span>
					<span>asdasd</span>
				</div>
				<a></a>
			</div>
		</div>
		
	</div>
</template>
<script>

	import { TabContainer, TabContainerItem } from 'mint-ui';
	import Request from '../config/request'
	import Config from '../config/config'
	
	export default {
		components:{
			TabContainer,
			TabContainerItem
		},
		data () {
			return {
				active:'tab-container1'
			}
		},
		created(){

			this.$dispatch('isLoading',true)

		},
		async ready () {
			this.$dispatch('isLoading',false);
			await this.getData();
		},
		beforeDestroy () {

		},
		methods: {
			async getData(){
				console.log('asd')
				let res = await Request.get(Config.apiDomain + '/user/getUserInfo?o_token='+Config.token)
				if (res.status === 200) {
					console.log(res.data)
				}
			}
		}
	}
</script>