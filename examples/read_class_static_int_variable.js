import { MonoApiHelper, MonoApi } from '../vendors/frida-mono-api'
import ClassHelper from '../libraries/class_helper'

/* 
    // This example script can read the static int variable `secret`.

    namespace CompanyName.ProjectName {

        class Settings {

            public static readonly int secret = 1234;

        }

    }
*/

// Get a reference to ObfuscatedString password
let settingsClass = ClassHelper.getClassByName("CompanyName.ProjectName.Settings")
let secretField = MonoApiHelper.ClassGetFieldFromName(settingsClass, "secret")
let secretValue = MonoApiHelper.FieldGetValueObject(secretField, settingsClass)

// Unbox the Int to the native int type
let unboxedSecretValue = MonoApiHelper.ObjectUnbox(secretValue)

// Print result
console.log('secret:', typeof(unboxedSecretValue.readInt()), unboxedSecretValue.readInt())