// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
var registerCtr = {};

registerCtr.regex = {
    username: /^(?=.{4,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$/,
             // └─────┬────┘└───┬──┘└──────┬─────┘└───┬───┘
             //       │         │          │           no _ or . at the end
             //       │         │          │
             //       │         │          allowed characters
             //       │         │
             //       │         no _ or . at the beginning
             //       │
             //       username is 4-20 characters long,

    password: /(?=.{4,20}$)/,
            // └─────┬────┘
            //       │
            //       password much be 4-20 characters long, allow all characters
    
    email: /^[a-zA-Z0-9._-]*@[a-zA-Z0-9._]*$/,
          // └──────┬──────┘└─────┬───────┘
          //        │             │
          //        │             allowed characters in email domain
          //        │
          //        allowed characters in email address
};

registerCtr.errors = {
    username: '* username much be 4-20 characters long\n  no _ or . at the beginning or end\n  only allow alphanumeric characters with . and _',
    password: '* password much be 4-20 characters long\n  allow all characters',
    email: '* only allow alphanumeric characters with . and _ in address and host'
};

registerCtr.onsubmit = function () {
    var result = registerCtr.validate();
    if (result.pass) {
        return true;
    } else {
        alert(result.errorMessage);
        return false;
    }
}

registerCtr.validate = function (checkObj) {
    var result = {
        errorMessage: "",
        pass: false
    };

    try {
        var errors = [];
        for (var key in registerCtr.regex) {
            var inputField;
            if (checkObj) {
                inputField = checkObj[key];
            } else {
                inputField = document.getElementById(key).value;
            }

            if (inputField) {
                if (!inputField.match(registerCtr.regex[key])) {
                    errors.push(key);
                }
            }
        }

        if (errors.length === 0) {
            result.pass = true;
        } else {
            result.pass = false;
            for (var i = 0, len = errors.length; i < len; ++i) {
                result.errorMessage += '\n' + registerCtr.errors[errors[i]];
            }
            console.log(result.errorMessage);
        }
    } catch (error) {
        console.log(error);
        result.pass = false;
    }
    return result;
}

module.exports = registerCtr;
