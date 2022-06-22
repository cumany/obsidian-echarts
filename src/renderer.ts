import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { OptionsType } from './type'
import { getAPI } from 'obsidian-dataview'
import { Notice } from 'obsidian'

export default class Renderer {
  constructor(public options: OptionsType, public el: HTMLElement) {}

  initChart() {
    const container = this.el.createDiv('echarts-container')
    let myChart = echarts.getInstanceByDom(container)
    let { width, height } = this.options
    if (!width || !height) {
      width = 800
      height = 600
    }

    if (!myChart) {
      myChart = echarts.init(
        container,
        Array.from(document.body.classList).includes('theme-dark')
          ? 'dark'
          : 'light',
        { width, height }
      )
    }

    return myChart
  }

  renderPie() {
    const myChart = this.initChart()
    const { width, height, ...option } = this.options
    const source = option.source
    const dv = getAPI(app);
    if ( typeof dv == 'undefined' ) { return new Notice('Dataview is not installed. This plugin requires Dataview to work properly.',3000); }
    const pages = dv.pages(`"${source}"`)
    const data = pages.map((page) => { 
      return {
        name: page.file.name,
        value: page.file.size
      }
    })
    const chartOption = {
      backgroundColor: '#2c343c',
      title: {
        text: 'file size Pie',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 30000,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: data,
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx:number) {
            return Math.random() * 200;
          }
        }
      ]
    }

    myChart.setOption({ animation: false, ...chartOption })
  }

  render() {
    const myChart = this.initChart()
    const { width, height, ...option } = this.options
    try {
      myChart.setOption({ animation: false, ...option })
      myChart.on('click', function (params) {
        let prefix: string = ''
        let searchWord: string = ''
        if (params.data['search']) {
          let search = params.data['search']
          if (search === 'tag') prefix = 'tag:'
          if (search === 'content') prefix = 'content:'
          if (search === 'path') prefix = 'path:'
          if (search === 'file') prefix = 'file:'
          searchWord = prefix + params.name
        }
        if (params.data['path']) {
          searchWord = searchWord + ' ' + 'path:' + params.data['path']
        }
        if (params.data['file']) {
          searchWord = searchWord + ' ' + 'file:' + params.data['file']
        }
        if (searchWord) {
          app.internalPlugins.getPluginById('global-search')?.instance.openGlobalSearch(searchWord);
        } else {
          const filePath = app.metadataCache.getFirstLinkpathDest(
            params.name,
            ""
          )
          app.workspace.getUnpinnedLeaf().openFile(filePath)
        }
      })
    } catch (err) {
      new Error(err)
    }
  }
}
