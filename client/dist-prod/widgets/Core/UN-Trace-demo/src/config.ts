import { ImmutableObject } from 'jimu-core'

export interface Config {
  urlRoot: string; // url gốc chứa cả Utility, NetworkDiagram, FeatureServer
  layout: any;
  fieldLayers: any; // chứa các field được quyền search của từng layer
}

export type IMConfig = ImmutableObject<Config>
