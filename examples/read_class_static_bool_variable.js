import { MonoApiHelper, MonoApi } from '../vendors/frida-mono-api'
import ClassHelper from '../libraries/class_helper'

/* 
    // This example script can read the static int variable `secret`.

    namespace CompanyName.ProjectName {

        class Settings {

            public static readonly bool secret = false;

        }

    }
*/

// Get a reference to ObfuscatedString password
let settingsClass = ClassHelper.getClassByName("CompanyName.ProjectName.Settings")
let secretField = MonoApiHelper.ClassGetFieldFromName(settingsClass, "secret")
let secretValue = MonoApiHelper.FieldGetValueObject(secretField, settingsClass)

// Unbox the Bool to the native int type and convert it to a boolean
let unboxedSecretValue = MonoApiHelper.ObjectUnbox(secretValue)
let boolSecretValue = unboxedSecretValue.readInt() === 1

// Print result
console.log('secret:', typeof(boolSecretValue), boolSecretValue)