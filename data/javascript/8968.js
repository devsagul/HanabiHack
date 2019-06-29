
function ajaxCallSync(url, type, data) {
    return $.ajax({
        type: type,
        url: url,
        data: data,
        async: false,
        timeout: 30000
    });
}
;

function getPublicaciones(json) {
    jsonP = json.data.page.list;
    var comentario = "";
    for (i = 0; i < jsonP.length; i++) {
        comentario += "<div class=" + comilla + "publicacion row" + comilla + ">";
        comentario += "<div class=" + comilla + "col-md-1" + comilla + ">";
        comentario += "<img src=" + comilla + "<%=request.getContextPath()%>/images/foto.jpg" + comilla + "class=" + comilla + "fotoPub" + comilla + " alt=" + comilla + "Foto usuario" + i + comilla + ">";
        comentario += "</div>";
        comentario += "<div class=" + comilla + "col-md-11" + comilla + ">";
        comentario += "<a href=" + comilla + "#" + comilla + ">" + jsonP[i].obj_usuario.nombre + espacio + jsonP[i].obj_usuario.apellidos + "</a>";
        comentario += "<span class=" + comilla + "nick" + comilla + "> @" + jsonP[i].obj_usuario.login + "</span><br/>";
        comentario += "<h4><a href=" + comilla + "#" + comilla + ">" + jsonP[i].titulo + "</a></h4>";
        comentario += "<span>" + jsonP[i].descripcion + "</span>";
        comentario += "</div>";
        comentario += "</div>";
    }

    return comentario;
}

$(document).ready(function () {

    espacio = ' ';
    comilla = "'";
    salto = "<br />";
    apertura = "<";
    cierre = ">";
    barra = "/";
    alm = "#";

    $.when(ajaxCallSync('json?ob=publicacion&op=getcomentarios', 'GET', '')).done(function (data) {
        comentarios = "<div class=" + "'row'" + ">";
        comentarios += "<div class=" + "'col-md-3 col-sm-3 perfilMain'" + ">";
        comentarios += "<div class=" + "'fotoPerfil'" + "><img src=" + "'http://localhost:8081/goplace/images/user.png'" + " class=" + "'foto'" + " alt=" + "'Foto usuario'" + "></div><br/>";
        comentarios += "<h3 class=" + "'nomargin'" + "><a href=" + "'#'" + "> Jose Miguel Coronado Aroca</a></h3>";
        comentarios += "</div><div class=" + "'col-md-9 col-sm-9 inicioMain'" + "id=" + "'comentariosgp'" + ">";
        jsonP = data.data.page.list;
        if (jsonP.length != 0) {
            for (i = 0; i < jsonP.length; i++) {
                comentarios += "<div class=" + comilla + "publicacion row" + comilla + ">";
                comentarios += "<div class=" + comilla + "col-md-1" + comilla + ">";
                comentarios += "<img src=" + comilla + "http://localhost:8081/goplace/images/user.png" + comilla + "class=" + comilla + "fotoPub" + comilla + " alt=" + comilla + "Foto usuario" + i + comilla + ">";
                comentarios += "</div>";
                comentarios += "<div class=" + comilla + "col-md-11" + comilla + ">";
                comentarios += "<a href=" + comilla + "#/usuario/view/" + jsonP[i].obj_usuario.id + comilla + ">" + jsonP[i].obj_usuario.nombre + espacio + jsonP[i].obj_usuario.apellidos + "</a>";
                comentarios += "<span class=" + comilla + "nick" + comilla + "> @" + jsonP[i].obj_usuario.login + "</span><br/>";
                comentarios += "<h4><a href=" + comilla + "#/publicacion/view/" + jsonP[i].id + comilla + ">" + jsonP[i].titulo + "</a></h4>";
                comentarios += "<span>" + jsonP[i].descripcion + "</span>";
                comentarios += "</div>";
                comentarios += "</div>";
            }
        } else {
            comentarios += "<div class=" + comilla + "publicacion row" + comilla + ">";
            comentarios += "<div class=" + comilla + "col-md-1" + comilla + ">";
            comentarios += "<img src=" + comilla + "<%=request.getContextPath()%>/images/foto.jpg" + comilla + "class=" + comilla + "fotoPub" + comilla + " alt=" + comilla + "Foto usuario admin" + comilla + ">";
            comentarios += "</div>";
            comentarios += "<div class=" + comilla + "col-md-11" + comilla + ">";
            comentarios += "<a href=" + comilla + "#/usuario/view/1" + comilla + ">" + "Administrador" + "</a>";
            comentarios += "<span class=" + comilla + "nick" + comilla + "> @admin" + "</span><br/>";
            comentarios += "<h4>Haz tu primer comentario!</h4>";
            comentarios += "<span>Comenta los planes con tus amigos</span>";
            comentarios += "</div>";
            comentarios += "</div>";
        }
        comentarios += "</div>";
        comentarios += "</div>";
        document.getElementById('principalpag').innerHTML = comentarios;
        //logo += "<img src=" + comilla + "http://ficcifestival.com/images/misc/splash/logo_volkswagen.png" + comilla + "/>";
    });
    return false;
});
