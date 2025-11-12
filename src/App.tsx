import CreateProductForm from './ui/forms/createForm';
import ProductsList from './pages/ProductsList';
import ChatbaseWidget from './ui/chatbasewidget/ChatbaseWidget';
import { Routes, Route } from 'react-router-dom';
import Navbar from './ui/navbar/navbar';
import ProductsAdminList from './pages/ProductsAdminList';
import UpdateProdutFormWrapper from './ui/forms/updateProdutFormWrapper';
import ProductCardDelete from './ui/forms/deleteButton';
import { ToastContainer } from "react-toastify";
import ProductPage from './pages/productPage';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer theme='dark' />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/admin/products" element={<ProductsAdminList />} />
        <Route path="/create-form" element={<CreateProductForm />} />
        <Route path="/delete-products" element={<ProductCardDelete />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/:id/edit" element={<UpdateProdutFormWrapper />} />
      </Routes>
      <ChatbaseWidget />
      {/* <Products /> */}
    </div>
  );
}

export default App;
