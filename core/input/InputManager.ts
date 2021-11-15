namespace TSE {
    export enum Keys {
        LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40
    }

    export class MouseContent {
        public leftDown: boolean;
        public rightDown: boolean;
        public position: Vector2;

        public constructor(leftDown: boolean, rightDown: boolean, position: Vector2) {
            this.leftDown = leftDown;
            this.rightDown = rightDown;
            this.position = position;
        }
    }

    export class InputManager {
        private static _key: boolean[] = [];
        private static _mouseX: number;
        private static _mouseY: number;
        private static _previousMouseX: number;
        private static _previousMouseY: number;
        private static _leftDown: boolean = false;
        private static _rightDown: boolean = false;
        public static initialize(): void {
            for (let i = 0; i < 255; i++) {
                InputManager._key[i] = false;
            }
            window.addEventListener("keydown", InputManager.onKeyDown);
            window.addEventListener("keyup", InputManager.onKeyUp);
            window.addEventListener("mousemove", InputManager.onMouseMove);
            window.addEventListener("mousedown", InputManager.onMouseDown);
            window.addEventListener("mouseup", InputManager.onMouseUp);
        }

        public static isKeyDown(key: Keys): boolean {
            return InputManager._key[key];
        }

        public static onKeyDown(event: KeyboardEvent): boolean {
            InputManager._key[event.keyCode] = true;
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        public static onKeyUp(event: KeyboardEvent): boolean {
            InputManager._key[event.keyCode] = false;
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        public static getMousePosition(): Vector2 {
            return new Vector2(this._mouseX, this._mouseY);
        }

        public static onMouseMove(event: MouseEvent): void {
            InputManager._previousMouseX = InputManager._mouseX;
            InputManager._previousMouseY = InputManager._mouseY;
            InputManager._mouseX = event.clientX;
            InputManager._mouseY = event.clientY;
        }

        public static onMouseDown(event: MouseEvent): void {
            if (event.button == 0) {
                this._leftDown = true
            } else if (event.button == 2) {
                this._rightDown = true;
            }

            Message.send("MOUSE_DOWN",this,new MouseContent(InputManager._leftDown,InputManager._rightDown,InputManager.getMousePosition()));
        }

        public static onMouseUp(event: MouseEvent): void {
            if (event.button == 0) {
                this._leftDown = false
            } else if (event.button == 2) {
                this._rightDown = false;
            }
            Message.send("MOUSE_UP",this,new MouseContent(InputManager._leftDown,InputManager._rightDown,InputManager.getMousePosition()));
        }
    }
}