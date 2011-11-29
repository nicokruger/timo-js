JS/HTML LED
-----------

Project for LED display of numbers in Javascript.

Current implementation uses HTML 5's canvas element to draw.

Future work
----------
- Make it work on non-HTML 5 browsers. Can investigate SVG here perhaps,
  or maybe even try to do it with table cells (screw the purists). It
  is important that it works on older browsers, so this is something
  to look at.

Running
-------
If you have python < 3, just run:

    python -m SimpleHTTPServer

For python 3, do:

    python -m http.server

In the main directory and then go to http://localhost:8000, and click the button.

