var url_nuevo = base_url + 'inventario/productos/guardar';
var url_editar = base_url + 'inventario/productos/actualizar';
$(document).ready(function()
{
	 var tabla_producto=$('#tblProducto').DataTable(
	 {
		languague:
		{
		'url':"//cdn.datatables.net/plug-ins/1.10.10/i18n/Spanish.json"
		},
		"paginingType":"number",
		"pageLenth":"10",
		"ordering":false,
		"scrollY":200,
		"scrollX":true,
		ajax:{
			"url":base_url + "inventario/productos/obtener/",
			"type":'POST',
			"dataSrc":""
		},
		"columns":[
			{"data":"codigo"},
			{"data":"Nombre_producto"},
			{"data":"precio_sugerido"},
			{"data":"existencia_Max"},
			{"data":"estado"}
		],
		 "columnDefs": [
		            {
		                "render": function (data, type, row) {
		                    var estado = row.estado;
		                    var cadena = "Activo";
		                    if (estado < 1)
		                        cadena = "Inactivo"
		                    return cadena;
		                },
		                "targets": 4
		            }
		 ]
	 });

	 // eventos de seleccion de filas
	 $('#tblProducto tbody').on('click','tr',function()
	 {
	 	if($(this).hasClass('selected'))
	 	{
	 		$(this).removeClass('selected');
	 	}else
	 	{
	 		tabla_producto.$('tr.selected').removeClass('selected');
	 		$(this).addClass('selected');
	 	}
	 	if($('#tblProducto tr.selected').length>0)
	 	{
	 		$("#btn_editar").removeAttr('disabled');
	 	}else
	 	{
	 		$("#btn_editar").attr('disabled','disabled');
	 	}
	 });
	   /*btn nuevo registro*/
	$("#btn_nuevo").on('click', function (e) {
	        $('#formulario_producto')[0].reset();
	        $("#formulario_producto").attr('action', url_nuevo);
	});

	    /*btn editar registro seleccionado*/
	$("#btn_editar").on('click', function (e) {
	        $("#formulario_producto").attr('action', url_editar);
	        var seleccion = $('#tblProducto tr.selected');
	        var fila_data = tabla_producto.row(seleccion).data();
	        $("#id_producto").val(fila_data.id_producto);
	        $("#id_empresa").val(fila_data.id_empresa);
	        $("#codigo").val(fila_data.codigo);
	        $("#nombre_producto").val(fila_data.Nombre_producto);
	        $("#precio").val(fila_data.precio_sugerido);
	        $("#existencia").val(fila_data.existencia_Max);
	        $("#estado").val(fila_data.estado);
	});
	   /*btn guardar/actualizar registro*/
    $("#btn_guardar").on('click', function () {
        var datos_formulario = $("#formulario_producto").serialize();
        // $.blockUI({message: '<h1>Por favor espere</h1>'});
        $.ajax({
            type: "POST",
            url: $("#formulario_producto").attr('action'),
            dataType: 'json',
            data: datos_formulario,
            success: function (respuesta) {
                // $.unblockUI();
                if (respuesta.estado) {
                    alerta(respuesta.mensaje, 'success');
                    $("#formulario_producto")[0].reset();
                    $("#btn_editar").attr('disabled', 'disabled');
                    tabla_producto.ajax.reload();
                    $("#mdlProducto").modal('hide');
                }
                else
                    alerta(respuesta.mensaje, 'error');
            },
            error: function (error) {
                $.unblockUI();
                alerta(error.responseText, 'error');
            }
        });
    });
});