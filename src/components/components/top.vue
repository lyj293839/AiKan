<style scoped>
</style>
<template>
    <div style="background:white;">
        <div class="main" style="text-align:left;padding-top:10px;">
            <img src="@/assets/image/资源 2@4x@2x.png" width="193" @click="to_home()" style="cursor: pointer;">
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    to_home(){
      this.$router.push({
          path: '/home',
          name:'home'
      });
    },
  }
}
</script>