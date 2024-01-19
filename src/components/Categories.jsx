function Categories({
  categories,
  filterItems,
  activeCategory,
  displayCartItems,
  setActiveCategory,
  cartItems

}) {
  const numOfItems = cartItems.reduce((acc, cv) => {
    return acc += cv.quantity
  }, 0)
  return (
    <nav>
      {categories.map((category, i) => (
        <button
          onClick={() => filterItems(category)}
          className={`${
            activeCategory === category ? "btn active" : "btn color"
          }`}
          key={i}
        >
          {category.toUpperCase()}
        </button>
      ))}
      <button
        onClick={() => {
          displayCartItems();
          setActiveCategory("");
        }}
        className="cart"
      >
        CART ({numOfItems})
      </button>
    </nav>
  );
}

export default Categories;
