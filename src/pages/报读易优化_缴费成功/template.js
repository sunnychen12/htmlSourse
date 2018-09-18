const layout = require('../../components/layout/layout.js');
const content = require('./content.art');
const script = require('./script.art');

const title = '报读易优化_缴费成功';

const commonScript=require('raw-loader!../../components/commonScript/commonScript.txt');

const renderData={
	headerData:{
		title: title
	},
	bodyData:{
		content: content() + commonScript + '\n' + script()
	}
}

module.exports = layout.run( renderData );