jQuery(document).ready(function($) {

    // Perform AJAX login on form submit
    $('#checkout-section4 #login-btn').on('click', function(e){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_login_object.ajaxurl,
            data: { 
                'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                'username': $('div#login #username').val(), 
                'password': $('div#login #password').val(), 
                'security': $('div#login #security').val() },
            success: function(data){
                if (data.loggedin == true){
                    document.location.href = $('div#login #redirect').val();
                }
            }
        });
        e.preventDefault();
    });

});