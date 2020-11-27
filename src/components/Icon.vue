<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
  },
  computed: {
    svgName() {
      return `#icon-${this.name}`;
    },
  }
};
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