<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text"
             placeholder="在这里添加备注"
             v-model="value"/>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
}
</script>

<style lang="scss" scoped>
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
</style>