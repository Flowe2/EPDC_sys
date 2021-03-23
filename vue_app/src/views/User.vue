<template>
    <div id="header">
      <button id="headerButton">
        <router-link to="/admin/login">管理员登陆</router-link>
      </button>
    </div>
    <div id="display">
       <UserLogin></UserLogin> 
    </div>
</template>

<script>
import UserLogin from '@/components/UserLogin.vue'

export default {
    name: 'User',
    data () {
        return {
            
        }
    },
    methods: {
        
    },
    components: {
        UserLogin,

    }
}
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