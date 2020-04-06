import { MonoApiHelper, MonoApi } from '../vendors/frida-mono-api'
import ClassHelper from '../libraries/class_helper'

/*
    // For JIT-compiled applications only.
    // This example script can intercept the following method (non-constructor).
    // Furthermore it modifies the first argument (string id).

    namespace CompanyName.ProjectName.Views.Web.Html {

        class HtmlWebView {

            GetElement(string id) {
                // This function will be intercepted.
            }

        }

    }
*/

// Intercept settings
var settingClassName = "CompanyName.ProjectName.Views.Web.Html.HtmlWebView";
var settingMethodName = "GetElement";
var settingMethodArgCount = 1;

// The root AppDomain is the initial domain created by the runtime when it is initialized. Programs execute on this AppDomain.
const domain = MonoApi.mono_get_root_domain()

// Get a reference to a certain class within the Xamarin application.
var classInformation = ClassHelper.getClassByName(settingClassName);

// Attach interceptor and fish out the first method argument
MonoApiHelper.Intercept(classInformation, settingMethodName, {
    onEnter: function(args) {
        console.log("Entered " + settingMethodName + " with " + settingMethodArgCount + " argument(s).");
        console.log("Value of `string id`: " + MonoApiHelper.StringToUtf8(args[1]));
        
        args[1] = MonoApiHelper.StringNew('This is the replaced value of `string id`.', domain);
    },
    onLeave: function onLeave(log, retval, state) {
        console.log("Left " + settingMethodName + ".");
    }
})

console.log(`'jit_modify_class_function_argument.js' attached and ready.`)
