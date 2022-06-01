import { Plugin } from 'obsidian'
import { parseYaml } from 'obsidian'
import * as echarts from 'echarts'
import 'echarts-wordcloud'


export default class EchartsPlugin extends Plugin {
  async onload(): Promise<void> {
    console.log('loading echarts plugin...')

    this.registerMarkdownCodeBlockProcessor('echarts', (source, el) => {
      const options = parseYaml(source)
      if (!options) {
        return
      }
      this.render(options, el)
    })

  }

  echarts() {
    return echarts
  }

  render(options: any, el: HTMLElement) {
    const container = el.createDiv('echarts-container')
    let myChart = echarts.getInstanceByDom(container)
    let { width, height, ...option } = options
    if (!width || !height) {
      width = 800
      height = 600
    }

   
    

    try {
      if (!myChart) {
        myChart = echarts.init(
          container,
          Array.from(document.body.classList).includes('theme-dark')
            ? 'dark'
            : 'light',
          { width, height }
        )
      }

      myChart.setOption({ animation: false, ...option })
      myChart.on('click', function (params) {
        let prefix:string='';
        let searchWord:string='';
        function search( searchWord:string ) {
          const tmpLink = window.document.body.createEl('a', {
              href: `obsidian://search?query=${searchWord}`,
            });
            tmpLink.click();
            tmpLink.remove();
      }
        if (params.data['search']) {
          let search = params.data['search'];
          if (search === 'tag') prefix='tag%3A' 
          if (search === 'content') prefix='content%3A'
          if (search === 'path')  prefix='path%3A'
          if (search === 'file') prefix = 'file%3A'
          searchWord= prefix + params.name
        }
        if (params.data['path']) {
          searchWord =searchWord+' '+ 'path%3A'+params.data['path']
        }
        if (params.data['file']) {
          searchWord =searchWord+' '+ 'file%3A'+params.data['file']
        }
        if (searchWord)
        {
          search(searchWord)
        } else {
        
          //@ts-ignore
          const filePath = app.metadataCache.getFirstLinkpathDest(
            params.name,
            params.name
          )
        //@ts-ignore
        app.workspace.getUnpinnedLeaf().openFile(filePath)
      }
      })
    } catch (err) {
      new Error(err)
    }
  }

  async onunload(): Promise<void> {}
}
