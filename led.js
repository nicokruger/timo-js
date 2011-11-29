var led = function(canvas) {

    // ctx will never change - get it once and save it in the closure
    var ctx = canvas.getContext("2d");
    
    return function (num) {
        
        // the canvas could be resized, so we need to retrieve width/height
        // on each char draw
        var w = $(canvas).width();
        var h = $(canvas).height();

        var syms = makeLedSymbols(w,h);
        
        // Clear
        ctx.fillStyle = "#0000ff";
        ctx.fillRect(0,0,w,h);
        
        _(syms).each(function (symbol) {
            
            ctx.strokeStyle = "#ff0000";
            ctx.fillStyle = "#00ff00";
            ctx.beginPath();
            ctx.moveTo(symbol[0][0], symbol[0][1]);
            
            for (var i = 1; i < symbol.length; i++) {
                ctx.lineTo(symbol[i][0], symbol[i][1]);
            };
        
            ctx.fill();
            ctx.stroke();
        
        });
        
    }   
};

var makeLedSymbols = function (w, h) {
    // this should actually be related to w,h, hardcoded for now
    var margin = 4;
    // "thickness" of a symbol in the LED
    var symbolThickness = 3;
    // "length" of "arrow" (the triangular end of the LED symbol)
    var arrowLength = 3;
    
    // we need to get 6 points
    // top left
    var tl = [margin,margin];
    // top right
    var tr = [w-margin,margin];
    // center left
    var cl = [margin, h/2.0 - margin];
    // center right
    var cr = [w-margin, h/2.0 - margin];
    // bottom left
    var bl = [margin, h-margin];
    // bottom right
    var br = [w-margin,h-margin];
    
    var horizontals = [];
    _([ [tl, tr], [cl,cr], [bl, br] ]).each(function (horline) {
        var left = horline[0], right = horline[1];
        horizontals.push([
            left, 
            [left[0] + arrowLength, left[1] - symbolThickness],
            [right[0] - arrowLength, left[1] - symbolThickness],
            right,
            [right[0] - arrowLength, left[1] + symbolThickness],
            [left[0] + arrowLength, left[1] + symbolThickness]
        ]);
    });
    
    // the topLeft vertical symbol
    var topLeftVertical = [
    ];
    
    var topRightVertical = [
    ];
    
    var bottomLeftVertical = [
    ];
    
    var bottomRightVertical = [
    ];
    
    return horizontals;
    //return [topHorizontal, centreHorizontal, bottomHorizontal]; //, topLeftVertical, topRightVertical,
        //bottomLeftVertical, bottomRightVertical];
}