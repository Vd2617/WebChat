
$(function () {
    $('form[name="callback"]').validate({
        rules: {
            name: 'required',
            password: 'required',
            confirmpassword: {
                equalTo: "#password",
                required: true,
            },
            email: {
                required: true,
                email: true,
            },

        },
        messages: {
            name: 'Enter Name',
            password: 'Enter Password',
            email: 'Entrer correct E-mail',
            confirmpassword: 'Do not mach',

        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});