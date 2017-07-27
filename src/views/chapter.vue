<style scoped>

</style>
<template>
	<div class="container">
		<div class="content">
			<ul>
				<li v-for="item in dataList"></li>
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

	export default {
		components:{
			bottomTab
		},
		data () {
			return {
				chapterId:'',
				dataList:[],
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			let query = this.$route.query
			this.chapterId = query.charpterId;
			await this.getComics();
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {

		},
		methods: {
			async getComics(){
				let res = await Request.post(Config.apiDomain + '/chapter/getChapterDetail',{data:{token:User.token,ch_id:this.chapterId}})
				if (res.status === 200&&res.data) {
					this.dataList.push(...res.data)
				}
			},
		}
	}
</script>