/**
 * Image Gallery Lightbox
 *
 * Professional lightbox functionality for image galleries
 * with keyboard navigation, touch gestures, and smooth animations
 *
 * @package purple-surgical
 */

(function($) {
	'use strict';

	class GalleryLightbox {
		constructor() {
			this.currentIndex = 0;
			this.images = [];
			this.isOpen = false;
			this.touchStartX = 0;
			this.touchEndX = 0;

			this.init();
		}

		init() {
			// Create lightbox HTML
			this.createLightbox();

			// Bind events
			this.bindEvents();
		}

		createLightbox() {
			const lightboxHTML = `
				<div class="ps-lightbox" role="dialog" aria-modal="true" aria-label="Image gallery lightbox">
					<div class="ps-lightbox-overlay"></div>
					<div class="ps-lightbox-container">
						<button class="ps-lightbox-close" aria-label="Close lightbox">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>

						<button class="ps-lightbox-prev" aria-label="Previous image">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M20 24L12 16L20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>

						<button class="ps-lightbox-next" aria-label="Next image">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 24L20 16L12 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</button>

						<div class="ps-lightbox-content">
							<img src="" alt="" class="ps-lightbox-image">
							<div class="ps-lightbox-loader">
								<div class="ps-lightbox-spinner"></div>
							</div>
						</div>

						<div class="ps-lightbox-counter">
							<span class="ps-lightbox-current">1</span> / <span class="ps-lightbox-total">1</span>
						</div>
					</div>
				</div>
			`;

			$('body').append(lightboxHTML);

			// Cache elements
			this.$lightbox = $('.ps-lightbox');
			this.$overlay = $('.ps-lightbox-overlay');
			this.$close = $('.ps-lightbox-close');
			this.$prev = $('.ps-lightbox-prev');
			this.$next = $('.ps-lightbox-next');
			this.$image = $('.ps-lightbox-image');
			this.$loader = $('.ps-lightbox-loader');
			this.$current = $('.ps-lightbox-current');
			this.$total = $('.ps-lightbox-total');
			this.$content = $('.ps-lightbox-content');
		}

		bindEvents() {
			const self = this;

			// Gallery link clicks
			$(document).on('click', '.has-lightbox .gallery-link', function(e) {
				e.preventDefault();
				const $gallery = $(this).closest('.has-lightbox');
				const $links = $gallery.find('.gallery-link');
				const index = $links.index(this);

				// Build images array
				self.images = [];
				$links.each(function() {
					self.images.push({
						url: $(this).attr('href'),
						alt: $(this).attr('aria-label') || ''
					});
				});

				self.open(index);
			});

			// Close button
			this.$close.on('click', () => this.close());

			// Overlay click
			this.$overlay.on('click', () => this.close());

			// Navigation buttons
			this.$prev.on('click', () => this.prev());
			this.$next.on('click', () => this.next());

			// Keyboard navigation
			$(document).on('keydown', (e) => {
				if (!this.isOpen) return;

				switch(e.key) {
					case 'Escape':
						this.close();
						break;
					case 'ArrowLeft':
						this.prev();
						break;
					case 'ArrowRight':
						this.next();
						break;
				}
			});

			// Touch gestures
			this.$content.on('touchstart', (e) => {
				this.touchStartX = e.changedTouches[0].screenX;
			});

			this.$content.on('touchend', (e) => {
				this.touchEndX = e.changedTouches[0].screenX;
				this.handleSwipe();
			});

			// Prevent body scroll when lightbox is open
			this.$lightbox.on('wheel touchmove', (e) => {
				if (this.isOpen) {
					e.preventDefault();
				}
			});
		}

		open(index) {
			this.currentIndex = index;
			this.isOpen = true;

			// Update counter
			this.$total.text(this.images.length);

			// Show lightbox
			this.$lightbox.addClass('is-open');
			$('body').addClass('ps-lightbox-open');

			// Load image
			this.loadImage();
		}

		close() {
			this.isOpen = false;
			this.$lightbox.removeClass('is-open');
			$('body').removeClass('ps-lightbox-open');
		}

		prev() {
			this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
			this.loadImage();
		}

		next() {
			this.currentIndex = (this.currentIndex + 1) % this.images.length;
			this.loadImage();
		}

		loadImage() {
			const image = this.images[this.currentIndex];

			// Show loader
			this.$loader.addClass('is-loading');
			this.$image.css('opacity', '0');

			// Update counter
			this.$current.text(this.currentIndex + 1);

			// Update navigation button states
			this.updateNavButtons();

			// Load new image
			const img = new Image();
			img.onload = () => {
				this.$image.attr('src', image.url);
				this.$image.attr('alt', image.alt);
				this.$loader.removeClass('is-loading');
				this.$image.css('opacity', '1');
			};
			img.onerror = () => {
				this.$loader.removeClass('is-loading');
				console.error('Failed to load image:', image.url);
			};
			img.src = image.url;
		}

		updateNavButtons() {
			// Show/hide navigation buttons based on image count
			if (this.images.length <= 1) {
				this.$prev.hide();
				this.$next.hide();
			} else {
				this.$prev.show();
				this.$next.show();
			}
		}

		handleSwipe() {
			const swipeThreshold = 50;
			const diff = this.touchStartX - this.touchEndX;

			if (Math.abs(diff) > swipeThreshold) {
				if (diff > 0) {
					// Swipe left - next image
					this.next();
				} else {
					// Swipe right - previous image
					this.prev();
				}
			}
		}
	}

	// Initialize lightbox when DOM is ready
	$(document).ready(function() {
		new GalleryLightbox();
	});

})(jQuery);

