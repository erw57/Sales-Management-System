// $(document).ready(function(){
//     $(document).on('click', '.edit', function(){
//         var qtySpan = $(this).parent().prev().find('.qtySpan');     
//         var editBox = qtySpan.next();
//         $(this).addClass('confirmEdit').removeClass('edit').html('Confirm');   
//         qtySpan.css('display','none');
//         editBox.css('display','inline');
//     });
    
//     $(document).on('click','.confirmEdit',function(){
//         var qtySpan = $(this).parent().prev().find('.editBox'); 
//         var qty = qtySpan.val();
//         var id = qtySpan.next().val();
//         $.post('ModifyProduct', {qty:qty, id:id},function(){window.location.reload()});
//     });

//     $('.sortBy').selectpicker();
// });

