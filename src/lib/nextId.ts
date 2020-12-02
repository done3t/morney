function* nextId() {
  let id: number = Number(window.localStorage.getItem('_id') || '0') || 0;
  while (true) {
    id++;
    window.localStorage.setItem('_id', id.toString());
    yield id;
  }
}

export default nextId;