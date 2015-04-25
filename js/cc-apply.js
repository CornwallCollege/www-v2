/* APPLY FORM */

$(document).ready(function () {
    if (location.pathname === "/apply/index.html" || location.pathname === "/apply/") {
        $('#loader').fadeOut(1500);
        var hasHash = (location.href.indexOf('hash=') > -1);
        if (hasHash) {
            var hash = location.href.substring(location.href.indexOf('hash=') + 5).toLowerCase().split('&')[0];
            var callback = hash;
            var hasCareer = (location.href.indexOf('career=') > -1);
            if (hasCareer) {
                hash += " - " + location.href.substring(location.href.indexOf('career=') + 7);
            }
            hash = decodeURIComponent(hash);
            if (hash.length) {
                $("#interest").val(hash);
                $("#interest").hide();
                $("#interest-label").val(hash);
                $("#interest-label").hide();
            }
        }

        $(document).on("click", "#cancel-btn", function () {
            event.preventDefault();
            if (hasHash) {
                location.href = "/career-pages/" + callback + "/";
            } else {
                location.href = "/full-time-hub/";
            }
        });

        /* CONTACT FORM VALIDATION SCRIPT */
        $(function () {
            if ($("#application").length) {
                $('#application').validate({

                    errorElement: "em",
                    rules: {
                        name: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        interest: {
                            required: true,
                        },
                        phone: {
                            required: true,
                            phonesUK: true
                        }
                    },
                    messages: {
                        name: {
                            required: ""
                        },
                        email: {
                            required: ""
                        },
                        interest: {
                            required: ""
                        },
                        phone: {
                            required: ""
                        }
                    },

                    submitHandler: function (form) {
                        $('#apply-error').html('');
                        $("#submit-btn").prop("disabled", true);
                        $("#cancel-btn").prop("disabled", true);
                        $(".alert-danger").remove();
                        $('#success').hide();
                        $(form).ajaxSubmit({
                            type: "POST",
                            data: $(form).serialize(),
                            url: "/include/process.php",

                            success: function () {
                                document.location = "/apply/success/";
                            },

                            error: function (err) {
                                $("#submit-btn").prop("disabled", false);
                                $("#cancel-btn").prop("disabled", false);
                                var errors = JSON.parse(err.responseText);
                                var items = '';
                                $.each(errors, function (i, v) {
                                    items += '<li>' + v.message + '</li>'
                                });
                                $('#apply-error').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Please correct the following</strong><br/><ul>' + items + '</ul></div>');
                                return false;
                            }
                        });
                    }
                });
            }
        });
    }
});