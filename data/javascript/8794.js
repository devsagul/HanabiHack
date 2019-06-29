// Test NODE ==========================================================

var rect = paper.rect(50, 150, 50, 50, 5).attr({class: 'node'});
var title = paper.text(50,120,'Title: Overpaid').attr({class: 'node-text', id:'text-title'});
var url = paper.text(50,140,'URL: /status').attr({class: 'node-text', id:'text-url'});
var g_details = paper.g(title, url).attr({id:'g-node_details', class:'hide-text'});
var g = paper.g();
g.add(rect, g_details).attr({id:'g-node'});
//.mouseover scale g_details
g.mouseover(function(e){
  //console.log('here')
  g_details.toggleClass("hide-text");
  g_details.toggleClass("show-text");
}).mouseout(function(e){
  g_details.toggleClass("show-text");
  g_details.toggleClass("hide-text");
})

//On click get the coords of the rect
rect.click(function(e){
  //this.toggle = !this.toggle
  //Select form
  var el = document.getElementById("node-details");
  //Get the current node-detail values and populate the form
  var url_val = url.node.innerHTML;
  var title_val = title.node.innerHTML;
  //console.log(url_val)
  var page_title = document.querySelector('input#js-page_title');
  page_title.value = title_val.substr(7);
  var page_url = document.querySelector('input#js-url');
  page_url.value = url_val.substr(5);
  //Get coords
  var posX = e.target.x.baseVal.value + e.target.width.baseVal.value + 120
  var posY = e.target.y.baseVal.value + 50
  //console.log(posX, posY)
  //Move form to start position
  el.style.left = posX+"px"
  el.style.top = posY+"px"
  el.classList.toggle("show-form");
  el.classList.toggle("hide-form");
})
