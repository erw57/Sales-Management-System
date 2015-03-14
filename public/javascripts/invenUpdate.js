/**
 * Created by liaokaien on 3/6/15.
 */

$(document).ready(function(){
    $.ajax({
        url: "api/updateInventory",
        data: {
           prod_id :'92082939',
           store_name: 'Center Store',
           amount : '+395'
        },

        // Whether this is a POST or GET request
        type: "POST",
        // The type of data we expect back
        dataType : "json",
        // Code to run if the request succeeds;
        // the response is passed to the function

        success: function( res ) {
            console.log(res);

        },

        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: function( xhr, status, errorThrown ) {
            alert( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        },
        complete: function( xhr, status ) {
            console.log( "The request is complete!" );
        }
    });

});

