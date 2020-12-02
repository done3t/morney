<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <div class="rightIcon"></div>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <Button class="remove-btn" @click="remove">删除标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/FormItem.vue';
import Button from '@/components/Button.vue';
import store from '@/store/index2';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;

  created() {
    const id = this.$route.params.id;
    this.tag = store.findTag(id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }

  remove() {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.goBack();
      } else {
        window.alert('删除失败');
      }
    }
  }

  goBack() {
    console.log('go:back:');
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
.navBar {
  font-size: 16px;
  padding: 0.75em 1em;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon, > .rightIcon {
    width: 1.5em;
    height: 1.5em;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.remove-btn {
  position: fixed;
  bottom: 96px;
  left: 50%;
  transform: translateX(-50%);
}
</style>