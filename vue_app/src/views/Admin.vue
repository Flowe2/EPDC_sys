<template>
  <div id="header">
    
  </div>

  <div id="display">
    <router-view/>
  </div>
  
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      
    }
  },
  beforeCreate: {
    initLogin: function () {
      this.$router.push('/login');
    }
  }
}
</script>