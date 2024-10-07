let count = 0;
const createTree = (arr, parentId = "") => {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      count++;
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}
const createTreeExport = (arr, parentId = "") => {
  count = 0; // Reset count về 0
  return createTree(arr, parentId);
}
module.exports = createTreeExport