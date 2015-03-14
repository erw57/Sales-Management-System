/**
 * Created by liaokaien on 3/6/15.
 */
$(document).ready(function(){
    $.ajax({

        url: "api/makePayment",
        data: {
            prod_id: '92082938',
            cus_id: '93022',
            salesperson: 'Er',
            quantity: '30',
            price: '2.9',
            time: '2015-02-25',
            location: 'Center Store'
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