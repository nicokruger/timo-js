// create a DDD:HH:MM:SS countdown
// where - jquery object
var countdown = (function () {
    // helper function to pad numbers with leading "0"
    var pad = function (num, pads) {
        var s = ''+num;
        return s.length == pads ? ''+num : _(_.range(pads - s.length)).map(function() { return "0" }).join('') + num;
    };
    
    var updateCounter = function(counter) {
        // don't do anything if counter is not visible
        if (!$(counter[5]).is(":visible")) {
            return;
        }
        var now = (new Date()).getTime();
        var c = convertTime(now, counter[0]);
        // check if timer has expired
        if (counter[0] < now) {
            c = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
        
        counter[1].update(pad(c.days, 3));
        counter[2].update(pad(c.hours, 2));
        counter[3].update(pad(c.minutes, 2));
        counter[4].update(pad(c.seconds, 2));
    }
    // holds all counters
    var counters = [];

    // the following code is the *single* function that gets called very second
    // and runs through the countdowns and updates them
    setInterval(function () {
        _(counters).each(function (counter) {
            updateCounter(counter);
        });
    }, 1000);
    
    var num = 0; // another counter to identify countdowns
    
    // colorscheme can be undefined, default will be used
    return function (where, target, w, h, colorscheme) {
        
        num+=1;
        var id = "countdown" + num;
        where.append( '<div id="' + id + '"></div>');
        where.find("#" + id).append('<span id="days' + id + '"></span>');
        where.find("#" + id).append('<span class="seperator">:</span>');
        where.find("#" + id).append('<span id="hours' + id + '"></span>');
        where.find("#" + id).append('<span class="seperator">:</span>');
        where.find("#" + id).append('<span id="minutes'+ id + '"></span>');
        where.find("#" + id).append('<span class="seperator">:</span>');
        where.find("#" + id).append('<span id="seconds' + id + '"></span>');
        
        var counter = [
            target,
            timer(where.find("#days"+id), 3, w, h, colorscheme), 
            timer(where.find("#hours" + id), 2, w, h, colorscheme), 
            timer(where.find("#minutes" + id), 2, w, h, colorscheme), 
            timer(where.find("#seconds" + id), 2, w, h, colorscheme),
            where
        ]
        
        counters.push(counter);
        
        updateCounter(counter);
    }
})();

