<template>
  <label class="formItem">
    <span class="name">{{ fieldName }}</span>
    <template v-if="type === 'date'">
      <input :type="type"
             :value="formatDate(value)"
             v-bind="$attrs"
             v-on="inputListeners"/>
    </template>
    <template v-else>
      <input :type="type"
             :value="value"
             v-bind="$attrs"
             v-on="inputListeners"/>
    </template>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component({inheritAttrs: false})
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) readonly fieldName!: string;
  @Prop({default: 'text'}) type?: string;

  get inputListeners(): object {
    return Object.assign({},
        this.$listeners,
        {
          input: (event: InputEvent) => this.$emit('input', (event.target as HTMLInputElement).value)
        });
  }

  formatDate(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  height: 44px;
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