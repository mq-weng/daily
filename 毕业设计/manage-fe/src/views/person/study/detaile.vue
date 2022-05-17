<template>
  <div>
    <div class="detaile-page-title">书名：{{ form.bookName }}</div>
    <div class="detaile-page-title">作者：{{ form.author }}</div>
    <el-button
      type="text"
      icon="el-icon-edit-outline"
      @click="centerDialogVisible = true"
      >编辑书籍</el-button
    >
    <div>
      <el-button type="text" icon="el-icon-delete-solid" @click="deleteBook"
        >删除书籍</el-button
      >
    </div>
    <div class="detaile-title">阅读数据</div>
    <div style="display: float; overflow: hidden">
      <div id="echarts" style="width: 300px; height: 300px; float: left"></div>
      <div class="detaile-page-title">当前页数：{{ form.curPage }}</div>
      <div class="detaile-page-title">总页数：{{ form.totalPage }}</div>
    </div>

    <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <div class="detaile-dialog-title">基本信息</div>
        <el-form-item label="书名">
          <el-input v-model="form.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <div class="detaile-dialog-title">进度信息</div>
        <el-form-item label="当前页数">
          <el-input v-model="form.curPage"></el-input>
        </el-form-item>
        <el-form-item label="总页数">
          <el-input v-model="form.totalPage"></el-input>
        </el-form-item>
        <el-form-item label="阅读状态">
          <el-select v-model="form.bookState" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDetaile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as echarts from "echarts";
let myChart;
export default {
  data() {
    return {
      id: this.$route.query.id,
      centerDialogVisible: false,
      form: {
        bookName: "",
        author: "",
        bookState: 0,
        curPage: 0,
        totalPage: 0,
      },
      options: [
        {
          value: 0,
          label: "想读",
        },
        {
          value: 1,
          label: "在读",
        },
        {
          value: 2,
          label: "已读完",
        },
      ],
      option: {
        title: {
          text: "0%",
          left: "42%",
          top: "46%",
          textStyle: {
            color: "#1890fe",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "80%"],
            center: ["50%", "50%"],
            label: { show: false },
            data: [
              { value: 0, itemStyle: { color: "#9BCD9B" } }, //绿色，读过的页数
              { value: 0, itemStyle: { color: "#C1FFC1" } }, //浅绿，总的
            ],
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      },
    };
  },
  created() {
    this.getBook();
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("echarts"));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  },
  methods: {
    deleteBook() {
      this.$axios.post("/study/deleteBookList", { id: this.id }).then(
        (res) => {
          this.$router.push("/study");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getBook() {
      this.$axios
        .get("/study/getBookDetaile", { params: { id: this.id } })
        .then((res) => {
          let list = res.data.list[0];
          let { bookName, bookState, curPage, totalPage, author } = list;
          this.form = Object.assign(this.form, {
            bookName,
            bookState,
            curPage,
            totalPage,
            author,
          });
          this.option.series[0].data[0].value = curPage;
          this.option.series[0].data[1].value = totalPage;
          if (curPage >= 0 && totalPage > 0) {
            this.option.title.text =
              Math.floor((curPage / totalPage) * 100) + "%";
          }
          myChart.setOption(this.option);
        });
    },
    updateDetaile() {
      if (this.form.curPage == this.form.totalPage) {
        this.form.bookState = 2;
      }
      let param = Object.assign({}, this.form);
      param.id = this.id;
      this.$axios.post("/study/updateBookDetaile", param).then(
        (res) => {
          this.centerDialogVisible = false;
          let { totalPage, curPage } = this.form;
          this.option.series[0].data[0].value = curPage;
          this.option.series[0].data[1].value = totalPage;
          if (curPage >= 0 && totalPage > 0) {
            this.option.title.text =
              Math.floor((curPage / totalPage) * 100) + "%";
          }
          myChart.setOption(this.option);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
<style lang="scss">
.detaile-title {
  font-size: 20px;
  margin: 20px 0;
  padding-bottom: 8px;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
}
.detaile-dialog-title {
  font-size: 20px;
  padding-bottom: 8px;
  width: 100%;
}
.detaile-page-title {
  font-size: 16px;
  padding-bottom: 8px;
  margin-top: 12px;
  width: 100%;
}
</style>