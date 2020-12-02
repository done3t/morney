<template>
  <Layout class-prefix="layout" :key="freshKey">
    {{ record }}
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
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
import {Component, Watch} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

const recordList: RecordItem[] = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
  components: {FormItem, NumberPad, Types, Tags},
})
export default class Money extends Vue {
  freshKey = 1;
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  };

  submitRecord() {
    this.saveRecord();
    this.resetPanel();
  }

  saveRecord() {
    const recordReplica: RecordItem = recordListModel.clone(this.record);
    recordReplica.createdAt = new Date();
    this.recordList.push(recordReplica);
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

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
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
