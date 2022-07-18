export const getSavedItemIds = () => {
    const savedItemIds = localStorage.getItem('saved_items')
      ? JSON.parse(localStorage.getItem('saved_items'))
      : [];
  
    return savedItemIds;
  };
  
  export const saveItemIds = (itemIdArr) => {
    if (itemIdArr.length) {
      localStorage.setItem('saved_items', JSON.stringify(itemIdArr));
    } else {
      localStorage.removeItem('saved_items');
    }
  };
  
  export const removeItemId = (_id) => {
    const savedItemIds = localStorage.getItem('saved_items')
      ? JSON.parse(localStorage.getItem('saved_items'))
      : null;
  
    if (!savedItemIds) {
      return false;
    }
  
    const updatedsavedItemIds = savedItemIds?.filter((saveditemId) => saveditemId !== _id);
    localStorage.setItem('saved_items', JSON.stringify(updatedsavedItemIds));
  
    return true;
  };