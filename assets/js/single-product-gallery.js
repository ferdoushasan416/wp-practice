/**
 * Single product gallery slideshow
 *
 * Autoplay slideshow with fade transitions between product images
 */

(function() {
	'use strict';

	function initProductGallery() {
		// Find the product gallery wrapper in product_details_showcase section
		const galleryWrapper = document.querySelector('.product-gallery-wrapper');

		if (!galleryWrapper) {
			return;
		}

		const galleryItems = galleryWrapper.querySelectorAll('.product-gallery-item');

		if (galleryItems.length < 2) {
			return;
		}

		const config = {
			autoplayDelay: 2500,
			transitionDuration: 600,
		};

		setupGalleryStructure(galleryWrapper, galleryItems);
		startAutoplay(galleryItems, config);
	}

	function setupGalleryStructure(wrapper, items) {
		wrapper.classList.add('product-gallery-slideshow');

		items.forEach(function(item, index) {
			item.classList.add('gallery-slide');

			if (index === 0) {
				item.classList.add('active');
			}
		});
	}

	function startAutoplay(items, config) {
		let currentIndex = 0;

		setInterval(function() {
			const nextIndex = (currentIndex + 1) % items.length;

			items[currentIndex].classList.remove('active');
			items[nextIndex].classList.add('active');

			currentIndex = nextIndex;
		}, config.autoplayDelay);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initProductGallery);
	} else {
		initProductGallery();
	}

})();

