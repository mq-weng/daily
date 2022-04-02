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
        <el-card
          class="dairy-show-right-card"
          v-for="item in list"
          :key="item.id"
        >
          <!--
            这里可以变好看 
            <div class="">日期</div>
          <div class=""></div> -->
          <div v-html="item.content"></div>
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
      content: "",
      list: [],
    };
  },
  mounted() {
    (this as any).init();
  },
  created() {
    this.getList();
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
      let data = this.editor.txt.html();
      let param = { content: data, id: localStorage.getItem("userId") };
      // 提交
      this.$axios.post("/dairy/writeDairy", param).then(
        (res) => {
          this.$message.success(res.message)
          this.getList()
        },
        (err) => {
          this.$message.error(err.message);
        }
      );
    },
    getList(): void {
      let id = localStorage.getItem("userId");
      this.$axios.get("/dairy/getList", { params: { id: id } }).then(
        (res) => {
          this.list = res.data.list;
        },
        (err) => {
          this.$message.error(err.message);
        }
      );
    },
  },
};
</script>
<style lang="scss">
.dairy-btn-container {
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
  &-left {
    &-english {
      font-size: 20px;
    }
    &-china {
      font-size: 18px;
      text-align: right;
      color: #ffc001;
    }
  }
  &-right {
    &-card {
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
