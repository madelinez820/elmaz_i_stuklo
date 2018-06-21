function main() {



const VF = Vex.Flow;

var width = document.getElementById("musicbody").offsetWidth; // width of div
var vf = new VF.Factory({renderer: {elementId: 'musicbody', height: 5000, width: width }}); // if not width / tall enough will cut off measures rendered below
var score = vf.EasyScore();

var registry = new VF.Registry(); // this deals with ties
VF.Registry.enableDefaultRegistry(registry);
function id(id) { return registry.getElementById(id); }

var totalNumBars = 0;
var endofCurrentLine = 0;
var row = 1;
var column = 0;
var currentNumBarsInRow;
var lyricCount = 1;

function makeSystem(numBarsInRow = 3) {
	totalNumBars += 1;
	if (totalNumBars == 1){
		currentNumBarsInRow = numBarsInRow;
	}
	column += 1;
	if (column > currentNumBarsInRow){ // starting new row
		currentNumBarsInRow = numBarsInRow;
		column = 1;
		row += 1;
	}

	var widthBar = 1160 / numBarsInRow; 
	var heightBar = 300; 

	var x = 30 + (column - 1) * widthBar; // how far is it from top left corner
	var y = 80 + (row - 1) * heightBar; 
	var space = 15;
    var system = vf.System({ x: x, y: y, width: widthBar, spaceBetweenStaves: space});

    return system;
}
function moreSetup (system, topLine, bottomLine, endSection = false, endPiece = false){
	system.addConnector("singleRight");
	if (column == 1){ // first measure in row, add clef signs and time
		topLine.addClef('treble');
		bottomLine.addClef('bass');
		system.addConnector("brace");
		system.addConnector("singleLeft");
	}
	if (endSection) {
		system.addConnector(7);
	}
	if (endPiece){
		system.addConnector('boldDoubleRight');
	}
	if (totalNumBars == 1) { // add tempo marking to first bar
		topLine.setTempo({ duration: 'q', dots: 0, bpm: 87 }, -30).addTimeSignature('4/4');;
		bottomLine.addTimeSignature('4/4');
	}
}

function addLyricLine(lyric){
	var heightBar = 300; 
	var lyricLine = document.createElement("div");
	lyricLine.innerHTML = lyric;
	document.body.appendChild(lyricLine);
	lyricLine.style.position = "absolute";
	lyricLine.style.left = "120px";
	lyricLine.style.fontWeight = 550;

	var height = 40 + heightBar * lyricCount;
	lyricLine.style.top = height + "px";
	lyricCount += 1;

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
  	score.voice( score.notes('D5/8')
        .concat(score.beam(score.notes('C5/8, Bb4/8',{stem: 'down'})))
        .concat(score.notes('A4,C5/h'))
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
    score.voice(score.notes('B4/8/r,D5/8')
    	.concat(score.beam(score.notes('C5, Bb4')))
    	.concat(score.beam(score.notes('A4, G4')))
    	.concat(score.beam(score.notes('F4, G4')))
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
    	.concat(score.beam(score.notes('A4/8[id="m4c"], C5/16, A4/8, G#4/16, A4/8[id="m4d"]',{stem: 'up'})))
    	.concat(score.notes('A4/h[id="m4e"]'))
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
vf.StaveTie({ from: id('m4a'), to: id('m4b') });
vf.StaveTie({ from: grace, to: id('m4c') });
vf.StaveTie({ from: id('m4d'), to: id('m4e') });
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
    score.voice(score.notes('(D3 F3 A3 D4)/h[id="m5a"], (A2 C3 E3 G3)/h[id="m5b"]', {clef: 'bass', stem: 'down'}))
  ]
});
var stroke1 = new VF.Stroke(3);
id('m5a').addStroke(0, stroke1);
var stroke2 = new VF.Stroke(3);
id('m5b').addStroke(0, stroke2);
moreSetup(system, topLine, bottomLine);


/* Measure6 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
  	score.voice( score.notes('D5/8')
        .concat(score.beam(score.notes('C5/8, Bb4/8', {stem: 'down'})))
        .concat(score.notes('A4'))
        .concat(score.notes('A4/8[id="m6a"], C5/q.[id="m6b"]',{stem: 'down'}))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(Bb2 D3 F3 Bb3)/h[id="m6c"], (F2 A2 C3 F3)/h[id="m6d"]', {clef: 'bass'})),
  ]
});
vf.StaveTie({ from: id('m6a'), to: id('m6b') });
var stroke3 = new VF.Stroke(3);
id('m6c').addStroke(0, stroke3);
var stroke4 = new VF.Stroke(3);
id('m6d').addStroke(0, stroke4);
moreSetup(system, topLine, bottomLine);

/* Measure7 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/8/r, D5/8')
    	.concat(score.beam(score.notes('C5, Bb4')))
    	.concat(score.beam(score.notes('A4, G4, F4, G4')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(G2 Bb2 D3 G3)/h[id="m7a"], (F2 A2 C3 F3)/h[id="m7b"]', {clef: 'bass'}))
  ]
});
var stroke5 = new VF.Stroke(3);
id('m7a').addStroke(0, stroke5);
var stroke6 = new VF.Stroke(3);
id('m7b').addStroke(0, stroke6);
moreSetup(system, topLine, bottomLine);

/* Measure8 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('A4/8[id="m8c"], C5/16, A4/8, G#4/16, A4/8[id="m8d"]',{stem: 'up'})))
    	.concat(score.notes('A4/h[id="m8e"]'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
  	score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, (E2 E3)/16, (A2 E3 G3 A3)/q, A2/8', {clef: 'bass'})
  		.concat(score.beam(score.notes('B2/8, C#3/8',{clef: 'bass'}),))
  	)
  ]
});
var grace = vf.GraceNote({ keys: ['G/4'], duration: '8', slash: true });
id('m8c').addModifier(0, vf.GraceNoteGroup({ notes: [grace] }));
vf.StaveTie({ from: grace, to: id('m8c') });
vf.StaveTie({ from: id('m8d'), to: id('m8e') });
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
  	score.voice( score.notes('D5/8')
        .concat(score.beam(score.notes('C5/8, Bb4/8',{stem: 'down'})))
        .concat(score.notes('A4,C5/h'))
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
	  score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, D3/16/r, (A2 E3 G3 A3)/8[id="m12c"], (A2 E3 G3 A3)/h[id="m12d"]', {clef: 'bass'}))
	  ]
	});
vf.StaveTie({ from: id('m12a'), to: id('m12b') });
vf.StaveTie({ from: id('m12c'), to: id('m12d') });
moreSetup(system, topLine, bottomLine);

/* Measure13 */
var system = makeSystem();
var topLine = system.addStave({
	  voices: [
	    score.voice(score.notes('')
	    	.concat(score.beam(score.notes('A4/8, A4/16, C5/8, C5/16, G#4/8',{stem: 'up'})))
	    	.concat(score.notes('A4/h'))
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

/* Measure14 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/q/r, Bb4/q, G4/q,')
    	.concat(score.beam(score.notes('G4/8, Bb4/8',{stem: 'up'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, G3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, G3',{clef: 'bass'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure15 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('D5/8, C5')))
    	.concat(score.beam(score.notes('C5, Bb4')))
    	.concat(score.notes('C5/h'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('E3/8, G3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('E3/8, G3',{clef: 'bass'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure16 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/q/r, Bb4/q, G4/q,')
    	.concat(score.beam(score.notes('G4/8, Bb4/8',{stem: 'up'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, G3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, G3',{clef: 'bass'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure17 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('D5/8, C5, C5, Bb4')))
    	.concat(score.notes('C5/h'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('E3/8, G3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('E3/8, G3',{clef: 'bass'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure18 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/q/r, Bb4/q, G4/q, B4/q/r'))
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, G3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, G3',{clef: 'bass'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure19 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('D5/8, C5, C5, Bb4')))
    	.concat(score.notes('C5/h'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('C3/8, E3',{clef: 'bass', stem:'down'})))
    	.concat(score.beam(score.notes('G3/8, Bb3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('C3/8, E3',{clef: 'bass', stem:'down'})))
    	.concat(score.beam(score.notes('G3/8, Bb3',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure20 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('D5/8[id="m20c"], F5/16, D5/8, C#5/16, D5/8[id="m20d"]')))
    	.concat(score.notes('D5/h[id="m20e"]'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
  score.voice(score.notes('(D3 F3 A3 D4)/8, D3/16/r, (D3 F3 A3 D4)/8, D3/16/r, (D3 F#3 A3 C4 D4)/8[id="m20a"], (D3 F#3 A3 C4 D4)/h[id="m20b"]', {clef: 'bass'}))
  ]
});
var grace = vf.GraceNote({ keys: ['C/5'], duration: '8', slash: true });
id('m20c').addModifier(0, vf.GraceNoteGroup({ notes: [grace] }));
vf.StaveTie({ from: id('m20a'), to: id('m20b') });
vf.StaveTie({ from: grace, to: id('m20c') });
vf.StaveTie({ from: id('m20d'), to: id('m20e') })
moreSetup(system, topLine, bottomLine);

/* Measure21 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('Eb5/q., D5/8[id="m21a"], D5/h[id="m21b"]')),
  ]
});
var bottomLine = system.addStave({
  voices: [
  	score.voice(score.notes('(D3 F#3 A3 C4)/8, D3/16/r, (D3 F3 A3 C4)/8, D3/16/r, (D3 F#3 A3 C4 D4)/q, C#3/8', {clef: 'bass'})
  		.concat(score.beam(score.notes('D3/8, E3/8',{clef: 'bass'}),))
  	)
  ]
});
vf.StaveTie({ from: id('m21a'), to: id('m21b') });
moreSetup(system, topLine, bottomLine, true);

/* Measure22 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('(D5 F5)/q., A4/8')
    	.concat(score.beam(score.notes('(C5 E5)/8, A4/8',{stem:'down'})))
    	.concat(score.beam(score.notes('A4/8, A4/8')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('D3/8, F3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(A3 D4)/8, F3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('A2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(E3 A3)/8, C3',{clef: 'bass', stem: 'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure23 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
  	score.voice( score.notes('(Bb4 D5)/8')
        .concat(score.beam(score.notes('C5/8, Bb4/8',{stem: 'down'})))
        .concat(score.notes('A4/8'))
  		.concat(score.notes('(F4 A4 C5)/h'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('Bb2/8, D3',{clef: 'bass', stem: 'up'})))
    	.concat(score.beam(score.notes('(F3 Bb3)/8, D3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('F2/8, A2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 F3)/8, A2',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure24 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/q/r')
    	.concat(score.beam(score.notes('Bb4/8, B4')))
    	.concat(score.beam(score.notes('A4, G4, F4, G4')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(D3 G3)/8, Bb2',{clef: 'bass', stem:'down'})))
    	.concat(score.beam(score.notes('F2/8, A2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 F3)/8, A2',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure25 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('A4/8[id="m25c"], C5/16, A4/8, G#4/16, A4/8[id="m25d"], A4/q.[id="m25e"]',{stem: 'up'})))
    	.concat(score.notes('A4/8'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
  	score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, (E2 E3)/16, (A2 E3 G3 A3)/q, A2/8', {clef: 'bass'})
  		.concat(score.beam(score.notes('B2/8, C#3/8',{clef: 'bass'}),))
  	)
  ]
});
var grace = vf.GraceNote({ keys: ['G/4'], duration: '8', slash: true });
id('m25c').addModifier(0, vf.GraceNoteGroup({ notes: [grace] }));
vf.StaveTie({ from: grace, to: id('m25c') });
vf.StaveTie({ from: id('m25d'), to: id('m25e') })
moreSetup(system, topLine, bottomLine);

/* Measure26 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
  	score.voice(score.notes('(A4 D5 F5)/h, E5/8',{stem: 'down'})
  		.concat(score.beam(score.notes('A4/8, A4')))
  		.concat(score.notes('A4/8'))
  	)
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('D3/8, A3/16, F3/16',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D4/16, A3/16, F3/16, A3/16',{clef: 'bass'})))
    	.concat(score.beam(score.notes('A2/8, E3/16, C3/16',{clef: 'bass',stem:'up'})))
    	.concat(score.beam(score.notes('A3/16, E3/16, C3/16, E3/16',{clef: 'bass',stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure27 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
  	score.voice( score.notes('')
        .concat(score.beam(score.notes('D5/8, C5/8, Bb4/8, A4',{stem: 'down'})))
        .concat(score.notes('A4/8, C5/8[id="m27a"], C5/q[id="m27b"'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('Bb2/8, F3/16, D3/16',{clef: 'bass', stem:'down'})))
    	.concat(score.beam(score.notes('Bb3/16, F3/16, D3/16, F3/16',{clef: 'bass'})))
    	.concat(score.beam(score.notes('F2/8, C3/16, A2/16',{clef: 'bass',stem:'up'})))
    	.concat(score.beam(score.notes('F3/16, C3/16, A2/16, C3/16',{clef: 'bass',stem:'down'})))
    )
  ]
});
vf.StaveTie({ from: id('m27a'), to: id('m27b') });
moreSetup(system, topLine, bottomLine);

/* Measure28 */
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
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(D3 G3)/8, Bb2',{clef: 'bass', stem:'down'})))
    	.concat(score.beam(score.notes('F2/8, A2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 F3)/8, A2',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure29 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('A4/8, C5/16, A4/8', {stem:'up'})))
    	.concat(score.beam(score.notes('G#4/16, A4/8[id="m29a"]',{stem: 'up'})))
    	.concat(score.notes('A4/h[id="m29b"]'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
  score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8',{clef: 'bass'})
  	.concat(score.beam(score.notes('(E2 E3)/16, (A2 E3 G3 A3)/8[id="m29c"]',{clef: 'bass', stem:'down'})))
  	.concat(score.notes('(A2 E3 G3 A3)/h[id="m29d"]', {clef: 'bass'}))
  )
  ]
});
vf.StaveTie({ from: id('m29a'), to: id('m29b') });
vf.StaveTie({ from: id('m29c'), to: id('m29d') });
moreSetup(system, topLine, bottomLine);

/* Measure30 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('A4/8[id="m30a"], A4/16, C5/8',{stem:'up'})))
    	.concat(score.beam(score.notes('C5/16, G#4/8',{stem: 'up'})))
    	.concat(score.notes('A4/h'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
	  score.voice(score.notes('(F2 A2 C3 F3)/8, D3/16/r, (F2 A2 C3 F3)/8, D3/16/r, (A2 E3 G3 A3)/q, E2/8', {clef: 'bass'})
	  	.concat(score.beam(score.notes('A2/8, Bb2', {clef: 'bass'})))
	  )
  ]
});
var grace = vf.GraceNote({ keys: ['G/4'], duration: '8', slash: true });
id('m30a').addModifier(0, vf.GraceNoteGroup({ notes: [grace] }));
vf.StaveTie({ from: grace, to: id('m30a') });
moreSetup(system, topLine, bottomLine, true);

// /* Measure31 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/q/r, Bb4/q, G4/q,')
    	.concat(score.beam(score.notes('G4/8, Bb4/8',{stem: 'up'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, Bb2',{clef: 'bass', stem:'up'})))
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, Bb2',{clef: 'bass', stem:'up'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure32 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('D5/8, C5')))
    	.concat(score.beam(score.notes('C5, Bb4')))
    	.concat(score.notes('C5/h'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('E2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('C3/8, G2',{clef: 'bass', stem:'up'})))
    	.concat(score.beam(score.notes('Eb2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('C3/8, G2',{clef: 'bass', stem:'up'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure33 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('B4/q/r, Bb4/q')
    	.concat(score.beam(score.notes('G4/8, G4')))
    	.concat(score.beam(score.notes('G4/8, G4',{stem: 'up'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, Bb2',{clef: 'bass', stem:'up'})))
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('D3/8, Bb2',{clef: 'bass', stem:'up'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure34 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('D5/q')
    	.concat(score.beam(score.notes('C5, Bb4')))
    	.concat(score.notes('C5/h'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('E2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('C3/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('C3/8, E3',{clef: 'bass',stem:'down'})))
    	.concat(score.beam(score.notes('G3/8, C4',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure35 */
var system = makeSystem(4);
var topLine = system.addStave({
	voices: [
	    score.voice(score.notes('')
	    	.concat(score.beam(score.notes('Eb5/8, D5')))
	    	.concat(score.beam(score.notes('C5/8, Bb4/8')))
	    	.concat(score.beam(score.notes('A4/8, A4/8')))
	    	.concat(score.beam(score.notes('Bb4/8, C5')))
	    )
	  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(C3 Eb3 G3 C4)/w[id="m35a"]', {clef: 'bass'})),
  ]
});
var stroke7 = new VF.Stroke(3);
id('m35a').addStroke(0, stroke7);
moreSetup(system, topLine, bottomLine);

// /* Measure36 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('A4/q, A4/q, C5/h[id="m36a"]')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(D3 F#3 A3 C4)/h, (D3 F#3 A3 C4)/8, (D3 F#3 A3 C4)/8, (D3 F#3 A3 C4)/8, (D3 F#3 A3 C4)/8', {clef: 'bass'}))
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure37 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('D5/h.[id="m37a"]')
    	.concat(score.beam(score.notes('G4/8, A4/8')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(D3 F#3 A3 D4)/h., F3/q/r', {clef: 'bass'})),
  ]
});
vf.StaveTie({ from: id('m36a'), to: id('m37a') });
moreSetup(system, topLine, bottomLine,true);

// /* Measure38 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('Bb4/q., C5/8, C5/h')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(D3 G3)/8, Bb2',{clef: 'bass',stem:'down'})))
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(E3 G3)/8, C3',{clef: 'bass',stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure39 */
var system = makeSystem();
var topLine = system.addStave({
	voices: [
	    score.voice(score.notes('')
	    	.concat(score.beam(score.notes('C5/8, B4/8')))
	    	.concat(score.beam(score.notes('C5/8, D5/8')))
	    	.concat(score.beam(score.notes('C5/8, B4')))
	    	.concat(score.beam(score.notes('G4/8, A4')))
	    )
	  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('E2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 E3)/8, G2',{clef: 'bass', stem:'up'})))
    	.concat(score.beam(score.notes('Eb2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 Eb3)/8, G2',{clef: 'bass', stem:'up'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure40 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('Bb4/q., C5/8, C5/q.')
    .concat(score.beam(score.notes('C5/16, Bb4/16'))) 
    )
  ]
});
var bottomLine = system.addStave({
voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(D3 G3)/8, Bb2',{clef: 'bass', stem:'down'})))
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(E3 G3)/8, C3',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure41 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('C5/8., Bb4/16')))
    	.concat(score.beam(score.notes('C5/8, D5')))
    	.concat(score.notes('C5/8, B4/8/r'))
    	.concat(score.beam(score.notes('C5/8, D5')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('E2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 E3)/8, G2',{clef: 'bass', stem:'up'})))
    	.concat(score.notes('C3/8, E3',{clef: 'bass'}))
    	.concat(score.beam(score.notes('(G3 C4)/8, E3',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure42 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('C5/q., Bb4/8[id="m42a"], Bb4/h[id="m42b"]')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('C3/8, E3',{clef: 'bass'})
    	.concat(score.beam(score.notes('(G3 C4)/8, E3',{clef: 'bass'})))
    	.concat(score.notes('C3/8, E3',{clef: 'bass'}))
    	.concat(score.beam(score.notes('G3/8, C4',{clef: 'bass', stem:'down'})))
    )
  ]
});
vf.StaveTie({ from: id('m42a'), to: id('m42b') });
moreSetup(system, topLine, bottomLine);

/* Measure43 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G5/8, D5')))
    	.concat(score.beam(score.notes('C5/8, Bb4')))
    	.concat(score.beam(score.notes('C5/8, D5')))
    	.concat(score.notes('B4/q/r'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(C3 G3 C4)/h.[id="m43a"]', {clef: 'bass'})
    	.concat(score.notes('D3/q/r', {clef: 'bass'}))
    )
  ]
});
var stroke8 = new VF.Stroke(3);
id('m43a').addStroke(0, stroke8);
moreSetup(system, topLine, bottomLine);

/* Measure44 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('D5/q, B4/q/r, C5/q')
    	.concat(score.beam(score.notes('C5/8, Bb4[id="m44a"]')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(G2 Bb2 D3)/q, D3/q/r, (A2 C3 D3)/h', {clef: 'bass'})),
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure45 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('Bb4/h[id="m45a"], B4/q/r')
    	.concat(score.beam(score.notes('G4/8, A4')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(Bb2 D3 G3 Bb3)/q, D3/q/r', {clef: 'bass'})
    	.concat(score.notes('(G2 Bb2 D3 G3)/8, (G2 Bb2 D3 G3)/8', {clef: 'bass'}))
    	.concat(score.notes('(G2 Bb2 D3 G3)/8, (G2 Bb2 D3 G3)/8', {clef: 'bass'}))
    )
  ]
});
vf.StaveTie({ from: id('m44a'), to: id('m45a') });
moreSetup(system, topLine, bottomLine, true);

// /* Measure46 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('Bb4/q., C5/8, C5/h')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(D3 G3)/8, Bb2',{clef: 'bass',stem:'down'})))
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(E3 G3)/8, C3',{clef: 'bass',stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure47 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G5/8, D5')))
    	.concat(score.beam(score.notes('C5/8, Bb4')))
    	.concat(score.beam(score.notes('C5/8, D5')))
    	.concat(score.beam(score.notes('D5/8, D5')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('E2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 E3)/8, G2',{clef: 'bass', stem:'up'})))
    	.concat(score.beam(score.notes('Eb2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 Eb3)/8, G2',{clef: 'bass', stem:'up'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure48 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('F5/q., G5/h')
    	.concat(score.beam(score.notes('G5/16, G5')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('G2/8, Bb2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(D3 G3)/8, Bb2',{clef: 'bass',stem:'down'})))
    	.concat(score.beam(score.notes('G2/8, C3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(E3 G3)/8, C3',{clef: 'bass',stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure49 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('Bb5/8., A5/16')))
    	.concat(score.beam(score.notes('A5/8, G5')))
    	.concat(score.notes('A5/8, B4/8/r'))
    	.concat(score.beam(score.notes('G5/8, G5')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('E2/8, G2',{clef: 'bass'})))
    	.concat(score.beam(score.notes('(C3 E3)/8, G2',{clef: 'bass', stem:'up'})))
    	.concat(score.notes('C3/8, E3',{clef: 'bass',stem:'down'}))
    	.concat(score.beam(score.notes('(G3 C4)/8, E3',{clef: 'bass', stem:'down'})))
    )
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure50 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('Bb5/q., G5/8[id="m50a"], G5/h[id="m50b"]')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.notes('C3/8, E3',{clef: 'bass'}))
    	.concat(score.beam(score.notes('(G3 Bb3)/8, E3',{clef: 'bass'})))
    	.concat(score.beam(score.notes('C3/8, E3',{clef: 'bass',stem:'down'})))
    	.concat(score.beam(score.notes('G3/8, C4',{clef: 'bass', stem:'down'})))
    )
  ]
});
vf.StaveTie({ from: id('m50a'), to: id('m50b') });
moreSetup(system, topLine, bottomLine);

/* Measure51 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('')
    	.concat(score.beam(score.notes('C5/8, Bb4')))
    	.concat(score.beam(score.notes('C5/8, Bb4')))
    	.concat(score.beam(score.notes('C5/8, D5')))
    	.concat(score.notes('B4/q/r'))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(C3 E3 G3 Bb3)/q, D3/q/r, D3/h/r', {clef:'bass'}))
  ]
});
moreSetup(system, topLine, bottomLine);

/* Measure52 */
var system = makeSystem();
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('D5/q, B4/q/r, C5/q')
    	.concat(score.beam(score.notes('C5/8, Bb4[id="m52a"]')))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(G2 Bb2 D3)/q, D3/q/r, (A2 C3 D3)/h', {clef: 'bass'})),
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure53 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('Bb4/h.[id="m53a"], B4/q/r')
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(Bb2 D3 G3 Bb3)/h., D3/q/r', {clef: 'bass'})
    )
  ]
});
vf.StaveTie({ from: id('m52a'), to: id('m47a') });
vf.StaveTie({ from: id('m47a'), to: id('m53a') });
moreSetup(system, topLine, bottomLine);

/* Measure54 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('G4/q, B4/q/r, A4/q')
    	.concat(score.beam(score.notes('A4/8, D5[id="m54a"]', {stem: 'down'})))
    )
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(G2 Bb2 D3)/q, D3/q/r, (A2 C3 D3)/q, D3/8/r, (D3 F#3 A3 C4 D4)/8[id="m54b"]', {clef: 'bass'})),
  ]
});
moreSetup(system, topLine, bottomLine);

// /* Measure55 */
var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('D5/h.[id="m55a"], B4/q/r'))
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(D3 F#3 A3 C4 D4)/h.[id="m55b"], D3/q/r', {clef: 'bass'})
    )
  ]
});
vf.StaveTie({ from: id('m54a'), to: id('m55a') });
vf.StaveTie({ from: id('m54b'), to: id('m55b') });
moreSetup(system, topLine, bottomLine);

