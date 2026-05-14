<?php
$pricing_section = get_sub_field('pricing_section');
$pricing_plans = get_sub_field('pricing_plans'); // ACF repeater field

?>


<section class="pricing-section layout-padding pt-50">
    <div class="pricing-cards-inner">

        <?php if (!empty($pricing_plans)) : ?>
            <?php foreach ($pricing_plans as $pricing_plan) :

                $highlight_features = $pricing_plan['highlight_features']; // acf true flase field
                $plan_name = $pricing_plan['plan_name']; // acf text field
                $plan_price = $pricing_plan['plan_price']; // acf text field
                $pricing_feature_list = $pricing_plan['pricing_feature_list']; // repater field
                $pricing_button = $pricing_plan['pricing_button']; // acf button array field


                if($highlight_features) {
                 $highlight = 'highlight-pricing';
                 }elseif($pricing_plan) {
                     $highlight = '';
                 }
                 
            ?>

            <div class="pricing-card <?php echo $highlight;?>">

                <?php if ($plan_name) : ?>
                    <div class="plan-name">
                        <span><?php echo esc_html($plan_name); ?></span>
                    </div>
                <?php endif; ?>

                <?php if ($plan_price) : ?>
                    <div class="plan-price">
                        <h4><?php echo esc_html($plan_price); ?></h4>
                    </div>
                <?php endif; ?>

                <?php if (!empty($pricing_feature_list)) : ?>
                    <ul class="pricing-list">
                        <?php foreach ($pricing_feature_list as $feature_list) : ?>
                             <li>
                                <img src="<?php echo esc_url($feature_list['pricing_list_icon']); ?>" alt="">
                                <?php echo esc_html($feature_list['pricing_list']); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>

                 <?php if (!empty($pricing_button)) : ?>
                     <a class="pricing-btn" href="<?php echo esc_url($pricing_button['url']); ?>">
                        <?php echo esc_html($pricing_button['title']); ?>
                     </a>
                  <?php endif; ?>
            </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</section>