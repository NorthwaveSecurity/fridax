/**
 * Class function interceptor.
 *
 * @author          Tijme Gommers (@tijme)
 * @copyright       Northwave B.V. (www.northwave-security.com)
 * @description     This example script will allow you to intercept the `GetElement` function of the class below.
 * 
 *    namespace CompanyName.ProjectName.Views.Web.Html {
 *
 *        class HtmlWebView {
 *
 *            GetElement(string id) {
 *                // This function will be intercepted.
 *            }
 *
 *        }
 *
 *    }
 * 
 */

import { MonoApiHelper, MonoApi } from 'frida-mono-api'
import FridaxClass from 'libraries/fridax_class'
import FridaxValue from 'libraries/fridax_value'

// Log that the module was loaded succesfully
console.log(`[*] Loaded ${require('path').basename(__filename)}.`)

// Construct a Fridax FridaxClass for the given `CompanyName.ProjectName.Views.Web.Html.HtmlWebView` class.
var htmlWebView = new FridaxClass('CompanyName.ProjectName.Views.Web.Html.HtmlWebView')

// Intercept the `GetElement` function.
htmlWebView.intercept('GetElement', {

    /**
     * Called synchronously when about to call recvfrom.
     *
     * @param {array} monoArguments - Function arguments represented as an array of NativePointer objects.
     */
    onEnter: function(monoArguments) {
        console.log('Entered GetElement')

        console.log(`Value of string id': ${new FridaxValue.fromPointer(monoArguments[1]).toString()}`);

        monoArguments[1] = FridaxValue.fromString(`This is the replaced value of 'string id'.`).toPointer();
    },

    /**
     * Called synchronously when about to return from recvfrom.
     *
     * @param {NativePointer} retval - Return value represented as a NativePointer object.
     */
    onLeave: function onLeave(retval) {
        console.log('Left GetElement with retval:', retval)
    }

})
