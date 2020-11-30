<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop(String) name: string | undefined;

  get svgName(): string {
    return `#icon-${this.name}`;
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>