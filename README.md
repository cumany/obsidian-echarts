# obsidian-echarts
 Render echarts in obsidian,[Apache ECharts](https://echarts.apache.org/en/index.html)，An Open Source JavaScript Visualization Library
一个可以在obsidian 里运行echarts 的插件，具体可以参考[官方示例库](https://echarts.apache.org/examples/en/index.html)代码。插件需要依赖dataview插件，[example](https://github.com/cumany/obsidian-echarts/tree/main/example)文件夹是一些基本例子。 更多示例可以关注[Blue-topaz-examples](https://github.com/cumany/Blue-topaz-examples)
---
A plugin that can run echarts in obsidian, see [official example library](https://echarts.apache.org/examples/en/index.html) code for details. The plugin depends on the dataview plugin, the [examples](https://github.com/cumany/obsidian-echarts/tree/main/example) folder is for some basic examples. More examples can be found at [blue-topaz-examples](https://github.com/cumany/Blue-topaz-examples)

![GIF 2022-06-02 13-31-49](https://user-images.githubusercontent.com/42957010/171559841-cfa4e5e2-69be-4506-a32f-beac33842052.gif)
![image](https://user-images.githubusercontent.com/42957010/171442642-fce4d273-ee06-4a3b-bb8c-e312f8763ce6.png)
![image](https://user-images.githubusercontent.com/42957010/171442781-67127459-5c35-4535-a80c-1c79059c3853.png)
![image](https://user-images.githubusercontent.com/42957010/171444744-5ba1e0e8-b01c-4f4b-b9e1-4ef448ded02f.png)


## 点击事件绑定

通过在源数据添加下面字段绑定点击事件效果。
目前支持的类型有 tag，content，file，path 指定这类类型可以点击事件调用Obsidian Search operators
如果指定的是file和path类型 需要添加字段比如 data['file']='filename' 可以实现组合搜索
假设datas是要展示的数据。
---
The click event effect is bound by adding the following fields to the source data.
Currently supported types are tag, content, file, path  
If you define file and path types, you need to add fields such as data['file']='filename' to achieve a combined search.
Assume datas is the data to be displayed.


```
datas.forEach((data)=>{
	data['search']='tag'
	data['file']='filename'
	data['path']='path'
})
```

**如果不指定，默认绑定的是传入的 data 数组中的 index 对应的文件。**
**If not specified, the default binding is to the file with index in the incoming data array. **

## 渲染容器
将下方代码到option 选项后即可渲染
Render the code below after putting it into the option
```
app.plugins.plugins['obsidian-echarts'].render(option, this.container)
```

