jQuery(document).ready(function($){ 
  $('.layout-carousel').slick({
  arrows: true,
    prevArrow: `<button class="slick-prev">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	     <path d="M15 18L9 12L15 6" stroke="#420680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
  </button>`,
  nextArrow: `<button class="slick-next">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	    <path d="M9 18L15 12L9 6" stroke="#420680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>`,
  dots: true,
  infinite: true,
  fade: true,
  speed: 300,
  slidesToShow: 1,
  
});
});  
