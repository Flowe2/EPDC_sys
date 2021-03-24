<template>
  <!-- head bar -->
  <div id="header">
    <!-- 登录后显示头像区域 -->
    <UserHead :logged='userLogged'></UserHead>

    <!-- 登录前显示管理员跳转区域 -->
    <div id="admin" v-if="!userLogged">
      <button id="headerButton">
        <router-link style="text-decoration: none;" to="/admin/login">管理员登陆</router-link>
      </button>
    </div>
  </div>

  <!--  -->
  <div id="display">
    <router-view></router-view>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead.vue';

export default {
  name: "User",
  data() {
    return {
        userLogged: false,
    };
  },
  methods: {},
  components: {
    UserHead
  },
};
</script>

<style>
#header {
  height: 80px;
  width: 100%;
  margin-bottom: 5px;
  background: rgba(40, 57, 101, 0.9);
}

#display {
}

#header #user {
    margin: 10px 10px;
    width: 50px;
    height: 50px;
    float: left;
    border-radius: 50%;
}

#userface {
    padding: 2.5px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #1161ee;
}

#userface:hover {
    width: 55px;
    height: 55px;
}

#header #headerButton {
  margin: 25px;
  padding: 10px 15px;
  float: right;
  text-decoration: none;
  outline: none;
  border: none;
  border-radius: 25px;
  background: #1161ee;
}
</style>