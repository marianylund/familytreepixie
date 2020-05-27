import * as PIXI from 'pixi.js'

const rectangle:PIXI.Graphics = new PIXI.Graphics();
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

  let entry = new PIXI.Container();
  entry.addChild(rectangle);
  
  // Rectangle
  rectangle.lineStyle(2, 0xFEEB77, 1);
  //rectangle.beginFill(0x650A5A);
  rectangle.drawRect(0, 0, 200, 100);
  rectangle.endFill();

  let textTitle = AddText("Hellou");
  entry.addChild(textTitle);
  textTitle.pivot.x = textTitle.width / 2;
  textTitle.x = rectangle.width / 2;
  
  entry.pivot.x = entry.width / 2;
  entry.pivot.y = entry.height / 2;
  entry.x = 200;
  entry.y = 200;
  app.stage.addChild(entry);

  // Make entry interactive
  entry.interactive = true;
  entry.buttonMode = true;
  entry
        // .on('pointerdown', onButtonDown)
        // .on('pointerup', onButtonUp)
        // .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        //.on('pointerout', onButtonOut);

  
  // Create a new texture
  const texture = PIXI.Texture.from('images/chess.png');
  const bunny = new PIXI.Sprite(texture);
  bunny.setTransform(app.screen.width / 2, app.screen.height / 2, 0.5, 0.5);
  bunny.anchor.set(0.5);
  app.stage.addChild(bunny);

  app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    bunny.rotation -= 0.001 * delta;
  });
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

// function onButtonDown() {
//   this.isdown = true;
//   this.texture = textureButtonDown;
//   this.alpha = 1;
// }

// function onButtonUp() {
//   this.isdown = false;
//   if (this.isOver) {
//       this.texture = textureButtonOver;
//   } else {
//       this.texture = textureButton;
//   }
// }

function onButtonOver() {
  this.isOver = true;
  if (this.isdown) {
      return;
  }
  //rectangle
}

// function onButtonOut() {
//   this.isOver = false;
//   if (this.isdown) {
//       return;
//   }
//   this.texture = textureButton;
// }

main();

