/****************************************************************************
 * 
 * 工具类 2019.09.26
 * 
 ****************************************************************************/
var __loadDataTools = {
	/**
	 * 插入检索A股代码
	 * @param {*} codeList A股代码列表
	 */
	insertACodeList: function (codeList) {
		for (var i = 0; i < codeList.length; i++) {
			var $li = $('<li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-name="" data-id="" data-value="-">'
				+ codeList[i]
				+ '-</span></label></li>');
			$('.cont-top-right .selected-ul').append($li);
		}
	},

	/**
	 * 插入检索列
	 */
	insertSearchColumns: function () {
		$('.detail-cont-bottom .select-content .selected-ul').append(__searhCols);
	},

	/**
	 * 循环下载数据
	 */
	start: async function () {

		//准备日期条件
		for (var startYear = __startYear; startYear <= __endYear; startYear++) {
			// 设置年份
			$('.condition1 #se1').val(startYear);

			// 季度循环
			for (var i = 0; i < 4; i++) {
				console.log(startYear + '-' + (i + 1));

				//设置季度
				$('.condition2 select').val(__quarterList[i]);
				// 循环季度获取数据
				// . 开始检索
				$('.dataBrowseBtn').click();
				// 成功后dowload数据
				// await this.sleep(5000); //若服务器有请求限制，不适用ip池的情况下，较少请求频率
				this.sleep(5000); //服务器无限制
				this.download();
			}
		}
	},

	/**
	 * 下载数据
	 */
	download: function () {
		if ($('#contentTable tbody tr').length > 0) {
			// $('.exportBtn').click();
			console.log('  -> ' + $('#contentTable tbody tr').length);
		}
	},

	//可以采用JS的异步新特性Promise类来实现
	sleep: function (delay) {
		var p = new Promise(function (resolve, reject) { //做一些异步操作
			setTimeout(function () {
				resolve();
			}, delay);
		});
		return p;
	}

};

/****************************************************************************
 * 
 * 主逻辑区
 * 
 *  备注： 执行过程中发现，直接循环并发请求即可，直接可获取全部季度的数据， 巨潮服务器的并发处理还是可以的
 * 
 ****************************************************************************/
