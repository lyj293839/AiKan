<template>
  <div>
    <button @click="exportWord()">点击导出文件</button>
    <div id="container1"></div>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import {saveAs} from "file-saver";
export default {
  name: "world",
  data() {
    return {
      echartUrl1:"data:image/png;base64,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"
    };
  },
  created() {
  },
  methods: {
    base64DataURLToArrayBuffer(dataURL) {
        const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
        if (!base64Regex.test(dataURL)) {
            return false;
        }
        const stringBase64 = dataURL.replace(base64Regex, "");
        let binaryString;
        if (typeof window !== "undefined") {
            binaryString = window.atob(stringBase64);
        } else {
            binaryString = new Buffer(stringBase64, "base64").toString("binary");
        }
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes.buffer;
    },
    exportWord(){
      var ImageModule = require('open-docxtemplater-image-module');
      // 点击导出word
      let _this = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("../../../static/coa.docx",function(error, content) {
          // exportTemplate.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
              throw error;
          }

          // 图片处理
          let opts = {}
          opts.centered = true;  // 图片居中，在word模板中定义方式为{%%image}
          opts.fileType = "docx";
          opts.getImage = function(chartId){
              return _this.base64DataURLToArrayBuffer(chartId);
          }
          opts.getSize = function(){
              return [250,250]
          }

          let imageModule = new ImageModule(opts);
          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater();
          doc.attachModule(imageModule);
          doc.loadZip(zip);

          // 设置模板变量的值
          doc.setData({
            prod_name: '123',
            prod_enname: 'wusjd',
            cas: '123123',
            mf: '123',
            mw: '123',
            batch_no: '12312',
            prod_weight: '22222',
            table: [{
                testItem:'22222',
                specifications:'22222',
                results:'22222'
            },{
                testItem:'111',
                specifications:'1111',
                results:'1111'
            }],
            testName: 'rrrr',
            checkName: 'qweqwe',
            sureName: 'qweqwe',
            DateTime: 'qweqwe',
            image:_this.echartUrl1, // 获取echarts图片
          });

          try {
              // 用模板变量的值替换所有模板变量
              doc.render();
          } catch (error) {
              // 抛出异常
              let e = {
                  message: error.message,
                  name: error.name,
                  stack: error.stack,
                  properties: error.properties
              };
              throw error;
          }
          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
              type: "blob",
              mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, "word文档名称.docx");
      });
    },
  }
}
</script>

<style>
</style>