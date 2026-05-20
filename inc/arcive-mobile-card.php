<div class="mobile-phone-card">
     <div class="post-thumbnail media">
          <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail( 'medium' ); // You can use 'thumbnail', 'medium', 'large', or 'full' ?>
        </a>
    </div>
    <h5 class="mobile-phone-card_title"><?php the_title();?></h5>
    <div class="mobile-phone-card_description">
        <?php
        $excerpt = wp_trim_words( get_the_excerpt(), 20 );
         the_excerpt();
         ?>
    </div>
    <a href="<?php the_permalink();?>" class="mobile-phone-card_link">
        Mobile Learn More
    </a>
</div>

