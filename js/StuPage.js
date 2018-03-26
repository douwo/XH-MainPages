$(function() {
	function pageHeight() {
		var pageHeight = $('iframe', window.parent.document).height() - $('.layui-tab-title', window.parent.document).height() - $('.layui-table-page').height() - 29;
		$('.layui-table-box').height(pageHeight);
	}
	pageHeight();
	window.onresize = function() {
		pageHeight();
	}
})

$('.addBtn-Stu').click(function() {
	parent.layer.open({
		type: 2,
		title: '新增学生',
		closeBtn: 1, //不显示关闭按钮
		shade: 0.3,
		area: ['420px', '415px'],
		anim: 2,
		content: ['add-Stu.html'], //iframe的url，no代表不显示滚动条
	});
})

$('.addBtn-T').click(function() {
	parent.layer.open({
		type: 2,
		title: '新增教师',
		closeBtn: 1, //不显示关闭按钮
		shade: 0.3,
		area: ['360px', '375px'],
		anim: 2,
		content: ['add-T.html'], //iframe的url，no代表不显示滚动条
	});
})

layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element'], function() {
	var table = layui.table;
	//执行一个 table 实例
	table.render({
		elem: '#test',
		url: 'table.json',
		page: true,
		loading: true,
		cols: [
			[ //表头
				{
					field: 'checkbox',
					fixed: 'left',
					type: 'numbers'
				},
				{
					field: 'id',
					title: 'ID',
					//							width: '20%',
					sort: true,
				}, {
					field: 'username',
					title: '用户名',
					//							width: 80
				}, {
					field: 'sex',
					title: '性别',
					//							width: 80,
					sort: true
				}, {
					field: 'city',
					title: '城市',
					//							width: 80
				}, {
					field: 'sign',
					title: '签名',
												width: 170
				}, {
					fixed: 'right',
					width: 120,
					align: 'center',
					toolbar: '#barDemo'
				}
			]
		]
	});

	//监听工具条
	table.on('tool(demo)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		if(layEvent === 'detail') {
			//					layer.msg('查看操作');
		} else if(layEvent === 'del') {
			parent.layer.confirm('真的删除行么', {
				shade: 0.3
			}, function(index) {
				obj.del(); //删除对应行（tr）的DOM结构
				layer.close(index);
				//向服务端发送删除指令
			});
		} else if(layEvent === 'edit') {
			layer.msg('编辑操作');
		}
	});
});