"use strict";
cc.geo = {};
cc.geo.deg2rad  = function(deg) {
  return deg * (Math.PI/180)
}
cc.geo.calcGeoDistance = function (lat1,lon1,lat2,lon2) {
  var R = 6371;
  var dLat = cc.geo.deg2rad(lat2-lat1);
  var dLon = cc.geo.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(cc.geo.deg2rad(lat1)) * Math.cos(cc.geo.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
} 