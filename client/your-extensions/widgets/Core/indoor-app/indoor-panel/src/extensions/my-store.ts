import { extensionSpec, ImmutableObject, IMState } from 'jimu-core';

export enum MyActionKeys {
  MyAction1 = 'MY_ACTION_1',
  MyAction2 = 'MY_ACTION_2',
  MyAction3 = 'MY_ACTION_3',
}

export interface Action1 {
  type: MyActionKeys.MyAction1;
  val: string;
}

export interface Action2 {
  type: MyActionKeys.MyAction2;
  val: string;
}

export interface Action3 {
  type: MyActionKeys.MyAction3;
  val: string;
}

type ActionTypes = Action1 | Action2 | Action3;

interface MyState {
  a: string;
  b: string;
  c: string;
}
type IMMyState = ImmutableObject<MyState>;

declare module 'jimu-core/lib/types/state' {
  interface State {
    myState?: IMMyState
  }
}

export default class MyReduxStoreExtension implements extensionSpec.ReduxStoreExtension {
  id = 'my-local-redux-store-extension';

  getActions() {
    return Object.keys(MyActionKeys).map(k => MyActionKeys[k]);
  }

  getInitLocalState() {
    return {
      a: null,
      b: null
    }
  }

  getReducer() {
    return (localState: IMMyState, action: ActionTypes, appState: IMState): IMMyState => {
      switch (action.type) {
        case MyActionKeys.MyAction1:
          return localState.set('a', action.val);
        case MyActionKeys.MyAction2:
          return localState.set('b', action.val);
        case MyActionKeys.MyAction3:
          return localState.set('c', action.val);
        default:
          return localState;
      }
    }
  }

  getStoreKey() {
    return 'myState';
  }
}