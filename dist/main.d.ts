declare let engine: TSE.Engine;
declare module TSE {
    class Engine {
        private _canvas;
        private _basicShader;
        private _projection;
        private _sprite;
        constructor();
        start(): void;
        resize(): void;
        private loop;
    }
}
declare module TSE {
    interface IAssetLoader {
        readonly supportedExtensions: string[];
        loadAsset(assetName: string): void;
    }
}
declare module TSE {
    interface IAsset {
        readonly name: string;
        readonly data: any;
    }
}
declare module TSE {
    const MESSAGE_ASSET_LOADED_ASSET_LOADED = "MESSAGE_ASSET_LOADED_ASSET_LOADED";
    class AssetManager {
        private static _loaders;
        private static _loaderAssets;
        private constructor();
        static initialize(): void;
        static registerLoader(loader: IAssetLoader): void;
        static loadAsset(assetName: string): void;
        static onAssetLoaded(asset: IAsset): void;
        static isAssetLoaded(assetName: string): boolean;
        static getAsset(assetName: string): IAsset;
    }
}
declare module TSE {
    class ImageAsset implements IAsset {
        readonly name: string;
        readonly data: HTMLImageElement;
        constructor(name: string, data: HTMLImageElement);
        get width(): number;
        get height(): number;
    }
    class ImageAssetLoader implements IAssetLoader {
        get supportedExtensions(): string[];
        loadAsset(assetName: string): void;
        private onImageLoaded;
    }
}
declare module TSE {
    abstract class BaseComponent {
        protected _owner: SimObject;
        name: string;
        constructor(name: string);
        get owner(): SimObject;
        setOwner(owner: SimObject): void;
        load(): void;
        update(time: number): void;
        render(shader: Shader): void;
    }
}
declare module TSE {
    class SpriteComponent extends BaseComponent {
        private _sprite;
        constructor(name: string, materialName: string);
        load(): void;
        render(shader: Shader): void;
    }
}
declare module TSE {
    let gl: WebGLRenderingContext;
    class GLUtilities {
        static initialize(elementId?: string): HTMLCanvasElement;
    }
}
declare module TSE {
    class AttributeInfo {
        location: number;
        size: number;
        offset: number;
    }
    class GLBuffer {
        private _hasAttributeLocation;
        private _elementSize;
        private _stride;
        private _buffer;
        private _targetBufferType;
        private _dataType;
        private _mode;
        private _typeSize;
        private _data;
        private _attributes;
        constructor(elementSize: number, dataType?: GLenum, targetBufferType?: GLenum, mode?: GLenum);
        bind(normalized?: boolean): void;
        unbind(): void;
        addAttributeLocation(info: AttributeInfo): void;
        pushBackData(data: number[]): void;
        upload(): void;
        draw(): void;
        destroy(): void;
    }
}
declare module TSE {
    abstract class Shader {
        private _name;
        private _program;
        private _attributes;
        private _uniforms;
        constructor(name: string);
        get name(): string;
        protected load(vertexSource: string, fragmentSource: string): void;
        private loadShader;
        private createProgram;
        use(): void;
        private detectAttributes;
        private detectUniforms;
        getAttributeLocation(name: string): number;
        getUniformLocation(name: string): WebGLUniformLocation;
    }
}
declare module TSE {
    class BasicShader extends Shader {
        constructor();
        private getVertexSource;
        private getFragmentSource;
    }
}
declare module TSE {
    class Color {
        private _r;
        private _g;
        private _b;
        private _a;
        constructor(r?: number, g?: number, b?: number, a?: number);
        get r(): number;
        set r(value: number);
        get rFloat(): number;
        get g(): number;
        set g(value: number);
        get gFloat(): number;
        get b(): number;
        set b(value: number);
        get bFloat(): number;
        get a(): number;
        set a(value: number);
        get aFloat(): number;
        toArray(): number[];
        toFloatArray(): number[];
        toFloat32Array(): Float32Array;
        static black(): Color;
        static white(): Color;
        static red(): Color;
        static green(): Color;
        static blue(): Color;
    }
}
declare module TSE {
    class Material {
        private _name;
        private _diffuseTextureName;
        private _diffuseTexture;
        private _tint;
        constructor(name: string, diffuseTextureName: string, tint: Color);
        get tint(): Color;
        get name(): string;
        get diffuseTexture(): Texture;
        get diffuseTextureName(): string;
        set diffuseTextureName(value: string);
        destory(): void;
    }
}
declare module TSE {
    class MaterialManager {
        private static _materials;
        private constructor();
        static registerMaterial(material: Material): void;
        static getMaterial(materialName: string): Material;
        static releaseMaterial(materialName: string): void;
    }
}
declare module TSE {
    class Sprite {
        private _name;
        private _width;
        private _height;
        private _buffer;
        private _materialName;
        private _material;
        position: Vector3;
        constructor(name: string, materialName: string, width?: number, height?: number);
        get name(): string;
        load(): void;
        update(time: number): void;
        draw(shader: Shader): void;
        destory(): void;
    }
}
declare module TSE {
    class Texture implements IMessageHandler {
        private _name;
        private _handle;
        private _isLoaded;
        private _width;
        private _height;
        constructor(name: string, width?: number, height?: number);
        onMessage(message: Message): void;
        get name(): string;
        get width(): number;
        get height(): number;
        get isLoaded(): boolean;
        bind(): void;
        unbind(): void;
        activateAndBind(textureUnit?: number): void;
        loadTextureFromAsset(asset: ImageAsset): void;
        private isPowerOf2;
        private isValuePowerOf2;
        destory(): void;
    }
}
declare module TSE {
    class TextureManager {
        private static _textures;
        private constructor();
        static getTexture(textureName: string): Texture;
        static releaseTexture(textureName: string): void;
    }
}
declare module TSE {
    class Martix4 {
        private _data;
        private constructor();
        get data(): number[];
        static identity(): Martix4;
        static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, farCLip: number): Martix4;
        static tranlstion(position: Vector3): Martix4;
        static rotationZ(angleInRadians: number): Martix4;
        static multiply(a: Martix4, b: Martix4): Martix4;
        static scale(scale: Vector3): Martix4;
        copyFrom(m: Martix4): void;
    }
}
declare module TSE {
    class Transform {
        position: Vector3;
        rotation: Vector3;
        scale: Vector3;
        copyFrom(transform: Transform): void;
        getTransformationMatrix(): Martix4;
    }
}
declare module TSE {
    class Vector2 {
        private _x;
        private _y;
        constructor(x?: number, y?: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        toArray(): number[];
        toFloat32Array(): Float32Array;
    }
}
declare module TSE {
    class Vector3 {
        private _x;
        private _y;
        private _z;
        constructor(x?: number, y?: number, z?: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get z(): number;
        set z(value: number);
        toArray(): number[];
        toFloat32Array(): Float32Array;
        static get zero(): Vector3;
        static get one(): Vector3;
        copyFrom(vector3: Vector3): void;
    }
}
declare module TSE {
    interface IMessageHandler {
        onMessage(message: Message): void;
    }
}
declare module TSE {
    enum MessagePriority {
        NORMAL = 0,
        HIGH = 1
    }
    class Message {
        code: string;
        context: any;
        sender: any;
        priority: MessagePriority;
        constructor(code: string, sender: any, context?: any, priority?: MessagePriority);
        static send(code: string, sender: any, context?: any): void;
        static sendPriorty(code: string, sender: any, context?: any): void;
        static subscribe(code: string, handler: IMessageHandler): void;
        static unsubscribe(code: string, handler: IMessageHandler): void;
    }
}
declare module TSE {
    class MessageBus {
        private static _subscriptions;
        private static _normalQueueMessagePerUpdate;
        private static _normalMessageQueue;
        private constructor();
        static addSubscription(code: string, handler: IMessageHandler): void;
        static removeSubscription(code: string, handler: IMessageHandler): void;
        static post(message: Message): void;
        static update(time: number): void;
    }
}
declare module TSE {
    class MessageSubscriptionNode {
        message: Message;
        handler: IMessageHandler;
        constructor(message: Message, handler: IMessageHandler);
    }
}
declare module TSE {
    class Scene {
        private _root;
        constructor();
        get root(): SimObject;
        get isLoaded(): boolean;
        addObject(object: SimObject): void;
        getObject(name: string): SimObject;
        load(): void;
        update(time: number): void;
        render(shader: Shader): void;
    }
}
declare module TSE {
    class SimObject {
        private _id;
        private _children;
        private _parent;
        private _isLoaded;
        private _scene;
        private _components;
        private _localMatrix;
        private _worldMatrix;
        name: string;
        transform: Transform;
        constructor(id: number, name: string, scene?: Scene);
        get id(): number;
        get parent(): SimObject;
        get worldMatrix(): Martix4;
        get isLoaded(): boolean;
        addChild(child: SimObject): void;
        removeChild(child: SimObject): void;
        getObjectByName(name: string): SimObject;
        addComponent(component: BaseComponent): void;
        load(): void;
        update(time: number): void;
        render(shader: Shader): void;
        onAdded(scene: Scene): void;
        private updateWorldMatrix;
    }
}
declare module TSE {
    enum ZoneState {
        UNINITALIZED = 0,
        LOADING = 1,
        UPDATEING = 2
    }
    class Zone {
        private _id;
        private _name;
        private _description;
        private _scene;
        private _state;
        constructor(id: number, name: string, description: string);
        get id(): number;
        get name(): string;
        get description(): string;
        get scene(): Scene;
        load(): void;
        unload(): void;
        update(time: number): void;
        render(shader: Shader): void;
        onActivated(): void;
        onDeactivated(): void;
    }
}
declare module TSE {
    class TestZone extends Zone {
        private _testSprite;
        private _testObject;
        load(): void;
    }
}
declare module TSE {
    class ZoneManager {
        private static _globalZoneID;
        private static _zones;
        private static _activeZone;
        private constructor();
        static createZone(name: string, description: string): number;
        static createTestZone(): number;
        static changeZone(id: number): void;
        static update(time: number): void;
        static render(shader: Shader): void;
    }
}
