/*
 * 系统部分脚本
 */
//var URL = 'http://localhost:8082/TONGXIANG/';

$(document).ready(function(){
	//alert('init');
	System.bind();
});

var System = {}

System.bind = function(){
	$('.users-table').find('.edit').click(function(){
		System.edit_user($(this));
	});
	$('.users-table').find('.delete').click(function(){
		System.delete_user($(this));
	});
}

/*
 * 弹出框编辑用户属性
 */
System.edit_user = function(obj){
	//window.frames[0].System.dialog.show({},{});
	System.dialog.show({
		'url'	: URL + '/getUser.action',
		'param'	: {
			AId		: obj.parents('tr').attr('id')
		}
	},{
		'submit'	: function(){
			System.save_user(System.get_param('.system-table'));
		}
	});
}

/*
 * 删除用户
 */
System.delete_user = function(obj){
	System.dialog.show({
		'text'	: '确定删除账户？该操作不可恢复。'
	}, {
		'submit'	: function(){
			$.post(URL + '/addUser.action', {
				'mode'			: 'delete',
				'user.autoId'	: obj.parents('tr').attr('id')
			}, function(data){
				if(data == 'success'){
					System.dialog.remove();
					window.location.href=window.location.href;
				} else {
					alert('操作错误，请重试');
				}
			});
		}
	})
}

/*
 * 保存用户属性
 */
System.save_user = function(param){
	$.post(URL + '/addUser.action', param, function(data){
		if(data == 'success'){
			System.dialog.remove();
			window.location.href=window.location.href;
		} else {
			alert('操作错误，请重试');
		}
	});
}

System.dialog = {}
/*
 * 系统对话框
 */
System.dialog.show = function(v, callback){
	v['width'] = v['width']?v['width']:842;
	v['title'] = v['title']?v['title']:'弹出框';
	v['param'] = v['param']?v['param']:{};
	callback['submit'] = callback['submit']?callback['submit']:function(e){};
	callback['cancel'] = callback['cancel']?callback['cancel']:function(e){};
	callback['success'] = callback['success']?callback['success']:function(e){};
	callback['fail'] = callback['fail']?callback['fail']:function(e){};
	
	if(typeof(v['text']) != 'undefined'){
		v['width'] = 300;
	}
	
	var tmp_title 	= '<div id="dialog_title"><h3>' + v['title'] + '</h3><div class="close" id="close_dialog"></div></div>';
	var tmp_dock 	= '<div class="dialog_dock"><div class="dock_button button_normal button cancel">取 消</div><div class="button button_normal dock_button" id="dialog_yes">确 定</div></div>';
	var tmp 		= '<div id="hide_layout"><div id="dialog" style="width:' + v['width'] + 'px;">' + tmp_title + '<div id="td"><div class="loading"><img src="' + URL + '/img/loading.gif" /><span>加载中</span></div></div>' + tmp_dock + '</div></div>';
	$('body').append(tmp);
	
	if(typeof(v['url']) != "undefined"){
		$.post(v['url'], v['param'],
			function(html){
				
				$('#td').html(html);
				callback['success'](v);
				fix_dialog();
				
		}, 'html');
	} else {
		$('#td').html('<div style="padding:10px 10px 0 0;text-align:left;">' + v['text'] + '</div>');
	}
	

	fix_dialog();
	
	$('#dialog').find('.close').click(function(){
		$('#hide_layout').remove();
	});
	
	$('#dialog').find('.cancel').click(function(){
		callback.cancel(v);
		$('#hide_layout').remove();
	});
	
	$('#dialog_yes').click(function(){
		if(System.dialog.lock('lock')){
			callback.submit(v);		
		};
	
	});
	
	move_dialog();
	
	$('.button').hover(function(){
		$(this).removeClass('button_normal');
		$(this).addClass('button_hover');
	}, function(){
		$(this).removeClass('button_hover');
		$(this).addClass('button_normal');
	});
	
	function fix_dialog(){
		if($('#dialog').height() > $(window).height()-40){
			$('#td').css({height : $(window).height()-200});
		}
		var h = $(document).height();
		var top = $(document).height()/2-$('#dialog').height()/2;
		var left = $(window).width()/2-$('#dialog').width()/2;
		$('#dialog').css({'margin-left' : left, 'margin-top' : top});
	}

	function remove_dialog(){
		$('#hide_layout').remove();
	}

	//move dialog
	function move_dialog(){
		var _move=false;
		var _x,_y;
	    $("#dialog_title").click(function(){
	        }).mousedown(function(e){
	        _move=true;
	        _x=e.pageX-parseInt($("#dialog").css("margin-left"));
	        _y=e.pageY-parseInt($("#dialog").css("margin-top"));
	    });
	    $(document).mousemove(function(e){
	        if(_move){
	            var x=e.pageX-_x;
	            var y=e.pageY-_y;
	            $("#dialog").css({'margin-top':y,'margin-left':x});
	        }
	    }).mouseup(function(){
	    _move=false;
	  });
	}
}

