/**
 * Search Popup Functionality
 * Handles search popup open/close and AJAX search for products and posts
 *
 * @package purple-surgical
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        const $searchButton = $('.search-button');
        const $searchOverlay = $('.search-popup-overlay');
        const $searchPopup = $('.search-popup');
        const $searchClose = $('.search-popup-close');
        const $searchInput = $('.search-popup-input');
        const $searchForm = $('.search-popup-form');
        const $searchResults = $('.search-popup-results');
        
        let searchTimeout;

        /**
         * Open search popup
         */
        function openSearchPopup() {
            $searchOverlay.addClass('is-open');
            $('body').addClass('search-popup-open');
            
            // Focus on input after animation
            setTimeout(function() {
                $searchInput.focus();
            }, 300);
        }

        /**
         * Close search popup
         */
        function closeSearchPopup() {
            $searchOverlay.removeClass('is-open');
            $('body').removeClass('search-popup-open');
            
            // Clear search after closing
            setTimeout(function() {
                $searchInput.val('');
                showEmptyState();
            }, 300);
        }

        /**
         * Show empty state
         */
        function showEmptyState() {
            $searchResults.html('<div class="search-results-empty"><p>Start typing to search...</p></div>');
        }

        /**
         * Show loading state
         */
        function showLoadingState() {
            $searchResults.html('<div class="search-results-loading"><p>Searching...</p></div>');
        }

        /**
         * Perform AJAX search
         */
        function performSearch(query) {
            if (query.length < 2) {
                showEmptyState();
                return;
            }

            showLoadingState();

            $.ajax({
                url: purpleSurgicalSearch.ajaxurl,
                type: 'POST',
                data: {
                    action: 'purple_surgical_search',
                    query: query,
                    nonce: purpleSurgicalSearch.nonce
                },
                success: function(response) {
                    if (response.success) {
                        displayResults(response.data);
                    } else {
                        $searchResults.html('<div class="search-results-empty"><p>No results found.</p></div>');
                    }
                },
                error: function() {
                    $searchResults.html('<div class="search-results-empty"><p>Search error. Please try again.</p></div>');
                }
            });
        }

        /**
         * Display search results
         */
        function displayResults(data) {
            let html = '';
            const currentQuery = $searchInput.val().trim();

            // Products section
            if (data.products && data.products.length > 0) {
                html += '<div class="search-results-section">';
                html += '<h3 class="search-results-heading">Products</h3>';
                html += '<div class="search-results-list">';

                data.products.forEach(function(product) {
                    html += '<a href="' + product.url + '" class="search-result-item">';
                    if (product.image) {
                        html += '<div class="search-result-image"><img src="' + product.image + '" alt="' + product.title + '"></div>';
                    }
                    html += '<div class="search-result-content">';
                    html += '<h4 class="search-result-title">' + product.title + '</h4>';
                    if (product.excerpt) {
                        html += '<p class="search-result-excerpt">' + product.excerpt + '</p>';
                    }
                    html += '</div>';
                    html += '</a>';
                });

                html += '</div></div>';
            }

            // Posts section
            if (data.posts && data.posts.length > 0) {
                html += '<div class="search-results-section">';
                html += '<h3 class="search-results-heading">Posts</h3>';
                html += '<div class="search-results-list">';

                data.posts.forEach(function(post) {
                    html += '<a href="' + post.url + '" class="search-result-item">';
                    if (post.image) {
                        html += '<div class="search-result-image"><img src="' + post.image + '" alt="' + post.title + '"></div>';
                    }
                    html += '<div class="search-result-content">';
                    html += '<h4 class="search-result-title">' + post.title + '</h4>';
                    if (post.excerpt) {
                        html += '<p class="search-result-excerpt">' + post.excerpt + '</p>';
                    }
                    html += '</div>';
                    html += '</a>';
                });

                html += '</div></div>';
            }

            if (html === '') {
                html = '<div class="search-results-empty"><p>No results found.</p></div>';
            } else {
                // Add "View All Results" button if there are results
                const searchUrl = purpleSurgicalSearch.homeurl + '/?s=' + encodeURIComponent(currentQuery);
                html += '<div class="search-view-all">';
                html += '<a href="' + searchUrl + '" class="search-view-all-btn">View All Results</a>';
                html += '</div>';
            }

            $searchResults.html(html);
        }

        // Event: Open search popup
        $searchButton.on('click', function(e) {
            e.preventDefault();
            openSearchPopup();
        });

        // Event: Close search popup
        $searchClose.on('click', function(e) {
            e.preventDefault();
            closeSearchPopup();
        });

        // Event: Close on overlay click
        $searchOverlay.on('click', function(e) {
            if ($(e.target).is('.search-popup-overlay')) {
                closeSearchPopup();
            }
        });

        // Event: Close on ESC key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $searchOverlay.hasClass('is-open')) {
                closeSearchPopup();
            }
        });

        // Event: Search input with debounce
        $searchInput.on('input', function() {
            const query = $(this).val().trim();

            clearTimeout(searchTimeout);

            if (query.length === 0) {
                showEmptyState();
                return;
            }

            searchTimeout = setTimeout(function() {
                performSearch(query);
            }, 500); // 500ms debounce
        });

        // Event: Form submit
        $searchForm.on('submit', function(e) {
            e.preventDefault();
            const query = $searchInput.val().trim();
            if (query.length > 0) {
                performSearch(query);
            }
        });

    });

})(jQuery);

