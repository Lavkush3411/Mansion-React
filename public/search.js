onmessage = (event) => {
  const { products, query } = event.data;
  const searchedData = products.filter((product) => {
    if (product.productDiscription) {
      return (
        product.productName.toLowerCase().includes(query) ||
        product?.productDiscription.toLowerCase().includes(query)
      );
    } else {
      return product.productName.toLowerCase().includes(query);
    }
  });

  postMessage(searchedData);
};
