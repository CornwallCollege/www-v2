/* global Grid */
/* global cc */
"use strict";
$(document).ready(function () {
    if ($("#og-grid").length) {
        cc.events = {};                
        cc.events.stillOn = function (events) {
            events = events.filter(function (e) {                                
                return Date.parse(e.Date) >= Date.parse(new Date());
            });
            return events;
        };
        cc.events.nearest = function (events, c) {
            events = events.map(function (e) {
                e.geoDist = cc.geo.calcGeoDistance(c.latitude, c.longitude, e.GeoLoc.Lat, e.GeoLoc.Lng);
                return e;
            });
            events.sort(function (a, b) {
                return a.geoDist - b.geoDist;
            });
            return events;
        };
        cc.events.show = function (events, take) {
            events = events.slice(0, Math.min(take, events.length));
            $(events).each(function(i,v) {           
                var link = $($(v.e).children('a')[0]);                     
                var campus = cc.events.getCampus(link.data('category'));
                link.data('category', campus);
                $(v.e).css("display","inline-block");                
            });            
        };
        cc.events.getGeoLoc = function (campus) {
            if (campus === 'CCC') return { Lat:50.2268425, Lng:-5.2758395 };
            if (campus === 'CCN') return { Lat:50.4105492, Lng:-5.0682225 };
            if (campus === 'CCS') return { Lat:50.4055478, Lng:-4.2279294 };
            if (campus === 'CCSA') return { Lat:50.3464922, Lng:-4.7850022 };
            if (campus === 'CCR') return { Lat:50.223385, Lng:-5.3013473 };
            if (campus === 'CCSC') return { Lat:50.5461939, Lng:-4.3212666 };
            if (campus === 'FMS') return { Lat:50.1528966, Lng:-5.074243 };
            if (campus === 'BC') return { Lat:50.670602, Lng:-3.316736 };
        };
        cc.events.getCampus = function (campus) {
            if (campus === 'CCC') return 'Cornwall College Camborne';
            if (campus === 'CCN') return 'Cornwall College Newquay';
            if (campus === 'CCS') return 'Cornwall College Saltash';
            if (campus === 'CCSA') return 'Cornwall College St Austell';
            if (campus === 'CCR') return 'Duchy College Rosewarne';
            if (campus === 'CCSC') return 'Duchy College Stoke Climsland';
            if (campus === 'FMS') return 'Falmouth Marine School';
            if (campus === 'BC') return 'Bicton College';
        };
        cc.events.load = function (at, take) {  
            var events = $('.college-event');                        
            events = Array.prototype.map.call(events, function(e) {
               var link = $($(e).children('a')[0]);
               var campus = link.data('category');
               var geoLoc = cc.events.getGeoLoc(campus);
               var date = link.data('date');               
               return { e:e, GeoLoc:geoLoc, Date:date };
            });            
            events = cc.events.stillOn(events);                        
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {
                    events = cc.events.nearest(events, p.coords);
                    cc.events.show(events, take);
                }, function () {
                    cc.events.show(events, take);
                });
            } else {
                cc.events.show(events, take);
            }            
        };
        cc.events.load('og-grid', 3);                
        Grid.init();
    }
});