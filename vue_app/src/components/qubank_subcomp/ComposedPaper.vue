<template>
    使用 Badge | Drawer
    <p>
    {{ chosedCounter }}
    </p>
    <input v-model="test" >
</template>

<script>
export default {
  name: "ComposedPaper",
  data() {
    return {
      test: 1234,
    };
  },
};
</script>

<style scoped>

</style>