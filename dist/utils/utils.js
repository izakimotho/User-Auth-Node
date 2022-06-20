"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    constructor() {
    }
    validatephone(mobilenumber) {
        try {
            if (!/^254/i.test(mobilenumber)) {
                if (!mobilenumber.startsWith('+254')) {
                    if (!/^(07|01)/i.test(mobilenumber)) {
                        if (!/^7|1/i.test(mobilenumber)) {
                            mobilenumber = mobilenumber;
                        }
                        else {
                            mobilenumber = '254' + mobilenumber;
                        }
                    }
                    else {
                        mobilenumber = mobilenumber.replace('0', '254');
                    }
                }
                else {
                    mobilenumber = mobilenumber.replace('+', '');
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        return mobilenumber;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map