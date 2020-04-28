import { MonoApiHelper } from 'frida-mono-api'
import FridaxClass from './fridax_class'

/**
 * A helper class for static variables.
 */
export default class FridaxStaticField {

    constructor(classPointer, variableName) {
        this.classPointer = classPointer
        this.variableName = variableName
        this.field = MonoApiHelper.ClassGetFieldFromName(this.classPointer, variableName)
        this.fieldValue = MonoApiHelper.FieldGetValueObject(this.field, this.classPointer)
    }

    toString () {
        return MonoApiHelper.StringToUtf8(this.fieldValue)
    }

    toInt () {
        const unboxedValue = MonoApiHelper.ObjectUnbox(this.fieldValue)
        return unboxedValue.readInt()
    }

    toBool () {
        return this.toInt() === 1
    }

    toPointer () {
        return this.fieldValue
    }

    toClass () {
        return FridaxClass.fromPointer(
            MonoApiHelper.ObjectGetClass(this.toPointer())
        )
    }

}