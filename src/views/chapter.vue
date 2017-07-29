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
</style>
<template>
	<div class="container">
		<div class="swBox">
			<mt-swipe :auto="0">
			  	<mt-swipe-item v-for="item in chapterList">
			  		<img v-lazy="item">
			  	</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="content">
			<ul>
				<li v-for="item in chapterList">
					<img v-lazy="item">
				</li>
			</ul>
		</div>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>
	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
	import bottomTab from '../components/bottomTab'
	import { Swipe, SwipeItem } from 'mint-ui';

	export default {
		components:{
			bottomTab
		},
		data () {
			return {
				chapterId:'',
				dataList:{},
				chapterList:[],
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			let query = this.$route.query
			this.chapterId = query.chapterId;
			await this.getComics();
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {
			
		},
		methods: {
			async getComics(){
				let res = await Request.post(Config.apiDomain + '/chapter/getChapterDetail',{data:{token:User.token,ch_id:this.chapterId}})
				if (res.status === 200&&res.data) {
					this.dataList = res.data
					this.chapterList=this.dataList.chapter.content.split(',');
				}
			},
		}
	}
</script>