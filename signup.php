<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" type="text/css" href="./asset/css/login.css">
</head>
<body>
    <div class="main">
        <div class="container a-container is-txl" id="a-container">
            <form class="form" id="a-form" method="POST" action="signup.php">
                <h2 class="form_title title">Create Account</h2>
                <?php if (isset($error_message)): ?>
                    <div id="error-message" style="color: red;">
                        <?php echo $error_message; ?>
                    </div>
                <?php endif; ?>

                <input class="form__input" type="text" placeholder="Name" name="FullName" required>
                <input class="form__input" type="email" placeholder="Email" name="user_name" required>
                <input class="form__input" type="password" placeholder="Password" name="user_pass" required>
                <button class="form__button button submit" type="submit" name="dangky" value="Sign up">SIGN UP</button>
            </form>
        </div>
    </div>
</body>
</html>
