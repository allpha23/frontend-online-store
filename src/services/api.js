export async function getCategories() {
  const URL_API = 'https://api.mercadolibre.com/sites/MLB/categories';

  const response = await fetch(URL_API);
  const categoriesList = await response.json();

  return categoriesList;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL_API = 'https://api.mercadolibre.com/sites/MLB/search?';

  const response = await fetch(`${URL_API}category=${categoryId}&q=${query}`);
  const resultList = await response.json();
  return resultList;
}

export async function getProduct(productId) {
  const URL_API = 'https://api.mercadolibre.com/items/';

  const response = await fetch(`${URL_API}${productId}`);
  const product = await response.json();

  return product;
}