var system = makeSystem(4);
var topLine = system.addStave({
  voices: [
    score.voice(score.notes('(G3 Bb3 D4 G4)/w')),
  ]
});
var bottomLine = system.addStave({
  voices: [
    score.voice(score.notes('(G2 Bb2 D3 G3)/w', {clef: 'bass'})),
  ]
});
moreSetup(system, topLine, bottomLine, false, true);

//adding lyrics 
var s = "&nbsp ";

addLyricLine(s+s+s+ "Там " +s+s+s+ "на " +s+s+ "хъл-ма" +s+s+ "в " +s+ "лъ " +s+ "- чис - ти" +s+s+s+s+ " не - бе" +s+" - " +s+"са"+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s
			+"ру - би" +s+ "-" +s+ "не - на - та" +s+s+ "ку - ла" +s+s+s+"из - ди - га - ше" +s+s+s+" сна - га");

addLyricLine(s+"Там" +s+s+s+s+s+s+s+s+" от " +s+s+ "-" +s+s+ "дав" +s+ " - " +s+ "на " +s+s+s+s+s+ "жи" +s+s+s+s+ "-" +s+s+s+s+"вее" +s+s+s+ "-" +s+s+s+ "ла " +s+s+s+s+ "са" +s+s+"-" +s+s+"ма" +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s
	+"жес - то - ка" +s+s+s+s+s+s+" но " +s+s+"прек-рас - на");

