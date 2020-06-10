$(function () {
    $('form[name="callback"]').validate({
        rules: {
           
            Password: 'required',
           
            Email: {
                required: true,
                email: true,
            },

        },
        messages: {
          
            Password: 'Enter Password',
            Email: 'Enter correct E-mail',
           

        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});