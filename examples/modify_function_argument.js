import { MonoApiHelper, MonoApi } from 'frida-mono-api'

/* 
    This example script can intercept the following method (constructor).
    Furthermore it modifies the third argument (string c).

    namespace CompanyName.ProjectName.Views.Web.Html {

        class HtmlWebView {

            ...

            GetElement(string id) {
                .// This function is intercepted.
            }

            ...

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
var classInformation = getClass(settingClassName);

// Get the pointer to the ahead-of-time (AOT) compiled method
let methodInformation = MonoApiHelper.ClassGetMethodFromName(classInformation, settingMethodName, settingMethodArgCount)

// Allocate enough memory for MonoError initialization
let monoErrorMemory = Memory.alloc(32) 

// Get the pointer to the method
let nativeMethodPointer = MonoApi.mono_aot_get_method(domain, methodInformation, monoErrorMemory)

// Attach interceptor and fish out the first method argument
Interceptor.attach(nativeMethodPointer, {
    onEnter: function(args) {
        console.log("Entered " + settingMethodName + " with " + settingMethodArgCount + " argument(s).");
        console.log("Value of `string id`: " + MonoApiHelper.StringToUtf8(args[3]));

        args[3] = MonoApiHelper.StringNew('This is the replaced value of `string c`.', domain);
    },
    onLeave: function onLeave(log, retval, state) {
        console.log("Left " + settingMethodName + ".");
    }
})

console.log(`'modify_function_argument.js' attached and ready.`)