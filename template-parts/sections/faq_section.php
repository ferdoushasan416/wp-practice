<?php
    // ACF Fields
    $section_title = get_sub_field('section_title');
    $faqs_wrapper = get_sub_field('faqs_wrapper'); // Repeater Field

?>

<section class="faq-section layout-padding">

    <div class="faq-inner">

        <?php if (!empty($section_title)) : ?>
            <div class="section-title">
                <h3><?php echo esc_html($section_title); ?></h3>
            </div>
        <?php endif; ?>

        <div class="faq-wrapper mt-50">

            <?php foreach ($faqs_wrapper as $faq_item) :

                $faq_question = $faq_item['faq_question'];
                $faq_answer   = $faq_item['faq_answer'];

            ?>

                <div class="faq-box">

                    <?php if (!empty($faq_question)) : ?>
                        <div class="faq-question">
                            <h6><?php echo esc_html($faq_question); ?></h6>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($faq_answer)) : ?>
                        <div class="faq-answer">
                            <?php echo esc_html($faq_answer); ?>
                        </div>
                    <?php endif; ?>

                </div>

            <?php endforeach; ?>

        </div>

    </div>

</section>
