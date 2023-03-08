import { ImmutableObject } from 'jimu-core'
import FIELD_LIST from '../../component/CoreForm/interface'

export interface Config {
  urlNetworkDiagram: string; // url trỏ tới Network Diagram Service
  fieldList: FIELD_LIST[];
  layout: any;
}

export type IMConfig = ImmutableObject<Config>
