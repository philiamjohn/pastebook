import React, { useEffect } from 'react'
import { IoMdSettings } from 'react-icons/io';
import './SearchResultsModal.css';

const SearchResultsModal = () => {
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var searchResultsModal = document.getElementById("search-results-modal");
        var menuModal = document.getElementById("menu-modal");
        var notificationsModal = document.getElementById("notifications-modal");

        // Get the button that opens the modal
        var searchButton = document.getElementById("search-button");

        // When the user clicks the button, open the modal 
        searchButton.onclick = () => {
            searchResultsModal.style.display = "block";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == searchResultsModal) {
                searchResultsModal.style.display = "none";
            }
            else if (event.target == notificationsModal) {
                notificationsModal.style.display = "none";
            }
            else if (event.target == menuModal) {
                menuModal.style.display = "none";
            }
        }
    }, []);

    return (
        <div id="search-results-modal" class="search-results-modal">
            <div class="search-results-modal-content">
                <p>Search result 1</p>
                <p>Search result 2</p>
                <p>Search result 3</p>
                <p>Search result 4</p>
                <p>Search result 5</p>
                <p>Search result 6</p>
                <p>Search result 7</p>
                <p>Search result 8</p>
                <p>Search result 9</p>
                <p>Search result 10</p>
                <p>Search result 11</p>
                <p>Search result 12</p>
                <p>Search result 13</p>
                <p>Search result 14</p>
                <p>Search result 15</p>
                <p>Search result 16</p>
                <p>Search result 17</p>
                <p>Search result 18</p>
                <p>Search result 19</p>
            </div>
        </div>
    );
};

export default SearchResultsModal;
