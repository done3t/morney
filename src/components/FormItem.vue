<template>
  <label class="formItem">
    <span class="name">{{ fieldName }}</span>
    <input v-bind="$attrs"
           :value="value"
           v-on="inputListeners"/>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component({inheritAttrs: false})
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) readonly fieldName!: string;

  get inputListeners(): object {
    return Object.assign({},
        this.$listeners,
        {
          input: (event: InputEvent) => this.$emit('input', (event.target as HTMLInputElement).value)
        });
  }
}
</script>

<style lang="scss" scoped>
.formItem {
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