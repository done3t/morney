<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
name: "Types"
}
</script>

<style lang="scss" scoped>
.types {
  font-size: 24px;
  display: flex;
  align-items: center;
  background: #c4c4c4;

  > li {
    flex: 1;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.selected::after {
      content: '';
      height: 4px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #333;
    }
  }
}
</style>