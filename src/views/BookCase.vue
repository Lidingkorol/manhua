<style scoped lang="less">
	.tab {
		position: relative;
		background-color: ;
		.item {
			display: flex;
			align-items: center;
			a {
				line-height: .8rem;
				flex: 1;
				text-align: center;
			}
			a.active {
				color: rgb(249,55,79);
			}
		}
		span {
			position: absolute;
			bottom: 0;
			border: 1px solid rgb(249,55,79);
			width:25%;
			transition: left 0.5s cubic-bezier(0.68, 0.22, 0.27, 1.55);
		}
		
	}
	.tabList {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0 .2rem;
		background-color:#fff;
		.item {
			border-bottom: 1px solid rgb(222,222,222);
			display: flex;
			align-items: center;
			padding: .2rem 0;
			
			img {
				width: 1.5rem;
			}
			.contentBox {
				padding: 0 .1rem;
				flex: 1;
				display: flex;
				flex-direction: column;
				span {
					margin-top: .1rem;
				}
				
			}
			a {
				width: .8rem;
				border:1px solid rgb(135,145,148);;
				border-radius: 10px;
				text-align: center;
			}
		}
		.noBook {
			span {
				margin: 1.5rem auto;
				display: block;
				text-align: center;
			}
		}
	}
</style>
<template>
	<div class="container">
		<div class="tab">
			<div class="item">
				<a :class="{active:nav===0}" @click="chooseNav(0)">最近阅读</a>
				<a :class="{active:nav===1}" @click="chooseNav(1)">全部书架</a>
				<a :class="{active:nav===2}" @click="chooseNav(2)">订阅作品</a>
			</div>
			<span class="curBg" :style="{left:nav*33.3+4+'%'}">
		</div>
		<div class="tabList">
			<template v-if="hasBook">
				<div class="item" v-for="item in listData" v-link="{path:'/comicsCenter',query:{ id:item.id}}">
					<img :src="item.c_cover">
					<div class="contentBox">
						<p>{{item.c_name}}</p>
						<span>上次看到<font style="color: rgb(253,135,48);margin-left:.1rem">{{item.chapter_name}}</font></span>
						<span>更新至第{{item.c_total}}话</span>
					</div>
					<a>续看</a>
				</div>
			</template>
			<template v-if="!hasBook">
				<div class="noBook">
					<span>还木有哦O(∩_∩)O~ 赶快去看漫画吧~~</span>
				</div>
			</template>
			<template v-if="!!length">
	            <no-more v-el:get-more>
	                <span v-if="hasMore">加载更多...</span>
	                <span v-if="!hasMore">客官，到底啦</span>
	            </no-more>
	        </template>
		</div>
		<bottom-tab></bottom-tab>
	</div>
</template>
<script>

	import Request from '../config/request'
	import Config from '../config/config'
	import User from '../config/user'
	import bottomTab from '../components/bottomTab'
	import noMore from '../components/nomore'
	
	export default {
		components:{
			bottomTab,
			noMore
		},
		data () {
			return {
				nav:0,
				page:1,
				loading: false,
                hasMore:true,
                listData: [],     
                length: 0,
                fun:'',
                hasBook:false,
                url:''
			}
		},
		created(){

			this.$dispatch('isLoading',true)

		},
		async ready () {
			this.chooseNav(0);
			window.addEventListener('scroll', this.throttle(this.loadMore,250,500));
			this.$dispatch('isLoading',false);
			
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.fun);
		},
		methods: {
			async chooseNav(i){
				this.nav=i;
				this.page=1;
				this.loading=false;
				this.hasMore=true;
				this.listData=[];
				this.length=0;
				this.hasBook=false;
				switch(this.nav){
					case 0:
						await this.getData('/user/getRead');break;
					case 1:
						await this.getData('/user/getKeep');break;
					case 2:
						await this.getData('/user/getKeep');break;
				}
				if(this.listData.length>0) {
					this.hasBook=true;
				}
			},
			async getData(url){
                if (this.loading) {
                    return false;
                }
                this.loading = true;

                let res = await Request.post(Config.apiDomain + url,{data:{token:User.token,page:this.page}});
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