// 当前 页面herf
var ___hostURL = window.location.href;
// 全部股票代码
var __codeList = ['600893', '601288', '601111', '600271', '000898', '600585', '600816', '000768', '600705', '600760', '601169', '601988', '601328', '601997', '600926', '600919', '601009', '002142', '601229', '600019', '601992', '600008', '002385', '002153', '600085', '000725', '002594', '000783', '600372', '601998', '601800', '601939', '600115', '601818', '600977', '600340', '600068', '600297', '000039', '601888', '601628', '600036', '600999', '001979', '600016', '603993', '601117', '601985', '600111', '601611', '601601', '600028', '601186', '000999', '601088', '600482', '600118', '601668', '600029', '601098', '600050', '000002', '600900', '600373', '000625', '000839', '600030', '601866', '601919', '601766', '601006', '002065', '000423', '601198', '000413', '600804', '601788', '600516', '000402', '002797', '002027', '603288', '601901', '601155', '600660', '600795', '600383', '000776', '002558', '002241', '000651', '600606', '601333', '601238', '600332', '002465', '002736', '601211', '000728', '600837', '002415', '002508', '002008', '600398', '000895', '600346', '600487', '000709', '600909', '600027', '000963', '600011', '601688', '600015', '600741', '000627', '000883', '600570', '601398', '002230', '601166', '601377', '600010', '600887', '600276', '002304', '600362', '002460', '601718', '601958', '000656', '600998', '600518', '600519', '600739', '601012', '002475', '000568', '600808', '002044', '601618', '000333', '002714', '600406', '601336', '000876', '002180', '601018', '002456', '600583', '600958', '600637', '002624', '601857', '000001', '601318', '600048', '601669', '600690', '000792', '002146', '002493', '600104', '600703', '600031', '600061', '600886', '601225', '603858', '600547', '601966', '002195', '601727', '600196', '600009', '600018', '601607', '600000', '600820', '601699', '002500', '600809', '000983', '600642', '000166', '000027', '000069', '002294', '000060', '600674', '002422', '600109', '600688', '601555', '601021', '002024', '002081', '600535', '000100', '600089', '000050', '002466', '600867', '000630', '600438', '600600', '000826', '000938', '000559', '000338', '000581', '002673', '002555', '000858', '000425', '600153', '600208', '002202', '601933', '600588', '600177', '000538', '600895', '600436', '002602', '600415', '601877', '002236', '603799', '600352', '600023', '600066', '600489', '601899', '000157', '000063'];
// 资产负债表检索列
var __266Cols = '<li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="SECNAME" data-name="证券简称" data-id="266[object Object]">证券简称</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="SECCODE" data-name="证券代码" data-id="266[object Object]">证券代码</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="ORGNAME" data-name="机构名称" data-id="266[object Object]">机构名称</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="DECLAREDATE" data-name="公告日期" data-id="266[object Object]">公告日期</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="ENDDATE" data-name="截止日期" data-id="266[object Object]">截止日期</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F001D" data-name="报告年度" data-id="266[object Object]">报告年度</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F039N" data-name="短期借款" data-id="266[object Object]">短期借款</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F050N" data-name="一年内到期的非流动负债" data-id="266[object Object]">一年内到期的非流动负债</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F053N" data-name="长期借款" data-id="266[object Object]">长期借款</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F054N" data-name="应付债券" data-id="266[object Object]">应付债券</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F055N" data-name="长期应付款" data-id="266[object Object]">长期应付款</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F059N" data-name="其他非流动负债" data-id="266[object Object]">其他非流动负债</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F070N" data-name="所有者权益（或股东权益）合计" data-id="266[object Object]">所有者权益（或股东权益）合计</span></label></li>'
// 单季度利润表检索列
var __375Cols = '<li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="SECCODE" data-name="证券代码" data-id="375[object Object]">证券代码</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="SECNAME" data-name="证券简称" data-id="375[object Object]">证券简称</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="STARTDATE" data-name="开始日期" data-id="375[object Object]">开始日期</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="ENDDATE" data-name="截止日期" data-id="375[object Object]">截止日期</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F001D" data-name="报告年度" data-id="375[object Object]">报告年度</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F012N" data-name="财务费用" data-id="375[object Object]">财务费用</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F018N" data-name="三、营业利润" data-id="375[object Object]">三、营业利润</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F024N" data-name="四、利润总额" data-id="375[object Object]">四、利润总额</span></label></li><li><label class="my_protocol"><input type="checkbox" class="checkboxs"><i></i><span data-alias="F025N" data-name="减：所得税" data-id="375[object Object]">减：所得税</span></label></li>';
// 开始检索年
var __startYear = 2013;
// 结束检索年
var __endYear = 2019;
// 季度value列表
var __quarterList = ['M_0331', 'M_0630', 'M_0630', 'M_1231'];
//设置状态为已登录
window.localStorage.setItem('login', true);


/**
* 爬取主逻辑
*/
function _startGet() {

	// 爬取详细流程
	//1. 切换到高级检索
	$('#btn2').click();

	//2. 添加要检索股票代码
	__loadDataTools.insertACodeList(__codeList);

	//3. 添加检索字段
	__loadDataTools.insertSearchColumns();

	// //4. 循环检索并下载不同季度的数据
	__loadDataTools.start();
}

// 要检索的列
var __searhCols = '';
switch (___hostURL) {
	// 报告期资产负债表
	case "http://webapi.cninfo.com.cn/overview.html#/dataBrowse?id=266":
		// alert('报告期资产负债表');
		console.log('报告期资产负债表');
		__searhCols = __266Cols;
		setTimeout(_startGet, 3000);
		break;
	// 单季度利润表
	case "http://webapi.cninfo.com.cn/overview.html#/dataBrowse?id=375":
		// alert('单季度利润表');
		console.log('单季度利润表');
		__searhCols = __375Cols;
		setTimeout(_startGet, 3000);
		break;
}