import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import products from "./data/products";
import userIcon from "./assets/user.png";
import boxIcon from "./assets/package.png";
import rocketIcon from "./assets/rocket.png";
import bannerImg from "./assets/banner.png";
import cartIcon from "./assets/shopping-cart.png";
import checkIcon from "./assets/check.png";

function App() {
  const [cart, setCart] =useState([]);
  const [activeTab, setActiveTab] =useState("products");
  const [addedButtons, setAddedButtons] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen]= useState(false);
  const addToCart = (product) =>{
    if (cart.find((item)=> item.id === product.id)){
      toast.info("Already in cart!", { position: "top-center" });
      return;
    }
    setCart([...cart, product]);
    setAddedButtons({...addedButtons, [product.id]:true});
    toast.success(`${product.name} added to cart!`,{ 
      position: "top-center", 
      autoClose: 2000,
    });
    setTimeout(() =>{
      setAddedButtons((prev) => ({...prev,[product.id]:false}));
    },2000);
  };

  const removeFromCart =(id)=>{
    const item = cart.find((p) => p.id ===id);
    setCart(cart.filter((p)=> p.id !==id));
    toast.error(`${item?.name} removed`, { position: "top-center" });
  };
  const proceedToCheckout =()=>{
    if(cart.length===0)
      return;
    const total =cart.reduce((sum,item)=> sum+item.price, 0);
    toast.success(` Order Successful! total: $${total}`, {
      position: "top-center",
      autoClose: 3000,
    });
    setCart([]);
  };

  const totalPrice=cart.reduce((sum,item) => sum + item.price, 0);

  return (
    <>
    
      <div className="min-h-screen bg-white font-sans">
        <nav className="border-b bg-white sticky top-0 z-50">
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
                  <img src={cartIcon} alt="" />
                  {cart.length > 0 &&(
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button className="hidden sm:block text-sm font-medium">Login</button>
                <button className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition">Get Started</button>

                <button onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-2xl"></button>

              </div>
            </div>
            
            {isMobileMenuOpen && (
              <div className=" md:hidden mt-4 py-4 border-t flex flex-col gap-4 text-sm font-medium">
              <span className="cursor-pointer hover:text-purple-600">Products</span>
              <span className="cursor-pointer hover:text-purple-600">Features</span>
              <span className="cursor-pointer hover:text-purple-600">Pricing</span>
              <span className="cursor-pointer hover:text-purple-600">Testimonials</span>
              <span className="cursor-pointer hover:text-purple-600">FAQ</span>
              <button className="text-left">Login</button>
            </div>
            )}
          </div>
        </nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-20">
              <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm mb-6 mx-auto md:mx-0">
                    <p>New: Ai-powered Tools Available</p>
                  </div> 
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">Supercharge Your <br />Digital Workflow</h1>
                  <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-md mx-auto md:mx-0">Access premium AI tools, design assets, templates, and productivity software - all in one place.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button onClick={() => setActiveTab("products")} className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition">Explore Products</button>
                    <button className="border border-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-400 transition">Watch Demo</button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img src={bannerImg} />
                </div>
              </div>
            </div>
            <div className="bg-purple-600 py-12 md:py-14 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-3 gap-6 md:gap-8 text-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold">50K+</h2>
                  <p className="text-purple-100 mt-2 text-sm md:text-base">Active Users</p>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold">200+</h2>
                  <p className="text-purple-100 mt-2 text-sm md:text-base">Premium Tools</p>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold">4.9</h2>
                  <p className="text-purple-100 mt-2 text-sm md:text-base">Rating</p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">Premium Digital Tools</h2>
                <p className="text-gray-600 mt-3 text-sm md:text-base">Choose from our curated collection of premium digital products</p>
              </div>

              <div className="flex justify-center gap-3 md:gap-4 mb-12 border-gray-400 rounded-full">
                <button onClick={()=> setActiveTab("products")} className={`px-8 py-3 rounded-full font-semibold transition text-sm md:text-base ${activeTab ==="products"?"bg-purple-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Products</button>

                <button onClick={()=> setActiveTab("cart")} className={`px-8 py-3 rounded-full font-semibold transition text-sm md:text-base ${activeTab ==="cart"?"bg-purple-600 text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Cart({cart.length})</button>
              </div>


              {activeTab === "products" &&(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {products.map((product)=>{
                    const isAdded =addedButtons[product.id];
                    return(
                      <div key={product.id} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start mb-6">
                          <div className="text-5xl">{product.icon}</div>
                          {product.tag &&(
                            <div className={`text-xs font-bold px-4 py-1.5 rounded-full ${product.tagType ==="best" ?"bg-amber-100 text-amber-700" : product.tagType ==="popular"?"bg-purple-100 text-purple-700":
                            "bg-emerald-100 text-emerald-700"
                            }`}>
                            {product.tag}
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{product.description}</p>

                        <div className="mb-8">
                          <span className="text-3xl md:text-4xl font-bold">${product.price}</span>
                          <span className="text-gray-500">/{product.period}</span>
                        </div>
                        <ul className="space-y-2 mb-8 text-sm">
                          {product.features.map((feature, i)=>(
                          <li key={i} className="flex items-start gap-2">
                            <img src={checkIcon} alt="" className="w-4 h-4 mt-1" />{feature}
                          </li>
                          ))}
                        </ul>
                        <button onClick={() => addToCart(product)} className={`w-full py-4 rounded-2xl font-semibold transition-all text-sm md:text-base ${ isAdded ?"bg-green-500 text-white":"bg-purple-600 hover:bg-purple-700 text-white"}`}>{isAdded ? "Added to Cart":"Buy Now"}</button>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab==="cart" &&(
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold">Peemium Digital Tools</h2>
                    <p className="text-gray-600 mt-2">Choose from our curated collection</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8">
                    <h3 className="font-semibold text-xl mb-6">Your Cart</h3>
                    {cart.length===0?(
                      <div className="justify-between text-center py-20 text-gray-400">
                        <span>Your cart is empty </span><img src="src/assets/shopping-cart.png" alt="" />
                      </div>):(
                        <>
                        <div className="space-y-4 mb-10">
                          {cart.map((item)=>(
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-5 rounded-2xl gap-4">
                              <div className="flex items-center gap-4">
                                <span className="text-4xl">{item.icon}</span>
                                <div>
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-gray-600">${item.price}</p>
                                </div>
                              </div>
                              <button onClick={()=> removeFromCart(item.id)} className="text-red-600 hover:text-red-800 font-medium self-end sm:self-auto">Remove</button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xl font-bold mb-8 border-t pt-6">
                          <span>Total</span>
                          <span>${totalPrice}</span>
                        </div>
                        <button onClick={proceedToCheckout} className="bg-purple-600 hover:bg-purple-700 w-full py-5 rounded-2xl text-white text-lg font-semibold transition">Proceed to Checkout</button>
                        </>
                      )}
                  </div>
                </div>
              )}

            </div>


            <div className="bg-gray-100 py-16 md:py-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started In 3 Steps</h2>
                <p className="text-gray-600 mb-12">Start using premium digital tools in minutes, not hours.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { num: "01", icon: userIcon, title: "Create Account", desc: "Sign up for free in seconds. No credit crd required" },
                    { num: "02", icon: boxIcon, title: "Choose Products", desc: "Browse our catalog and select the tools that fit your needs" },
                    { num: "03", icon: rocketIcon, title: "Start Creating", desc: "Download and start using your premium tools immediately" }
                  ].map((step, i) => (
                    <div key={i} className="bg-white rounded-3xl p-8 shadow-sm">
                      <div className="w-16 h-15 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center text-4xl mb-6"><img src={step.icon} alt={step.title} className="w-8 h-8 object-contain" /></div>
                      <div className="text-purple-600 font-bold mb-3">STEP {step.num}</div>
                      <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                  ))}

                </div>
              </div>
            </div> 


            
      </div>
      <ToastContainer position="top-center" autoClose={2000}/>
    </>
  );
}

export default App
