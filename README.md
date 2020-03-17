<p align="center">
    <img src="https://raw.githubusercontent.com/NorthwaveNL/fridax/master/.github/logo_visual.svg?sanitize=true" width="475" />
    <br/>
    <b>Fridax is a Node package for dealing with <a href="https://dotnet.microsoft.com/apps/xamarin">Xamarin</a> applications while using the <a href="https://frida.re/docs/javascript-api/">Frida API</a>.</b>
    <br/>
    <a href="#goal">Goal</a>
    •
    <a href="#installation">Installation</a>
    •
    <a href="#usage">Usage</a>
    •
    <a href="#examples">Examples</a>
    •
    <a href="#issues">Issues</a>
    •
    <a href="#license">License</a>
    <br/>
    <sub>Built with ❤ by the <a href="https://twitter.com/northwave_sec">Northwave</a> Red Team</sub>
    <br/>
</p>
<hr>

## Goal

In the Northwave Red Team we conduct security penetration tests on, among other things, mobile applications. During almost every mobile application penetration test we want to modify the behaviour of the application in such a way that it bypasses certain checks (e.g. a PIN code check).

Frida is a toolkit that allows us to do exactly that. It is a dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers. Using Frida you can, for example, inject and modify code of iOS and Android applications on runtime. However, if the application that is being pentested is a Xamarin application, it becomes more difficult to modify code on runtime, since Xamarin applications are basically wrappers that run a .NET binary.

**Fridax to the rescue!** Fridax allows you to easily modify the .NET binary inside a Xamarin application on runtime. We've included some example scripts that e.g. modify constructor and function arguments.

Happy hacking!

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies for Fridax.

```bash
npm install
```

## Usage

Please check the [known issues](#issues) before your start.

1. Connect your device (make sure it can be listed).
    - `frida-ls-devices`
2. Copy an example script to the scripts folder.
    - `cp examples/modify_class_function_argument.js scripts/modify_class_function_argument.js`
3. Adjust some of the config variables in the script (that you copied) to your needs.
    - Update `settingClassName`, `settingMethodName` and `settingMethodArgCount`
4. Start the application on your device and run your script!
    - `node fridax.js inject --scripts modify_class_function_argument`

**All options**

```bash
node fridax.js <command>

Commands:
  node fridax.js inject [scripts]  Inject the given scripts list.

Options:
  --version   Show version number                                                           [boolean]
  -h, --help  Show help                                                                     [boolean]
  --device    The address of the remote Frida device to connect to (or the string "usb")    [default: "usb"]

Examples:
  node fridax.js inject --scripts modify_function_argument intercept_password sql_injection
```

## Examples

Example scripts can be found in `./examples`. Place an example script in the `./scripts` folder to try it out.

## Issues

Issues or new features can be reported via the [GitHub issue tracker](https://github.com/NorthwaveNL/fridax/issues). Please make sure your issue or feature has not yet been reported by anyone else before submitting a new one.

**Known issues**

* Xamarin app needs to be running before you start this script (see [this issue](https://github.com/freehuntx/frida-mono-api/issues/4) for more information).

## License

Fridax is open-sourced software licensed under the [MIT license](https://github.com/NorthwaveNL/fridax/blob/develop/LICENSE.md).
