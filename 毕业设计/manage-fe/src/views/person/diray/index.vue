<template>
  <div class="dairy">
    <div id="wangeditor"></div>
    <div class="dairy-btn-container">
      <el-button type="primary" class="dairy-btn" @click="getEditorData">
        发表日记
      </el-button>
    </div>
    <div class="dairy-show">
      <div class="dairy-show-left">
        <div class="dairy-show-left-english">DAIRY</div>
        <div class="dairy-show-left-china">日记</div>
      </div>
      <div class="dairy-show-right">
        <el-card class="dairy-show-right-card">
          <!--
            这里可以变好看 
            <div class="">日期</div>
          <div class=""></div> -->
          <div class="">内容</div>
        </el-card>
      </div>
    </div>
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
      (this as any).editor = new wangeditor("#wangeditor");
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
<style lang="scss">
.dairy-btn-container{
  .dairy-btn {
  float: right;
  margin-top: 20px;
  width: 200px;
}
}
.dairy-btn-container::after {
  content: "";
  display: block;
  clear: both;
}
.dairy-show {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
&-left{
  &-english{
    font-size: 20px;
  }
  &-china{
    font-size: 18px;
    text-align: right;
    color: #FFC001;
  }
}
&-right{
  &-card{
    width: 65vw;
    height: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
    font-size: 18px;
    padding: 10px;
  }
}
}
</style>
