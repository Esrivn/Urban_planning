import { ImmutableObject } from 'jimu-core'

export interface Config {
  author: string
}

export type IMConfig = ImmutableObject<Config>
