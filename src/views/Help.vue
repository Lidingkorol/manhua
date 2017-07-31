<style scoped lang="less">
	/* 必需 */
	.fade-transition {
	  	transition: all .3s ease;
	  	opacity: 1;
	}
	/* .my-transition-enter 定义进入的开始状态 */
	.fade-enter{
		opacity:1;
	}
	/* .my-transition-leave 定义离开的结束状态 */
	.fade-leave {
		opacity: 0;
	}
	.item {
		.item_hd {
			display:flex;
			border-top:1px solid rgb(222,222,222);
			padding:.2rem;
			box-sizing: border-box;
			align-items:center;
			span {
				flex: 1;
				font-size: .28rem;
				color:rgb(71,83,89);
			}
		}
		.item_hd:last-child {
			border-bottom: 1px solid rgb(222,222,222);
		}
		.content {
			box-sizing: border-box;
			padding: 0 .2rem;
			p {
				line-height: .6rem;
				border-top: 1px solid rgb(222,222,222);
				font-size: .26rem;
				color:rgb(135,145,148);
			}
		}
	}
	.arrow_down {
		display: inline-block;
		width: 0.1rem;
		height: 0.1rem;
		border-style: solid;
		border-width: 2px 0 0 2px;
		color: #8a8a8a;
		-moz-transform: rotate(225deg);
		-ms-transform: rotate(225deg);
		-o-transform: rotate(225deg);
		transform: rotate(225deg);
		-webkit-transform: rotate(225deg);
		transition: all .3s;
		-webkit-transition: all .3s;
		vertical-align: middle;
	}
	.arrow_up {
		display: inline-block;
		width: 0.1rem;
		height: 0.1rem;
		border-style: solid;
		border-width: 2px 0 0 2px;
		color: #8a8a8a;
		-moz-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		transition: all .3s;
		-webkit-transition: all .3s;
		vertical-align: middle;
	}
</style>
<template>
	<div class="container">
		<header-component :status="status"></header-component>
		<div class="item" v-for="item in listData">
			<div class="item_hd" @click="showDetail($index)">
				<span>{{item.id}}、{{item.ask}}</span>
				<i :class="[item.is_show==0 ? 'arrow_up':'arrow_down']"></i>
			</div>
			<div class="content" v-show="item.is_show==0"  transition="fade" transition-mode="out-in">
				<p>{{item.answer}}</p>
			</div>
		</div>
		
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>
	
	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
 	import { Toast,Indicator,MessageBox } from 'mint-ui';
	import bottomTab from '../components/bottomTab'
	import headerComponent from '../components/header'
	
	
	export default {
		components:{
			bottomTab,
			headerComponent
		},
		data () {
			return {
				listData:[],
				status: {
					c:true,
					h:false,
					b:false
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
				let res = await Request.post(Config.apiDomain + '/user/getHelp',{data:{token:User.token}});
				if(res.status == 200 && !!res) {
                    this.listData.push(...res.data)
                }
			},
			showDetail:function(i){
				if(this.listData[i].is_show==1) {
					this.listData[i].is_show = 0;
				}else {
					this.listData[i].is_show = 1;
				}
			}
		}
	}
</script>