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
                        required: true,
                        phonesUK: true
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
                    $('#question-submit-btn').prop("disabled", true);
                    $(form).ajaxSubmit({
                        type: "POST", 
                        data: $(form).serialize(),                        
                        url: "/include/process.php",
                        success: function() {
                            $("#ask-a-question-button").click();
                            $('#question-submit-btn').prop("disabled", false);
                            return true;
                        },
                        error: function(err) {
                            var errors = JSON.parse(err.responseText);
                            alert(JSON.stringify(errors));
                            $('#question-submit-btn').prop("disabled", false);
                            return false;
                        }
                    });
                }
            });            
        };
        cc.question.form.validation();
    }
});