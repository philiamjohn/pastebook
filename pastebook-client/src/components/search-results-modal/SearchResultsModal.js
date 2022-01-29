import React, { useEffect, useState } from 'react'
import SearchResult from '../search-result/SearchResult';
import './SearchResultsModal.css';

const SearchResultsModal = (props) => {
    const { searchUser, searchResults } = props;


    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var searchResultsModal = document.getElementById("search-results-modal");

        // Get the button that opens the modal
        var searchButton = document.getElementById("search-button");

        // When the user clicks the button, open the modal 
        searchButton.onclick = async () => {
            searchResultsModal.style.display = "block";
            await searchUser();
        }
    }, []);

    return (
        <div id="search-results-modal" className="search-results-modal">
            <div className="search-results-modal-content">
                <div id="search-results">
                    {
                        searchResults.length >= 1
                            ?
                            searchResults.map((userData) => {
                                return <SearchResult userData={userData} key={userData.User_ID} />
                            })
                            : <p>No user found, try another keyword :(</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchResultsModal;
