$(function() {
	 
	var now = new Date();    
	var year = now.getFullYear();       //年   
	var month1 = now.getMonth();     //月  
	var month2 = now.getMonth() + 1;     //月  
	var day = now.getDate();			//日
	var nowdate1=year+'-'+month1+'-'+day;
	var nowdate2=year+'-'+month2+'-'+day;
	$('#flupDateStart').val(nowdate1);
	$('#flupDateEnd').val(nowdate2);
	loadFactory();
	loadBuisNo();
	loadGrid();
	load_managerInfo();
});


function loadFactory(){
	/****
	 * 加载厂家名称
	 */
	$.ajax({
        type: "post",
        url: path+'/platformTradelogaction!factoryList.action',
        dataType : "json",
        success: function(data){
			var html="<option value=''>全部</option>";
			for(var i=0;i<data.length;i++){
				html+="<option value='"+data[i].factoryNo+"'>"
				html+=data[i].factoryName
				html+="</option>";
			}
			$("#factoryno").html(html);
        }
    });
}

function loadBuisNo(){
	$.ajax({
		type: "post",
		url: path+'/platformTradelogaction!getIntenBusi.action',
		dataType : "json",
		success: function(data){
		var html="<option value=''>全部</option>";
		for(var i=0;i<data.length;i++){
			html+="<option value='"+data[i].busiNo+"'>";
			html+=data[i].busiName;
			html+="</option>";
		}
		$("#buisNo").html(html);
	}
	});
}

function loadGrid(){
	
	$('#flupDateStart').click(function() {
		WdatePicker( {
			minDate : '{%y-80}-%M-%d',
			readOnly : true
		});
	});

	$('#flupDateEnd').click(function() {
		WdatePicker( {
			minDate : '{%y-80}-%M-%d',
			readOnly : true
		});
	});
	var fyNo;
	var datetime;
	var biNo;
	$('#date').val();//异步加载APP业务员调用动态
	$('#manager_list_tab').datagrid( {
		method:'get',
		fitColumns:true,
		collapsible : false,
		remoteSort : false,
		idField : 'id',
		rownumbers : true,
		queryParams : '',
		singleSelect : true,
	    title:'APP业务调用动态',
		pagination : true,
		pageSize:10,
        pageList:[10,20],
		columns : [ [ {
			field : 'factoryName',
			title : '厂家名称',
			width : 100,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'factoryNo',
			title : '厂家编码',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				fyNo=val;
				return val;
			}
		},{
			hidden:true,
			field : 'busiNo',
			title : '业务编号',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'busiName',
			title : '业务名称',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'opeDatetime',
			title : '访问日期',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				datetime=val;
				return val;
			}
		}, {
			field : 'sumDayCount',
			title : '访问次数',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'noNormalCount',
			title : '异常次数',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return "<a href='#' >"+val+"</a>";
			}
		}, {
			field : 'view',
			title : '操作',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				 var param = {
							'map.busiNo' : biNo,
						    'map.opeDatetime':datetime,
						    'map.factoryNo':fyNo
						}
				return "<input type='button' value='调阅'/>";
			}
		} ] ],
		onClickCell: function(rowIndex, field, value){
		var rows=$('#manager_list_tab').datagrid('getRows');  
			if(field=="view"){
				var param = {
						'map.busiNo' : rows[rowIndex].busiNo,
					    'map.opeDatetime':rows[rowIndex].opeDatetime,
					    'map.factoryNo':rows[rowIndex].factoryNo
					}
				html_winopen(param,'APP业务调用详情');
			}else if(field=="noNormalCount" && value!='0'){
				var p={
						'map.busiNo' : rows[rowIndex].busiNo,
					    'map.opeDatetime':rows[rowIndex].opeDatetime,
					    'map.factoryNo':rows[rowIndex].factoryNo,
					    'map.opeResult':'F'
					}
				html_winopen(p,'APP业务异常调用详情');
			}
		}
	});

	 var param = {
				'map.busiNo': $("#buisNo").find("option:selected").val(),
			    'map.beginDate':$("#flupDateStart").val(),
			    'map.endDate':$("#flupDateEnd").val(),
			    'map.factoryNo':'GHW'
			}
	loadData(path + '/platformTradelogaction!searchPageList.action',
			'manager_list_tab', param);	
	 //加载图表数据
	 $.ajax({
			type : "post",
			url : path + '/platformTradelogaction!findChart.action?map.start='+$("#flupDateStart").val()+'&map.end='+$("#flupDateEnd").val()+'&map.factoryNo=GHW',
			dataType : "json",
			success : function(data) {
				load_chart(data[0].Rows);
			}
		});
}

function load_chart(data){
	var GHW=[];
	var QMGS=[];
	var datetime=[];
	titleText = "接口交易";
	for ( var i = 0; i < data.length; i++) {
		GHW.push(parseFloat(data[i].GHW));
		//QMGS.push(parseFloat(data[int].QMGS));
		datetime.push(data[i].opeDatetime)
	}
	
	$('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '接口交易'
        },
        
        xAxis: {
            categories: datetime,
               
        },
        yAxis: {
            min: 0,
            title: {
                text: '访问次数/次'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span>',
            formatter: function () {  
              return '<b>' + this.x + '</b><br/>' +  
           this.series.name + ': ' + this.y+'次';  
          } 
            
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{  
            name:"挂号网" ,  
            data: GHW  
        }] 
    });
	
	
}

//打开调阅窗口
function html_winopen(param,value) {
	loadData(path + '/platformTradelogaction!findPageList.action','managerInfo', param);
	var $win;
	$win = $('#configure_html').window({
	    title: value,
	    width: 800,
	    height: 450,
	    top: ($(window).height() - 400) * 0.5,
	    left: ($(window).width() - 800) * 0.5,
	    shadow: true,
	    modal: true,
	    iconCls: 'icon-search',
	    minimizable: false,
	    maximizable: false,
	    collapsible: false,
	});
	$("#configure_html").window("open");
}


function load_managerInfo(){
	$('#managerInfo').datagrid( {
		remoteSort : false,
		idField : 'id',
		rownumbers : true,
		singleSelect : true,
		fitColumns : true,
		fit:true,
        nowrap: false,  
        striped: true,  
		pagination : true,
		pageSize : 10,
		pageList : [ 10,20, 50 ],
		frozenColumns : [ [ {
			field : 'busiName',
			title : '业务名称',
			width : 100,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'opeDatetime',
			title : '访问时间',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		} ] ],
		columns : [ [ {
			field : 'sendContent',
			title : '发送内容',
			width : 200,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'receContent',
			title : '接收内容',
			width : 140,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'exceptionExplain',
			title : '异常信息',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'sumDayCount',
			title : '病人编号',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		}, {
			field : 'noNormalCount',
			title : '医保编号',
			width : 80,
			align : 'center',
			formatter : function(val, rec) {
				return val;
			}
		} ] ]
	});
}

function getNowFormatDate() {
	var day = new Date();
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	Year = day.getFullYear();// 支持IE和火狐浏览器.
	Month = day.getMonth() + 1;
	Day = day.getDate();
	CurrentDate += Year + "-";
	if (Month >= 10) {
		CurrentDate += Month;
	} else {
		CurrentDate += "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate += Day;
	} else {
		CurrentDate += "0" + Day;
	}
	return CurrentDate;
}