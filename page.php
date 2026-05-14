<?php

// Template Name: Homepage

 get_header(); while(have_posts()): the_post(); ?>

	<?php if( have_rows('cms') ): ?>
		<?php while ( have_rows('cms') ) : the_row();

			$layout = get_row_layout();
			get_template_part('template-parts/sections/' . $layout);
            
		endwhile;
	else:
         get_template_part('template-parts/content-page');

 	endif; ?>

	

<?php get_footer(); endwhile; ?>