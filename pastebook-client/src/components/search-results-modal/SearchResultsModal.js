import React, { useEffect } from 'react'
import SearchResult from '../search-result/SearchResult';
import './SearchResultsModal.css';

const SearchResultsModal = () => {
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var searchResultsModal = document.getElementById("search-results-modal");
        
        // Get the button that opens the modal
        var searchButton = document.getElementById("search-button");

        // When the user clicks the button, open the modal 
        searchButton.onclick = () => {
            searchResultsModal.style.display = "block";
        }
    }, []);

    return (
        <div id="search-results-modal" className="search-results-modal">
            <div className="search-results-modal-content">
                <SearchResult name="Ben Santos" friends/>
                <SearchResult name="John Doe" friends/>
                <SearchResult name="Anna Marie" friends/>
                <SearchResult name="Taylor Swift" friends/>
                <SearchResult name="Justin Bieber" friends/>
                <SearchResult name="Billie Eilish" friends/>
                <SearchResult name="Katy Perry" friends/>
                <SearchResult name="Dua Lipa" friends/>
                <SearchResult name="Nadine Lustre" />
                <SearchResult name="James Reid" />
                <SearchResult name="Kathryn Bernardo" />
                <SearchResult name="Ed Sheeran" />
                <SearchResult name="Bruno Mars" />
                <SearchResult name="Ruel" />
                <SearchResult name="Zayn Malik" />
            </div>
        </div>
    );
};

export default SearchResultsModal;
