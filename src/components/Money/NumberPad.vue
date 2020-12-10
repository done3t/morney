<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons" @click="inputContent">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button @click.stop="remove">删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button @click.stop="clear">清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok" @click.stop="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent ?? '0';
    this.handleDigit(input);
  }

  private handleDigit(input: string) {
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    this.$emit('update:value', Number(this.output));
    this.$emit('submit');
    this.clear();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %innerShadow;
    height: 72px;
    font-size: 36px;
    font-family: $font-mono;
    background: white;
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