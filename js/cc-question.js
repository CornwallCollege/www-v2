"use strict";
"use strict";
$(document).ready(function () {
    if ($("#ask-a-question-button").length) {
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
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),                        
                        url: "/include/process.php"
                    });
                    $("#ask-a-question-button").click();
                    return true;
                }
            });            
        };
        cc.question.form.validation();
    }
});