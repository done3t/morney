import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const recordReplica: RecordItem = clone(record);
    recordReplica.createdAt = new Date();
    this.recordList.push(recordReplica);
    recordStore.saveRecords();
  }
};

recordStore.fetchRecords();
export default recordStore;