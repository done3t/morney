<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected: selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">{{ tag }}
      </li>
    </ul>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) dataSource: string[] | undefined;
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
}
</script>

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
      $bg: #c4c4c4;
      $h: 1.6em;
      line-height: $h;
      border-radius: $h/2;
      color: $bg;
      border: 1px solid $bg;
      padding: 0 1em;
      margin-right: 1em;
      margin-top: 0.3em;

      &.selected {
        background: $bg;
        color: white;
      }
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
</style>