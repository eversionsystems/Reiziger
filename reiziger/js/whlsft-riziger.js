/**
 * Created by user on 05.05.17.
 */
var wpslResponseData = null;
$(function(){
    // console.log(wpslSettings);
    $( document ).ajaxComplete(function(e,xhr,options) {
        var regex = /.*action=(\w*)/g;;
        var action = regex.exec(options.url);
        action = (action && typeof action[1] != 'undefined')?action[1]:false;
        if(action){
            if(action == 'store_search'){
                $('body, html').animate({'scrollTop': $('#search-location').offset().top - 300})
            }
        }
        // debugger;
    });

})
