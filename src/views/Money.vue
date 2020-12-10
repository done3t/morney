<template>
  <Layout class-prefix="layout" :key="freshKey">
    <Tags :value.sync="record.tags"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                v-model="record.notes"/>
    </div>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="submitRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/FormItem.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, FormItem, NumberPad, Tags},
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  freshKey = 1;
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  };

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  submitRecord() {
    this.createRecord();
    // this.resetPanel();
  }

  createRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('记录成功');
      this.record.notes = '';
    }
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
