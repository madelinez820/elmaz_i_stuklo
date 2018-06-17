function main() {

const VF = Vex.Flow;
// Create an SVG renderer and attach it to the DIV element named "boo".
//TODO: hardcoded
var vf = new VF.Factory({renderer: {elementId: 'boo', height: 900, width: 1600 }}); // if not width / tall enough will cut off measures rendered below
var score = vf.EasyScore();

var registry = new VF.Registry(); // this deals with ties
VF.Registry.enableDefaultRegistry(registry);
function id(id) { return registry.getElementById(id); }

var totalNumBars = 0;
var row = 1;
var column = 0;

function makeSystem(numBarsInRow = 3) {
	totalNumBars += 1;
	if ((column + 1) > numBarsInRow){ // starting new row
		 column = 1;
		 row += 1;
	}
	else{
		column += 1;
	}
	
	var width = 1200 / numBarsInRow; // TODO: 1200 is hardcoded
	var height = 300; // TODO: hardcoded

	var x = 30 + (column - 1) * width; // how far is it from top left corner
	var y = 80 + (row - 1) * height; 
	var space = 15;
    var system = vf.System({ x: x, y: y, width: width, spaceBetweenStaves: space});

    return system;
}
function moreSetup (system, topLine, bottomLine, endSection = false){
	system.addConnector("singleRight");
	if (column == 1){ // first measure in row, add clef signs and time
		topLine.addClef('treble');
		bottomLine.addClef('bass');
		system.addConnector("brace");
		system.addConnector("singleLeft");
	}
	if (endSection) {
		// TODO: make the doublebarline here
	}
	if (totalNumBars == 1) { // add tempo marking to first bar
		topLine.setTempo({ name: 'Andante', duration: 'q', dots: 0, bpm: 87 }, -30).addTimeSignature('4/4');;
		bottomLine.addTimeSignature('4/4');
	}
}



/** =========================rendering all the measures here ==============================**/
/* Measure1 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('F5/q., A4/8, E5/8, A4/q, A4/8')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(D3 F3 A3 D4)/h, (A2 C3 E3 G3)/h', {clef: 'bass', stem: 'down'}))
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure2 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('D5/8, C5/8, Bb4/8, A4/8,C5/h')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(Bb2 D3 F3 Bb3)/h, (F2 A2 C3)/h', {clef: 'bass'}))
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure3 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('(C4 E4 G4)/q, E4, F4, G4')),
    score.voice(score.notes('C4/q., E4/q., A5/q')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(G2 Bb2 D3 G3)/h, (F2 A2 C3 F3)/h', {clef: 'bass'}))
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure4 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('(C4 E4 G4)/q, E4, F4, G4')),
    score.voice(score.notes('C4/q., E4/q., A5/q')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    // score.voice(score.notes('(F2 A2 C3 F3)/8, C3/16/r, (F2 A2 C3 F3)/8, C3/16/r, (A2 E3 G3 A3)/8[id="m4a"], (A2 E3 G3 A3)/h[id="m4b"]', {clef: 'bass'}))
  score.voice(score.notes('(F2 A2 C3 F3)/8, C3/16/r, (F2 A2 C3 F3)/8, C3/16/r, (A2 E3 G3 A3)/8[id="m4a"], (A2 E3 G3 A3)/h[id="m4b"]', {clef: 'bass'}))
  ]
});
registry["index"]["id"]["m4a"]["m4a"]["keys"] = ["A/3"];
vf.StaveTie({ from: id('m4a'), to: id('m4b') });
moreSetup(system, topLine, bottomLine);

vf.draw();


}
main();

//http://public.vexflow.com/build/vexflow-tests.js
//https://github.com/0xfe/vexflow/issues/471


/** ODO:
-unharcode things (resize dynamically)
- ties on chords
**/