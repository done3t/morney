<template>
  <Layout class-prefix="layout">
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>衣000</li>
        <li>食0</li>
        <li>住12</li>
        <li>行</li>
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
        <li>行</li>
      </ul>
      <div class="new">
        <button>新增标签</button>
      </div>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里添加备注"/>
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
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
  </Layout>
</template>

<script lang="ts">
export default {
  name: 'Money'
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  font-size: 14px;
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      background: #d9d9d9;
      $h: 1.6em;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 1em;
      margin-right: 1em;
      margin-top: 0.3em;
    }
  }

  > .new {
    padding-top: 1.2em;

    > button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 0.3em;
    }
  }
}

.notes {
  font-size: 14px;
  height: 64px;
  background: #f5f5f5;
  display: flex;
  align-items: center;

  > .name {
    padding: 0 1.2em;
  }

  > input {
    flex: 1;
    background: transparent;
    border: none;
    padding-right: 1.2em;
  }
}

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
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }

      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>
