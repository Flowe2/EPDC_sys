<template>
  <div class="home">
    <userLogin></userLogin>
  </div>
</template>

<script>
// @ is an alias to /src
import userLogin from '@/components/userLogin.vue'

export default {
  name: 'Index',
  components: {
    userLogin
  }
}
</script>
