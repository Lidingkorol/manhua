/**
 * Created by yang on 17/2/22.
 */
const routers = {
    '/': {
        component (resolve) {
            require(['./views/Home.vue'], resolve);
        }
    },
    'recharge': {
    	title: '充值中心',
        component (resolve) {
            require(['./views/Recharge.vue'], resolve);
        }
    },
	'center': {
		title:'个人中心',
        component (resolve) {
            require(['./views/UserCenter.vue'], resolve);
        }
    },
	'rechargeDetails': {
		title:'充值记录',
		component (resolve) {
			require(['./views/RechargeDetails.vue'], resolve);
		}
	},
	'consumeDetails': {
		title:'消费记录',
		component (resolve) {
			require(['./views/ConsumeDetails.vue'], resolve);
		}
	},
	'help': {
		title:'使用帮助',
		component (resolve) {
			require(['./views/Help.vue'], resolve);
		}
	},
	'advice': {
		title:'意见反馈',
		component (resolve) {
			require(['./views/Advice.vue'], resolve);
		}
	},
	'bookcase': {
		title:'书架',
		component (resolve) {
			require(['./views/BookCase.vue'], resolve);
		}
	},
	//首页
	'home': {
		title:'首页',
		component (resolve) {
			require(['./views/Home.vue'], resolve);
		}
	},
	//分类
	'classify': {
		title:'分类',
		component (resolve) {
			require(['./views/Classify.vue'], resolve);
		}
	},
	'classifyDetail': {
		title:'分类详情',
		component (resolve) {
			require(['./views/ClassifyDetail.vue'], resolve);
		}
	},
	'rank': {
		title:'排行',
		component (resolve) {
			require(['./views/Rank.vue'], resolve);
		}
	},
	'search': {
		title:'搜索',
		component (resolve) {
			require(['./views/Search.vue'], resolve);
		}
	},
	'comicsCenter': {
		component (resolve) {
			require(['./views/ComicsCenter.vue'], resolve);
		}
	},
	'chapter': {
		component (resolve) {
			require(['./views/Chapter.vue'], resolve);
		}
	},
};
export default routers;