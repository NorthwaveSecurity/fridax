import { MonoApi, MonoApiHelper } from 'frida-mono-api'

/**
 * A helper class for Mono values.
 */
export default class FridaxValue {

    constructor (pointer) {
        this.pointer = pointer
    }

    toString () {
        return MonoApiHelper.StringToUtf8(this.pointer)
    }

    toInt () {
        return parseInt(this.pointer, 16)
    }

    toBool () {
        return this.toInt() === 1
    }

    toPointer () {
        return this.pointer
    }

    static fromPointer(pointer) {
        return new FridaxValue(pointer)
    }

    static fromString(newString) {
        return FridaxValue.fromPointer(
            MonoApiHelper.StringNew(newString, MonoApi.mono_domain_get())
        )
    }

}