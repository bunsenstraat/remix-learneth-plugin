import { Step } from 'src/app/step/+state';

export enum LoadingStatus {
  notloaded = 0,
  started = 1,
  finished = 2
}

export interface WorkShopMetaData{
  tags?:string[],
  rating?:number,
  level?:number,
  name?:string,
  summary?:string
}

export interface Workshop {
  id: string;
  name: string;
  description: {
    file:string,
    content?:string
    status?:LoadingStatus
  };
  author: string;
  steps: Step[];
  text?:any;
  metadata?: {
    file?:string
    data?: WorkShopMetaData,
  }
}

export interface WorkshopLoader {
  id: string;
  description: {
    file:string,
    content?:string
    status: LoadingStatus
  };
  steps?: StepLoader[];
}

export interface StepLoader {
  file: string,
  status: LoadingStatus
}

export interface Metadata {
  id: string;
  name: string;
  description: string;
  author: string;
  stepIds: string[];
}
