<style scoped lang="less">
	.listBox {
		ul {
			li {
				display: flex;
				align-items: center;
				padding: .2rem;
				background-color: #fff;
				border-bottom: 1px solid rgba(222,222,222,1);
				.imgBox {
					position: relative;
					img {
						width: 2rem;
						border-radius: 10px;
					}
					span {
						position: absolute;
						bottom: .2rem;
						width: 100%;
						text-align: center;
						color: #fff;
						line-height: .5rem;
						background-color: rgba(51,51,51,0.6);
					}
				}
				.contentBox {
					padding: 0 .2rem;
					p {
						line-height: 0.4rem;
				        overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-top: .1rem;
					}
					span.auth {
						margin-top: .1rem;
						display: block;
					}
					.msg {
						display: flex;
						align-items: center;
						margin-top: .1rem;
						span:nth-child(2) {
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="container">
		<div class="listBox">
			<ul>
				<li v-for="item in listData" v-link="{path:'/comicsCenter',query:{ id:item.id}}">
					<div class="imgBox">
						<img :src="item.cover_img">
						<span>已更新至{{item.total_chapter}}话</span>
					</div>
					<div class="contentBox">
						<h2>{{item.c_name}}</h2>
						<span class="auth">{{item.c_auth}}</span>
						<p>{{item.c_info}}</p>
						<div class="msg">
							<i></i>
							<span>{{item.m_love_num}}</span>
							<span>{{item.addtime}}</span>
						</div>
					</div>
				</li>
				<template v-if="!!length">
		            <no-more v-el:get-more>
		                <span v-if="hasMore">加载更多...</span>
		                <span v-if="!hasMore">客官，到底啦</span>
		            </no-more>
		        </template>
			</ul>
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
	import noMore from '../components/nomore'

	export default {
		components:{
			bottomTab,
			noMore,
		},
		data () {
			return {
				classify:'',
				listData:[],
				page:1,
                loading: false,
                hasMore:true,
                length: 0,
                fun:''
			}
		},
		created(){
			this.$dispatch('isLoading',true)
		},
		async ready () {
			let query = this.$route.query;
			this.classify = query.name;
			console.log(this.classify)
			await this.getData()
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

                let res = await Request.post(Config.apiDomain + '/comics/getComicsByClassify',{data:{token:User.token,classify:this.classify,page:this.page}});
                if(res.status == 200 && !!res) {
                    this.page++;
                    this.listData.push(...res.data);

                    let len = 0;
                    if(res) len += res.data.length;
                    this.length+= len
                    if(res.data.length<6) {
                    	
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