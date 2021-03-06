type KeyGetter<T> = (item: T) => string

function groupBy<T, K extends keyof T>(list: Array<T>, keyGetter: KeyGetter<T>): Map<string, Array<T>> {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export default groupBy;