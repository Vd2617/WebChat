
$(function () {
    $('form[name="callback"]').validate({
        rules: {
            UserName: 'required',
            Password: 'required',
            confirmpassword: {
                equalTo: "#Password",
                required: true,
            },
            Email: {
                required: true,
                email: true,
            },

        },
        messages: {
            UserName: 'Enter Name',
            Password: 'Enter Password',
            Email: 'Entrer correct E-mail',
            confirmpassword: 'Do not mach',

        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});




