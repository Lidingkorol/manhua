/**
 * Created by Administrator on 2017/7/21.
 */
import Mock from 'mockjs';

import config from './config'

const center = [
	{
		path:config.apiDomain+'/api/center',
		data: {
			'uid': '@integer(60, 1000000)',
			'money':'@integer(60, 1000000)',
			'name':'@name'
		}
	}
]

function addToMock(list) {
	list.forEach(n => {
		Mock.mock(n.path, n.data)
	})
}

addToMock(center)





export default Mock


