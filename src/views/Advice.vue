<style scoped lang="less">
	.inputBox {
		display: flex;
		flex-direction: column;
		padding: .2rem;
		box-sizing: border-box;
		textarea {
			border: 1px solid rgb(135,145,148);
			border-radius: 5px;
			height: 2rem;
			padding: .1rem;
			box-sizing: border-box;
		}
		span {
			text-align: right;
			margin-top: .1rem;
		}
	}
	
	.btn {
    	padding: .3rem .25rem;
    	width: 100%;
    	box-sizing: border-box;
    	margin-top:.2rem;
    	a {
	    	background-color: rgb(239,55,55);
	    	color: #fff;
	    	width: 100%;
	    	display: block;
	    	text-align: center;
	    	height: .8rem;
	    	line-height: .8rem;
	    	border-radius: 50px;
    	}
    }
</style>
<template>
	<div class="container">
		<div class="inputBox">
			<textarea placeholder="输入您的反馈意见" v-model="content"  @keyup="isNum"></textarea>
			<span>剩余{{number}}字</span>
		</div>
		<div class="btn">
			<a @click="submit">反馈</a>
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
	
	export default {
		components:{
			bottomTab
		},
		data () {
			return {
				maxNum:170,
				number:170,
				content:''
			}
		},
		created(){

			this.$dispatch('isLoading',true)

		},
		async ready () {
			this.$dispatch('isLoading',false);
		},
		beforeDestroy () {

		},
		methods: {
			isNum:function(event){
        		let eTarget=event.target;
            	if(eTarget.value.length>=this.maxNum){
            		eTarget.value=eTarget.value.substring(0,this.maxNum);
            	}
            	this.number=this.maxNum-eTarget.value.length;
			},
			async submit(){
				if(!this.content) {
					Toast('意见不能为空哦~');
                    return false; 
				}
				Indicator.open({
				  	spinnerType: 'fading-circle'
				});
				let res = await Request.post(Config.apiDomain + '/user/addFeedback',{data:{token:User.token,content:this.content}});
				if(res.status == 200 ) {
                    Indicator.close();
                    Toast('提交成功！');
                }else {
	                Indicator.close();
                	Toast('提交失败！');
                }
			}
		}
	}
</script>