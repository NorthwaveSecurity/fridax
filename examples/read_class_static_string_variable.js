import { MonoApiHelper, MonoApi } from 'frida-mono-api'
import ClassHelper from '../libraries/class_helper'

/* 
    // This example script can read the static string variable `secret`.

    namespace CompanyName.ProjectName {

        class Settings {

            public static readonly string secret = "SecretValue";

        }

    }
*/

// Get a reference to the secret string
let settingsClass = ClassHelper.getClassByName("CompanyName.ProjectName.Settings")
let secretField = MonoApiHelper.ClassGetFieldFromName(settingsClass, "secretString")
let secretValue = MonoApiHelper.FieldGetValueObject(secretField, settingsClass)

// Convert value to an UTF8 string
var result = MonoApiHelper.StringToUtf8(secretValue)

// Print result
console.log('secret:', typeof(result), result)