import { MonoApi, MonoApiHelper } from 'frida-mono-api'
import FridaxMethod from './fridax_method'
import FridaxStaticField from './fridax_static_field'
import FridaxClassHelper from './fridax_class_helper'

/**
 * A helper class for 'mono classes'.
 */
export default class FridaxClass {

    constructor(pointer) {
        this.pointer = pointer
    }

    // construct(pointer = null, argumentsArray = null) {
    //     this.argumentsArray = argumentsArray

    //     if (pointer == null) {
    //         this.monoObject = MonoApiHelper.ObjectNew(this.monoClass, MonoApi.mono_domain_get())
    //         console.log('monoObject', this.monoObject)

    //         this.monoConstructor = MonoApiHelper.ClassGetMethodFromName(this.monoClass, '.ctor');
    //         console.log('monoConstructor', this.monoConstructor)

    //         this.monoConstructorCompiled = MonoApi.mono_compile_method(this.monoConstructor)
    //         console.log('monoConstructorCompiled', this.monoConstructorCompiled)

    //         this.monoClassInitialized = MonoApiHelper.RuntimeInvoke(
    //             this.monoConstructorCompiled, 
    //             this.monoObject,
    //             ... []
    //         )
            
    //         console.log('monoClassInitialized', this.monoClassInitialized)
    //     }
    // }

    intercept(functionName, callback) {
        MonoApiHelper.Intercept(this.pointer, functionName, callback)
    }

    getMethod (methodName) {
        return FridaxMethod.fromPointer(
            this.pointer,
            MonoApiHelper.ClassGetMethodFromName(this.pointer, methodName)
        )
    }

    // getField(variableName) {
    //     if (!this.monoClassInitialized) {
    //         throw 'Cannot run getField(...) on uninitialized class. Please run construct(...) first.'
    //     }

    //     return new FridaxField(this.monoClassInitialized, variableName)
    // }

    getStaticField(variableName) {
        return new FridaxStaticField(this.pointer, variableName)
    }

    static fromPointer(pointer) {
        return new FridaxClass(pointer)
    }

    static fromString (className) {
        return new FridaxClass(FridaxClassHelper.getClassByName(className))
    }

}

