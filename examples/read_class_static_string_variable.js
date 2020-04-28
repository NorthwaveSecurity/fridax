/**
 * Class static variable reader.
 *
 * @author          Tijme Gommers (@tijme)
 * @copyright       Northwave B.V. (www.northwave-security.com)
 * @description     This example script will allow you to read the `secret` variable of the class below.
 * 
 *    namespace CompanyName.ProjectName {
 *
 *        class Settings {
 *
 *            public static string secret = "very secret";
 *
 *        }
 *
 *    }
 * 
 */

import FridaxClass from 'libraries/fridax_class'

// Log that the module was loaded succesfully
console.log(`[*] Loaded ${require('path').basename(__filename)}.`)

// Construct a Fridax FridaxClass for the given `CompanyName.ProjectName.Settings` class.
const settings = new FridaxClass('CompanyName.ProjectName.Settings')

// Read the secret variable
const secret = settings.getStaticField('secret').toString()

// Log the secret variable
console.log('secret:', secret)
