<style scoped lang="less">
	.bottomTab {
		.tabList {
			background: rgb(249,55,79);
			display: flex;
			flex-wrap: nowrap;
			a {
				flex: 1;
				color: #fff;
				line-height: .6rem;
				text-align: center;
			}
		};
		.bottom {
				display: flex;
				align-items: center;
				padding: 0.2rem;
				box-sizing: border-box;
			.item {
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
<template>
	<div class="bottomTab">
		<div class="tabList">
			<a>首页</a>
			<a>书架</a>
			<a>帮助</a>
			<a>反馈</a>
			<a v-link="{path:'/recharge'}">充值</a>
		</div>
		<div class="bottom">
			<div class="item">
				<span>联系电话:asdasd</span>
				<span>客服QQ:asdasd</span>
				<span>微信公众号:asdasd</span>
				<span>工作时间:asdasd</span>
			</div>
			<img>
		</div>
	</div>
</template>
<script>


	export default {
		data () {
			return {}
		},
		created(){

		},
		ready () {

		},
		beforeDestroy () {

		},
		methods: {}
	}
</script>