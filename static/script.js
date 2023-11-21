import { Playlib } from './node_modules/playlib/bin/playlib.js';

/** 
 * @author nikeedev
 * 
 * @license MIT
 * @type {HTMLCanvasElement} 
 * 
 * 
 * 
*/

const canvas = document.getElementById("canvas");

let ScreenSize = new Playlib.Vector2(window.innerWidth - 30, window.innerHeight - 30);


class MainScene extends Playlib.Scene {

    constructor(canvas, ClearScreen) {
        super(canvas, ClearScreen);

        this.ClearScreen = true;

    }

    square = new Playlib.Rect(new Playlib.Vector2(43, 43), new Playlib.Vector2(65, 65), ScreenSize);

    speed = 7;

    create(ctx) {
        this.square.color = "black";
        this.square.draw(ctx);
    }

    update(ctx, ts) {
        if (Playlib.Input.KeyPressed(Playlib.Keys.Right)) {
            this.square.position.x += this.speed;
        }

        if (Playlib.Input.KeyPressed(Playlib.Keys.Left)) {
            this.square.position.x -= this.speed;
        }

        if (Playlib.Input.KeyPressed(Playlib.Keys.Down)) {
            this.square.position.y += this.speed;
        }

        if (Playlib.Input.KeyPressed(Playlib.Keys.Up)) {
            this.square.position.y -= this.speed;
        }
        this.square.draw(ctx);
    }
}

let config = {
    game_name: "websocket-canvas",
    style: "border: 1px solid black; background-color: white;",
    useOwnCanvas: true,
    canvas: canvas,
}

let game = new Playlib.Game(config, [new MainScene()]);

game.run();

// const websocket = new WebSocket("ws://localhost:5501/ws");

// websocket.onopen = function () {
//     console.log("connection opened");
//     websocket.send(Math.random().toString());
// }

// websocket.onclose = function () {
//     console.log("connection closed");
// }

// websocket.onmessage = function (e) {
//     console.log("received message: " + e.data);
// }
