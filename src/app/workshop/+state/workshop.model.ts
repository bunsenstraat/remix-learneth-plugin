import { Step } from 'src/app/step/+state';

export interface Workshop {
  id: string;
  name: string;
  description: string;
  author: string;
  steps: Step[];
}

export interface Metadata {
  id: string;
  name: string;
  description: string;
  author: string;
  stepIds: string[];
}
