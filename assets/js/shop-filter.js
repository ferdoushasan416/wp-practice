/**
 * Product filters
 *
 * Category filtering with active class toggle and URL parameter updates
 *
 * @package Purple_Surgical
 */

(function($) {
    'use strict';

    function getUrlParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        
        return params;
    }

    function buildFilterUrl(taxonomy, term, isActive) {
        const params = getUrlParams();
        let currentValues = params[taxonomy] ? params[taxonomy].split(',').map(v => v.trim()) : [];
        const termStr = String(term).trim();

        if (isActive) {
            if (!currentValues.includes(termStr)) {
                currentValues.push(termStr);
            }
        } else {
            currentValues = currentValues.filter(value => value !== termStr);
        }

        if (currentValues.length > 0) {
            params[taxonomy] = currentValues.join(',');
        } else {
            delete params[taxonomy];
        }

        const baseUrl = window.location.pathname;
        const queryString = Object.keys(params)
            .map(key => {
                const encodedKey = encodeURIComponent(key);
                const encodedValue = params[key].split(',').map(v => encodeURIComponent(v)).join(',');
                return `${encodedKey}=${encodedValue}`;
            })
            .join('&');

        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }

    function initFilterToggle() {
        const $toggleBtn = $('.filter-toggle-btn');
        const $closeBtn = $('.filters-close-btn');
        const $shopGrid = $('.shop-grid');
        const $btnText = $toggleBtn.find('.filter-toggle-text');
        const $filtersLabelText = $toggleBtn.find('.filters-label span:last-child');
        const $iconClose = $toggleBtn.find('.filter-icon-close');
        const $iconShow = $toggleBtn.find('.filter-icon-show');
        const $body = $('body');

        if (!$toggleBtn.length || !$shopGrid.length) {
            return;
        }

        // Update label based on screen size on page load
        function updateLabelForScreenSize() {
            const windowWidth = $(window).width();
            if (windowWidth <= 1199) {
                $filtersLabelText.text('Show Filters');
            } else {
                $filtersLabelText.text('Filters');
            }
        }

        updateLabelForScreenSize();

        $toggleBtn.on('click', function() {
            const windowWidth = $(window).width();

            if (windowWidth > 1199) {
                $shopGrid.toggleClass('filters-hidden');
                const filtersHidden = $shopGrid.hasClass('filters-hidden');

                if (filtersHidden) {
                    $btnText.text('Show filters');
                    $iconClose.hide();
                    $iconShow.show();
                } else {
                    $btnText.text('Hide filters');
                    $iconClose.show();
                    $iconShow.hide();
                }
            } else {
                // Mobile: Open filters and disable body scroll
                $shopGrid.addClass('filters-visible');
                $body.addClass('no-scroll');
            }
        });

        $closeBtn.on('click', function() {
            $shopGrid.removeClass('filters-visible');
            $body.removeClass('no-scroll');
        });

        $shopGrid.on('click', function(e) {
            if ($(e.target).is('.shop-grid.filters-visible')) {
                $shopGrid.removeClass('filters-visible');
                $body.removeClass('no-scroll');
            }
        });

        $(window).on('resize', function() {
            const windowWidth = $(window).width();
            updateLabelForScreenSize();

            if (windowWidth > 1199) {
                $shopGrid.removeClass('filters-visible');
                $body.removeClass('no-scroll');

                if (!$shopGrid.hasClass('filters-hidden')) {
                    $btnText.text('Hide filters');
                    $iconClose.show();
                    $iconShow.hide();
                }
            } else {
                $shopGrid.removeClass('filters-hidden');
                $body.removeClass('no-scroll');
                $btnText.text('Hide filters');
                $iconClose.show();
                $iconShow.hide();
            }
        });
    }



    function initFilterAccordion() {
        $('.filter-group-title').on('click', function() {
            const $title = $(this);
            const $filterList = $title.next('.filter-list');

            $filterList.slideToggle(300);
            $title.toggleClass('collapsed');
        });
    }



    function initFilters() {
        $('.filter-link').on('click', function(e) {
            const $filterLink = $(this);

            // Don't process if button is disabled
            if ($filterLink.is(':disabled')) {
                return false;
            }

            const taxonomy = $filterLink.data('taxonomy');
            const term = $filterLink.data('term');

            // If no taxonomy/term data, let the link work normally (e.g., "All Products" link)
            if (!taxonomy || !term) {
                return true; // Allow default link behavior
            }

            // Prevent default for filter buttons only
            e.preventDefault();

            const isActive = !$filterLink.hasClass('active'); // Toggle active state

            const newUrl = buildFilterUrl(taxonomy, term, isActive);
            window.location.href = newUrl;
        });
    }

    $(document).ready(function() {
        initFilters();
        initFilterToggle();
        initFilterAccordion();
    });

})(jQuery);

