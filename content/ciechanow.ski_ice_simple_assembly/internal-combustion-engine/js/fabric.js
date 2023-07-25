var canvasAdd = new fabric.Canvas('can')
let colour = '#bc264b'

//ConnectingRod

var connectingRodTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 315,
  top: 260,
  angle: 90,
})

var connectingRodLine = new fabric.Line([50, 80, 170, 80], {
  left: 182,
  top: 265,
  stroke: colour,
  // angle:-35,
  fontSize: 20,
})

var connectingRodText = new fabric.Text('Connecting Rod', {
  top: 275,
  left: 1200,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
})

var pisObjs = [connectingRodLine, connectingRodTriangle]
var allconnectingRodObj = new fabric.Group(pisObjs, {
  top: 300,
  left: 1400,
  angle: 0,
})

//COMBUSTION-CHAMBER

var crankTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 530,
  top: 564,
  angle: 90,
})

var crankLine = new fabric.Line([50, 100, 170, 100], {
  left: 398,
  top: 569,
  stroke: colour,
  // angle:-35,
  fontSize: 20,
})

var crankText = new fabric.Text('Crank', {
  top: 370,
  left: 1360,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
  fontFamily: 'Quicksand',
  bold: true,
})

var cObjs = [crankLine, crankTriangle]
var allcrankObj = new fabric.Group(cObjs, {
  // angle:25,
  top: 390,
  left: 1460,
  angle: 10,
})

//Piston

var pistonTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 400,
  top: 117,
  angle: 90,
})

var pistonLine = new fabric.Line([50, 100, 165, 100], {
  left: 280,
  top: 122.5,
  stroke: colour,
  // angle:15,
  fontSize: 20,
})

var pistonText = new fabric.Text('Piston Head', {
  top: 120,
  left: 1100,
  fill: '#c0c0c0',
  fontSize: 30,
})

var pObjs = [pistonLine, pistonTriangle]
var allpistonObj = new fabric.Group(pObjs, {
  top: 135,
  left: 1275,
})

//Adding all text and arrows in Canvas

canvasAdd.add(connectingRodText)
canvasAdd.add(allconnectingRodObj)

canvasAdd.add(crankText)
canvasAdd.add(allcrankObj)

canvasAdd.add(pistonText)
canvasAdd.add(allpistonObj)
