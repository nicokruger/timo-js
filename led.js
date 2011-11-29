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
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,w,h);
        
        var symbolMap = ledSymbolMapping[num];
        
        _(_.zip(syms, symbolMap)).each(function (s) {
            var symbol = s[0];
            var lit = s[1];
            
            lit == 0 ? ctx.fillStyle = "#ffffff" : ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#aaaaaa";
            
            ctx.beginPath();
            ctx.moveTo(symbol[0][0], symbol[0][1]);
            for (var i = 1; i < symbol.length; i++) {
                ctx.lineTo(symbol[i][0], symbol[i][1]);
            };
            ctx.fill();

            ctx.lineTo(symbol[0][0], symbol[0][1]);
            ctx.stroke();
        
        });
        
    }   
};

// This keeps the mapping from int to which symbols should be lit / not-lit in the LED
//
// We order the symbols as follows:
//   - the 3 horizontal symbols in the LED are 0,1,2
//   - the left vertical symbols are orderered as 3,4 (from the top to bottom)
//   - the right vertical symbols are then 5,6 (again from top to bottom)
var ledSymbolMapping = {
    0: [1, 0, 1, 1, 1, 1, 1],
    1: [0, 0, 0, 0, 0, 1, 1],
    2: [1, 1, 1, 0, 1, 1, 0],
    3: [1, 1, 1, 0, 0, 1, 1],
    4: [0, 1, 0, 1, 0, 1, 1],
    5: [1, 1, 1, 1, 0, 0, 1],
    6: [0, 1, 1, 1, 1, 0, 1],
    7: [1, 0, 0, 0, 0, 1, 1],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 1, 0, 1, 1]
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
    var cl = [margin, h/2.0];
    // center right
    var cr = [w-margin, h/2.0];
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
    
    var verticals = [];
    _([ [tl, cl], [cl, bl], [tr, cr], [cr, br] ]).each(function (vertline) {
        var top = vertline[0], bottom = vertline[1];
        verticals.push([
            top,
            [top[0] + symbolThickness, top[1] + arrowLength],
            [top[0] + symbolThickness, bottom[1] - arrowLength],
            bottom,
            [bottom[0] - symbolThickness, bottom[1] - arrowLength],
            [bottom[0] - symbolThickness, top[1] + arrowLength]
        ]);
    });
    
    return horizontals.concat(verticals);
    //return [topHorizontal, centreHorizontal, bottomHorizontal]; //, topLeftVertical, topRightVertical,
        //bottomLeftVertical, bottomRightVertical];
}