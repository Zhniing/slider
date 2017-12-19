function startMove(obj, json, fnEnd) {
    var cur = 0;

    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var stop = true;
        for (var attr in json) {
            if (json.hasOwnProperty(attr)) {

                // Get style
                if (attr === 'opacity') {
                    cur = Math.round(getStyle(obj, attr) * 100);
                } else {
                    cur = parseInt(getStyle(obj, attr));
                }
                // Compute speed
                var speed = (json[attr] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                // Don't stop
                if (speed != 0) { 
                    stop = false;
                    if (attr === 'opacity') {
                        obj.style['opacity'] = ( cur + speed ) / 100;
                        obj.style['filter'] = 'alpha(opacity: ' + ( cur + speed ) + ')';
                    } else {
                        obj.style[attr] = cur + speed + 'px';
                    }
                }

            }
        }
        if (stop) {
            clearInterval(obj.timer);

            if (fnEnd) fnEnd();
        }
     }, 30);
}