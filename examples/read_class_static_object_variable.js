import { MonoApiHelper, MonoApi } from '../vendors/frida-mono-api'
import ClassHelper from '../libraries/class_helper'

/* 
    // This example script can read the static ObfuscatedString variable `secret`.

    namespace CompanyName.ProjectName {

        class Settings {

            public static readonly ObfuscatedString secret;

        }

    }
*/

// Get a reference to ObfuscatedString secret
let settingsClass = ClassHelper.getClassByName("CompanyName.ProjectName.Settings")
let secretField = MonoApiHelper.ClassGetFieldFromName(settingsClass, "secret")
let secretValue = MonoApiHelper.FieldGetValueObject(secretField, settingsClass)

// Get a reference to the `ToString` function in the ObfuscatedString instance
let obfuscatedStringClass = MonoApiHelper.ObjectGetClass(secretValue)
let deobfuscateMethod = MonoApiHelper.ClassGetMethodFromName(obfuscatedStringClass, "ToString");

// Run `ToString` on the ObfuscatedString instance
var resultData = MonoApiHelper.RuntimeInvoke(deobfuscateMethod, secretValue, NULL)

// Convert value to an UTF8 string
var result = MonoApiHelper.StringToUtf8(resultData)

// Print result
console.log('secret:', typeof(result), result)