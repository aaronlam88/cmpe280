"use strict";

class RegisterCtr {
    constructor() {
        // regex for matching
        this.regex = {
            username: /^(?=.{4,20}$)(?![._-])[a-zA-Z0-9._-]+(?<![._-])$/,
            //          └─────┬────┘└───┬───┘└───────┬─────┘└───┬────┘
            //                │         │            │          no ._- at the end
            //                │         │            │
            //                │         │            allowed alphanumeric character with ._-
            //                │         │
            //                │         no ._- at the beginning
            //                │
            //                much be 4-20 characters long,

            password: /(?=.{4,20}$)/,
            //         └─────┬────┘
            //               much be 4-20 characters long, allow all characters

            email: /^(?![._-])[a-zA-Z0-9._-]+(?![._-])@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,8}$/,
            //       └─────────────────┬─────────────┘└──────┬──────┘└──────┬──────┘
            //                         │                     │              top level domain: allow 2-8 alpha character
            //                         │                     │
            //                         │                     email domain: allow alphanumeric character with -
            //                         │
            //                         email address: allowed alphanumeric character with ._-, but not ._- at the beginning/ending

            phone: /[0-9]{3}-?[0-9]{3}-?[0-9]{4}/
        };

        // error messages, the keys are match with the regex so it's easier to print error messages when regex is not match
        this.errors = {
            username:
                '* username much be 4-20 characters long\n\
                no ._- character at the beginning or ending\n\
                only allow alphanumeric characters with ._-',
            password:
                '* password much be 4-20 characters long\n  allow all characters',
            email:
                '* email much be in form address@emailDomain.topDomain\n\
                email address: allowed alphanumeric character with ._- (not at the begin/end)\n\
                email domain: allow alphanumeric character with -\n\
                top level domain: allow 2-8 alpha character',
            phone:
                '* phone number much 10 digits in format xxx-xxx-xxxx or xxxxxxxxxx'
        };
    }

    /**
     * actual form validation work is done here
     * if there is any error in the form, return pass=false, else pass=true
     * if pass=false, error can be found in errorMessage in the return object
     *
     * @param {*} checkObj
     */
    validate(checkObj) {
        var result = {
            errorMessage: "",
            pass: false
        };

        try {
            var errorsStack = [];
            for (var key in this.regex) {
                var inputField = checkObj[key];

                if (inputField) {
                    if (!inputField.match(this.regex[key])) {
                        errorsStack.push(key);
                    }
                }
            }

            if (errorsStack.length === 0) {
                result.pass = true;
            } else {
                result.pass = false;
                for (var i = 0, len = errorsStack.length; i < len; ++i) {
                    result.errorMessage += '\n' + this.errors[errorsStack[i]];
                }
                console.error(result.errorMessage);
            }
        } catch (error) {
            console.error(error);
            result.pass = false;
        }
        return result;
    }
}

module.exports = RegisterCtr;
