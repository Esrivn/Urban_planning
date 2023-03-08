import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  SysCacheWindow: string,
  ConfigInit: string,
  windowTables: IWindowTable[],
  services: IService[]
}

export interface IWindowTable {
  id: number,
  name: string
}

export interface IService {
  id: number,
  type: string,
  url: string
}

export type IMConfig = ImmutableObject<Config>
