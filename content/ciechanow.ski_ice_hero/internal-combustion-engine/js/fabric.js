var canvasAdd = new fabric.Canvas('can')
let colour = '#bc264b'
//FLY-WHEEL

var flytriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 248,
  top: 491,
  angle: 54,
})

var flyline = new fabric.Line([50, 100, 200, 100], {
  left: 122,
  top: 585,
  stroke: colour,
  angle: -35,
  fontSize: 20,
})

var flywheelText = new fabric.Text('Flywheel', {
  top: 450,
  left: 0,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
})

var objs = [flyline, flytriangle]
var alltogetherObj = new fabric.Group(objs, {
  left: 170,
  top: 400,
  angle: 40,
})

//PISTON

var pistonTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 548,
  top: 260,
  angle: 90,
})

var pistonLine = new fabric.Line([50, 100, 200, 100], {
  left: 382,
  top: 265,
  stroke: colour,
  // angle:-35,
  fontSize: 20,
})

var pistonText = new fabric.Text('Piston', {
  top: 288,
  left: 170,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
})

var pisObjs = [pistonLine, pistonTriangle]
var allpistonObj = new fabric.Group(pisObjs, {
  left: 250,
  top: 300,
})

//CRANK-SHAFT

// var crankshaftTriangle = new fabric.Triangle({
//     width: 10,
//     height: 15,
//     fill: colour,
//     left: 530,
//     top: 564,
//     angle: 30
// });

// var crankshaftLine = new fabric.Line([50, 100, 200, 100], {
//     left: 452,
//     top: 710,
//     stroke: colour,
//     angle:-60,
//     fontSize:20
// });

// var crankshaftText = new fabric.Text("Crankshaft", {
//     top:720,
//     left:385,
//     fill:"#c0c0c0",
//     font    var csObjs = [crankshaftLine, crankshaftTriangle];
//     var allcrankshaftObj = new fabric.Group(csObjs,{
//         left:950,
//     })Size:30,
//     // angle:-35,
//     fontFamily:'Quicksand',
//     bold:true
// });

// var csObjs = [crankshaftLine, crankshaftTriangle];
// var allcrankshaftObj = new fabric.Group(csObjs,{
//     left:950,
// })

//SAPRK-PLUGS

var sparkplugTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 380,
  top: 160,
  angle: 105,
})

var sparkplugLine = new fabric.Line([50, 100, 200, 100], {
  left: 220,
  top: 122.5,
  stroke: colour,
  angle: 15,
  fontSize: 20,
})

var sparkplugText = new fabric.Text('Sparkplug', {
  top: 125,
  left: 120,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
})

var spObjs = [sparkplugLine, sparkplugTriangle]
var allsparkplugObj = new fabric.Group(spObjs, {
  top: 150,
  left: 245,
})

//Adding all text and arrows in Canvas
canvasAdd.add(alltogetherObj)
canvasAdd.add(flywheelText)

canvasAdd.add(pistonText)
canvasAdd.add(allpistonObj)

// canvasAdd.add(crankshaftText)
// canvasAdd.add(allcrankshaftObj)

canvasAdd.add(sparkplugText)
canvasAdd.add(allsparkplugObj)
