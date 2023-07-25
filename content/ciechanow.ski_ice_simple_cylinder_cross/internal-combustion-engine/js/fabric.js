var canvasAdd = new fabric.Canvas('can')
let colour = '#bc264b'

//fueloutlet

var fueloutletTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 315,
  top: 260,
  angle: 90,
})

var fueloutletLine = new fabric.Line([50, 80, 170, 80], {
  left: 182,
  top: 265,
  stroke: colour,
  // angle:-35,
  fontSize: 20,
})

var fueloutletText = new fabric.Text('Outlet Chamber', {
  top: 135,
  left: 810,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
})

var pisObjs = [fueloutletLine, fueloutletTriangle]
var allfueloutletObj = new fabric.Group(pisObjs, {
  top: 160,
  left: 800,
  angle: 180,
})

//CCOMBUSTION-CHAMBER

var combustionchamberTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 530,
  top: 564,
  angle: 55,
})

var combustionchamberLine = new fabric.Line([50, 100, 200, 100], {
  left: 395,
  top: 662.5,
  stroke: colour,
  angle: -35,
  fontSize: 20,
})

var combustionchamberText = new fabric.Text('Combustion Chamber', {
  top: 730,
  left: 60,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
  fontFamily: 'Quicksand',
  bold: true,
})

var ccObjs = [combustionchamberLine, combustionchamberTriangle]
var allcombustionchamberObj = new fabric.Group(ccObjs, {
  left: 300,
  angle: 25,
  top: 650,
})

//Fuel-Inlet

var fuelinletTriangle = new fabric.Triangle({
  width: 10,
  height: 15,
  fill: colour,
  left: 400,
  top: 117,
  angle: 90,
})

var fuelinletLine = new fabric.Line([50, 100, 165, 100], {
  left: 280,
  top: 122.5,
  stroke: colour,
  // angle:15,
  fontSize: 20,
})

var fuelinletText = new fabric.Text('Inlet Chamber', {
  top: 135,
  left: 0,
  fill: '#c0c0c0',
  fontSize: 30,
  // angle:-35,
})

var fiObjs = [fuelinletLine, fuelinletTriangle]
var allfuelinletObj = new fabric.Group(fiObjs, {
  top: 155,
  left: 150,
})

//Adding all text and arrows in Canvas

canvasAdd.add(fueloutletText)
canvasAdd.add(allfueloutletObj)

canvasAdd.add(combustionchamberText)
canvasAdd.add(allcombustionchamberObj)

canvasAdd.add(fuelinletText)
canvasAdd.add(allfuelinletObj)
