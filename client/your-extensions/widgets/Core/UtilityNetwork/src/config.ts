import { ImmutableObject } from 'jimu-core'
import FIELD_LIST from '../../component/CoreForm/interface'

export interface Config {
  urlRoot: string; // url gốc chứa cả Utility, NetworkDiagram, FeatureServer
  fieldList: FIELD_LIST[];
  layout: any;
  fieldLayers: any; // chứa các field được quyền search của từng layer
}

export type IMConfig = ImmutableObject<Config>
