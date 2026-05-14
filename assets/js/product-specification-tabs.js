/**
 * Product Specification Tabs
 *
 * Handles tab switching functionality for product specifications.
 * Includes draggable scroll and progress bar.
 *
 * @package purple-surgical
 */

(function($) {
	'use strict';

	/**
	 * Initialize specification tabs
	 */
	function initSpecificationTabs() {
		const $tabButtons = $('.specification-tab-button');

		if ($tabButtons.length === 0) {
			return;
		}

		// Handle tab button clicks
		$tabButtons.on('click', function(e) {
			e.preventDefault();

			const $button = $(this);
			const tabId = $button.data('tab');

			// Don't do anything if already active
			if ($button.hasClass('active')) {
				return;
			}

			// Get the parent wrapper to scope changes
			const $wrapper = $button.closest('.specification-tabs-wrapper');

			// Remove active class from all buttons in this wrapper
			$wrapper.find('.specification-tab-button').removeClass('active').attr('aria-selected', 'false');

			// Add active class to clicked button
			$button.addClass('active').attr('aria-selected', 'true');

			// Hide all tab panels in this wrapper
			$wrapper.find('.specification-tab-panel').removeClass('active').attr('aria-hidden', 'true');

			// Show the selected tab panel
			$wrapper.find('#' + tabId).addClass('active').attr('aria-hidden', 'false');
		});

		// Keyboard navigation
		$tabButtons.on('keydown', function(e) {
			const $button = $(this);
			const $wrapper = $button.closest('.specification-tabs-wrapper');
			const $allButtons = $wrapper.find('.specification-tab-button');
			const currentIndex = $allButtons.index($button);
			let $targetButton;

			// Left arrow or up arrow
			if (e.keyCode === 37 || e.keyCode === 38) {
				e.preventDefault();
				if (currentIndex > 0) {
					$targetButton = $allButtons.eq(currentIndex - 1);
				} else {
					$targetButton = $allButtons.last();
				}
			}
			// Right arrow or down arrow
			else if (e.keyCode === 39 || e.keyCode === 40) {
				e.preventDefault();
				if (currentIndex < $allButtons.length - 1) {
					$targetButton = $allButtons.eq(currentIndex + 1);
				} else {
					$targetButton = $allButtons.first();
				}
			}

			// If we have a target button, focus and click it
			if ($targetButton) {
				$targetButton.focus().trigger('click');
			}
		});
	}

	/**
	 * Specification Tabs - Draggable Scroll with Progress Bar
	 * Enables mouse drag and touch scroll for tab navigation
	 */
	function initSpecificationTabsDraggable() {
		const $tabsNav = $('.specification-tabs-nav');
		const $scrollbarThumb = $('.specification-scrollbar-thumb');
		const $scrollbarTrack = $('.specification-scrollbar-track');

		if (!$tabsNav.length) {
			return;
		}

		// Update progress bar based on scroll position
		function updateScrollbar() {
			$tabsNav.each(function() {
				const $nav = $(this);
				const $wrapper = $nav.closest('.specification-tabs-wrapper');
				const $thumb = $wrapper.find('.specification-scrollbar-thumb');
				const $track = $wrapper.find('.specification-scrollbar-track');

				if (!$nav[0] || !$thumb.length || !$track.length) {
					return;
				}

				const scrollWidth = $nav[0].scrollWidth;
				const clientWidth = $nav[0].clientWidth;
				const scrollLeft = $nav[0].scrollLeft;
				const maxScroll = scrollWidth - clientWidth;

				// Check if there's overflow (scrolling is needed)
				const hasOverflow = maxScroll > 0;

				if (!hasOverflow) {
					// No scrolling needed - hide the scrollbar
					$track.removeClass('show');
					return;
				}

				// Show the scrollbar
				$track.addClass('show');

				// Calculate progress percentage
				const progressPercent = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;

				// Set the width of the thumb to show progress
				$thumb.css({
					width: progressPercent + '%'
				});
			});
		}

		// Mouse drag functionality
		$tabsNav.each(function() {
			const $nav = $(this);
			let isDown = false;
			let startX;
			let scrollLeft;
			let hasMoved = false;

			$nav.on('mousedown', function(e) {
				isDown = true;
				hasMoved = false;
				$nav.addClass('dragging');
				startX = e.pageX - $nav.offset().left;
				scrollLeft = $nav.scrollLeft();
			});

			$(document).on('mouseup.specificationTabs', function() {
				isDown = false;
				// Small delay to allow click prevention to work
				setTimeout(function() {
					$nav.removeClass('dragging');
					hasMoved = false;
				}, 10);
			});

			$nav.on('mouseleave', function() {
				isDown = false;
			});

			$nav.on('mousemove', function(e) {
				if (!isDown) return;
				e.preventDefault();
				hasMoved = true;
				const x = e.pageX - $nav.offset().left;
				const walk = (x - startX) * 1.5; // Scroll speed multiplier
				$nav.scrollLeft(scrollLeft - walk);
			});

			// Prevent click on buttons when dragging
			$nav.on('click', 'button', function(e) {
				if (hasMoved) {
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			});

			// Update scrollbar on scroll (real-time progress)
			$nav.on('scroll', updateScrollbar);
		});

		// Update scrollbar on window resize
		$(window).on('resize', function() {
			clearTimeout(window.specificationScrollbarTimeout);
			window.specificationScrollbarTimeout = setTimeout(updateScrollbar, 100);
		});

		// Initial update
		setTimeout(updateScrollbar, 100);
		setTimeout(updateScrollbar, 500);
	}

	/**
	 * Initialize on document ready
	 */
	$(document).ready(function() {
		initSpecificationTabs();
		initSpecificationTabsDraggable();
	});

	/**
	 * Re-initialize on AJAX complete (for dynamic content)
	 */
	$(document).ajaxComplete(function() {
		initSpecificationTabs();
		initSpecificationTabsDraggable();
	});

})(jQuery);

