/**
 * Created by yang on 17/2/22.
 */
const routers = {
    '/': {
        component (resolve) {
            require(['./views/UserCenter.vue'], resolve);
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

};
export default routers;