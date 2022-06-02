# obsidian-echarts
 Render echarts in obsidian,[Apache ECharts](https://echarts.apache.org/en/index.html)，An Open Source JavaScript Visualization Library
一个可以在obsidian 里运行echarts 的插件，具体可以参考官方示例库代码。插件需要依赖dataview插件，example文件夹是一些基本例子。 更多示例可以关注[Blue-topaz-examples](https://github.com/cumany/Blue-topaz-examples)
![GIF 2022-06-02 13-31-49](https://user-images.githubusercontent.com/42957010/171559841-cfa4e5e2-69be-4506-a32f-beac33842052.gif)
![image](https://user-images.githubusercontent.com/42957010/171442642-fce4d273-ee06-4a3b-bb8c-e312f8763ce6.png)
![image](https://user-images.githubusercontent.com/42957010/171442781-67127459-5c35-4535-a80c-1c79059c3853.png)
![image](https://user-images.githubusercontent.com/42957010/171444744-5ba1e0e8-b01c-4f4b-b9e1-4ef448ded02f.png)


## 点击事件绑定

通过在源数据添加下面字段绑定点击事件效果。
目前支持的类型有 tag，content，file，path 指定这类类型可以点击事件调用Obsidian Search operators
如果指定的是file和path类型 需要添加字段比如 data['file']='filename' 可以实现组合搜索
假设datas是要展示的数据。

```
datas.forEach((data)=>{
	data['search']='tag'
	data['file']='filename'
	data['path']='path'
})
```

**如果不指定，默认绑定的是传入的 data 数组中的 index 对应的文件。**


## 渲染容器
将下方代码到option 选项后即可渲染
```
app.plugins.plugins['obsidian-echarts'].render(option, this.container)
```