addLyricLine("кра-си - ва-та " +s+s+s+"же - на " +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+ "Но - щем " +s+s+s+s+s+s+s+ "в" +s+s+s+s+s+ "мра - ка" +s+s+s+s+s+s+s+s+s+ "в" +s+s+s+s+s+s+s+ "плен" +s+ "на" +s+s+s+s+s+ "са" +s+ "-" +s+ "мо" +s+s+ "-" +s+s+"та");

addLyricLine(s+s+s+s+s+ "аз " +s+s+s+ "ча" +s+s+ "-" +s+ "кам " +s+s+ "да " +s+s+ "я " +s+s+s+ "ви - дя" +s+s+s+s+ "но " +s+s+s+s+ "не " +s+ "ча" +s+s+ "-" +s+s+ "ка" +s+s+s+s+ "тя" +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+ "но " +s+s+s+ "не " +s+ "ча" +s+ "-" +s+ "ка " +s+s+ "тя");

addLyricLine(s+s+s+s+s+s+s+s+ "Oo" +s+s+ "-" +s+s+ "oo " +s+s+s+ "но " +s+s+ "дос - та - тъч-но " +s+s+ "би - ло" +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+
	 "Oo" +s+s+ "-" +s+s+ "oo " + s+s+s+s+s+ "зад" +s+s+ "ви - со - ко - то" +s+s+s+ " стък-ло");

