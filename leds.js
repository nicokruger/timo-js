if (typeof(timo) === "undefined") timo = {};

timo.makeled = (function() {
    
    var countdownTimer = 0; // simple counter to uniquely ID LEDs
    
    // where should be a jquery object
    // num - maximum number of characters (numeric)
    // w - width of a character
    // h - height of a character
    return function(where, num, w, h, colorscheme) {
        
        
        var leds = _.range(num).map(function (x) {
            var id = "led" + countdownTimer;
            var canvas = where.append('<canvas id="' + id+ '" width="' + w + '" height="' + h + '"></canvas>');
            countdownTimer += 1;
            
            return timo.led(where.find("#" + id)[0], colorscheme);
            
        });
        
        return function (time) { // time should be a string
                _(_.zip(leds, time.slice(0, time.length))).each(function (x) {
                    var led = x[0];
                    var n = parseInt(x[1], 10);
                    if (!isNaN(n)) led(n);
                });
            };
        };
})();
