# 扇形图
```dataviewjs
const data = []
app.vault.root.children.forEach((child)=>{
	if(child.path.split(".")[1] != "md"){
		//console.log(child.path)
		data.push({name: child.path, value: dv.pages(`"${child.path}"`).length})
	}
})

const options = {
  backgroundColor: 'transparent',
  title: {
    text: '根文件夹包含笔记数量',
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
    min: 0,
    max: 50,
    inRange: {
      colorLightness: [1, 0]
    }
  },
  series: [
    {
      name: '笔记数量',
      type: 'pie',
      radius: '75%',
      center: ['50%', '50%'],
      data: data.sort(function (a, b) {
        return a.value - b.value;
      }),
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
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};
app.plugins.plugins['obsidian-echarts'].render(options, this.container)
```