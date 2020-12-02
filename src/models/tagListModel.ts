import nextId from '@/lib/nextId';

const localStorageKeyName = 'tagList';
const generateId = nextId();
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name);
    if (names.includes(name)) {
      return 'duplicated';
    }
    const id = generateId.next().value + '';
    this.data.push({id, name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const tag = this.data.find(item => item.id === id);
    if (tag) {
      const names = this.data.map(item => item.name);
      if (names.includes(name)) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id: string) {
    this.data = this.data.filter(item => item.id !== id);
    this.save();
    return true;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;
