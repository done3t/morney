import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import nextId from '@/lib/nextId';
import clone from '@/lib/clone';

Vue.use(Vuex);

const tagListName = 'tagList';
const recordListName = 'recordList';
const generateId = nextId();

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    createRecordError: null,
    createTagError: null,
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.find(t => t.id === id);
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(tagListName) || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const tag = state.tagList.find(item => item.id === id);
      if (tag) {
        const names = state.tagList.map(item => item.name);
        if (names.includes(name)) {
          window.alert('标签名重复了');
        } else {
          tag.name = name;
          store.commit('saveTags');
          window.alert('更新成功');
        }
      }
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.includes(name)) {
        state.createTagError = new Error('tag name duplicated');
      }
      const id = generateId.next().value + '';
      state.tagList.push({id, name});
      store.commit('saveTags');
    },
    removeTag(state, id: string) {
      state.tagList = state.tagList.filter(item => item.id !== id);
      store.commit('saveTags');
      router.back();
    },
    saveTags(state) {
      window.localStorage.setItem(tagListName, JSON.stringify(state.tagList));
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(recordListName) || '[]');
    },
    saveRecords(state) {
      window.localStorage.setItem(recordListName, JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const recordReplica = clone(record);
      recordReplica.createdAt = recordReplica.createdAt || new Date().toISOString();
      state.recordList.push(recordReplica);
      store.commit('saveRecords');
    }
  },
  actions: {},
  modules: {}
});
export default store;