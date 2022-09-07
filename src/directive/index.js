const modules = import.meta.glob("../directive/**/**.js");
// 自动导入当前文件夹下的所有自定义指令(默认导出项)
export default (app) => {
  for (const path in modules) {
    // 排除当前文件
    if (path !== "../directive/index.js") {
      modules[path]().then((mod) => {
        mod.default(app);
      });
    }
  }
};
