<template>
  <div class="account">
    <div class="account-title">记账</div>
    <el-form :inline="true" :model="formInline" label-width="60px">
      <el-form-item label="金额">
        <el-input v-model="formInline.money" placeholder="金额"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="formInline.category" placeholder="请输入收支类别">
          <el-option label="收入" :value="1"></el-option>
          <el-option label="支出" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formInline.desc" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 20px">
        <el-button type="primary" @click="onSubmit">记一笔</el-button>
      </el-form-item>
    </el-form>
    <div class="account-title">收支概况</div>
    <div class="account-total">
      <div class="account-total-income">
        <div>收入</div>
        <div class="account-total-income-color">{{ totalList.income }}</div>
      </div>
      <div class="account-total-expend">
        <div>支出</div>
        <div class="account-total-expend-color">{{ totalList.expend }}</div>
      </div>
      <div class="account-total-static">
        <div>静收支</div>
        <div class="account-total-static-color">{{ totalList.static }}</div>
      </div>
    </div>
    <div class="account-title">账目清单</div>
    <el-table class="account-list" border stripe :data="tableData">
      <el-table-column prop="category" label="类别" width="180">
        <template>
          <div v-if="category == 1">收入</div>
          <div v-else>支出</div>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="金额" width="180"></el-table-column>
      <el-table-column prop="desc" label="备注"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      formInline: {
        category: "",
        money: "",
        desc: "",
      },
      tableData: [
        {
          category: 0,
          money: 220,
          desc: "衣服",
        },
        {
          category: "2016-05-04",
          money: "王小虎",
          desc: "上海市普陀区金沙江路 1517 弄",
        },
      ],
      totalList: {
        income: 10,
        expend: 10,
        static: 0,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onSubmit() {
      console.log(this.formInline);
      // 调用接口提交记录的账单（新增记录） ，并提交修改后的（更新 totalList）
    },
    getList() {
      //获取账目清单 tableData 以及收支概况 totalList
    },
  },
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
  &-expend {
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