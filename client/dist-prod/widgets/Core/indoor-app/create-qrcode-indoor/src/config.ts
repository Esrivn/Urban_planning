import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  urlAppViewer: string
}

export type IMConfig = ImmutableObject<Config>
