window.trackScrollAndMouseDistance = function (className, func, radius, hoverAtYPercent) {
    var calcDistanceInPercentageFromMouseAndViewportCentre = function (me, el) {
        var distanceBetween = function (p1, p2) {
            return Math.abs(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }
        var yp = .5;
        if (hoverAtYPercent) yp = (hoverAtYPercent / 100);
        var v = {
            x: window.innerWidth / 2,
            y: window.innerHeight * yp
        };
        console.log(v);
        var r = el.getBoundingClientRect();
        var e = {
            x: r.left + ((r.right - r.left) / 2),
            y: r.top + ((r.bottom - r.top) / 2)
        };
        var d = 0;
        if (typeof me !== 'undefined' && me != null) {
            var m = {
                x: me.pageX,
                y: me.pageY
            };
            m.x = m.x - window.pageXOffset;
            m.y = m.y - window.pageYOffset;
            d = distanceBetween(m, e) / radius;
        } else {
            d = distanceBetween(e, v) / radius;
        }
        d = 100 - d;
        var p = Math.round(d) / 100;
        return p;
    }

    var apply = function (me) {
        Array.prototype.slice.call(document.getElementsByClassName(className), 0)
            .every(function (e) {
                func(e, calcDistanceInPercentageFromMouseAndViewportCentre(me, e));
                return true;
            });
    }

    document.documentElement.addEventListener('mousemove', function (me) {
        apply(me)
    }, false);
    window.addEventListener('scroll', function () {
        apply()
    }, false);
    window.addEventListener('resize', function () {
        apply()
    }, false);
    
    window.addEventListener('swipeleft', function () {
        apply()
    }, false);
    window.addEventListener('swiperight', function () {
        apply()
    }, false);
    window.addEventListener('swipeup', function () {
        apply()
    }, false);
    window.addEventListener('swipedown', function () {
        apply()
    }, false);
};