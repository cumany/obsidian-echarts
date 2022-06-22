import { Plugin, parseYaml } from 'obsidian'
import Renderer from 'renderer'
import EchartsModal from 'modal';
import { OptionsType } from './type';
import * as echarts from 'echarts'

export default class EchartsPlugin extends Plugin {
  async onload(): Promise<void> {
    console.log('loading echarts plugin...')

    this.addCommand({
      id: "echarts-create-charts",
      name: "create echarts",
      callback: () => {
        const creator = new EchartsModal(this.app,"pie")
        creator.createPie()
      },
    });

    this.registerMarkdownCodeBlockProcessor('echarts', (source, el) => {
      const options = parseYaml(source)
      if (!options) {
        return
      }
      const renderer = new Renderer(options, el)

      if (options.chartType === 'pie') {
        renderer.renderPie()
      } else {
        renderer.render() 
      }
    })
  }
  echarts() {
    return echarts
  }
  render(options:OptionsType, el: HTMLElement) {
    const renderer = new Renderer(options, el)
    renderer.render()
  }
  async onunload(): Promise<void> {}
}
