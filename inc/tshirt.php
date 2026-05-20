<div class="tshirt-wrapper">
     <div class="post-thumbnail">
           <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail( 'medium' ); // You can use 'thumbnail', 'medium', 'large', or 'full' ?>
        </a>
     </div>
    <h2 class="tshirt_title"><?php the_title();?></h2>
    <div class="tshirt_description">
        <?php the_excerpt();?>
    </div>
    <a href="<?php the_permalink();?>" class="tshirt-ink">
        Learn More
    </a>
</div>
