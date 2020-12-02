<template>
  <Layout class-prefix="labels">
    <div class="tags">
      <router-link class="tag" :to="`/labels/edit/${tag.id}`"
                   v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag"
              @click="createTag">
        新建标签
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import store from '@/store/index2';

@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = store.tagList;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name?.trim()) {
      const message = store.createTag(name);
      if (message === 'duplicated') {
        window.alert('标签名重复了');
      } else if (message === 'success') {
        window.alert('添加成功');
      }
    }
  }
}
</script>
<style lang="scss">
.labels-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
<style lang='scss' scoped>
.tags {
  background: white;
  font-size: 16px;
  padding: 0 1em;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 1em;
    }
  }
}

.createTag-wrapper {
  align-self: center;
  padding: 16px;
  margin-bottom: 28px;
}
</style>;