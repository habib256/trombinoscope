let video;
let canvas;
let titre;
let classe;
let classeDOM;
let nom;
let nomDOM;
let nomTxt;
let prenom;
let prenomDOM;
let prenomTxt;
let boutonPhoto;
let boutonSave;

let takepic = false;
let datas = [];

function setup() {
  titre = createElement('h1', 'Trombinoscope de la classe :');
  titre.position (10, 3);

  canvas = createCanvas(1024, 900);
  canvas.position(5,50);

  video = createCapture (VIDEO);
  video.size(480, 360);
  video.hide();

  classeDOM = createInput('');
  classeDOM.position (550, 10);
  classeDOM.input(classeInputEvent);
  
  nomTxt = createElement('h1', 'Nom de famille :');
  nomTxt.position (570, 50);
  nomDOM = createInput('');
  nomDOM.input(nomInputEvent);
  nomDOM.position (580, 120);

  prenomTxt = createElement('h1', 'Prénom usuel : ');
  prenomTxt.position (570, 150);
  prenomDOM = createInput('');
  prenomDOM.input(prenomInputEvent);
  prenomDOM.position (580, 220);

  boutonPhoto = createButton('Prendre une photo');
  boutonPhoto.position(570, 300);
  boutonPhoto.size(100, 100);
  boutonPhoto.mousePressed(takePic);
  
  boutonSave = createButton('Sauvergarder la classe');
  boutonSave.position(700, 300);
  boutonSave.size(150, 100);
  boutonSave.mousePressed(saveData);
}

function classeInputEvent() {
  classe = this.value();
  console.log('you are typing for classe: ', this.value());
}

function nomInputEvent() {
  nom = this.value();
  console.log('you are typing for prenom: ', this.value());
}

function prenomInputEvent() {
  prenom = this.value();
  console.log('you are typing for nom: ', this.value());
}

function saveData() {
   saveJSON(datas, classe + '.json');
}

function takePic() {
  if (datas.length < 36) {
  takepic = true;
  let data = [];
  image(video, 0, 0, 320, 240);
  canvas.loadPixels();
  data.push(classe);
  data.push(prenom);
  data.push(nom);
  data.push(canvas.get(0, 0, 320, 240));
  datas.push(data);
  takepic = false;
  }
}

function draw() {
  if (!takepic) {
    background(255);
    image(video, 50, 0, 480, 360);
    textSize(10);
    textAlign(CENTER, CENTER);
    let j = 380;
    for (let i = 0; i< datas.length; i++) {
      if (i >8) { j = 490;}
      if (i >17) { j = 610;}
      if (i >26) { j = 730;}
      image(datas[i][3], (110*i)%990+10, j, 100, 80);
      let filename = datas[i][1] + '.' + datas[i][2] ; 
      text(filename, (110*i)%990+60, j+100);
    }
  }
}
