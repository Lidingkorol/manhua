<style scoped lang="less">
	.classify {
		ul {
			display:flex;
			flex-wrap: wrap;
			padding: .5rem;
			box-sizing: border-box;
			list-style: none;
			background-color: #fff;
			li {
				width: 33.3%;
				display: flex;
				flex-direction: column;
				
				img {
					width: 100%;
				}
				span {
					text-align: center;
					line-height: .6rem;
					font-size: .3rem;
					color: rgb(71,83,89);
				}
			}
		}
	}
</style>
<template>
	<div class="container">
		<header-component :status="status"></header-component>
		<div class="classify">
			<ul>
				<li v-for="item in listData" @click="goDetail(item.name)">
					<img :src="item.logo">
					<span>{{item.name}}</span>
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
	import headerComponent from '../components/header'

	export default {
		components:{
			headerComponent,
			bottomTab
		},
		data () {
			return {
				listData:[],
				status:{
					c:true,
					h:false,
					b:true
				}
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			await this.getData();
			this.$dispatch('isLoading',false)
		},
		beforeDestroy () {
			
		},
		methods: {
			async getData(){
				let res = await Request.post(Config.apiDomain + '/comics/getClassify',{data:{token:User.token}})
				if (res.status === 200&&res.data) {
					this.listData.push(...res.data)
				}
			},
			goDetail:function(name) {
				this.$router.go({path:'classifyDetail',query:{name:name}});
			}
		}
	}
</script>