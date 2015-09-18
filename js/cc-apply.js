/* APPLY FORM */

$(document).ready(function () {
    if (location.pathname === "/apply/index.html" || location.pathname === "/apply/") {
        var pageParams = GetPageParamsAsJson();
        $('#loader').fadeOut(1500);
        var hasHash = !(pageParams.hash === undefined || pageParams.hash === null);
        if (hasHash) {
            var hash = pageParams.hash.toLowerCase();
            var callback = hash;
            var hasCareer = !(pageParams.career === undefined || pageParams.career === null);
            if (hasCareer) {
                hash += " - " + pageParams.career;
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
                        phone: {
                            required: ""
                        }
                    },
                    submitHandler: function (form) {                        
                        isOnline({
                            no: function () {
                                storeApplicationToLocalStorage({ data: $(form).serialize(), url: "/include/process.php" });
                            },
                            yes: function () {
                                sendApplicationNow(form);
                            }
                        });
                    }
                });
            }
        });

        function storeApplicationToLocalStorage(application) {
            application.data += "&when=" + encodeURI(new Date().toString());
            application.data += "&note=" + encodeURI("Could be from marketing event (sent when offline)");
            var storage = $.localStorage;
            var posts = storage.get("posts") || [];
            posts.push(application);
            storage.set("posts", posts);
            $('#modalApplicationDelayed .btn-primary').click(function () {
                document.location = "/success/index.html";
            });
            $('#modalApplicationDelayed').on('hidden.bs.modal', function () {
                document.location = "/success/index.html";
            });
            $('#modalApplicationDelayed').modal('show');
        }

        function sendApplicationNow(form) {            
            $('#apply-error').html('');
            $("#submit-btn").prop("disabled", true);
            $("#cancel-btn").prop("disabled", true);
            $(".alert-danger").remove();
            $('#success').hide();
            var data = $(form).serialize();
            data += "&when=" + encodeURI(new Date().toString());
            $(form).ajaxSubmit({
                type: "POST",
                data: data,
                url: "/include/process.php",

                success: function () {
                    document.location = "/success/index.html";
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
    }
});