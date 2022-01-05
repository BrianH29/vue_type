export namespace VueEvent {
  //  InputEvent 는 이미 타입스크립트에서 정의한 interface
  export interface Input<T extends EventTarget> extends InputEvent {
    target: T;
  }

  export interface Keyboard<T extends EventTarget> extends KeyboardEvent {
    target: T;
  }
}
