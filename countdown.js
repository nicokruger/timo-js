if (typeof(timo) === "undefined") timo = {};

// create a DDD:HH:MM:SS countdown
// where - jquery object
timo.normalCounterType = function (where) {
    var prevContent = $(where).html();
    $(where).html("");
    var counterHolder = $('<div class="timer"></div>').appendTo(where);
    var td = $('<span class="timer-days"></span>').appendTo(counterHolder);
    $(counterHolder).append('<span class="seperator">d</span>');
    var th = $('<span class="timer-hours"></span>').appendTo(counterHolder);
    $(counterHolder).append('<span class="seperator">h</span>');
    var tm = $('<span class="timer-minutes"></span>').appendTo(counterHolder);
    $(counterHolder).append('<span class="seperator">m</span>');
    var ts = $('<span class="timer-seconds"></span>').appendTo(counterHolder);
    return {
        time: $(where).attr("data-eventdate"),
        remove: function() {
            $(counterHolder).remove();
            $(where).html(prevContent);
        },
        update: function(days, hours, minutes, seconds) {
            td.html(timo.pad(days,3));
            th.html(timo.pad(hours,2));
            tm.html(timo.pad(minutes,2));
            ts.html(timo.pad(seconds,2));
        }

    };
};

timo.noCounterType = function (where) {
    var prevContent = $(where).html();
    return {
        time: $(where).attr("data-eventdate"),
        remove: function () {
            $(where).html(prevContent);
        },
        update: function (days, hours,minutes,seconds) {
            var m = moment(parseInt($(where).attr("data-eventdate"), 10));
            $(where).html(m.format("YYYY-MM-DD HH:mm z"));
        }
    };
};

timo.ledCounterType = function (ledTheme) {
    return function (where) {
        var theme = (typeof(ledTheme) !== "undefined") ? ledTheme : timo.ledDefaultColorscheme;
        var prevContent = $(where).html();
        $(where).html("");
        var counterHolder = $('<div class="timer"></div>').appendTo(where);
        var td_div = $('<span class="timer-days"></span>').appendTo(counterHolder);
        $(counterHolder).append('<span class="seperator">d</span>');
        var th_div = $('<span class="timer-hours"></span>').appendTo(counterHolder);
        $(counterHolder).append('<span class="seperator">h</span>');
        var tm_div = $('<span class="timer-minutes"></span>').appendTo(counterHolder);
        $(counterHolder).append('<span class="seperator">m</span>');
        var ts_div = $('<span class="timer-seconds"></span>').appendTo(counterHolder);

        var td = timo.makeled(td_div, 3, theme.width, theme.height, theme);
        var th = timo.makeled(th_div, 2, theme.width, theme.height, theme);
        var tm = timo.makeled(tm_div, 2, theme.width, theme.height, theme);
        var ts = timo.makeled(ts_div, 2, theme.width, theme.height, theme);

        return {
            time: $(where).attr("data-eventdate"),
            remove: function () {
                $(counterHolder).remove();
                $(where).html(prevContent);
            },
            update: function (days, hours, minutes, seconds) {
                td(timo.pad(days,3));
                th(timo.pad(hours,2));
                tm(timo.pad(minutes,2));
                ts(timo.pad(seconds,2));
            }
        };
    };
    
};

timo.counters = function (where, counterType) {
    var defaultCounterType = (typeof(counterType) !== "undefined") ? counterType : timo.normalCounterType;
    var type = defaultCounterType;
    var countdowns = [];

    // helper function to pad numbers with leading "0"
    var pad = function (num, pads) {
        var s = ''+num;
        return s.length == pads ? ''+num : _(_.range(pads - s.length)).map(function() { return "0"; }).join('') + num;
    };
    
    var updateCounter = function(target) {
        // don't do anything if counter is not visible
        //if (!$(counter[5]).is(":visible")) {
        //    return;
        //}
        var now = (new Date()).getTime();
        var c = timo.convertTime(now, parseInt(target, 10));
        // check if timer has expired
        if (target < now) {
            c = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }
        
        return [c.days, c.hours, c.minutes, c.seconds];
    };

    var generate = function () {
        countdowns = _($(where)).map(function (w) {
            return type(w);
        });
        _(countdowns).each(function (countdown) {
            var timeInfo = updateCounter(countdown.time);
            countdown.update(timeInfo[0], timeInfo[1], timeInfo[2], timeInfo[3]);
        });
    };
    generate();
    // the following code is the *single* function that gets called very second
    // and runs through the countdowns and updates them
    setInterval(function () {
        _(countdowns).each(function (t) {
            var timeInfo = updateCounter(t.time);
            t.update(timeInfo[0], timeInfo[1], timeInfo[2], timeInfo[3]);
        });
    }, 1000);
  
    return {
        changeType: function (newType) {
            _(countdowns).each(function (countdown) {
                countdown.remove();
            });
            type = newType;
            generate();
        }
    };
};

timo.pad = function (num, pads) {
    var s = ''+num;
    return s.length == pads ? ''+num : _(_.range(pads - s.length)).map(function() { return "0"; }).join('') + num;
};

timo.convertTime = function (now_millis, then_millis) {
    var DAY = 1000*60*60*24;
    var HOUR = 1000*60*60;
    var MINUTE = 1000*60;
    var SECOND = 1000;
    
    var now = new Date(now_millis);
    var then = new Date(then_millis);
    
    var diff = then.getTime() - now.getTime();
    var days = Math.floor(diff / DAY);
    var hours = Math.floor( (diff - DAY*days) / HOUR );
    var minutes = Math.floor( (diff - DAY*days - hours*HOUR) / MINUTE);
    var seconds = Math.floor( (diff - DAY*days - hours*HOUR - minutes*MINUTE) / SECOND);
    
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
};
