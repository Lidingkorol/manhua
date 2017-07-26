<style scoped lang="less">
	.search {
		.searchBar {
			padding: .6rem 1rem;
			background-color:#fff;
			.searchBox {
				border-radius: 30px;
				display: flex;
				border: 1px solid rgb(249,55,79);
				overflow: hidden;
				input {
					margin: 0 .3rem;
					height: .6rem;
					line-height: .6rem;
					flex: 1;
				}
				label {
					background-color: rgb(249,55,79);
					width: 1.5rem;
				}
			}
		}
		.searchKeyWord {
			.title {
				padding: 0 .2rem;
				span {
					line-height: .6rem;
				}
			}
			ul {
				border-top: 1px solid rgb(222,222,222);
				padding: .2rem;
				display: flex;
				flex-wrap: wrap;
				list-style: none;
				background-color: #fff;
				li {
					
					padding: 0 .3rem;
					margin: 0 .2rem;
					border-radius: 50px;
					line-height: .5rem;
					color: #fff;
				}
			}
		}
	}
	.listBox {
		ul {
			li {
				display: flex;
				align-items: center;
				padding: .2rem;
				background-color: #fff;
				border-top: 1px solid rgba(222,222,222,1);
				
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
			li:last-child {
				border-bottom: 1px solid rgba(222,222,222,1);
			}
		}
		>span.noData {
			text-align: center;
			margin: .6rem auto;
			display: block;
		}
	}
</style>
<template>
	<div class="container">
		<div class="search">
			<div class="searchBar">
				<div class="searchBox">
					<input placeholder="输入关键字" v-model="formData.search">
					<label @click="getSearch()"></label>
				</div>
			</div>
			<div class="searchKeyWord">
				<div class="title">
					<span>热门搜索</span>
				</div>
				<ul v-el:keyWord>
					<li v-for="item in ketWordList" @click="useKeyWord(item)">
						{{item}}
					</li>
				</ul>
			</div>
		</div>
		
		<div class="listBox">
			<template v-if="listData.length>0">
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
				</ul>
			</template>
			<template v-else>
				<span class="noData">暂无相关搜索信息！</span>
			</template>
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
			noMore
		},
		data () {
			return {
				loading: false,
                hasMore:true,
                listData: [],     
                length: 0,
                fun:'',
                hasBook:false,
                ketWordList:[],
                page:1,
				formData:{
					token:User.token,
					search:''
				}
			}
		},
		created(){

			this.$dispatch('isLoading',true)

		},
		async ready () {
			await this.getKeyWord();
			this.getColor(this.$els.keyword.children)
			window.addEventListener('scroll', this.throttle(this.loadMore,250,500));
			this.$dispatch('isLoading',false);
			
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.fun);
		},
		methods: {
			async getKeyWord(){
				let res = await Request.post(Config.apiDomain + '/comics/getHot',{data:{token:User.token}})
				if (res.status === 200&&res.data) {
					this.ketWordList.push(...res.data)
				}
			},
			async getData(){
				
                if (this.loading) {
                    return false;
                }
                if(this.formData.search=='') {
                	Toast('搜索内容不能为空！')
                	return false;
                }
                this.loading = true;

                let res = await Request.post(Config.apiDomain + '/comics/getSearch',{data:this.formData});
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
            },
            getColor:function(i){
            	for(let k=0;k<i.length;k++) {
            		var color = [Math.floor(Math.random()*205+50),Math.floor(Math.random()*205+50),Math.floor(Math.random()*205+50)]
            		i[k].style.background = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
            	}
            },
            async useKeyWord(value){
				this.formData.search = value;
				this.loading=false;
				this.hasMore=true;
				this.listData=[];
				this.length=0;
				this.page=1;
				console.log(this.formData.search)
				await this.getData();
			},
			async getSearch(){
				this.loading=false;
				this.hasMore=true;
				this.listData=[];
				this.length=0;
				this.page=1;
				await this.getData();
			}
		}
	}
</script>