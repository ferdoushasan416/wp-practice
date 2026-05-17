<?php 
$tesimonial_section = get_sub_field('tesimonial_section'); //Section Name
$testimonial_title = get_sub_field('testimonial_title'); //acf text field
$testimonial_layout = get_sub_field('testimonial_layout'); //acf button group field
$show_rating = get_sub_field('show_rating'); // true false acf field
$show_avatar = get_sub_field('show_avatar'); // true false acf field
$testimonial_boxes = get_sub_field('testimonial_boxes'); // acf repeater field



// section class dynamic //
if($testimonial_layout === 'grid') {
    $layout_section_class = 'testimonial-grid';
} elseif($testimonial_layout === 'carousel') {
     $layout_section_class = 'testimonial-carousel'; 
}

?>


<section class="testimonial-section pt-80 pb-80 layout-padding">
     <div class="section-heading text-center">
         <h3><?php echo esc_html($testimonial_title);?></h3>
     </div>
    <?php if($testimonial_boxes): ?>
     <div class="testimonial-wrapper mt-30 <?php echo esc_attr($layout_section_class) ; ?>">
             <?php 
                foreach($testimonial_boxes as $tesimonial_box):
                  $testimonial_rating =  $tesimonial_box['testimonial_rating'];  // acf image url field
                  $testimonial_content = $tesimonial_box['testimonial_content']; // acf wys editor field
                  $testimonial_avatar = $tesimonial_box['testimonial_avatar']; // acf text field
                  $client_name = $tesimonial_box['client_name']; // acf text field
                  $client_description = $tesimonial_box['client_description']; // acf text field
              ?>
              
               <div class="testimonial-box">
                   <?php if ($show_rating && !empty($testimonial_rating)) : ?>
                       <div class="testimonial-rating">
                             <img src="<?php echo esc_url($testimonial_rating); ?>" alt="">
                       </div>
                   <?php endif;?>

                   <?php if(!empty($testimonial_content)): ?>
                        <div class="testimonial-content">
                           <p><?php echo esc_html($testimonial_content); ?></p>
                        </div>
                    <?php endif; ?>

                    <div class="testimonial-author">
                        <?php if ($show_avatar && !empty($testimonial_avatar)) :?>
                            <div class="tesimonial-avater">
                                <span><?php echo esc_html($testimonial_avatar); ?></span>
                            </div>
                        <?php endif; ?>
                           <div class="testimonial-info">
                                <?php if(!empty($client_name)): ?>
                                     <h5><?php echo esc_html($client_name); ?></h5>
                                <?php endif; ?>

                                <?php if(!empty($client_description)): ?>
                                      <span><?php echo esc_html($client_description); ?></span>
                               <?php endif; ?>
                           </div>
                    </div>
               </div>


            <?php endforeach; ?>  
        </div>
         <?php endif;?>   
</section>