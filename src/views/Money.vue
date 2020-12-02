<template>
  <Layout class-prefix="layout" :key="freshKey">
    {{ record }}
    <Tags :value.sync="record.tags"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                v-model="record.notes"/>
    </div>
    <Types :type.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="submitRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/FormItem.vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2';

@Component({
  components: {FormItem, NumberPad, Types, Tags},
})
export default class Money extends Vue {
  freshKey = 1;
  recordList: RecordItem[] = store.recordList;
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  };

  submitRecord() {
    this.createRecord();
    this.resetPanel();
  }

  createRecord() {
    store.createRecord(this.record);
  }

  resetPanel() {
    this.freshKey = Math.random();
    this.record = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped>
.notes {
  padding: 10px 0;
}
</style>
