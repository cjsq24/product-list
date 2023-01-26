import { useEffect, useState } from "react";
import axios from "axios";

const useGetProducts = (totalRecordToShow) => {
  const [products, setProducts] = useState();
  const [pagesToShow, setPagesToShow] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios(
          "https://dummyjson.com/products?limit=100"
        );
        setProducts(data.products);
        const totalPages = Math.round(data.products.length / totalRecordToShow);
        getPages(totalPages);
      } catch (e) {}
    };

    getProducts();
  }, []);

  const getPages = (totalPages) => {
    const pagesToShow = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
    setPagesToShow(pagesToShow);
  };

  return { products, pagesToShow };
};

export default useGetProducts;
