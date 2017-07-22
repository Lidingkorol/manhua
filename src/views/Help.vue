<style scoped>

</style>
<template>
	<div class="container">
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import bottomTab from '../components/bottomTab'
	
	export default {
		components:{
			bottomTab
		},
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