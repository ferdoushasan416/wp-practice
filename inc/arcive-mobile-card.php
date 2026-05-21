<div class="mobile-card">
    <div class="mobile-card__image media">
        <?php
            $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium' );
        ?>
        <?php if ( $thumbnail ) { 
            echo '<img src="' . esc_url( $thumbnail[0] ) . '" alt="' . esc_attr( get_the_title() ) . '">';
        } ?>
    </div>
    <div class="current-category">
        <?php
            // Get the mobile categories for this post
            $categories = get_the_terms( get_the_ID(), 'mobile-brand' );

            // Check if categories exist and no errors occurred
            if ( $categories && ! is_wp_error( $categories ) ) {
                // Create an empty array to store category names with links
                $category_links = array();

                // Loop through each category and add its name with link to the array
                foreach ( $categories as $category ) {
                    $category_link = get_term_link( $category, 'mobile-brand' );
                    if ( ! is_wp_error( $category_link ) ) {
                        $category_links[] = '<a href="' . esc_url( $category_link ) . '">' . esc_html(
                        $category->name ) . '</a>';
                    }
                }

                // Display all category links separated by commas
                echo implode( ', ', $category_links );
            }
        ?>
    </div>
    <h5 class="mobile-card_title"><?php the_title();?></h5>
    <div class="description">
        <?php the_excerpt();?>
    </div>
    <a href="<?php the_permalink();?>" class="site-btn">Read More</a>
</div>