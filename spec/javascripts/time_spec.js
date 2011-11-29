
describe("Time conversion functions", function() {
  
    it("should be possible to get difference between times as a DDD:HH:MM:SS representation", function() {
        
        var d1 = new Date(2012, 12, 1);
        var d2 = new Date(2012, 12, 2);
        expect(convertTime(d1.getTime(), d2.getTime())).toEqual({
            days:"001",
            hours:"00",
            minutes:"00",
            seconds:"00"
        });
        
        d1 = new Date(2011, 12, 1);
        d2 = new Date(2012, 12, 1);
        expect(convertTime(d1.getTime(), d2.getTime())).toEqual({
            days:"366",
            hours:"00",
            minutes:"00",
            seconds:"00"
        });
        
        d1 = new Date(2011, 12, 1, 1);
        d2 = new Date(2012, 12, 1, 2);
        expect(convertTime(d1.getTime(), d2.getTime())).toEqual({
            days:"366",
            hours:"01",
            minutes:"00",
            seconds:"00"
        });
    });

});