/**
 * Created by liaokaien on 3/6/15.
 */
$(document).ready(function(){
    $.ajax({
        url: "api/addNewCustomer",
        data: {
            name: 'Sam',
            age: 56,
            gender: 'M',
            kind: 'home',
            street: 'Walnut',
            city: 'LA',
            state: 'CA',
            zip_code: 29302,
            home_income: 95062.1,
            marriage_status :'Single',
	    company_income : 'NULL',
	    business_category:'NULL'
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
