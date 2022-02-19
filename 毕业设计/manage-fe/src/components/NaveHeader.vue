<template >
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
    >
      <el-menu-item index="1">日记</el-menu-item>
      <el-menu-item index="2">日程</el-menu-item>
      <el-menu-item index="3">学习管理</el-menu-item>
      <el-menu-item index="4">帐本</el-menu-item>
      <el-menu-item index="5">个人设置</el-menu-item>
      <router-link to="/login">注册|登录</router-link>
    </el-menu>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {

  },
};
</script>
