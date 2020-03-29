import { MonoApiHelper, MonoApi } from '../vendors/frida-mono-api'

/**
 * Class containing helper functions for Mono classes
 */
export default class ClassHelper {

    /**
     * Retrieve a Mono class by the given name
     *
     * @param {string} The name of the class (e.g. `CompanyName.ProjectName.Views.Web.Html.HtmlWebView`)
     * @returns {object} The Mono class representing the given class name
     */
    static getClassByName(class_name) {
        var result = null

        MonoApiHelper.AssemblyForeach(function(assembly) {
            var image = MonoApi.mono_assembly_get_image(assembly)
            var pointer = MonoApiHelper.ClassFromName(image, class_name)
            
            if (pointer != 0) {
                result = pointer
            }
        })

        return result
    }

    /**
     * Retrieve the name of the given Mono class pointer
     *
     * @param {pointer} A pointer to a Mono class.
     * @returns {string} The name representing the class (e.g. `HtmlWebView`)
     */
    static getNameByPointer(pointer) {
        return MonoApiHelper.ClassGetName(MonoApiHelper.ObjectGetClass(pointer))
    }

}