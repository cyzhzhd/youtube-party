export default function loadItemFromLocalStorage<T>(itemName: string): T[] {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : [];
}
export function removeItemFromLocalStorage<T extends { id?: number }>(item: T, itemName: string): void {
  const items = loadItemFromLocalStorage<T>(itemName);
  const removingItemIdx = items.findIndex(scrappedItem => scrappedItem.id === item.id);
  if (removingItemIdx >= 0) {
    items.splice(removingItemIdx, 1);
    localStorage.setItem(itemName, JSON.stringify(items));
  }
}

export function addItemOnLocalStorage<T>(item: T, itemName: string): void {
  const items = loadItemFromLocalStorage<T>(itemName);
  removeItemFromLocalStorage<T>(item, itemName);
  items.push(item);
  localStorage.setItem(itemName, JSON.stringify(items));
}
