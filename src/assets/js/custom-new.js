






$(document).ready(function () {
	
	
$('.children_minus1').click(function (e) {
        e.preventDefault();
        var value = $('.children_input1').text();
        if (value > 0) {
            value--;
        }
        $('.children_input1').text(value);
		calculatePassenger();
    });

    $('.children_plus1').click(function (e) {
        e.preventDefault();
        var value = $('.children_input1').text();
        value++;
        $('.children_input1').text(value);
		calculatePassenger();
    });

    $('.adult_minus1').click(function (e) {
        e.preventDefault();
        var value = $('.adult_input1').text();
        if (value > 1) {
            value--;
        }
        $('.adult_input1').text(value);
		calculatePassenger();
    });

    $('.adult_plus1').click(function (e) {
        e.preventDefault();
        var value = $('.adult_input1').text();
        value++;
        $('.adult_input1').text(value);
		calculatePassenger();
    });

    $('.infant_minus1').click(function (e) {
        e.preventDefault();
        var value = $('.infant_input1').text();
        if (value > 0) {
            value--;
        }
        $('.infant_input1').text(value);
		calculatePassenger();
    });

    $('.infant_plus1').click(function (e) {
        e.preventDefault();
        var value = $('.infant_input1').text();
        value++;
        $('.infant_input1').text(value);
		calculatePassenger();
    });
	
               
            
  $("input[type='radio'][name='exampleRadios']").on('change', function() {
    selectedVal = this.value;
	calculatePassenger(selectedVal);
  });

	
	
function calculatePassenger(radioValue) {
    var person = 0;
	  var radioValue = $("input[type='radio'][name='exampleRadios']:checked").val();
        person = parseInt(person) + parseInt($('.children_input1').text()) + parseInt($('.adult_input1').text()) + parseInt($('.infant_input1').text());
      
    var _selectText =  parseInt(person) + ' Passengers'+','+ (radioValue);
    $("#select_psngr").val(_selectText);
	    

   
}	
	

});
 
 

