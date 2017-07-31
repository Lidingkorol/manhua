<style scoped lang="less">
	.headerComponent {
		background: rgb(249,55,79);
		display: flex;
		align-items: center;
		height: .8rem;
		i {
			font-size: .4rem;
			color: #fff;
		}
		h1 {
			color: #fff;
			font-size: .34rem;
			font-weight: normal;
			text-align: center;
			flex: 1;
		}
		.iconBtn {
			width: 1.5rem;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			a {
				flex: 1;
			}
		}
	}
	.navFixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>
<template>
	<div :class="['headerComponent',{'navFixed':navFixed}]">
		<div class="iconBtn">
			<a @click="goBack()">
				<i class="fa fa-chevron-left" aria-hidden="true"></i>
			</a>
		</div>
		<h1>{{pageName}}</h1>
		<div class="iconBtn">
			<a class="center" v-link="{path:'/center'}" v-show="status.c">
				<i class="fa fa-user" aria-hidden="true"></i>
			</a>
			<a class="home" v-link="{path:'/home'}" v-show="status.h">
				<i class="fa fa-home" aria-hidden="true"></i>
			</a>
			<a class="bookCase" v-link="{path:'/bookcase'}" v-show="status.b">
				<i class="fa fa-book" aria-hidden="true"></i>
			</a>
		</div>		
	</div>
</template>
<script>


	export default {
		props:{
            pageName:{
                type:String,
                default:'爱漫画'
            },
            status:{
            	type:Object,
            	default:{c:true,h:false,b:true}
            }
        },
		data () {
			return {
				navFixed:false,
			}
		},
		created(){

		},
		ready () {
			window.addEventListener('scroll', this.fixed);
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.fixed);
		},
		methods: {
			goBack:function(){
				history.back();
			},
			fixed:function(){
            	let scrollTop = document.body.scrollTop
            	scrollTop > 50 ? this.navFixed = true :this.navFixed = false
                console.log(scrollTop)
            }
		}
	}
</script>