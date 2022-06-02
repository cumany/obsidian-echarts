import { App, Modal, Setting } from 'obsidian'

export default class EchartsModal extends Modal {
  app: App
  chartType: string
  constructor(app: App, chartType: string) {
    super(app)
    this.chartType = 'pie'
  }

  pieModal() {
    let option = {
      source: '',
    }
    new Setting(this.contentEl)
      .setName('pie')
      .setDesc('Enter a pie chart data source')
      .addText((text) => {
        text.onChange((value) => {
          option.source = value
        })
      })

    new Setting(this.contentEl).addButton((b) => {
      b.setButtonText('Create')
      b.onClick(() => {
        //@ts-ignore
        const editor = this.app.workspace.activeLeaf.view.editor
        editor.replaceRange(`\`\`\`echarts\ntype:pie\nsource:${option.source}\n\`\`\``, editor.getCursor())
        console.log(option)
        this.close()
      })
    })
  }

  onOpen() {
    if (this.chartType === 'pie') {
      this.pieModal()
    }
  }

  onClose() {
    let { contentEl } = this
    contentEl.empty()
  }
}
