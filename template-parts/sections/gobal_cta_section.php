<?php 
     $ctaTitle = get_sub_field('cta_title');// acf text field
     $ctaDescription = get_sub_field('cta_description'); // acf wys editior field
     $ctaBtn = get_sub_field('cta_button'); // acf array button field
     $enable_section = get_sub_field('enable_section'); // acf true false field
     $show_button = get_sub_field('show_button'); // acf true false field

	 $background_type = get_sub_field('background_type');// acf button group field

		if($background_type === 'image' ) {
          $bg_image = get_sub_field('cta_bg_image'); // array
		  $section_class = 'bg-type-image';
		}elseif($background_type === 'color') {
          $bg_color = get_sub_field('cta_bg_color'); // color picker with hex value
		  $section_class = 'bg-type-color';
		}

?>

<?php if($enable_section && !empty($enable_section)) :?> 
<section class="global-cta-section layout-padding mt-50 mt-80 pt-50 pb-50 pt-lg-80 pb-lg-80 <?php echo $section_class; ?>" <?php if (!empty($bg_color)) { ?>style="background-color: <?php echo $bg_color; ?>;"<?php } ?>   > 
			 <div class="cta-inner text-center">
                  <div class="cta-content">
					   <div class="cta-title">
					       <h3><?php echo $ctaTitle; ?></h3>
				       </div>
					<div class="cta-description">
						<p><?php echo $ctaDescription; ?></p>
					</div>
				  </div>
                  <?php if ($show_button && !empty($show_button)) :?>
                    <div class="cta-btn">
                        <a href="<?php echo esc_url($ctaBtn['url']); ?>" class="site-btn"> 
                            <span class="btn-text"><?php echo esc_html($ctaBtn['title']);?></span>
                        </a>
                    </div>
                  <?php endif;?>  
			 </div>  
	</section>
    <?php endif;?>