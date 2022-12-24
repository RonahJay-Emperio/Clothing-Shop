import { Link, Route, Routes } from "react-router-dom";
import { LinksWrapper, TitleWrapper, Wrapper } from "./App.styled";

import { Cart } from "../Cart";
import { Products } from "../Products";
import { ClothingShopContext } from "../../useContext";
import { useReducer } from "react";
import { add, initialState, remove, shopReducer, update, updateProduct } from "../../useReducer";
import { Product } from "../../models";
import { Wishlist } from "../WishList";
import { shopData } from "../../data";
import { Checkbox } from "@mui/material";
import { Checkout } from "../Checkout";

export const App = () => {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const ZERO = 0;

  const addToCart = (product: Product) => {
        const isExist = state.products.find((current: { name: string }) =>
      current.name === product.name)

       if (product.count <= ZERO) {
      removeItem(product)
      return;
    }

        if (!isExist) {
      const updatedCart = state.products.concat(product);
      updatePrice(updatedCart);
      dispatch(add(updatedCart));

      return
    }

      state.products.forEach((element: Product) => {
      if (element.name === product.name)
        element.count = product.count
    });

        updatePrice(state.products);
        dispatch(add(state.products));
  }

  const addToWishlist = (wishlist: Product) => {
       shopData.forEach((product: Product) => {
      
           if (product.name == wishlist.name)  
               product.isWishlist = !wishlist.isWishlist

    });

  
    dispatch(add(state.products));
  };


  const removeItem = (product: Product) => {
    const updatedCart = state.products.filter(
      (currentProduct: Product) => currentProduct.name !== product.name
    );

    updatePrice(updatedCart);
    dispatch(remove(updatedCart));
  };

  const updatePrice = (products: [] = []) => {
    let total = ZERO;

    products.forEach((product: { price: number, count: number }) => (
      total += (product.count * product.price)
    ));

    dispatch(update(total));
  };

  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeItem,
    addToWishlist,
  }
  return (
    <ClothingShopContext.Provider value={value}>
      <Wrapper>
        <TitleWrapper>
          <h1>Clothing Shop Starter Project</h1>
        </TitleWrapper>
        <LinksWrapper>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </LinksWrapper>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Wrapper>
    </ClothingShopContext.Provider>
  );
};