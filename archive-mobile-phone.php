<?php
/**
 * The template for displaying archive pages
 *
 * @package wp-practice
 */

get_header();
?>

<main id="primary" class="site-main">

    <?php if ( have_posts() ) : ?>

        <header class="page-header">
            <?php
            the_archive_title( '<h1 class="page-title">', '</h1>' );
            the_archive_description( '<div class="archive-description">', '</div>' );
            ?>
        </header><!-- .page-header -->

        <div class="mobile-card-wrapper mt-50">
            <?php while ( have_posts() ) : the_post(); ?>

                <?php get_template_part( 'inc/arcive-mobile-card' ); ?>

            <?php endwhile; ?>
        </div><!-- .mobile-card-wrapper -->

        <?php
        the_posts_pagination([
            'prev_text'          => '<i class="ti ti-arrow-left" aria-hidden="true"></i>',
            'next_text'          => '<i class="ti ti-arrow-right" aria-hidden="true"></i>',
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