/*
 * 弹出框的子对话框，仅在调用父对话框时可以调用
 */
System.dialog.warm = function(v, text, callback){
	if($('#hide_layout').html().length < 1){
		return;
	}
	
	v['title'] = v['title']?v['title']:'提 示';
	callback['yes'] = callback['yes']?callback['yes']:function(e){};
	callback['no'] = callback['no']?callback['no']:function(e){};
	
	System.dialog.hidden();
	
	var tmp_title 	= '<div id="warm-title"><h3>' + v['title'] + '</h3><div class="close" id="close-warm"></div></div>';
	var tmp_dock 	= '<div class="warm-dock"><div class="warm-button button_normal button cancel">取 消</div><div class="button button_normal warm-button" id="warm-yes">确 定</div></div>';
	var tmp 		= '<div id="dialog-warm">' + tmp_title + '<div id="warm-td"><div class="loading"><img src="' + URL + '/img/loading.gif" /><span>加载中</span></div></div>' + tmp_dock + '</div>';
	$('#hide_layout').append(tmp);	
	$('#warm-td').html('<div style="padding:10px 10px 0 0;text-align:left;">' + text + '</div>');
	
	fix_dialog();
	
	$('#dialog-warm').find('.close').click(function(){
		$('#dialog-warm').remove();
		System.dialog.display();
	});
	
	$('#dialog-warm').find('.cancel').click(function(){
		callback.no(v);
		remove_dialog();
		System.dialog.display();
		System.dialog.lock('unlocked');
	});
	
	$('#warm-yes').click(function(){
		callback.yes(v);
		remove_dialog();
		System.dialog.display();
		System.dialog.lock('unlocked');
		//$('#hide_layout').remove();
	});
	
	$('.button').hover(function(){
		$(this).removeClass('button_normal');
		$(this).addClass('button_hover');
	}, function(){
		$(this).removeClass('button_hover');
		$(this).addClass('button_normal');
	});
	
	function fix_dialog(){
		if($('#dialog-warm').height() > $(window).height()-40){
			$('#warm-td').css({height : $(window).height()-200});
		}
		var h = $(document).height();
		var top = $(window).height()/2-$('#dialog-warm').height()/2;
		var left = $(window).width()/2-$('#dialog-warm').width()/2;
		$('#dialog-warm').css({'margin-left' : left, 'margin-top' : top});
	}

	function remove_dialog(){
		$('#dialog-warm').remove();
	}
}

System.dialog.lock =  function(mode){
	if(mode == 'locked'){
		$('#dialog_yes').text('处理中');
		return false;
	} else if(mode == 'unlocked') {
		$('#dialog_yes').text('确 定')
		return true;
	} else {
		if($('#dialog_yes').text() == '确 定'){
			return true;
		} else {
			return false;
		}
	}
}

System.dialog.remove =  function(){
	$('#hide_layout').remove();
}

System.dialog.hidden =  function(){
	$('#dialog').css({'display': 'none'});
}

System.dialog.display =  function(){
	$('#dialog').css({'display': 'inline'});
}

System.dialog.add = function(name, value, set){
	set = set?set:'str';
	$('.property').append('<input type="hidden" name=\"' + name + '\" value= \"' + value + '\" class="' + set + '" />');
}

System.dialog.enable = function(name, sta){
	$('.property').find(name).attr();
}

System.dialog.set = function(obj, value){
	$('.property').find(obj).val(value);
}

System.dialog.getval = function(obj){
	return $('.property').find(obj).val();
}

//遍历表单
System.get_param = function(obj) {
	obj = obj?obj:'.property';
	var res = {};
	var inp = $(obj).find('input');
	var sel = $(obj).find('select');

	inp.each(function() {
		var s = $(this).attr("class");
		var data;

		if (typeof (s) == "undefined") {
			data = $(this).val();
			return true;
		}
		// 忽略不用提交的内容
		if (s.indexOf('ignore') >= 0) {
			return true;
		}
		
		//忽略空值
		if($(this).val() == ""){
			return true;
		}
		
		// 类型转换
		if (s.indexOf('int') >= 0) {
			data = parseInt($(this).val());
		} else {
			data = $(this).val();
		}
		res[$(this).attr('name')] = data;
		//alert(s.indexOf('ignore'));
		//alert($(this).attr('name') );
	});

	sel.each(function() {
		res[$(this).attr('name')] = $(this).val();
	});

	console.log(res);
	return res;
}