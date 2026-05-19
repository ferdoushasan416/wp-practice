<?php

$data_source = get_sub_field( 'data_source' );

if ( $data_source === 'manual' ) {

     $posts = get_sub_field( 'manual_posts' ) ?: [];

    foreach ( $posts as $post ) { ?>

        <?php echo get_template_part('inc/post-card'); ?>

    <?php }

} elseif ( $data_source === 'latest' ) {

    $latest     = get_sub_field( 'latest_settings' );
    $post_count = $latest['post_count'] ?? 3;
    $post_order = $latest['post_order'] ?? 'DESC';

    $query = new WP_Query( [
        'post_type'      => 't-shert',
        'posts_per_page' => $post_count,
        'orderby'        => 'date',
        'order'          => $post_order,
        'no_found_rows'  => true,
    ] );

    foreach ( $query->posts as $post ) { ?>
      <?php echo get_template_part("inc/post-card"); ?>
    <?php }

}
 
?>