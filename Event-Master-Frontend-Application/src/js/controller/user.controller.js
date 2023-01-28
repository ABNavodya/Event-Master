const emailRegex = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

$('#btnSignUp').click(function () {

    let userId = $('#txtUserID').val();
    let userName = $('#txtUserName').val();
    let userEmail = $('#txtUserEmail').val();
    let userPassword = $('#txtUserPassword').val();
    let userConfirmPassword = $('#txtUserConfirmPassword').val();

    if (userId === '' || userId == null) {
        alert("Please enter your user id!");
        $('#txtUserID').css({
            'border': '2px solid red'
        });
    } else {
        $('#txtUserID').css({
            'border': '2px solid #0D6EFD '
        });
        if (userName === '' || userName == null) {
            alert("Please enter your user name!");
            $('#txtUserName').css({
                'border': '2px solid red'
            });
        } else {
            $('#txtUserName').css({
                'border': '2px solid #0D6EFD '
            });
            if (userEmail === '' || userEmail == null) {
                alert("Please enter your user email!");
                $('#txtUserEmail').css({
                    'border': '2px solid red'
                });
            } else {
                if (emailRegex.test(userEmail)) {
                    $('#txtUserEmail').css({
                        'border': '2px solid #0D6EFD '
                    });
                    if (userPassword === '' || userPassword == null) {
                        alert("Please enter your password!");
                        $('#txtUserPassword').css({
                            'border': '2px solid red'
                        });
                    } else {
                        if (passwordRegex.test(userPassword)) {
                            if (userPassword !== userConfirmPassword) {
                                alert("your password is different!");
                                $('#txtUserConfirmPassword').css({
                                    'border': '2px solid red'
                                });
                            } else {
                                $('#txtUserPassword').css({
                                    'border': '2px solid #0D6EFD '
                                });
                                $('#txtUserConfirmPassword').css({
                                    'border': '2px solid #0D6EFD '
                                });

                                userSignUpFunction();
                            }
                        } else {
                            alert("Please enter strong password!");
                            $('#txtUserPassword').css({
                                'border': '2px solid red'
                            });
                        }
                    }
                } else {
                    alert("Please enter valid email!");
                    $('#txtUserEmail').css({
                        'border': '2px solid red'
                    });
                }
            }
        }
    }
});

$('#btnSignIn').click(function () {

    let userEmail = $('#txtUserSignInEmail').val();
    let userPassword = $('#txtUserSignInPassword').val();

    if (userEmail === '' || userEmail == null) {
        alert("Please enter your email address!");
        $('#txtUserSignInEmail').css({
            'border': '2px solid red'
        });
    } else {
        if (emailRegex.test(userEmail)) {
            $('#txtUserSignInEmail').css({
                'border': '2px solid #0D6EFD '
            });
            if (userPassword === '' || userPassword == null) {
                $('#txtUserSignInPassword').css({
                    'border': '2px solid red '
                });
                alert("Please enter your password!");
            } else {
                if (passwordRegex.test(userPassword)) {
                    $('#txtUserSignInPassword').css({
                        'border': '2px solid #0D6EFD'
                    });
                    userSignIn();
                } else {
                    $('#txtUserSignInPassword').css({
                        'border': '2px solid red '
                    });
                    alert("Please enter valid password");
                }
            }
        } else {
            $('#txtUserSignInEmail').css({
                'border': '2px solid red'
            });
            alert("Invalid Email Address!")
        }
    }
});
function userSignUpFunction() {

    let userId = $('#txtUserID').val();
    let userName = $('#txtUserName').val();
    let userEmail = $('#txtUserEmail').val();
    let userPassword = $('#txtUserPassword').val();

    const userSignUp = `http://localhost:8800/api/user-sign-up`;

    $.ajax({
        method: "POST",
        url: userSignUp,
        dataType: 'Json',
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            _id: userId,
            user_name: userName,
            user_email: userEmail,
            user_password: userPassword
        }),
        success: function (res) {
            if (res.message === 'Already Register User! Please login') {
                alert(res.message);
            } else {
                alert(res.message);
                window.location.href = 'Booking.html';
            }
        },
        error: function (ob, textStatus, error) {
        }
    });
}


function userSignIn() {

    let userEmail = $('#txtUserSignInEmail').val();
    let userPassword = $('#txtUserSignInPassword').val();

    const userSignInURL = `http://localhost:8800/api/user-sign-in/${userEmail}/${userPassword}`;

    try {
        $.ajax({
            method: "GET",
            url: userSignInURL,
            async: true,
            dataType: 'json',
            success: function (response) {
                if (response.message === 'User Login Success!') {
                    alert(response.message);
                    window.location.href = 'Booking.html';
                } else {
                    alert(response.message);
                }
            }
        });
    } catch (err) {
    }
}