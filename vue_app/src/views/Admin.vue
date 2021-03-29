<template>
  <div>
    <div id="headbar">
      <UserHeadBar :logged=userLogged :role=role></UserHeadBar>
    </div>

    <!-- 分界线 -->
    <div id="divider"></div>

    <div id="display">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import UserHeadBar from '@/components/UserHeadBar.vue';

export default {
  name: "Admin",
  data() {
    return {
      role: true,

    };
  },
  components: {
    UserHeadBar
  },
  beforeCreate () {
    this.$router.push('/admin/login');
  }
};
</script>

<style>


</style>