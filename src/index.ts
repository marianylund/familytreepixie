import * as PIXI from 'pixi.js'

const rectangle:PIXI.Graphics = new PIXI.Graphics();
const entryContainer = new PIXI.Container();
const graphics2 = new PIXI.Graphics();

function main() {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new PIXI.Application({ 
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1
  });

  app.renderer.backgroundColor = 0x061639;
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);

  entryContainer.addChild(rectangle);
  
  // Rectangle
  rectangle.lineStyle(2, 0xFEEB77, 1);
  rectangle.beginFill(0x650A5A);
  rectangle.drawRect(0, 0, 200, 100);
  rectangle.endFill();

  let textTitle = AddText("Hellou");
  entryContainer.addChild(textTitle);
  textTitle.pivot.x = textTitle.width / 2;
  textTitle.x = rectangle.width / 2;
  
  entryContainer.pivot.x = entryContainer.width / 2;
  entryContainer.pivot.y = entryContainer.height / 2;
  entryContainer.x = 200;
  entryContainer.y = 200;
  app.stage.addChild(entryContainer);

  // Make entry interactive
  entryContainer.interactive = true;
  entryContainer.buttonMode = true;
  entryContainer
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut)
        .on('pointermove', onDragMove);

  
  // Create a new texture
  const texture = PIXI.Texture.from('images/chess.png');
  const chessIm = new PIXI.Sprite(texture);
  chessIm.setTransform(app.screen.width / 2, app.screen.height / 2, 0.5, 0.5);
  chessIm.anchor.set(0.5);
  app.stage.addChild(chessIm);

  chessIm.interactive = true;
  chessIm.buttonMode = true;
  chessIm
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut)
    .on('pointermove', onDragMove);


    graphics2.lineStyle(2, 0xFFFFFF, 2);
    graphics2.moveTo(120, 10);

    graphics2.bezierCurveTo(10, 10, 130, 0, entryContainer.x, entryContainer.y);
    

    app.stage.addChild(graphics2);

  app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    chessIm.rotation -= 0.001 * delta;
  });

  
}

function DrawBezierLine(){
  graphics2.clear();

  graphics2.lineStyle(2, 0xFFFFFF, 2);
  graphics2.moveTo(120, 10);
  graphics2.bezierCurveTo(10, 10, 130, 0, entryContainer.x, entryContainer.y);
}



function AddText(textToWrite: string){
  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff'], // gradient
    // stroke: '#4a1850',
    // strokeThickness: 5,
    // dropShadow: true,
    // dropShadowColor: '#000000',
    // dropShadowBlur: 4,
    // dropShadowAngle: Math.PI / 6,
    // dropShadowDistance: 6,
    // wordWrap: true,
    // wordWrapWidth: 440,
  });

  const richText = new PIXI.Text(textToWrite, style);
  return richText;
}


function onButtonOver() {
  this.isOver = true;
  if (this.isdown) {
      return;
  }
  //rectangle
  //this.scale.x = 1.25;
  //this.scale.y = 1.25;
}

function onButtonOut() {
  this.isOver = false;
  if (this.isdown) {
      return;
  }
  //this.scale.x = 1;
  //this.scale.y = 1;
}

function onDragStart(event:any) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
      DrawBezierLine();
  }
}

main();

