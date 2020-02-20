import { WorkshopState } from 'src/app/workshop/+state';


export interface github{
    id:string;
    name:string;
    branch: string;
    data?: Partial<WorkshopState>;
    datemodified?: string;
}