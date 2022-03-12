<template>
  <div class="dairy">
    日记
    <!-- <el-button>会复发和</el-button> -->
    <div id="div1">
    </div>
    <el-button type="primary" class="btn" @click="getEditorData">
      获取当前内容
    </el-button>
  </div>
</template>
<script lang="ts">
import wangeditor from "wangeditor";
export default {
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    (this as any).init();
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    (this as any).editor.destroy();
    (this as any).editor = null;
  },
  methods: {
    init(): void {
      (this as any).editor = new wangeditor("#div1");
      (this as any).editor.create();
    },
    getEditorData(): void {
      // 通过代码获取编辑器内容
      let data = (this as any).editor.txt.html();
      // 提交
      alert(data);
    },
  },
};
</script>
