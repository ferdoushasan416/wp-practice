    <?php
	    $heroTitle = get_sub_field('hero_title');
	    $heroDescription = get_sub_field('hero_description');
		$heroBtn = get_sub_field('hero_button');

		$background_type = get_sub_field('background_type');

		if($background_type === 'image' ) {
          $bg_image = get_sub_field('hero_bg_image'); // array
		  $section_class = 'bg-type-image';
		}elseif ($background_type === 'video') {
          $bg_video = get_sub_field('hero_video'); // field type array
		  $section_class = 'bg-type-video';
		}elseif($background_type === 'color') {
          $bg_color = get_sub_field('hero_bg_color'); // color picker with hex value
		  $section_class = 'bg-type-color';
		}
	?>

	
    <?php $pagebuttonVisibillty = get_sub_field('show_button'); // true false field ?>
    <?php if($pagebuttonVisibillty == true): ?>
		 <div class="hero-btn">
			<?php get_sub_field('show_button');?>	
		 </div>
	<?php endif;?>

   <section class="hero-section layout-padding pt-50 pb-50 <?php echo $section_class; ?>" <?php if (!empty($bg_color)) { ?>style="background-color: <?php echo $bg_color; ?>;"<?php } ?>   > 
			 <div class="hero-inner">
                  <div class="hero-content">
					   <div class="hero-title">
					       <h1><?php echo $heroTitle; ?></h1>
				       </div>
					<div class="hero-description">
						<p><?php echo $heroDescription; ?></p>
					</div>
				  </div>
                 <div class="hero-btn">
					   <a href="<?php echo esc_url($heroBtn['url']); ?>" class="site-btn"> 
						  <span class="btn-text"><?php echo esc_html($heroBtn['title']);?></span>
						  <span class="btn-icon">
							  <?php get_template_part('assets/svgs/angle-right-pagination');?>
						  </span>
					   </a>
				 </div>
			 </div>  
	</section>