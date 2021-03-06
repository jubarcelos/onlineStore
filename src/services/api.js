export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(url);
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const request = await fetch(url);
  const requestJson = await request.json();
  return requestJson;
}

export async function getByQuery(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const request = await fetch(url);
  const requestJson = await request.json();
  return requestJson.results;
}

export async function getByCategoryId(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const request = await fetch(url);
  const requestJson = await request.json();
  return requestJson.results;
}

export async function getProductById(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const request = await fetch(url);
  const requestJson = await request.json();
  return requestJson;
}
