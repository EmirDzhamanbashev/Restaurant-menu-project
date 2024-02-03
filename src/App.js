import "./App.css";
import { data, allCategories } from "./data";
import { useEffect, useState } from "react";
import Categories from "./components/Categories";
import Menu from "./components/Menu";
import Search from "./components/Search";
import logo from "./logo.png";

function App() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState(data);
  const [searchItems, setSearchItems] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const mealsFromStorage = JSON.parse(localStorage.getItem("cartMeals"));
    setCartItems(mealsFromStorage ?? []);
    setCategories(allCategories);
  }, []);

  const filterItems = (category) => {
   
    setActiveCategory(category);
    if (category === "all") {
      setMenuItems(data);
      setAddedToCart(false);
      return;
    }
    const filtered = data.filter((item) => item.category === category);
    setAddedToCart(false);
    setMenuItems(filtered);
  };

  const onAddCartItem = (item) => {
    const ifItemInCart = cartItems.some((meal) => meal.id === item.id);
    if (!ifItemInCart) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      localStorage.setItem(
        "cartMeals",
        JSON.stringify([...cartItems, { ...item, quantity: 1 }])
      );
    } else {
      const updatedMeals = cartItems.map((meal) => {
        if (meal.id === item.id) {
          return { ...meal, quantity: meal.quantity + 1 };
        } else {
          return meal;
        }
      });
      setCartItems(updatedMeals);
      localStorage.setItem("cartMeals", JSON.stringify(updatedMeals));
    }
  };

  const displayCartItems = () => {
    setAddedToCart(true);
    setMenuItems(cartItems);
  };

  const onRemoveCartItem = (id) => {
    let updatedMeals = cartItems.flatMap((meal) => {
      if (meal.id === id) {
        if (meal.quantity > 1) {
          return { ...meal, quantity: meal.quantity - 1 };
        } else {
          return []
        }
      } else {
        return meal;
      }
    });

    setCartItems(updatedMeals);
    setMenuItems(updatedMeals);

    localStorage.setItem("cartMeals", JSON.stringify(updatedMeals));
    // const filtered = cartItems.filter((item) => item.id !== id);
    // setCartItems(filtered);
    // setMenuItems(filtered);
    // localStorage.setItem("cartMeals", JSON.stringify(filtered));
  };

  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" className="logo" />
        <h2>EMRE RESTAURANT</h2>
        <Categories
          categories={categories}
          filterItems={filterItems}
          activeCategory={activeCategory}
          displayCartItems={displayCartItems}
          setActiveCategory={setActiveCategory}
          cartItems={cartItems}
        />
        <Search searchItems={searchItems} setSearchItems={setSearchItems} />
      </header>
      <Menu
        menuItems={menuItems}
        searchItems={searchItems}
        addedToCart={addedToCart}
        onAddCartItem={onAddCartItem}
        onRemoveCartItem={onRemoveCartItem}
      />
    </div>
  );
}

export default App;
