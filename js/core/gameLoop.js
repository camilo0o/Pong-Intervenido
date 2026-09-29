/* Motor generico del loop: no sabe nada del pong, solo orquesta
las funciones update(deltaTime) y render() que le pasen. */

export class GameLoop {
    constructor(update, render) {
        this.update = update;
        this.render = render;
        this.lastTime = 0;
        this.running = false;
        this._frame = this._frame.bind(this);
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this._frame);
    }

    stop() {
        this.running = false;
    }
    _frame(currentTime){
        if(!this.running) return;

        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.05);
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this._frame);
    }
}