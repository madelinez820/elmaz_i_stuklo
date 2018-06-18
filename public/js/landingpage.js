function main() {

const VF = Vex.Flow;
// Create an SVG renderer and attach it to the DIV element named "boo".
//TODO: hardcoded
var vf = new VF.Factory({renderer: {elementId: 'boo', height: 1800, width: 1600 }}); // if not width / tall enough will cut off measures rendered below
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
		system.addConnector('boldDoubleRight');
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
  	score.voice( score.notes('')
        .concat(score.beam(score.notes('D5/8, C5/8, Bb4/8, A4,C5/h',{stem: 'down'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(Bb2 D3 F3 Bb3)/h, (F2 A2 C3)/h', {clef: 'bass'})),
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure3 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/8/r')
    	.concat(score.beam(score.notes('D5/8, C5, Bb4')))
    	.concat(score.beam(score.notes('A4, G4, F4, G4')))
    )
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
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('A4/8[id="m4c"], C5/16, A4/8, G#4/16, A4/8[id="m4d"], A4/h[id="m4e"]',{stem: 'up'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
  score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, D3/16/r, (A2 E3 G3 A3)/8[id="m4a"], (A2 E3 G3 A3)/h[id="m4b"]', {clef: 'bass'}))
  ]
});
var grace = vf.GraceNote({ keys: ['G/4'], duration: '8', slash: true });
id('m4c').addModifier(0, vf.GraceNoteGroup({ notes: [grace] }));
// registry["index"]["id"]["m4a"]["m4a"]["keys"] = ["A/3"]; // tie doesn't work
vf.StaveTie({ from: id('m4a'), to: id('m4b') });
vf.StaveTie({ from: grace, to: id('m4c') });
vf.StaveTie({ from: id('m4d'), to: id('m4e') })
moreSetup(system, topLine, bottomLine);

/* Measure5 */
var system = makeSystem();
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


/* Measure6 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
  	score.voice( score.notes('')
        .concat(score.beam(score.notes('D5/8, C5/8, Bb4/8, A4', {stem: 'down'})))
        .concat(score.notes('A4/8[id="m6a"], C5/q.[id="m6b"]',{stem: 'down'}))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(Bb2 D3 F3 Bb3)/h, (F2 A2 C3 F3)/h', {clef: 'bass'})),
  ]
});
vf.StaveTie({ from: id('m6a'), to: id('m6b') })
moreSetup(system, topLine, bottomLine);

/* Measure7 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/8/r')
    	.concat(score.beam(score.notes('D5/8, C5, Bb4')))
    	.concat(score.beam(score.notes('A4, G4, F4, G4')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(G2 Bb2 D3 G3)/h, (F2 A2 C3 F3)/h', {clef: 'bass'}))
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure8 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('A4/8[id="m8c"], C5/16, A4/8, G#4/16, A4/8[id="m8d"], A4/h[id="m8e"]',{stem: 'up'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
  	score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, (E2 E3)/16, (A2 E3 G3 A3)/q', {clef: 'bass'})
  		.concat(score.beam(score.notes('A2/8, B2/8, C#3/8',{clef: 'bass'}),))
  	)
  ]
});
var grace = vf.GraceNote({ keys: ['G/4'], duration: '8', slash: true });
id('m8c').addModifier(0, vf.GraceNoteGroup({ notes: [grace] }));
vf.StaveTie({ from: grace, to: id('m8c') });
moreSetup(system, topLine, bottomLine);


/* Measure9 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('F5/8, A4/q, A4/8, E5/8, A4/q, A4/8')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('D3/8/r, D3/8, (F3 A3 D4)/q, D3/8/r, A2/8, (C3 E3 G3)/q', {clef: 'bass'})),
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure10 */
var system = makeSystem();
var topLine = system.addStave({
	  voices: [
	  	score.voice( score.notes('')
	        .concat(score.beam(score.notes('D5/8, C5/8, Bb4/8, A4', {stem: 'down'})))
	        .concat(score.notes('C5/h',{stem: 'down'}))
	    )
	  ]
	});
var bottomLine = system.addStave({
	  voices: [
	    score.voice(score.notes('D3/8/r, Bb2/8, (D3 F3 Bb3)/q, D3/8/r, F2/8, (A2 C3 F3)/q', {clef: 'bass'})),
	  ]
	});
moreSetup(system, topLine, bottomLine);

/* Measure11 */
var system = makeSystem();
var topLine = system.addStave({
	voices: [
	    score.voice(score.notes('B4/8/r')
	    	.concat(score.beam(score.notes('D5/8, C5, Bb4')))
	    	.concat(score.beam(score.notes('A4, G4, F4, G4')))
	    )
	  ]
	});
var bottomLine = system.addStave({
	  voices: [
	    score.voice(score.notes('G2/8, D3/8/r, (Bb2 D3 G3)/q, (F2 A2 C3 F3)/q, D3/q/r', {clef: 'bass'}))
	  ]
	});
moreSetup(system, topLine, bottomLine);

/* Measure12 */
var system = makeSystem();
var topLine = system.addStave({
	  voices: [
	    score.voice(score.notes('')
	    	.concat(score.beam(score.notes('A4/8, C5/16, A4/8, G#4/16, A4/8[id="m12a"], A4/h[id="m12b"]',{stem: 'up'})))
	    )
	  ]
	});
var bottomLine = system.addStave({
	voices: [
	  score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, D3/16/r, (A2 E3 G3 A3)/8[id="m12a"], (A2 E3 G3 A3)/h[id="m12b"]', {clef: 'bass'}))
	  ]
	});
vf.StaveTie({ from: id('m12a'), to: id('m12b') });
moreSetup(system, topLine, bottomLine);

/* Measure13 */
var system = makeSystem();
var topLine = system.addStave({
	  voices: [
	    score.voice(score.notes('')
	    	.concat(score.beam(score.notes('A4/8, A4/16, C5/8, C5/16, G#4/8, A4/h',{stem: 'up'})))
	    )
	  ]
	});
var bottomLine = system.addStave({
	voices: [
	  score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, D3/16/r, (A2 E3 G3 A3)/q,', {clef: 'bass'})
	  	.concat(score.beam(score.notes('E2/8, A2/8, Bb2/8',{clef: 'bass'})))
	  )	
	  ]
	});
moreSetup(system, topLine, bottomLine, true);


vf.draw(); // renders everything
}
main();



/** TODO:
-unharcode things (resize dynamically)
- ties on chords
- glissando / arpeggiated chords: https://github.com/0xfe/vexflow/issues/83, https://github.com/0xfe/vexflow/issues/29
**/

//reference:
//http://public.vexflow.com/build/vexflow-tests.js
//https://github.com/0xfe/vexflow/issues/471
//http://public.vexflow.com/build/vexflow-tests.js