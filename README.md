<p align="center">
    <img src="https://raw.githubusercontent.com/NorthwaveNL/fridax/master/.github/logo_text.svg?sanitize=true" width="475" />
    <br/>
    <b>Fridax is a Node package for dealing with <a href="https://dotnet.microsoft.com/apps/xamarin">Xamarin</a> applications while using the <a href="https://frida.re/docs/javascript-api/">Frida API</a>.</b>
    <br/>
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

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies for Fridax.

```bash
npm install
```

## Usage

Please check the [known issues](#known-issues) before your start.

1. Connect you're device (make sure it can be listed).
    - `frida-ls-devices`
2. Copy an example script to the scripts folder.
    - `cp examples/modify_function_argument.js scripts/modify_function_argument.js`
3. Adjust some of the settings in the script to your needs.
    - Update `settingClassName`, `settingMethodName` and `settingMethodArgCount`
4. Run the hello world script!
    - `node hack.js inject --scripts hello_world`

**All options**

```bash
node hack.js <command>

Commands:
  node hack.js inject [scripts]  Inject the given scripts list.

Options:
  --version   Show version number                                                           [boolean]
  -h, --help  Show help                                                                     [boolean]
  --device    The address of the remote Frida device to connect to (or the string "usb")    [default: "usb"]

Examples:
  node hack.js inject --scripts modify_function_argument intercept_password sql_injection
```

## Examples

Example scripts can be found in `./examples`. Place an example script in the `./scripts` folder to try it out.

## Issues

Issues or new features can be reported via the [GitHub issue tracker](https://github.com/NorthwaveNL/fridax/issues). Please make sure your issue or feature has not yet been reported by anyone else before submitting a new one.

**Known issues**

* Xamarin app needs to be running before you start this script (see [this issue](https://github.com/freehuntx/frida-mono-api/issues/4) for more information).

## License

Fridax is open-sourced software licensed under the [MIT license](https://github.com/NorthwaveNL/fridax/blob/develop/LICENSE.md).