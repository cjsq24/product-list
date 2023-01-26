import React, { Fragment, useEffect, useState } from "react";
import Card from "../../components/card";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { customStyles } from "../../utils/constants";
import useGetProducts from "./hooks/useGetProducts";
import Footer from "./components/footer";
import FillCards from "./components/fillCards";

const totalRecordToShow = 12;
const Dashboard = () => {
  let rowCount = -1;
  const [showModal, setShowModal] = useState(false);
  const [rowBreak, setRowBreak] = useState(4);
  const [productSelected, setProductSelected] = useState();

  const [currentPage, setCurrentPage] = useState(1);

  const { products, pagesToShow } = useGetProducts(totalRecordToShow);

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

  return (
    <div className="container">
      <span className="title">Product List</span>
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
        <FillCards rowBreak={rowBreak} rowCount={rowCount} />
      </div>
      <Footer
        onUpdateRowBreak={onUpdateRowBreak}
        rowBreak={rowBreak}
        setCurrentPage={setCurrentPage}
        pagesToShow={pagesToShow}
      />
    </div>
  );
};

export default Dashboard;
