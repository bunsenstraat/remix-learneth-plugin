import { Injectable } from '@angular/core';
import { EntityState, ActiveState, EntityStore, StoreConfig, EntityUIStore } from '@datorama/akita';
import { Workshop } from './workshop.model';

export interface WorkshopState extends EntityState<Workshop, string>, ActiveState<string> {
  datemodified:string;
}



export interface WorkshopUI {
  isOpen: boolean;
  isLoading: boolean;
}

export interface WorkshopUIState extends EntityState<WorkshopUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workshop' })
export class WorkshopStore extends EntityStore<WorkshopState> {
  
  ui: EntityUIStore<WorkshopUIState,WorkshopUI>

  constructor() {
    super();
    this.createUIStore(entity => ({ isLoading: false, isOpen: true }));
  }

}

