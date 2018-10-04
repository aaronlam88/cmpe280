"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var checkboxCtr = (function () {
    // ==== class variables ====

    // ==== functions ====

    // to handle form submission, validate before submit
    // TODO: show error on form instead of using alert
    function onsubmit(options) {
        var result = this.validate(document.getElementsByName(options));
        if (!result.pass) {
            alert(result.errorMessage);
            return false; // disable this to redirect to error page
        }
        return true;
    };


    function validate(options) {
        var result = {
            errorMessage: "",
            pass: false
        };

        try {
            for (var i = 0, len = options.length; i < len; ++i) {
                if (options[i].checked) {
                    result.pass = true;
                    return result;
                }
            }
        } catch (error) {
            console.error(error);
            result.pass = false;
        }
        result.errorMessage = '* at least 1 option need to be selected';
        return result;
    };


    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        onsubmit: onsubmit,
        validate: validate
    }
})();

// ==== onload --> call the following functions ====
