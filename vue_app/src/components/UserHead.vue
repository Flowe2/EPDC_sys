<template>
  <div id="user" v-if="logged">
        <img id="userface" src="https://th.bing.com/th/id/R5fc1b95a05749c8659c86bdb83c5e4ba?rik=Yz1Bt8CFUBtnpg&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0180d358d08cefa801219c77d48d74.jpg%40900w_1l_2o_100sh.jpg&ehk=DELe5Ra3xFL8tE5b%2bNTECROM%2fHsrFwIUDncvTi%2fN2Us%3d&risl=&pid=ImgRaw">
    </div>
</template>

<script>
export default {
    name: 'UserHead',
    data () {
        return {
            
        }
    },
    props: ['logged'],
}
</script>

<style>

</style>