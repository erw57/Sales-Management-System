/**
 * Created by liaokaien on 2/16/15.
 */


function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

$(document).ready(function(){
        var id = getQueryVariable("id");
        console.log("1  "+id);
        $.ajax({

            url: "api/getProductDetail",
            data: {id: id},


        // Whether this is a POST or GET request
        type: "POST",
        // The type of data we expect back
        dataType : "json",
        // Code to run if the request succeeds;
        // the response is passed to the function

        success: function( res ) {
            $('#id').text(res['id']);
            $('#name').text(res['name']);
            $('#price').text(res['price']);
            $('#shadyside').text(res['amount'].shadyside);
            $('#oakland').text(res['amount'].oakland);

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


