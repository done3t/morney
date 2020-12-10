<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol>
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">
          <span>{{ beautify(group.title) }}</span>
          <span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import {Component} from 'vue-property-decorator';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import groupBy from '@/lib/groupBy';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;


  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  beautify(dateString: string) {
    const day = dayjs(dateString);
    const now = dayjs();
    const diffDay = day.diff(now, 'day');
    if (diffDay === 0) {
      return '今天';
    } else if (diffDay === -1) {
      return '昨天';
    } else if (diffDay === -2) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupList() {
    const {recordList} = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
        .filter(item => item.type === this.type)
        .sort((a, b) => dayjs(b).diff(dayjs(a)));

    type Result = {
      title: string;
      total?: number;
      items: RecordItem[];
    }[]
    const result: Result = [];
    const groupMap: Map<string, RecordItem[]> = groupBy(newList,
        item => dayjs(item.createdAt).format('YYYY-MM-DD'));
    groupMap.forEach((value, key) => {
      const resultItem = {title: key, items: value};
      resultItem.total = value.reduce((sum, item) => sum += item.amount, 0);
      result.push(resultItem);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>