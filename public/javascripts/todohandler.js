$(document).ready(function() {
  //delete an entry
  $('.deleteButton').click(function() {
    var del = $(this)[0].id;
    console.log(del);
    $.ajax({
      method: "DELETE",
      data: {
        title_id: del
      },
      url: "/todo",
      success: function(d) {
        $('.' + del).remove();
      }
    });
  });

  //edit an entry
  $('.editButton').click(function() {
    var edit = $(this)[0].id;
    console.log(edit);
    window.location.href = ("/todo/" + edit);

    /*    $.ajax({
          method: "GET",
          url: "/todo/" + edit,
          success: function(d) {
          }
        });
    */
  });
});
