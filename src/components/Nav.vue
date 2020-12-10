<template>
  <nav>
    <router-link to="/money" class="item">
      <Icon name="money"/>
      记账
    </router-link>
    |
    <router-link to="/labels" class="item">
      <Icon name="label"/>
      标签
    </router-link>
    |
    <router-link to="/statistics" class="item">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  background: white;

  > .item {
    padding: 2px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .svg-icon {
      width: 2.5em;
      height: 2.5em;
    }
  }

  > .item.router-link-active {
    color: $red;
  }
}
</style>