function loadPoints(map) {
  for(i = 0; i < waypoint_data.length; i++) {
    point = waypoint_data[i];
    // if(point["accuracy"] < 50) {
      latLong = new GLatLng(point["latitude"], point["longitude"]);
      marker = new GMarker(latLong);
      marker.waypoint_number = i;
      GEvent.addListener(marker, "click", markerClicked);
      map.addOverlay(marker);
    // }
  }
}

function markerClicked() {
  this.openInfoWindowHtml("waypoint number: " + this.waypoint_number + "<br />" + 
                           "speed: " + waypoint_data[this.waypoint_number]["speed"] + "<br />" + 
                           "accuracy: " + waypoint_data[this.waypoint_number]["accuracy"] + "<br />");
  drawCircle(this.getLatLng(),(waypoint_data[this.waypoint_number]["accuracy"]/1000),40);
}

function drawCircle(center, radius, nodes, liColor, liWidth, liOpa, fillColor, fillOpa)
{
  if(window.poly) map.removeOverlay(window.poly);
// Esa 2006
	//calculating km/degree
	var latConv = center.distanceFrom(new GLatLng(center.lat()+0.1, center.lng()))/100;
	var lngConv = center.distanceFrom(new GLatLng(center.lat(), center.lng()+0.1))/100;

	//Loop 
	var points = [];
	var step = parseInt(360/nodes)||10;
	var bounds = window.map.getBounds();
	for(var i=0; i<=360; i+=step)
	{
	var pint = new GLatLng(center.lat() + (radius/latConv * Math.cos(i * Math.PI/180)), center.lng() + 
	(radius/lngConv * Math.sin(i * Math.PI/180)));
	points.push(pint);
	bounds.extend(pint); //this is for fit function
	}
	points.push(points[0]); // Closes the circle, thanks Martin
	fillColor = fillColor||liColor||"#0055ff";
	liWidth = liWidth||2;
	window.poly = new GPolygon(points,liColor,liWidth,liOpa,fillColor,fillOpa);
	map.addOverlay(poly);
}
