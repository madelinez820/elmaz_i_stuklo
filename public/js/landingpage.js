// start page of application

function main() {
  	console.log('reached');
  	VF = Vex.Flow;

	// Create an SVG renderer and attach it to the DIV element named "boo".
	var div = document.getElementById("boo")
	var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

	// Size our svg:
	renderer.resize(500, 500);

	// And get a drawing context:
	var context = renderer.getContext();

	// Create a stave at position 10, 40 of width 400 on the canvas.
var stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();
}
main();