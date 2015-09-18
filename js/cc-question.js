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
                    isOnline({
                        no: function () {
                            cc.question.storeToLocalStorage({ data: $(form).serialize(), url: "/include/process.php" });
                        },
                        yes: function () {
                            cc.question.sendNow(form);
                        }
                    });
                }
            });
        };
        cc.question.form.validation();

        cc.question.storeToLocalStorage = function(message) {
            message.data += "&when=" + encodeURI(new Date().toString());
            message.data += "&note=" + encodeURI("Could be from marketing event (sent when offline)");
            var storage = $.localStorage;
            var posts = storage.get("posts") || [];
            posts.push(message);
            storage.set("posts", posts);            
            $("#ask-a-question-button").click();
            $('#modalQuestionDelayed').modal('show');
        }

        cc.question.sendNow = function(form) {
            $('#question-error').html('');
            $('#question-submit-btn').prop("disabled", true);
            var data = $(form).serialize();
            data += "&when=" + encodeURI(new Date().toString());
            data += "&note=" + encodeURI("none");
            $(form).ajaxSubmit({
                type: "POST",
                data: data,
                url: "/include/process.php",
                success: function () {
                    $('#question-submit-btn').prop("disabled", false);
                    $("#ask-a-question-button").click();
                    $.notify({ message: 'Your question has been sent.' }, { type: 'success' });
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
    }


});
