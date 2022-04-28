<template>
  <div class="account">
    <div class="account-title">记账</div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="金额">
        <el-input v-model="formInline.money" placeholder="金额"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.category" placeholder="请输入收支类型">
          <el-option label="收入" :value="1"></el-option>
          <el-option label="支出" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="formInline.date"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="formInline.classAccount" placeholder="请输入类别">
          <div v-if="formInline.category == 0">
            <el-option label="日用" :value="1"></el-option>
            <el-option label="服饰" :value="2"></el-option>
            <el-option label="美食" :value="3"></el-option>
            <el-option label="学习" :value="4"></el-option>
            <el-option label="其他" :value="5"></el-option>
          </div>
          <div v-else>
            <el-option label="工资" :value="6"></el-option>
            <el-option label="生活费" :value="7"></el-option>
            <el-option label="其他" :value="8"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formInline.desc" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 20px">
        <el-button type="primary" @click="onSubmit">记一笔</el-button>
      </el-form-item>
    </el-form>
    <div>
      <div class="account-title">收支表</div>
      <el-radio v-model="dateFlag" :label="true">按月份筛选</el-radio>
      <el-radio v-model="dateFlag" :label="false">按年份筛选</el-radio>
      <el-form :inline="true" :model="formInline" label-width="60px">
        <el-form-item label="按年份" v-if="!dateFlag">
          <el-date-picker
            v-model="dateSelect"
            type="year"
            placeholder="选择年"
            value-format="timestamp"
            :picker-options="{
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            }"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="按月份" v-if="dateFlag"
          ><el-date-picker
            v-model="dateSelect"
            type="month"
            placeholder="选择月份"
            value-format="timestamp"
            :picker-options="{
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            }"
          >
          </el-date-picker
        ></el-form-item>
        <el-form-item label="类型">
          <el-select v-model="categorySelect" placeholder="请输入收支类型">
            <el-option label="收入" :value="1"></el-option>
            <el-option label="支出" :value="0"></el-option>
            <el-option label="收支总览" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitSearch">检索</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-left: 40px">
        <div class="account-title1">收支概况</div>
        <div class="account-total">
          <div class="account-total-income">
            <div>收入</div>
            <div class="account-total-income-color">{{ totalIncome }}</div>
          </div>
          <div class="account-total-expand">
            <div>支出</div>
            <div class="account-total-expand-color">{{ totalExpand }}</div>
          </div>
          <div class="account-total-static">
            <div>静收支</div>
            <div class="account-total-static-color">{{ totalStatic }}</div>
          </div>
        </div>
        <div class="account-title1">图表</div>
        <div id="echarts" style="width: 900px; height: 400px"></div>
        <div class="account-title1">明细</div>
        <el-table class="account-list" border stripe :data="tableData">
          <el-table-column prop="category" label="收支类型" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.category == 1">收入</div>
              <div v-else>支出</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额"
            width="180"
          ></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="classAccount" label="收支类型" width="180">
            <template slot-scope="scope">
              {{ classAccountConfig[scope.row.classAccount] }}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import * as echarts from "echarts";
let myChart;

export default {
  data() {
    return {
      classAccountConfig: [
        "日用",
        "服饰",
        "美食",
        "学习",
        "其他",
        "工资",
        "生活费",
        "其他",
      ],
      formInline: {
        category: 0,
        money: "",
        desc: "",
        date: Date.now(),
        classAccount: "",
      },
      totalExpand: 0,
      totalIncome: 0,
      totalStatic: 0,
      tableData: [],
      categorySelect: 2,
      dateSelect: Date.now(),
      dateFlag: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      option: {
        // title:"收支总览（包括均值）",
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 元",
          },
        },
        series: [
          {
            name: "支出",
            type: "line",
            data: [],
            markLine: {
              data: [
                { type: "average", name: "Avg" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "Max",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
              ],
            },
          },
          {
            name: "收入",
            type: "line",
            data: [],
            markLine: {
              data: [
                { type: "average", name: "Avg" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "Max",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
              ],
            },
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("echarts"));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  },
  methods: {
    onSubmit() {
      // 调用接口提交记录的账单（新增记录） ，并提交修改后的（更新 totalList）
      const params = Object.assign({}, this.formInline);
      params.userId = localStorage.getItem("userId");
      console.log(params);
      this.$axios.post("/account/addList", params).then(
        (res) => {
          this.formInline = {
            category: 0,
            money: "",
            desc: "",
            date: Date.now(),
            classAccount: "",
          };
          this.getList();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getList() {
      //获取账目清单 tableData
      let params = {
        userId: localStorage.getItem("userId"),
        categorySelect: this.categorySelect,
        dateSelect: this.dateSelect,
        dateFlag: this.dateFlag,
      };
      this.$axios.get("/account/getList", { params: params }).then(
        (res) => {
          console.log(res);
          const data = res.data;
          this.totalIncome = data.totalIncome;
          this.totalExpand = data.totalExpand;
          this.totalStatic = this.totalIncome - this.totalExpand;
          this.tableData = data.tableData;
          let echartsData0 = data.data.expand;
          let echartsData1 = data.data.income;
          if (data.monthNumber != 0) {
            for (let i = 1; i <= data.monthNumber; i++) {
              this.option.xAxis.data[i - 1] = i;
              this.option.series[0].data[i - 1] = 0;
              this.option.series[1].data[i - 1] = 0;
              this.option.series[0].data[i - 1] = echartsData0[i]
                ? echartsData0[i]
                : 0;
              this.option.series[1].data[i - 1] = echartsData1[i]
                ? echartsData1[i]
                : 0;
            }
          } else {
            this.option.xAxis.data = [];
            this.option.series[0].data = [];
            this.option.series[1].data = [];
            for (let i = 1; i <= 12; i++) {
              this.option.xAxis.data[i - 1] = i;
              this.option.series[0].data[i - 1] = 0;
              this.option.series[1].data[i - 1] = 0;
              this.option.series[0].data[i - 1] = echartsData0[i]
                ? echartsData0[i]
                : 0;
              this.option.series[1].data[i - 1] = echartsData1[i]
                ? echartsData1[i]
                : 0;
            }
          }

          myChart.setOption(this.option);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    submitSearch() {
      //dateFlag 区分年、月，dateSelect具体日期，categorySelect 支付、收、收支、
      // this.axios.get().then((res)=>{console.log(res)},(err)=>{console.log(err)})
      this.getList();
    },
  },
  watch: {},
};
</script>
<style lang="scss">
.account-title {
  font-size: 20px;
  margin: 20px 0;
  padding-bottom: 8px;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
}
.account-title1 {
  font-size: 20px;
  margin: 20px 0;
  padding-bottom: 8px;
  width: 100%;
  color: #ffc001;
  border-bottom: 1px solid #e6e6e6;
}
.account-list {
  padding-bottom: 20px;
  width: 80%;
  margin: 0 auto;
}
.account-total {
  display: flex;
  &-income {
    flex-grow: 1;
    border-right: 1px solid #e6e6e6;
    &-color {
      color: #14ba89;
      font-size: 18px;
      margin-top: 4px;
    }
  }
  &-expand {
    flex-grow: 1;
    border-right: 1px solid #e6e6e6;
    text-align: center;
    &-color {
      color: #f1523a;
      font-size: 18px;
      margin-top: 4px;
    }
  }
  &-static {
    flex-grow: 1;
    margin: 0 auto;
    text-align: center;
    &-color {
      font-size: 20px;
      margin-top: 4px;
    }
  }
}
</style>