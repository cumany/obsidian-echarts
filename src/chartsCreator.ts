import { App } from 'obsidian';
import  EchartsModal  from 'modal';

export default class ChartsCreator{
  app: App
  constructor(app: App) {
    this.app = app    
  }

  createPie() {
    const modal = new EchartsModal(this.app, 'pie')
    modal.open()
  }
}