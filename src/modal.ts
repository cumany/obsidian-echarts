var obsidian = require('obsidian');
import { App, Modal, Setting, Notice } from 'obsidian'

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
        const view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView)
        if (!view) {
          return new Notice('Can only be created in editing mode',3000);
        }
        view.editor.replaceRange(`\`\`\`echarts\ntype:pie\nsource:${option.source}\n\`\`\``, view.editor.getCursor())
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
