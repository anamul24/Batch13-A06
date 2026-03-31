import { useState } from "react";
import {ToastContainer, toast} from"react-toastify";
import "react-toastify/dist/ReactToastify.css"
import products from "./products";
import { requestFormReset } from "react-dom";

function App() {
  const [cart, setCart] =useState([]);
  const [activeTab, setActiveTab] =useState("products");
  const [addedButtons, setAddedButtons] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen]= useState(false);
  const addToCart = (product) =>{
    if (cart.find((item)=> item.id === product.id)){
      toast,info("Already in cart!",{position:"top-right"});
      return;
    }
    setCart([...cart, product]);
    setAddedButtons({...addedButtons, [product.id]:true});
    toast.success(`${product.name}added to cart!`,{
      position:"top-right",
      autoClose:2000,
    });
    setTimeout(() =>{
      setAddedButtons((prev) => ({...prev,[product.id]:false}));
    },2000);
  };

  const removeFromCart =(id)=>{
    const item = cart.find((p) => p.id ===id);
    setCart(cart.filter((p)=> p.id !==id));
    toast.error(`${item?.name}remove`, {position:"top-right"});
  };
  const proceedToCheckout =()=>{
    if(cart.length===0)
      return;
    const total =cart.reduce((sum,item)=> sum+item.price, 0);
    toast.success(`Order Successful! total: $${total}`,{
      position:"top-right",
      autoClose: 3000,
    });
    setCart([]);
  };

  const totalPrice=cart.reduce((sum,item) => sum + item.price, 0);

  return (
    <>
      <div className="min-h-screen bg-white font-sans">
        <nav className="border-b bg-white sticky top-0 x-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-purple-600">DigiTools</h1>
              </div>
              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <span className="cursor-pointer hover:text-purple-600">Products</span>
                <span className="cursor-pointer hover:text-purple-600">Features</span>
                <span className="cursor-pointer hover:text-purple-600">Pricing</span>
                <span className="cursor-pointer hover:text-purple-600">Testimonials</span>
                <span className="cursor-pointer hover:text-purple-600">FAQ</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveTab("cart")} className="relative text-2xl p-2 hover:text-purple-600 transition">
                  <img src="image/products/shopping-cart.png" alt="" />
                  {cart.length > 0 &&(
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button className="hidden sm:block text-sm font-medium">Login</button>
                <button className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition">Get Started</button>
                

              </div>
            </div>

          </div>

        </nav>

      </div>
    </>
  )
}

export default App
