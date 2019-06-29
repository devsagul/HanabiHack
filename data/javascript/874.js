$(function() {
	var c = false;
	$("[name=checkall]").click(function() {
		// 全选
		c = !c;
		$("[name=id]").each(function(index, obj) {
			$(obj).prop("checked", c);
		});
	});
	// delete animation
	$("#delAllBtn").click(function() {
		$("[name=id]:checked").each(function(index) {
			$(this).parents("tr").fadeOut(600);
		});
	});
	$("[data-toggle='collapse']").parent().parent().click(
			function() {
				$($(this).find("[data-toggle='collapse']").attr("href"))
						.collapse('toggle');
			});
});
function requestFullScreen() {
	var de = document.documentElement;
	if (de.requestFullscreen) {
		de.requestFullscreen();
	} else if (de.mozRequestFullScreen) {
		de.mozRequestFullScreen();
	} else if (de.webkitRequestFullScreen) {
		de.webkitRequestFullScreen();
	}
}
$(function() {
	$('#begindatetimepicker').datetimepicker({
		format : 'YYYY-MM-DD HH:mm:ss',
		ignoreReadonly : true,
		maxDate : new Date(),
		minDate : new Date(1800, 1, 1),
	});
	$('#enddatetimepicker').datetimepicker({
		format : 'YYYY-MM-DD HH:mm:ss',
		ignoreReadonly : true,
		maxDate : new Date(),
		minDate : new Date(1800, 1, 1),
	});
})

function loadPageInfo(data) {
	$("#pagelist").html("");
	if (data.beginPageIndex > 1) {
		$("#pagelist").append(
				"<li><a href='javascript:pagefind(1)'>首页</a></li>");
	}
	if (data.beginPageIndex == data.currentPage) {
		$("#pagelist")
				.append(
						"<li class='disabled'><a href='javascript:void(0)' aria-label='Previous'><span aria-hidden='true'>上一页</span></a></li>");
	} else {
		$("#pagelist")
				.append(
						"<li><a href='javascript:pagefind("
								+ (data.currentPage - 1)
								+ ")' aria-label='Previous'><span aria-hidden='true'>上一页</span></a></li>");
	}
	for ( var i = data.beginPageIndex; i <= data.endPageIndex; i++) {
		if (i == data.currentPage) {
			$("#pagelist").append(
					"<li class='active'><a href='javascript:void(0)'>" + i
							+ "</a></li>");
		} else {
			$("#pagelist").append(
					"<li><a href='javascript:pagefind(" + i + ")'>" + i
							+ "</a></li>");
		}
	}
	if (data.endPageIndex == data.currentPage) {
		$("#pagelist")
				.append(
						"<li class='disabled'><a href='javascript:void(0)' aria-label='Next'><span aria-hidden='true'>下一页</span></a></li>");
	} else {
		$("#pagelist")
				.append(
						"<li><a href='javascript:pagefind("
								+ (data.currentPage + 1)
								+ ")' aria-label='Next'><span aria-hidden='true'>下一页</span></a></li>");
	}
	if (data.endPageIndex < data.pageCount) {
		$("#pagelist").append(
				"<li><a href='javascript:pagefind(" + data.pageCount
						+ ")'>尾页</a></li>");
	}
}