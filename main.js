let wS = 850;

let scl = wS/8;
let r = scl/2;
let marg = wS/8;
let diff = marg/2;

let start = 0;
var pauseVar = false;

let angle = [0, 0, 0, 0];
let local = [0, 0, 0, 0];
let speed = [1, 1.25, 1.5, 1.75];

let points_lcl = [];
let curves = [];

function setup() {
    var canvas = createCanvas(wS, wS);
    canvas.parent('canvas');

    calc_local();

    frameRate(50);
}

function draw() {
    background(0);
    
    for (let i = 0; i < 8; i++) {
        if (i >= 0 && i < 4) {
            if (i > 0) {translate(-marg, -local[i-1]);}
            translate(marg, local[i]);

            dtctr = 0;
        } else {
            if (i != 4) {
                translate(-local[i-5], -marg);
            } else {
                translate(-marg, -local[i-1]);
            }
            translate(local[i-4], marg);

            dtctr = 4;
        }

        stroke(255, 0, 255);
        strokeWeight(0.75);
        noFill();
        ellipse(0, 0, r * 2);

        x = r * cos(angle[i-dtctr]);
        y = r * sin(angle[i-dtctr]);

        if (start == 0) {
            points_lcl.push([x, y]);
        } else {
            points_lcl[i] = [x, y];
        }

        stroke(100);
        strokeWeight(1);
        smooth();
        if (i >= 0 && i < 4) {
            line(x, y, (r * cos(angle[3]))+(4 * scl + 4*diff), y);
        } else {
            line(x, y, x, (r * sin(angle[3]))+(4 * scl + 4*diff));
        }

        stroke(255);
        strokeWeight(7.5);
        point(x, y);

        crrnt_spd = speed[i-dtctr];
        
        angle[i] += 0.035 * crrnt_spd;
    }

    for (let i = 0; i < 4; i++) {
        if (start == 0) {curves[i] = [];}

        if (i == 0) {
            translate(-local[3], -marg);
        } else {
            translate(-local[i-1], 0);
        }

        translate(local[i], 0);

        x = points_lcl[i+4][0];

        for (let j = 0; j < 4; j++) {
            translate(0, local[j]);

            y = points_lcl[j][1];

            if (start == 0) {curves[i][j] = [];}

            curves[i][j].push(createVector(x, y));
            
            stroke(0, 100, 255, 100);
            strokeWeight(0.75);

            beginShape();
            for (let p = 0; p < curves[i][j].length; p++) {
                vertex(curves[i][j][p].x, curves[i][j][p].y);
            }
            endShape();

            stroke(255);
            strokeWeight(1.5);
            noFill();
            ellipse(x, y, 9.5, 9.5);

            strokeWeight(3);
            point(x, y);

            translate(0, -local[j]);
        }
    }

    if (start == 0) {start ++;}
}

function calc_local() {
    let jump = marg;
    for (let i = 0; i < 4; i++) {
        let div = (marg+diff)*(i + 1)+jump;
        local[i] = div;
    }
}
