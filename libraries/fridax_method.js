import { MonoApi, MonoApiHelper } from 'frida-mono-api'
import FridaxValue from './fridax_value'

/**
 * A helper class for 'mono methods'.
 */
export default class FridaxMethod {

    constructor(classPointer, pointer) {
        this.classPointer = classPointer
        this.pointer = pointer
    }

    invoke (args = NULL) {
    	return FridaxValue.fromPointer(
    		MonoApiHelper.RuntimeInvoke(this.pointer, this.classPointer, args)
    	)
    }

    static fromPointer(pointer) {
        return new FridaxMethod(pointer)
    }

}

