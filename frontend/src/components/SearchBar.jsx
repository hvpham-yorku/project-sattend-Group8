const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      class="search-bar"
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
};
export default SearchBar;
