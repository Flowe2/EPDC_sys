<template>
  <div>
    <!-- head bar -->
    <div id="headbar">
      <UserHeadBar :logged=userLogged :role=role></UserHeadBar>
    </div>

    <!-- 分界线 -->
    <div id="divider"></div>

    <!-- router result -->
    <div id="display">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import UserHeadBar from '@/components/UserHeadBar.vue';

export default {
  name: "User",
  data() {
    return {
        role: false,
        userLogged: false,
    };
  },
  methods: {},
  components: {
    UserHeadBar
  },
  beforeCreate () {
    this.$router.push('/user/login');
  }
};
</script>

<style>


</style>