"use strict";
$(document).ready(function () {
    if ($("#og-grid").length) {
        cc.events = {};
        cc.events.soonest = function (events) {
            events.sort(function (a, b) {
                return new Date(a.Date) - new Date(b.Date);
            });
            return events;
        };
        cc.events.stillOn = function (events) {
            events.filter(function (e) {
                return new Date(e.Date) >= new Date();
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
        cc.events.relevant = function (events, categories) {
            events = events.filter(function(e) {
                return $.inArray(e.Category, categories);
            });
            return events;
        };
        cc.events.formatDate = function (d) {
            return $.datepicker.formatDate('dd.MM.yy', new Date(d));
        };
        cc.events.load = function (jsonFilepath, at, take) {
            var t = "<li>";
            t += "<a href='[url]' data-largesrc='[img]' data-title='[title]' data-description='[description]' data-category='[campus]' data-date='[date]'>";
            t += " <div class='event-title-wrap caption'>";
            t += "  <h4 class='event-title'>[title]</h4>";
            t += " </div>";
            t += " <img src='[img]' alt='[title]' />";
            t += " </a>";
            t += "</li>";
            $.getJSON(jsonFilepath, function (events) {
                events = cc.events.relevant(events, ['Information Events', 'Taster Days']);
                events = cc.events.stillOn(events);
                events = cc.events.soonest(events);
                var placeEvents = function (events) {
                    events = events.slice(0, Math.min(take, events.length));
                    $.each(events, function (i, e) {
                        var h = '';
                        for (var i = 0; i < events.length; i++) {
                            var e = t;
                            console.log(events[i].Image);
                            e = e.replace('[url]', events[i].DetailUrl.replace('http:', 'https:'));
                            e = e.replace('[img]', events[i].Image.replace('http:', 'https:'));
                            e = e.replace('[img]', events[i].Image.replace('http:', 'https:'));
                            e = e.replace('[title]', events[i].Title);
                            e = e.replace('[title]', events[i].Title);
                            e = e.replace('[title]', events[i].Title);
                            e = e.replace('[campus]', events[i].Campus);
                            e = e.replace('[date]', cc.events.formatDate(events[i].Date));
                            e = e.replace('[description]', events[i].Description);
                            h += e;
                        };
                        document.getElementById(at).innerHTML = h;
                        var grid = $('#og-grid');
                        var items = grid.children('li');
                        Grid.addItems(items);
                    });
                };
                navigator.geolocation.getCurrentPosition(function (p) {
                    events = cc.events.nearest(events, p.coords);
                    placeEvents(events);
                }, function () {
                    placeEvents(events);
                });
            });
        };
        cc.events.load('../data/CollegeEvents.json', 'og-grid', 3);
        Grid.init();
    }
});