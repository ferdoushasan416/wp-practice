/**
 * Attribute Icon Upload
 *
 * Handles media upload for product attribute icons.
 *
 * @package Purple_Surgical
 */

jQuery(document).ready(function ($) {
	'use strict';

	let mediaUploader;

	// Upload button click
	$('.attribute-icon-upload-button').on('click', function (e) {
		e.preventDefault();

		const $button = $(this);
		const $input = $('#attribute_icon');
		const $preview = $('.attribute-icon-preview');
		const $removeButton = $('.attribute-icon-remove-button');

		// If the uploader object has already been created, reopen the dialog
		if (mediaUploader) {
			mediaUploader.open();
			return;
		}

		// Create the media uploader
		mediaUploader = wp.media({
			title: 'Select Attribute Icon',
			button: {
				text: 'Use this icon'
			},
			multiple: false,
			library: {
				type: ['image']
			}
		});

		// When an image is selected, run a callback
		mediaUploader.on('select', function () {
			const attachment = mediaUploader.state().get('selection').first().toJSON();

			// Set the input value to the attachment ID
			$input.val(attachment.id);

			// Display the image preview
			$preview.html('<img src="' + attachment.url + '" style="max-width: 150px; height: auto;" />');

			// Show remove button
			$removeButton.show();
		});

		// Open the uploader dialog
		mediaUploader.open();
	});

	// Remove button click
	$('.attribute-icon-remove-button').on('click', function (e) {
		e.preventDefault();

		// Clear the input value
		$('#attribute_icon').val('');

		// Clear the preview
		$('.attribute-icon-preview').html('');

		// Hide remove button
		$(this).hide();
	});
});

