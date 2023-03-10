/*
 Copyright (c) 2021 Christer Johansson of Sweden Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

class FormAdd {
  /**
     * Validate Login
     * @param str
     * @returns boolean
     */
    static validEmail(str) {
        let regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(str);
    }
     /**
     * Validate Login
     * @param str1
     * @returns boolean
     */
    static validReq(str1) {
        let regex = /^[0-9\b]+$/;
            // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(str1);
    }

    /**
     * Minimum length of string
     * @param str1
     * @param length
     * @returns
     */
    static minLength(str1, length) {
        let isInvalid = false;

        if (str1.length < length) {
            isInvalid = true;
        }

        return isInvalid;
    }

    static maxLength(str1, length) {
        let isInvalid = false;

        if (str1.length > length) {
            isInvalid = true;
        }

        return isInvalid;
    }

    /**
     * Form Validator
     * @param  obj
     * @returns
     */
    static validator(obj) {
        let keys = Object.entries(obj);
        let results = [];
        let validations = null;

        keys.map((key) => {
            if ("isRequired" in key[1] && key[1].isRequired) {
                if (key[1].value.length === 0) {
                    results.push({
                        [key[0]]: [`The ${key[0]} field is required.`],
                    });
                } 

                else {
                    if ("isReq" in key[1] && key[1].isReq) {
                        let isValidReq = FormAdd.validReq(key[1].value);

                        if (!isValidReq) {
                            results.push({
                                [key[0]]: [`The ${key[0]} must be valid numbers. OR accept only 2 digit numbers.`],
                            });
                        }
                    }

                    if (
                        "minLength" in key[1] &&
                        FormAdd.minLength(key[1].value, key[1].minLength)
                    ) {
                        results.push({
                            [key[0]]: [
                                `The ${key[0]} must at least ${key[1].minLength} characters.`,
                            ],
                        });
                    }

                    if(
                        "maxLength" in key[1] &&
                        FormAdd.maxLength(key[1].value, key[1].maxLength)
                    ){
                        results.push({
                            [key[0]]: [
                                `The ${key[0]} field must at most 2 digit number.`,
                            ],
                        });
                    }
                }
            } else if ("isReq" in key[1]) {
                let isValidReq = FormAdd.validReq(key[1].value);

                if (!isValidReq) {
                    results.push({
                        [key[0]]: [`The ${key[0]} must be valid number.`],
                    });
                }
            } else if (
                "minLength" in key[1] &&
                FormAdd.minLength(key[1].value, key[1].minLength)
            ) {
                results.push({
                    [key[0]]: [
                        `The ${key[0]} must at least ${key[1].minLength} number between 0 to 50.`,
                    ],
                });
            }
            return results;
        });

        results = Object.assign({}, ...results.map((result) => result));

        if (Object.keys(results).length > 0) {
            validations = {
                errors: results,
            };
        } else {
            validations = null;
        }

        return validations;
    }
}

export default FormAdd;
