function Search({ searchItems, setSearchItems}) {
  return (
    <div className="search-wrapper">
      <input
        className="search"
        value={searchItems}
        placeholder="Search for a meal..."
        onChange={(e) => setSearchItems(e.target.value)}
      />
      {searchItems && <button className="search-clear" onClick={() => setSearchItems("")}>X</button>}
    </div>
  );
}

export default Search;
