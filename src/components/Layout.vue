<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid green;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  border: 1px solid blue;
  overflow: auto;
  flex-grow: 1;
}
</style>