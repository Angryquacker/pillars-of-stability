//A Pillar is a set of 5 grpahics with its own three probability matricies
class Pillar {
  constructor(graphics, pMatrix) {
    this.graphics = graphics;
    this.pMatrix = pMatrix;

    this.pMatrixRanges = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];

    for (let i = 0;i < 5;i++) {
      for (let j = 0;j < 5;j++) {
        if(j == 0) { this.pMatrixRanges[i][j] = {low: 0, high: this.pMatrix[i][j]*100-1}; continue; }

        this.pMatrixRanges[i][j] = {low: this.pMatrixRanges[i][j-1].high+1, high: this.pMatrixRanges[i][j-1].high+this.pMatrix[i][j]*100};
      }
    }
  }

  simulate(numberOfSimulatedSteps) {
    let chainStates = [];

    let currentState = Math.round(Math.random()*4);
    chainStates.push(currentState);

    for (let i = 0;i < numberOfSimulatedSteps-1;i++) {
      let ranNum = Math.round(Math.random()*99);

      if (ranNum <= this.pMatrixRanges[currentState][0].high && ranNum >= this.pMatrixRanges[currentState][0].low) {
        currentState = 0;
        chainStates.push(currentState);
      }

      else if (ranNum >= this.pMatrixRanges[currentState][1].low && ranNum <= this.pMatrixRanges[currentState][1].high) {
        currentState = 1;
        chainStates.push(currentState);
      }

      else if (ranNum >= this.pMatrixRanges[currentState][2].low && ranNum <= this.pMatrixRanges[currentState][2].high) {
        currentState = 2;
        chainStates.push(currentState);
      }

      else if (ranNum >= this.pMatrixRanges[currentState][3].low && ranNum <= this.pMatrixRanges[currentState][3].high) {
        currentState = 3;
        chainStates.push(currentState);
      }

      else if (ranNum >= this.pMatrixRanges[currentState][4].low && ranNum <= this.pMatrixRanges[currentState][4].high) {
        currentState = 4;
        chainStates.push(currentState);
      }
    }

    return chainStates;
  }

  generateImageList(numberOfSimulatedSteps) {
    let imageOutList = [];

    this.simulate(numberOfSimulatedSteps).forEach(chainState => {
      imageOutList.push(this.graphics[chainState]);
    });

    return imageOutList;
  }
}

