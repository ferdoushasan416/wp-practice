<?php
/**
 * The template for displaying archive pages
 *
 * @package wp-practice
 */
   
get_header();
?>

<main id="primary" class="site-main layout-padding">

    <?php if ( have_posts() ) : ?>

        <header class="page-header mt-50">
            <?php
            the_archive_title( '<h1 class="page-title">', '</h1>' );
            the_archive_description( '<div class="archive-description">', '</div>' );
            ?>
        </header><!-- .page-header -->

        <div class="mobile-archive-navigation mt-50">
            <ul>
                <li><a href="<?php echo esc_url( site_url('/mobile-phone') );?>"><?php esc_html_e( 'All', 'practice' ); ?></a></li>
                    <?php
                            $terms = get_terms( array(
                                'taxonomy'   => 'mobile-brand',
                                'hide_empty' => true,
                            ) );

                            if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
                                foreach ( $terms as $term ) {
                                    echo '<li><a href="' . esc_url( get_term_link( $term ) ) . '">' . esc_html( $term->name ) . '</a></li>';
                                }
                            }
                    ?>
             </ul>
        </div>

        <div class="mobile-card-wrapper">
            <?php while ( have_posts() ) : the_post(); ?>

                <?php get_template_part( 'inc/arcive-mobile-card' ); ?>

            <?php endwhile; ?>
        </div><!-- .mobile-card-wrapper -->

        <?php
        the_posts_pagination([
            'prev_text'          => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="#420680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'next_text'          => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="#420680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'mid_size'           => 2,
            'screen_reader_text' => ' ',
        ]);
        ?>

    <?php else : ?>

        <?php get_template_part( 'template-parts/content', 'none' ); ?>

    <?php endif; ?>

</main><!-- #main -->

<?php
get_sidebar();
get_footer();