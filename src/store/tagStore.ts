import nextId from '@/lib/nextId';

const localStorageKeyName = 'tagList';
const generateId = nextId();

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag(id: string) {
    return this.tagList.find(t => t.id === id);
  },
  createTag(name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.includes(name)) {
      return 'duplicated';
    }
    const id = generateId.next().value + '';
    this.tagList.push({id, name});
    this.saveTags();
    return 'success';
  },
  updateTag(id: string, name: string) {
    const tag = this.tagList.find(item => item.id === id);
    if (tag) {
      const names = this.tagList.map(item => item.name);
      if (names.includes(name)) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  removeTag(id: string) {
    this.tagList = this.tagList.filter(item => item.id !== id);
    this.saveTags();
    return true;
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags();
export default tagStore;
