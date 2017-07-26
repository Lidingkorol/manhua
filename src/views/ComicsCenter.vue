<style scoped lang="less">
	
</style>
<template>
	<div class="container">
		
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
				listData:[]
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			let query = this.$route.query
			this.id = query.id;
			await this.getData();
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {
			
		},
		methods: {
			async getData(){
				let res = await Request.post(Config.apiDomain + '/comics/getSignById',{data:{token:User.token,id:this.id}})
				if (res.status === 200&&res.data) {
					console.log(res.data)
				}
			},

		}
	}
</script>