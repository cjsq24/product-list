import React, { Fragment, useEffect, useState } from "react";
import Card from "../../components/card";
import axios from "axios";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    width: "50%",
  },
};

const totalRecordToShow = 12;
const Dashboard = () => {
  let rowCount = -1;
  const [showModal, setShowModal] = useState(false);
  const [rowBreak, setRowBreak] = useState(2);
  const [products, setProducts] = useState();
  const [productSelected, setProductSelected] = useState();
  const [pagesToShow, setPagesToShow] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios("https://dummyjson.com/products");
        setProducts(data.products);
        const totalPages = Math.round(data.products.length / totalRecordToShow);
        getPages(totalPages);
      } catch (e) {}
    };

    getProducts();
  }, []);

  const selectProduct = (product) => {
    setShowModal(true);
    setProductSelected(product);
  };

  const onUpdateRowBreak = (value) => {
    if (typeof Number(value) === "number") {
      setRowBreak(Number(value));
      rowCount = -1;
    }
  };

  const getPages = (totalPages) => {
    const pagesToShow = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
    setPagesToShow(pagesToShow);
  };

  return (
    <div className="container">
      <h1 style={{ marginLeft: 10 }}>Product List</h1>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <Carousel>
          {productSelected?.images?.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                style={{ width: "100%", maxHeight: 500, objectFit: "contain" }}
              />
            </div>
          ))}
        </Carousel>
      </Modal>

      <div className="content">
        {products
          ?.slice(
            currentPage * totalRecordToShow - totalRecordToShow,
            currentPage * totalRecordToShow
          )
          ?.map((product) => {
            rowCount = rowCount === rowBreak ? 1 : rowCount + 1;
            return (
              <Fragment key={product.title}>
                {rowCount === rowBreak && <div className="break" />}
                <Card
                  title={product.title}
                  brand={product.brand}
                  images={product.images}
                  thumbnail={product.thumbnail}
                  onClick={() => selectProduct(product)}
                />
              </Fragment>
            );
          })}
        {(rowBreak - rowCount - 1)
          .toString()
          .repeat(rowBreak - rowCount - 1)
          .split("")
          .map((value, idx) => (
            <div key={idx} style={{ flex: 1 }}></div>
          ))}
      </div>
      <footer className="footer-container">
        <div className="group">
          <label>Productos por fila</label>
          <input
            value={rowBreak}
            onChange={(e) => onUpdateRowBreak(e.target.value)}
          />
        </div>
        <div className="group" style={{ marginLeft: 5 }}>
          <label>Página</label>
          <select onChange={(e) => setCurrentPage(e.target.value)}>
            {pagesToShow?.map((value, idx) => (
              <option key={idx} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
