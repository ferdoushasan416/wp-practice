/**
 * Office Map Interactive Functionality
 *
 * Handles click interactions on map markers (plus icons) to switch between office locations.
 * Clicking a marker activates the corresponding office card and updates the marker states.
 *
 * @package purple-surgical
 */

(function() {
	'use strict';

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeOfficeMap);
	} else {
		initializeOfficeMap();
	}

	function initializeOfficeMap() {
		const mapSections = document.querySelectorAll('.office-map-section');

		if (mapSections.length === 0) {
			return;
		}

		mapSections.forEach(function(section) {
			initializeMapSection(section);
		});
	}

	function initializeMapSection(section) {
		const svg = section.querySelector('.office-map-image svg');
		const officeCards = section.querySelectorAll('.office-card');

		if (!svg || officeCards.length === 0) {
			return;
		}

		// Find all markers in the SVG with class 'marker'
		const markers = svg.querySelectorAll('.marker');

		if (markers.length === 0) {
			console.warn('No markers found in office map SVG');
			return;
		}

		// Add click handlers to markers
		markers.forEach(function(marker) {
			// Make marker clickable
			marker.style.cursor = 'pointer';

			marker.addEventListener('click', function(e) {
				e.preventDefault();

				// Get the office index from data attribute
				const officeIndex = parseInt(marker.getAttribute('data-office-index'), 10);

				if (!isNaN(officeIndex)) {
					switchToOffice(officeIndex, officeCards, markers);
				}
			});
		});

		// Add click handlers to office cards
		officeCards.forEach(function(card, index) {
			card.addEventListener('click', function(e) {
				e.preventDefault();
				switchToOffice(index, officeCards, markers);
			});
		});
	}

	function switchToOffice(index, officeCards, markers) {
		// Remove active class from all cards
		officeCards.forEach(function(card) {
			card.classList.remove('active');
		});

		// Remove active class from all markers
		markers.forEach(function(marker) {
			marker.classList.remove('active');
		});

		// Add active class to selected card
		if (officeCards[index]) {
			officeCards[index].classList.add('active');
		}

		// Add active class to selected marker by finding the one with matching data-office-index
		markers.forEach(function(marker) {
			const markerIndex = parseInt(marker.getAttribute('data-office-index'), 10);
			if (markerIndex === index) {
				marker.classList.add('active');
			}
		});

		// Optional: Scroll card into view on mobile
		if (window.innerWidth < 992 && officeCards[index]) {
			officeCards[index].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		}
	}

})();

