/* Captura de teclas presionadas y 
exposicion de metodo simple para consultar si una tecla esta presionada */

export class InputManager {
    constructor() {
        this.keys = new Set();

        window.addEventListener("keydown", (event) => {
        this.keys.add(event.code);
        });
 
        window.addEventListener("keyup", (event) => {
        this.keys.delete(event.code);
        });
    }

    isDown(code) {
        return this.keys.has(code);
    }
}