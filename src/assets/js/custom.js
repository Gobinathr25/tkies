/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
	
	 $(document).on('click', '.showhotel', function () {
		$(".flight").hide();
		$(".hotel").show();
		$(".hotelcolor").addClass('active1');
		$(".flightcolor").removeClass('active1');
	});	
	 $(document).on('click', '.showflight', function () {
		$(".hotel").hide();
		$(".flight").show();
		$(".flightcolor").addClass('active1');
		$(".hotelcolor").removeClass('active1');
	});
 $(document).on('click', '.children_minus1', function (e) {	

        e.preventDefault();
        var value = $('.children_input1').val();
        if (value > 0) {
            value--;
        }
        $('.children_input1').val(value);
    });
$(document).on('click', '.children_plus1', function (e) {	
    
        e.preventDefault();
        var value = $('.children_input1').val();
        value++;
        $('.children_input1').val(value);
    });
$(document).on('click', '.adult_minus1', function (e) {	
    
        e.preventDefault();
        var value = $('.adult_input1').val();
        if (value > 1) {
            value--;
        }
        $('.adult_input1').val(value);
    });
$(document).on('click', '.adult_plus1', function (e) {	
   
        e.preventDefault();
        var value = $('.adult_input1').val();
        value++;
        $('.adult_input1').val(value);
    });
$(document).on('click', '.infant_minus1', function (e) {	
    
        e.preventDefault();
        var value = $('.infant_input1').val();
        if (value > 0) {
            value--;
        }
        $('.infant_input1').val(value);
    });
$(document).on('click', '.infant_plus1', function (e) {	
    
        e.preventDefault();
        var value = $('.infant_input1').val();
        value++;
        $('.infant_input1').val(value);
    });

});
$(document).ready(function () {

    (function ($) {
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

        
			$(document).on('click', '.tab ul.tabs li a', function (g) {
            var tab = $(this).closest('.tab'),
                    index = $(this).closest('li').index();

            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');

            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

            g.preventDefault();
        });
    })(jQuery);

});

	   

  // var $owl = $('.owl-carousel');

  // $owl.children().each(function (index) {
      // $(this).attr('data-position', index);
  // });

  // $owl.owlcarousel({
      // center: true,
      // loop: true,
      // items: 5,
  // });

  // $(document).on('click', '.owl-item>div', function () {
      // $owl.trigger('to.owl.carousel', $(this).data('position'));
  // });

    

$(function () {
    $('.datepicker').datepicker();
});

$(document).ready(function() {
  $("#datepicker").datepicker();
  $('.fa-calendar').click(function() {
    $("#datepicker").focus();
  });
});

         


$(document).ready(function () {
	
    $(document).on('click', '.showhotel', function () {
       $(".flight").hide();
       $(".hotel").show();
       $(".hotelcolor").addClass('active1');
       $(".flightcolor").removeClass('active1');
   });	
    $(document).on('click', '.showflight', function () {
       $(".hotel").hide();
       $(".flight").show();
       $(".flightcolor").addClass('active1');
       $(".hotelcolor").removeClass('active1');
   });
$(document).on('click', '.children_minus1', function (e) {	

       e.preventDefault();
       var value = $('.children_input1').val();
       if (value > 0) {
           value--;
       }
       $('.children_input1').val(value);
   });
$(document).on('click', '.children_plus1', function (e) {	
   
       e.preventDefault();
       var value = $('.children_input1').val();
       value++;
       $('.children_input1').val(value);
   });
$(document).on('click', '.adult_minus1', function (e) {	
   
       e.preventDefault();
       var value = $('.adult_input1').val();
       if (value > 1) {
           value--;
       }
       $('.adult_input1').val(value);
   });
$(document).on('click', '.adult_plus1', function (e) {	
  
       e.preventDefault();
       var value = $('.adult_input1').val();
       value++;
       $('.adult_input1').val(value);
   });
$(document).on('click', '.infant_minus1', function (e) {	
   
       e.preventDefault();
       var value = $('.infant_input1').val();
       if (value > 0) {
           value--;
       }
       $('.infant_input1').val(value);
   });
$(document).on('click', '.infant_plus1', function (e) {	
   
       e.preventDefault();
       var value = $('.infant_input1').val();
       value++;
       $('.infant_input1').val(value);
   });

});
$(document).ready(function () {

   (function ($) {
       $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

       
           $(document).on('click', '.tab ul.tabs li a', function (g) {
           var tab = $(this).closest('.tab'),
                   index = $(this).closest('li').index();
 
           tab.find('ul.tabs > li').removeClass('current');
           $(this).closest('li').addClass('current');

           tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slidedown();
           tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideup();


 tab.closest('.textdiv').find('div.hp-slogan').not('div.hp-slogan:eq(' + index + ')').slideUp();
 tab.closest('.textdiv').find('div.hp-slogan:eq(' + index + ')').slideDown();

           g.preventDefault();
       });
   })(jQuery);

});