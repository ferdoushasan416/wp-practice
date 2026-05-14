<?php
$section_title = get_sub_field('section_title'); // text field type
$section_description = get_sub_field('section_description'); // textarea field type
$section_btn = get_sub_field('section_button'); // link field type with array output

$media_position = get_sub_field('media_position');// buttion group field with option left and right
$media_type = get_sub_field('media_type');// button group field with option imgae and video

$image = get_sub_field('image');// acf group field

$image_type = $image ['image_type']; // button group field with option single and gallery
$single_image = $image['single_image']; // image field type with array output
$gallery_images = $image['gallery_images']; // gallery field type with array output

$video = get_sub_field ('video');// acf file field type with array output


if($media_position === 'left') {
    $media_position_class = 'media-left';
}else {
   $media_position_class = 'media-right';
}


?>

<section class="smart-media-section layout-padding pt-50 pb-50">
    <div class="smart-media-grid <?php echo $media_position_class; ?>">
        <div class="smart-section-content">
            <?php if($section_title):?>
                <div class="section-title">
                    <h2><?php echo esc_html($section_title); ?></h2>
                </div>
            <?php endif;?>
            <?php if($section_description):?>
                <div class="section-description">
                    <p><?php echo esc_html($section_description); ?></p>
                </div>
            <?php endif;?>
            
            <?php if( $section_btn ) {
                    $btn_url    = $section_btn['url'];
                    $btn_title  = $section_btn['title'];
                    $btn_target = $section_btn['target'] ? $section_btn['target'] : '_self';
            } ?>
                 <a href="<?php echo esc_url($btn_url); ?>" target="<?php echo esc_attr($btn_target); ?>" 
                    class="site-btn">
                        <span class="btn-text"><?php echo esc_html($btn_title); ?></span>
                        <span class="btn-icon"><?php get_template_part('assets/svgs/angle-right-pagination' , 'page');?></span>
                </a>

        </div>
        <div class="smart-section-media">

            <?php if($media_type === 'image'):?>

                <?php if($image_type === 'single'):?>
                    <?php if($single_image): ?>
                    <div class="single-image media">
                        <img src="<?php echo esc_url($single_image['url']); ?>" alt="<?php echo esc_attr($single_image['alt']); ?>">
                    </div>
                <?php endif;?>   

                <?php elseif($image_type === 'gallery'):?>   
                <div class="gallery-images media column-count-<?php echo esc_attr(count($gallery_images));?>">
                    <?php if($gallery_images): ?>
                            <?php foreach( $gallery_images as $gallery_image ) : ?>
                                <div class="gallery-image">
                                   <img src="<?php echo esc_url($gallery_image['url']); ?>" alt="<?php echo esc_attr($gallery_image['alt']); ?>">
                                </div>
                            <?php endforeach; ?>
                        <?php endif;?>   
                </div>
                <?php endif;?>
            
                <?php elseif($media_type === 'video'): ?>
                <?php if($video): ?>
                        <video controls>
                            <source src="<?php echo esc_url($video['url']); ?>" type="<?php echo esc_attr($video['mime-type']); ?>">
                        </video>
                <?php endif; ?>

            <?php endif;?>      
        </div>
    </div>
</section>