const selectItems = (state) => state.cart;
const products = (state) => state.products;

const selectItemById = (state, id) => {
  return selectItems(state).find((item) => item.id === id);
};

const selectCartItemsQuantity = (state) => {
  return selectItems(state).filter((item) => item?.quantity > 0);
};

const getAllProductCategories = (state) => {
    const allProducts = state.products.items;
    const categories = [...new Set(allProducts.map(product => product.category))];
    return categories;
};

const getProductsByCategory = (state, category) => {
  if(category){
    const allProducts = state.products.items;
    return allProducts.filter(product => product.category === category)
  }
};

export { selectItems, selectItemById, selectCartItemsQuantity, getAllProductCategories, getProductsByCategory };