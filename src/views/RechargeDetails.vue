<style scoped lang="less">
	.item {
		display: flex;
		flex-direction: column;
		text-align: center;
		.item_hd {
			display:flex;
			span {
				flex: 1;
				line-height: 0.8rem;
			}
		}
		ul {
			list-style: none;
			li {
				border-top: 1px solid rgb(222,222,222);
				display: flex;
				span {
					line-height: 0.8rem;
					flex: 1;
				}
			}
			li:last-child {
				border-bottom: 1px solid rgb(222,222,222);
			}
		}
	}
	
</style>
<template>
	<div class="container">
		
		<div class="item">
			<div class="item_hd">
				<span>充值时间</span>
				<span>充值金额</span>
			</div>
			<ul>
				<li v-for="item in listData">
					<span>{{item.addtime}}</span>
					<span>{{item.disc}}</span>
				</li>
			</ul>
		</div>
		<template v-if="!!length">
            <no-more v-el:get-more>
                <span v-if="hasMore">加载更多...</span>
                <span v-if="!hasMore">客官，到底啦</span>
            </no-more>
        </template>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
 	import { Toast,Indicator,MessageBox } from 'mint-ui';
	import bottomTab from '../components/bottomTab'
	import noMore from '../components/nomore'


	export default {
		components:{
			bottomTab,
			noMore,
		},
		data () {
			return {
				page:1,
                loading: false,
                hasMore:true,
                listData: [],
                type: 1,     
                banner: null,
                length: 0,
                fun:''
			}
		},
		created(){

			this.$dispatch('isLoading',true)

		},
		async ready () {
			await this.getData();
			await this.getData();
			window.addEventListener('scroll', this.throttle(this.loadMore,250,500));
			this.$dispatch('isLoading',false);
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.fun);
		},
		methods: {
			async getData(){
                if (this.loading) {
                    return false;
                }
                this.loading = true;

                let res = await Request.post(Config.apiDomain + '/user/getRecord',{data:{token:User.token,type:this.type,page:this.page}});
                if(res.status == 200 && !!res) {
                    this.page++;
                    this.listData.push(...res.data);

                    let len = 0;
                    if(res) len += res.data.length;
                    this.length+= len
                    if(res.data.length<10) {
                    	
                    	this.hasMore=false;
                    
                    }
                }
                else {
                    this.hasMore = false;
                }
                this.loading=false;
            },
            async loadMore(){
                var pos = this.$els.getMore.getBoundingClientRect();

                if (this.hasMore &&
                    ((pos.top> 0 && window.innerHeight - pos.top> 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                    await this.getData();
                }
            },
            throttle(func, wait, mustRun) {
                // 节流
                let timeout,
                    startTime = new Date();

                return this.fun = function() {
                    let context = this,
                        args = arguments,
                        curTime = new Date();

                    clearTimeout(timeout);
                    if(curTime - startTime >= mustRun){
                        func.apply(context,args);
                        startTime = curTime;
                    }else{
                        timeout = setTimeout(func, wait);
                    }
                };
            }
		}
	}
</script>