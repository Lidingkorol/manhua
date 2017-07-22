<style scoped>

</style>
<template>
	<div class="container">
		<div class="item">
			<div class="item_hd">
				<span>1、账户登录不成功怎么办？</span>
				<i></i>
			</div>
			<div class="content">
				<p>请检查您的网络设置，尝试保持联网状态，若仍不能解决，请退出再次打开。</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>2、如何选择自己想要的书？</span>
				<i></i>
			</div>
			<div class="content">
				<p>书架首页，有为您推荐的几本作品；若需要更多，请切换到下方导航“分类”；若仍不满意，可以切换到下方导航的“搜索”功能。</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>3、阅读时，如何调整到自己合适的阅读体验？</span>
				<i></i>
			</div>
			<div class="content">
				<p>点击屏幕中间位置，会自动调出阅读设置，您可以选择各种阅读环境。</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>4、怎么阅读付费章节？</span>
				<i></i>
			</div>
			<div class="content">
				<p>作者画图很辛苦，其主要来源就是您的付费支持。您可以在阅读到付费章节时，选择合适的充值方式来支付，并阅读付费章节。</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>5、如何选择充值方式？</span>
				<i></i>
			</div>
			<div class="content">
				<p>点击首页左上角的图标进入个人中心，或是阅读到付费章节部分时，可以选择您的合适充值方式。</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>6、充值金币后，没有及时到账，怎么处理？</span>
				<i></i>
			</div>
			<div class="content">
				<p>充值后，最长时间为24小时到账，通常为20分钟或立即响应，若长时间没有到账，请联系客服QQ：</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>7、充值异常时，怎么处理？</span>
				<i></i>
			</div>
			<div class="content">
				<p>可以重试几次，如果仍然失败，请留意系统的通知消息。或联系客服QQ：</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>8、书籍下架后，怎么找回？</span>
				<i></i>
			</div>
			<div class="content">
				<p>作品下载，通常由于各种不可抗力或暂时修订，请稍等再试，或联系客服了解进展。</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>9、账户异常，如何处理？</span>
				<i></i>
			</div>
			<div class="content">
				<p>账户异常时，通常是由于网络问题，建议您退出重新打开，若问题仍然存在，请联系客服QQ:</p>
			</div>
		</div>
		<div class="item">
			<div class="item_hd">
				<span>10、如何反馈问题，以及建议？</span>
				<i></i>
			</div>
			<div class="content">
				<p>点击首页及其他每个页面的底部导航栏的“反馈”按钮，或者去个人中心的“意见反馈栏”，您可以将意见和问题反馈给我们，以便我们及时改进并为您提供更好的服务。</p>
			</div>
		</div>
	</div>
</template>
<script>


	export default {
		data () {
			return {}
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