addLyricLine(s+s+s+s+s+s+s+s+s+s+ "Oo" +s+s+s+ "-" +s+s+s+ "oo " +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+ "да "+s+s+ "за" +s+ "-" +s+ "ста" +s+s+ "-" +s+s+ "не " +s+s+ " тя" +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+
	"за " +s+ "да" +s+ " я" +s+ " ви" +s+s+ "-" +s+s+ " дя" +s+s+s+s+s+  " аз");

addLyricLine(s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+ "Тя " +s+s+s+s+s+s+s+s+ "със " +s+ " сво - я" +s+ " стра-нен " +s+s+s+ "по - глед е" +s+s+s+ " мо"+s+ "-" +s+"гла" +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+
	"да" +s+s+ "прев-ръ-ща" +s+ "хо-ра");

addLyricLine("във ве-щи със сър - ца" +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+
	"И" +s+s+s+s+s+ " е - то" +s+s+s+s+s+s+s+s+s+s+ " и " +s+s+s+s+ "аз" +s+s+" съм тук " +s+s+s+s+ "в ру "+s+s+"-"+s+s+"би - не" +s+s+ "-" +s+s+ "на - " +s+s+s+ "та "+s+s+s+"ку - ла");

addLyricLine(s+s+s+s+s+ "Пре- вър - нат " +s+ "съм " +s+ "на" +s+ " - " +s+ "пук " +s+ "в кри - стал - но" +s+s+s+ " о " +s+s+ "- " +s+s+ "гле - да - ло"+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+
	"в без-ро"+s+"-"+s+"пот-но "+s+"стъ - кло");

addLyricLine(s+s+s+s+s+s+s+s+ "Oo" +s+s+ "-" +s+s+ "oo " +s+s+s+ "но " +s+s+ "дос - та - тъч-но " +s+s+ "би - ло" +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+
	 "Oo" +s+s+ "-" +s+s+ "oo " +s+s+s+ "ка-то"+s+s+s+" ел"+s+"-"+s+"маз "+s+s+s+"и "+s+s+s+"стъ - кло");

addLyricLine("да се о - гле - да тя " +
	"за " +s+s+ "да я " +s+s+s+s+s+s+ "вид - я " +s+s+s+ "аз"  +s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+s+
	"Без " +s+s+ "да " +s+s+s+s+ "мо " +s+s+s+s+s+s+s+ "-" +s+s+s+s+s+s+s+ " га"
	);
vf.draw(); // renders everything
}
main();


/** TODO:
-unharcode things (resize dynamically) maybe?
= add lyrics
- make it play sound maybe? try vextab
**/