function gaussianRandom(mean=0, stdev=1) {
    let u = 1 - Math.random(); // Converting [0,1) to (0,1]
    let v = Math.random();
    let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

//Define probability matricies for percussion pillars/

//Given that we're in a n stable Pillar, define the probabilites within those pillars. Should be 5x5 each
pMatrixStable = [
  [0.05, 0.80, 0.05, 0.05, 0.05],
  [0.05, 0.05, 0.80, 0.05, 0.05],
  [0.05, 0.05, 0.05, 0.80, 0.05],
  [0.05, 0.05, 0.05, 0.05, 0.80],
  [0.80, 0.05, 0.05, 0.05, 0.05]
];

pMatrixMedium = [
  [0.15, 0.4, 0.15, 0.15, 0.15],
  [0.15, 0.15, 0.4, 0.15, 0.15],
  [0.15, 0.15, 0.15, 0.4, 0.15],
  [0.15, 0.15, 0.15, 0.15, 0.4],
  [0.4, 0.15, 0.15, 0.15, 0.15]
];

pMatrixUnstable = [
  [0.2, 0.2, 0.2, 0.2, 0.2],
  [0.2, 0.2, 0.2, 0.2, 0.2],
  [0.2, 0.2, 0.2, 0.2, 0.2],
  [0.2, 0.2, 0.2, 0.2, 0.2],
  [0.2, 0.2, 0.2, 0.2, 0.2]
];

//DEFINE WIND AND PER IMAGES
let percStableImagePaths = [
  './perc/Stable/0.png',
  './perc/Stable/1.png',
  './perc/Stable/2.png',
  './perc/Stable/3.png',
  './perc/Stable/4.png'
];

let percMediumImagePaths = [
  './perc/Medium/0.png',
  './perc/Medium/1.png',
  './perc/Medium/2.png',
  './perc/Medium/3.png',
  './perc/Medium/4.png'
];

let percUnstableImagePaths = [
  './perc/Unstable/0.png',
  './perc/Unstable/1.png',
  './perc/Unstable/2.png',
  './perc/Unstable/3.png',
  './perc/Unstable/4.png'
];


let windStableImagePaths = [
  './wind/Stable/0.png',
  './wind/Stable/1.png',
  './wind/Stable/2.png',
  './wind/Stable/3.png',
  './wind/Stable/4.png'
];

let windMediumImagePaths = [
  './wind/Medium/0.png',
  './wind/Medium/1.png',
  './wind/Medium/2.png',
  './wind/Medium/3.png',
  './wind/Medium/4.png'
];

let windUnstableImagePaths = [
  './wind/Unstable/0.png',
  './wind/Unstable/1.png',
  './wind/Unstable/2.png',
  './wind/Unstable/3.png',
  './wind/Unstable/4.png'
];


//Pillar 0 = stable, pillar 1 = Medium, pillar 2 = unstable
let PercussionPillars = [
  new Pillar(percStableImagePaths, pMatrixStable),
  new Pillar(percMediumImagePaths, pMatrixMedium),
  new Pillar(percUnstableImagePaths, pMatrixUnstable)
];

let WindPillars = [
  new Pillar(windStableImagePaths, pMatrixStable),
  new Pillar(windMediumImagePaths, pMatrixMedium),
  new Pillar(windUnstableImagePaths, pMatrixUnstable)
];

//Get markov strings:=
let PercussionPillarsChains = [PercussionPillars[0].generateImageList(18), PercussionPillars[1].generateImageList(14), PercussionPillars[2].generateImageList(8)];

let WindPillarChains = [WindPillars[0].generateImageList(18), WindPillars[1].generateImageList(14), WindPillars[2].generateImageList(8)];

function generateList(inputTime) {
  //Split inpupt time into three blocks of durations
  let timeBlocks = [Math.round(inputTime*0.50),Math.round(inputTime*0.35),Math.round(inputTime*0.15)];
  let numberOfBlocksPerSection = [18, 14, 8];

  let finalBlocks = []; //will be 40 objects with a duration, and associated image

  timeBlocks.forEach((allottedTime, i) => {
    let meanTimeBlockLength = allottedTime / numberOfBlocksPerSection[i];

    for (let j = 0;j < numberOfBlocksPerSection[i];j++) {
      //Generate time of current block and images
      let blockTimeAmount = gaussianRandom(meanTimeBlockLength, .5);

      let blockImagePerc, blockImageWind;

      if(numberOfBlocksPerSection[i] == 18) {
        blockImagePerc = PercussionPillarsChains[0][j];
        blockImageWind = WindPillarChains[0][j];
      }
      else if (numberOfBlocksPerSection[i] == 14) {
        blockImagePerc = PercussionPillarsChains[1][j];
        blockImageWind = WindPillarChains[1][j];
      }
      else if (numberOfBlocksPerSection[i] == 8) {
        blockImagePerc = PercussionPillarsChains[2][j];
        blockImageWind = WindPillarChains[2][j];
      }

      finalBlocks.push({ timeLength: blockTimeAmount, percImage: blockImagePerc, windImage: blockImageWind });
    }
  });

  return finalBlocks;
}

function shortCountdownTimerSet(time) {
  time = Math.round(time*10)/10;

  let x = setInterval(() => {
    time = time-.1;

    if (Math.round(time*10)/10 == 0) { clearInterval(x); return; }

    document.getElementById("shortCountdown").innerHTML = `Block Time: ${Math.trunc(time*10)/10}`;
  }, 100);
}

function longCountdownTimerSet(timeLimit) {
  let countDown = document.getElementById("countdown");

  let x = setInterval(() => {
    if(timeLimit-1 == -1) { clearInterval(x); return; }
    countDown.innerHTML = `Total Time: ${--timeLimit}`;
  }, 1000);
}

function setBlockTimes(i=-1, finalBlocks, timeLimit=0) {
  if (i == 39) { return; }

  setTimeout(() => {
    if(i == -1) { longCountdownTimerSet(timeLimit) }

    console.log(finalBlocks[i+1].percImage);

    shortCountdownTimerSet(finalBlocks[i+1].timeLength);

    document.getElementById('wind').src=finalBlocks[i+1].windImage;

    document.getElementById('perc').src=finalBlocks[i+1].percImage;

    setBlockTimes(i+1, finalBlocks);
  }, finalBlocks[i+1].timeLength*1000);
}

document.getElementById("StartTimer").addEventListener("click", e => {
  e.preventDefault();

  let timeLimit = document.getElementById("timeLimit").value;

  let finalBlocks = generateList(timeLimit);

  setBlockTimes(i=-1, finalBlocks, timeLimit);
});
