"use strict";
cc.question = {};
cc.question.form = {};
cc.question.form.validation = function () {
    $('#form-question').validate({

        errorElement: "em",
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            },
            question: {
                required: true
            }
        },
        messages: {
            name: {
                required: ""
            },
            email: {
                required: ""
            },
            phone: {
                required: ""
            },
            question: {
                required: ""
            }
        },

        submitHandler: function (form) {
            $("#submit-btn").attr('disabled', 'disabled');
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "http://core.cornwall.ac.uk/sherpa/enquiries/email/question",
            });
            $("#ask-a-question-button").click();
            return true; 
        }
        
    });
};