;(function(){
	var link = document.createElement('link');
    link.href = 'http://gongxin.com/story/webroot/vendor/zhang/comment/xin/css.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(link);

	var obj = $(".ds-thread");
	var id = obj.attr("data-thread-key");
	var title = obj.attr("data-title");
	var aurl = obj.attr("data-url");

	var html = '<form method="post" action="'+submitPath+'" class="form-comment"><div class="x_box" id="x_box">';
		html += '<div class="x_text_box">';
		html += '<textarea name="content" class="x_text"></textarea>';
		html += '<input name="aid" class="x_input" type="hidden" value="'+id+'">';
		html += '<input name="pid" id="reply_pid" class="x_input" type="hidden" value="0">';
		html += '</div>';
		html += '<div class="x_buttons_box">';
		html += '<button type="button" class="x_button ajax-post" target-form="form-comment">提交</button>';
		html += '</div>';
		html += '</div></form>';

	var ul = '';
	var commentList = function(data){
		$.each(data,function(k,v){
			ul += '<li class="ds-post" data-post-id="'+v.id+'">';
			ul += '<div class="ds-post-self">';
			ul += '<div class="ds-avatar"><a rel="nofollow author" target="_blank" href="#" title="'+v.name+'"><img src="http://static.duoshuo.com/images/noavatar_default.png" alt="去尼玛的爱情"></a></div>';
			ul += '<div class="ds-comment-body">';
			ul += '<div class="ds-comment-header"><a class="ds-user-name ds-highlight" >'+v.name+'</a></div><p>'+v.content+'</p><div class="ds-comment-footer ds-comment-actions"><span class="ds-time" datetime="2016-12-08T16:18:30+08:00" title="2016年12月8日 下午4:18:30">12月8日</span><a class="ds-post-reply" href="javascript:void(0);"><span class="ds-icon ds-icon-reply"></span>回复</a><a class="ds-post-likes" href="javascript:void(0);"><span class="ds-icon ds-icon-like"></span>顶</a><a class="ds-post-repost" href="javascript:void(0);"><span class="ds-icon ds-icon-share"></span>转发</a><a class="ds-post-report" href="javascript:void(0);"><span class="ds-icon ds-icon-report"></span>举报</a></div>';
			ul += '</div></div>';
			if(v._data.length != 0){
				ul += '<ul class="ds-children">';
				commentList(v._data);
				ul += '</ul>';
			}
			ul += '</li>';
		});
		return ul;
	}

	$.getJSON(commentListPath,{'aid':id},function(data){
		var comment = '<div id="ds-reset"><ul class="ds-comments">';
			comment += commentList(data.datas);
			comment += '</ul></div>';
		obj.html(comment+html);
	});

	$(document).on('click','.ds-post-reply',function(){
		var pid = $(this).parents("li").attr("data-post-id");
		$("#reply_pid").val(pid);
		$("html, body").animate({scrollTop:$("#x_box").position().top}, 100);
	})

	$(document).on('click','.ajax-post',function(){
		var target,query,form;
		var target_form = $(this).attr('target-form');
		form = $('.'+target_form);
		query = form.serialize();
		target = form.get(0).action;
		$.post(target,query).success(function(data){
			if(data.status == 200){
				layer.msg('评论成功',function(){
					window.location.reload();
				});
			}
		});
		return false;
	})
})()