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
                    $('#question-error').html('');
                    $('#question-submit-btn').prop("disabled", true);
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "/include/process.php",
                        success: function () {
                            $('#question-submit-btn').prop("disabled", false);
                            $("#ask-a-question-button").click();
                            $.notify({ message: 'Your question has been sent.'}, {type: 'success'});
                            return true;
                        },
                        error: function (err) {
                            $('#question-submit-btn').prop("disabled", false);
                            var errors = JSON.parse(err.responseText);
                            var items = '';
                            $.each(errors, function (i, v) {
                                items += '<li>' + v.message + '</li>'
                            });
                            $('#question-error').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Please correct the following</strong><br/><ul>' + items + '</ul></div>');

                            return false;
                        }
                    });
                }
            });
        };
        cc.question.form.validation();
    }
});