// import { ImmutableObject } from 'seamless-immutable'

// export interface Config {
//   exampleConfigProperty: string
// }

// export type IMConfig = ImmutableObject<Config>

import {ImmutableObject} from 'jimu-core';

export interface Config{
  layerUrls: any;
}

export type IMConfig = ImmutableObject<Config>;
