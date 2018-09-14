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
    username: 'username much be 4-20 characters long\n no _ or . at the beginning or end\n only allow alphanumeric characters with . and _',
    password: 'password much be 4-20 characters long\n allow all characters',
    email: 'only allow alphanumeric characters with . and _ in address and host'
};

registerCtr.validate = function () {
    try {
        var errors = [];
        for (var key in registerCtr.regex) {
            var inputField = document.getElementById(key);
            if (inputField) {
                if (!inputField.value.match(registerCtr.regex[key])) {
                    errors.push(key);
                }
            }
        }

        if (errors.length === 0) {
            return true;
        } else {
            var errorMessage = "";
            for (var i = 0, len = errors.length; i < len; ++i) {
                errorMessage += '\n' + registerCtr.errors[errors[i]];
            }
            alert(errorMessage);
            return false;
        }
    } catch(error) {
        console.log(error);
        return false;
    }
}