<template>
  <div class="numberPad">
    <div class="output">1001</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NumberPad'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: $font-mono;
    display: flex;
    justify-content: flex-end;
    padding: 9px 16px;
  }

  $button-height: 64px;
  $bg: #f2f2f2;

  > .buttons {
    font-size: 18px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-auto-flow: row;

    > button {
      height: $button-height;
      background: transparent;
      border: none;

      &.ok {
        height: $button-height * 2;
        grid-column: 4;
        grid-row: 3 / 5;
      }

      &.zero {
        grid-column: 1 / 3;
        grid-row: 4;
      }

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 3%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 3*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 3*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 3*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 3*5%);
      }

      &:nth-child(12) {
        background: darken($bg, 3*6%);
      }
    }
  }
}
</style>