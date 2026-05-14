<?php 
$cards_title = get_sub_field('cards_title'); // Section Heading
$listing_card_grid = get_sub_field('listing_card_grid'); // acf repeater field
$number_of_column = get_sub_field('number_of_column'); // acf button group field


//acf column count //
 if($number_of_column === '1') {
     $number_of_column_class = 'grid-column-1';
}elseif($number_of_column === '2') {
   $number_of_column_class = 'grid-column-2';
 }elseif($number_of_column === '3') {
    $number_of_column_class = 'grid-column-3';
 }elseif($number_of_column ===  '4') {
     $number_of_column_class = 'grid-column-4';
 }

?>

<section class="listing-card-grid-section pt-50 pb-50 pt-lg-80 pb-lg-80 layout-padding">
     <div class="section-heading text-center">
         <h3><?php echo esc_html($cards_title);?></h3>
     </div>
    <div class="listing-card-grid mt-50 <?php echo $number_of_column_class; ?>">
       <?php
            foreach ($listing_card_grid as $listing_card) {
                $card_icon      = $listing_card['card_icon'];
                $card_title     = $listing_card['card_title'];
                $card_subtitle  = $listing_card['card_subtitle'];
                $card_list      = $listing_card['card_list'];
         ?>
                 <div class="listing-card-grid_card">
                        <?php if (!empty($card_icon)) : ?>
                            <div class="listing-card-grid_card-icon">
                                <img src="<?php echo esc_url($card_icon);?>" alt="">
                            </div>
                        <?php endif; ?>

                        <?php if (!empty($card_title)) : ?>
                            <h5 class="listing-card-gird_card-title">
                                <?php echo esc_html($card_title); ?>
                            </h5>
                        <?php endif; ?>

                        <?php if (!empty($card_subtitle)) : ?>
                            <p class="listing-card-gird_card-subtitle">
                                <?php echo esc_html($card_subtitle); ?>
                            </p>
                        <?php endif; ?>

                        <?php if (!empty($card_list)) : ?>
                            <div class="listing-card-gird_card-list">
                                <?php echo wp_kses_post($card_list); ?>
                            </div>
                        <?php endif; ?>
                 </div>
          <?php } ?>
    </div>
</section>