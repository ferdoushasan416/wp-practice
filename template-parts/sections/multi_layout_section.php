<?php
$layout_heading = get_sub_field('section_heading');// acf text field
$layout_type = get_sub_field('layout_type');// acf Button Group field
$number_of_column = get_sub_field('number_of_column');// acf Button Group field
$grid_layout_cards = get_sub_field('grid_layout_cards');// acf repeater field
$layout_title = get_sub_field('layout_title');
$layout_subtitle = get_sub_field('layout_subtitle');
// Cards Grid Filed End //

$layout_carousel = get_sub_field('layout_carousel'); // acf repeater field
$layout_carusel_title = get_sub_field('layout_carusel_title'); // acf text field
$layout_carouse_subtitle = get_sub_field('layout_carouse_subtitle'); // acf textarea field


// section class dynamic //
if($layout_type === 'grid') {
    $section_class = 'layout-cards-grid';

    // acf column grid
    if($number_of_column === '1') {
        $number_of_column_class = 'gird-column-1';
    }elseif($number_of_column === '2') {
        $number_of_column_class = 'gird-column-2';
    }elseif($number_of_column === '3') {
        $number_of_column_class = 'gird-column-3';
    }elseif($number_of_column === '4') {
        $number_of_column_class = 'gird-column-4';
    }


}elseif($layout_type === 'carousel') {
     $section_class = 'layout-carousel';
}elseif($layout_type === 'list') {
     $section_class = 'layout-list';
};


?>

<section class="multi-layout-section layout-padding pt-50 pb-50 pt-lg-80 pb-lg-120">

    <div class="section-heading text-center">
        <h3><?php echo esc_html($layout_heading);?></h3>
    </div>
    <div class="multi-layout-cards mt-50 <?php echo esc_attr($section_class); ?> <?php echo esc_attr($number_of_column_class ?? ''); ?>">
           <?php 
               foreach ($grid_layout_cards as $grid_layout_card) {
                    $layout_title = $grid_layout_card['layout_title'];
                    $layout_subtitle = $grid_layout_card['layout_subtitle'];
           ?>
               <div class="grid-layout-card">
                     <?php if (!empty($layout_title)) : ?>
                        <div class="card-layout-title">
                            <h5><?php echo esc_html($layout_title);?></h5>
                        </div>
                    <?php endif; ?>
                    <?php if(!empty($layout_subtitle)): ?>
                        <div class="card-layout-subtitle">
                            <p><?php echo esc_html($layout_subtitle);?></p>
                        </div>
                    <?php endif?>    
               </div>
          <?php } ?>
      </div>
</section>