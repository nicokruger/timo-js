var led = function(canvas) {

    // ctx will never change - get it once and save it in the closure
    var ctx = canvas.getContext("2d");
    
    // this should actually be related to w,h
    var margin = 4;
    
    // "thickness" of a symbol in the LED
    var symbolThickness = 3;
    // "length" of "arrow" (the triangular end of the LED symbol)
    var arrowLength = 3;
    
    return function (num) {
        
        // the canvas could be resized, so we need to retrieve width/height
        // on each char draw
        var w = $(canvas).width();
        var h = $(canvas).height();
        
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
        
        // Clear
        ctx.fillStyle = "#0000ff";
        ctx.fillRect(0,0,w,h);
        
        var symbol = [ 
            tl, 
            [tl[0] + arrowLength, tl[1] - symbolThickness],
            [tr[0] - arrowLength, tl[1] - symbolThickness],
            tr,
            [tr[0] - arrowLength, tl[1] + symbolThickness],
            [tl[0] + arrowLength, tl[1] + symbolThickness]
            ];
            
        ctx.strokeStyle = "#ff0000";
        ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.moveTo(symbol[0][0], symbol[0][1]);
        for (var i = 1; i < symbol.length; i++) {
            ctx.lineTo(symbol[i][0], symbol[i][1]);
        };
        ctx.fill();
        ctx.stroke();
        
    }
    
};
