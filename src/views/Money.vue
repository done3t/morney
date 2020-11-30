<template>
  <Layout class-prefix="layout" :key="freshKey">
    {{ record }}
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
    <Notes :value.sync="record.notes"/>
    <Types :type.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="submitRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';

const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {
  freshKey = 1
  tags = ['衣', '食', '住', '行', '旅游'];
  recordList: Record[] = recordList;
  record: Record = {
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
    const recordReplica: Record = JSON.parse(JSON.stringify(this.record));
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
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
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


</style>
