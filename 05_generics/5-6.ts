interface Container<T> {
  value: T;
}

function getValue<T>(obj: Container<T>) {
  return obj.value;
}
