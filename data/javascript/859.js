var zaragoza = L.latLng(41.6521342, -0.8809428);


	var map = L.map('map', {
			zoomControl:true,
			maxZoom:25,
			layers:[OSM]
		}).fitBounds([[41.8480817,-1.205749],[41.450961,-0.487518]]);

		var baselayers = {

				"OSM":OSM,
				"PNOA": PNOA,
		};

		L.control.layers(baselayers).addTo(map);
		L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);

	
var hola = L.marker([41.64169, -0.89850]).addTo(map)
    .bindPopup('<strong> Hola! </strong>')
    .openPopup();
    
// OSMGeocoder plugin (https://gist.github.com/d3noob/7746162)     
        var osmGeocoder = new L.Control.OSMGeocoder({
            collapsed: false,
            position: 'bottomright',
            text: 'Buscar',
			});
        map.addControl(osmGeocoder);
