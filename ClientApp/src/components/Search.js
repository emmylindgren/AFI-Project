const Search = ({ searchQuery, setSearchQuery }) => (
        <form action="/" method="get">
            <div className="wrapper">
                <div className="search-icon">
                    <img src="icons/search-icon.svg"></img>
                </div>        
                    <input
                        value={searchQuery}
                        onInput={e => setSearchQuery(e.target.value)}
                        type="text"
                        id="header-search"
                        placeholder="Search events"
                        name="s" 
                    />
            </div>
        </form>
);

export default Search;