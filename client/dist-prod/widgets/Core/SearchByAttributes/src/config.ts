import { ImmutableObject } from 'jimu-core'

export interface Config {
  author: string;
  fields: any;
  item_template: any;
}

export type IMConfig = ImmutableObject<Config>
