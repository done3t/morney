<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <ol v-if="groupList.length > 0">
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
    <div v-else class="noResult">
      还没有记录，快去记一笔吧~
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import groupBy from '@/lib/groupBy';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';

@Component({
  components: {Chart, Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  recordTypeList = recordTypeList;

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' :
        tags.map(t => t.name).join('，');
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

    const newList = clone(recordList)
        .filter(item => item.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt), 'day'));
    if (newList.length === 0) {
      return [];
    }
    type Result = {
      title: string;
      total?: number;
      items: RecordItem[];
    }[]
    const result: Result = [];
    const groupMap = groupBy(newList,
        item => dayjs(item.createdAt).format('YYYY-MM-DD'));
    groupMap.forEach((value, key) => {
      const resultItem = {title: key, items: value, total: 0};
      resultItem.total = value.reduce((sum, item) => sum += item.amount, 0);
      result.push(resultItem);
    });
    return result;
  }

  get chartOptions() {
    const keys = Array.from(this.keyValueList.keys());
    const values = Array.from(this.keyValueList.values());
    return {
      grid: {
        right: 20,
        left: 20,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          formatter: (value: string) => value.substring(5)
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: values,
        type: 'line',
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {borderWidth: 1, color: '#666'},
      }],
      tooltip: {
        show: true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      }
    };

  }

  get keyValueList() {
    const today = new Date();
    const result = new Map();
    for (let i = 29; i >= 0; i--) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupList, {title: dateString});
      result.set(dateString, found ? found.total : 0);
    }
    return result;
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

.noResult {
  padding: 16px;
  text-align: center;
}

.chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      //display: none;
    }
  }
}
</style>