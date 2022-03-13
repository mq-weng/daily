<template>
  <div>
    <div class="person-header-bg">
      <el-avatar
        class="avatar"
        :size="150"
        fit="cover"
        :src="require('@assets/user.jpeg')"
      ></el-avatar>
      <div class="person-content">
        <div class="user-name">用户名</div>
        <el-menu
          active-text-color="#FFC001"
          style="
            display: flex;
            justify-content: space-between;
            background-color: transparent;
          "
          mode="horizontal"
          :default-active="activeIndex"
        >
          <router-link :to="{ name: 'Diray' }"
            ><el-menu-item index="1">日记 </el-menu-item></router-link
          >

          <router-link :to="{ path: 'schedule' }"
            ><el-menu-item index="2">日程</el-menu-item></router-link
          >

          <router-link :to="{ path: 'study' }">
            <el-menu-item index="3">学习管理</el-menu-item></router-link
          >

          <router-link :to="{ path: 'account' }"
            ><el-menu-item index="4">账本</el-menu-item></router-link
          >
        </el-menu>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  
};
</script>
<style lang="scss">
.person-header-bg {
  background: url("../../assets/person-bg.jpg") no-repeat;
  height: 360px;
  border-bottom: solid 1px #e6e6e6;
  .avatar {
    margin-top: 70px;
    margin-left: calc(50% - 75px);
  }
  .person-content {
    width: 70vw;
    margin: 0 auto 0 auto;
    .user-name {
      text-align: center;
      margin: 20px 0;
      font-size: 30px;
    }
    .el-menu-item {
      font-weight: 400;
      font-size: 20px;
    }
  }
}
</style>