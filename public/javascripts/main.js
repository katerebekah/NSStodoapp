/*$.validator.setDefaults({
  debug: true,
  success: "valid"
});
$("#myform").validate({
  rules: {
    title: {
      required: true
    },
    description: {
      required: true
    },
    priority: {
      required: true
    },
    due_date: {
      required: true
    }
  },
  messages: {
    title: "Please enter a title",
    description: "Please enter a description",
    priority: "What is the priority level?",
    due_date: "When is this due?"
  }

});

$('#myform').submit(function(e){
	var formData = $(this).serializeArray();
	$.ajax({
		method: "post",
		data: formData,
		url: "/todo",
		success: function(d){
		}
	});
});*/