function Menu({
  menuItems,
  searchItems,
  onAddCartItem,
  addedToCart,
  onRemoveCartItem,
}) {
  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchItems.toLowerCase()) ||
      item.category.toLowerCase().includes(searchItems.toLowerCase())
  );
  return (
    <main className="menu-items">
      {filteredItems.length !== 0 ? (
        filteredItems.map((item) => {
          console.log(item);
          const { id, title, quantity, price, img, desc } = item;
          const capitalizeTitle =
            title.charAt(0).toUpperCase() + title.slice(1);
          return (
            <section className="menu-item" key={id}>
              <div className="item-img">
                <img src={img} alt={id} />
              </div>
              <div className="item-info">
                <div className="menu-title">
                  <h4>{capitalizeTitle}</h4>
                  <h4>{price}</h4>
                </div>
                <p className="menu-desc">{desc}</p>
                <button
                  onClick={
                    addedToCart
                      ? () => onRemoveCartItem(id)
                      : () => onAddCartItem(item)
                  }
                  className="btn-handle"
                >
                  {addedToCart ? "Remove" : "Add to Cart"}
                </button>
                {item.hasOwnProperty("quantity") && (
                  <span className="servings">Servings: {quantity}</span>
                )}
              </div>
            </section>
          );
        })
      ) : (
        <h1>No items exist...</h1>
      )}
    </main>
  );
}

export default Menu;
