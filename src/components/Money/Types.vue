<template>
  <div>
    <ul class="types">
      <li :class="{selected: type === '-'}"
          @click="selectType('-')">支出
      </li>
      <li :class="{selected: type === '+'}"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop(String) readonly type!: string; // '-'表示支出， ‘+’表示收入
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:type', type);
  }
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