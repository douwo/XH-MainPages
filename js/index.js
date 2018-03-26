window.onload = function() {
	var _mainPage_tabTitle = document.getElementById("mainPage");
	var _mainPage_tabTitle_btn = _mainPage_tabTitle.getElementsByTagName("i");
	_mainPage_tabTitle_btn[0].style.display = "none";
}
$(function() {
	var _text = '';
	$.get("left-nav.json", function(result) {
		$.each(result, function(index, obj) {
			_text = _text + '<li class="layui-nav-item"><a class="" href="javascript:;">' +
				obj.name + '</a><dl class="layui-nav-child">';
			$.each(obj.second, function(index, obj2) {
				_text = _text + '<dd><a href="javascript:;" onclick="addTab(\'demo\',\'' + obj2.id + '\',\'' + obj2.title + '\')">' + obj2.title + '</a></dd>'
			});
			_text = _text + '</dl></li>';
		});
		$('#left-nav').html(_text);
		var element = layui.element;
		element.render();
	});
	layui.use('element', function() {
		var element = layui.element;
		element.on('tab(demo)', function(data) {
			var _title = $(this).text();
			var _titleLength = _title.length;
			_title = _title.substr(0, _titleLength - 1);
			var _dd = $('#left-nav dd');
			if(_title == "首页"){
				_dd.removeClass('layui-this');
				return;
			}
			_dd.each(function() {
				if(_title == $(this).text()) {
					_dd.removeClass('layui-this');
					$(this).addClass('layui-this');
					return;
				}
			})
		});
		element.on('tabDelete(demo)', function(data) {
			var tab_content = $.trim($(".layui-tab-title").text());
			var tab_contentLength = tab_content.length;
			tab_content = tab_content.substr(0, tab_contentLength - 1);
			console.log(tab_content)
			if(tab_content == '') {
				$('#left-nav dd').removeClass('layui-this');
			}
			if(tab_content == '首页'){
				$('#left-nav dd').removeClass('layui-this');
			}
		});
	});
})

function addTab(filter, id, title) {
	var flag = 0;
	var element = layui.element;
	$('.layui-tab-title>li').each(function() {
		var _title = $.trim($(this).text());
		var _titleLength = _title.length;
		_title = _title.substr(0, _titleLength - 1);
		if(_title == title) {
			element.tabChange(filter, id);
			flag = 1;
			return false;
		}
	});
	if(flag == 1) {
		return;
	} else {
		element.tabAdd('demo', {
			title: title,
			content: '<iframe src="StuPage.html" width="100%" height="100%"></iframe>', //支持传入html
			id: id
		});
		element.tabChange(filter, id);
	}
}

$('.aboutMe').click(function() {
	layer.open({
		type: 1,
		closeBtn: 0, //不显示关闭按钮
		anim: 1,
		shade: 0.1,
		shadeClose: true, //开启遮罩关闭
		area: ['340px', '215px'],
		content: ''
	});
})