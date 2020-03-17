/**
 * You should not change this file.
 * Please consult the `README.md` file for usage details.
 */

// Dependencies
const fs = require(`fs`)
const storage = require(`node-persist`)
const frida = require(`frida`)
const fridaInject = require(`frida-inject`)

// Available arguments
let argv = require(`yargs`)
    .scriptName(`node fridax.js`)
    .wrap(280)
    .help(`h`).alias(`h`, `help`)
    .option(`device`, { default: `usb`, description: `The address of the remote Frida device to connect to (or the string "usb")`})
    .command(`inject [scripts]`, `Inject the given scripts list.`, (yargs) => {
        yargs
            .example(`$0 inject --scripts intercept_username intercept_password sql_injection`)
            .option(`scripts`, {
                alias: `s`,
                type: `array`,
                description: `A list of script names to run.`
            })
            .demandOption(`scripts`)
    }, (argv) => {})
    .demandCommand()
    .example(`$0 inject --scripts intercept_username intercept_password sql_injection`)
    .argv

// The Fridax runtime
async function main(options) {
    console.log(`[*] Awaiting storage initialization.`)
    await storage.init()

    let deviceManager = frida.getDeviceManager()
    let device = null;

    if (argv[`device`] !== `usb`) {
        console.log(`[*] Connecting to remote frida-server.`)
        device = await deviceManager.addRemoteDevice(argv[`device`]);
    } else {
        console.log(`[*] Awaiting USB device.`)
        let devices = await deviceManager.enumerateDevices()

        devices.forEach(enumDevice => {
            if (enumDevice.type == `usb`) {
                device = enumDevice
                return
            }
        })
    }

    if (device == null) {
        return console.error(`[!] Cannot find device.`)
    }

    console.log(`[*] Up and running on ${device.name}.`)

    let application = await selectApplicationOnDevice(device)
    let inject = await injectApplicationOnDevice(device, application)

    console.log(`[*] Happy hacking.`)
}

// Give the user the option to choose an application
async function selectApplicationOnDevice(device) {
    
    choices = []
    applications = await device.enumerateApplications()

    selectedApplication = null
    selectedName = await storage.getItem(`selectedApplication`)

    for (i in applications) {
        choices.push({
            name: applications[i][`name`],
            value: applications[i],
        })

        if (applications[i][`name`] == selectedName) {
            selectedApplication = applications[i]
        }
    }

    let answers = await require(`inquirer`).prompt([
        {
            type: `list`,
            name: `application`,
            message: `Which application do you want to inject?`,
            default: selectedApplication,
            choices: choices
        }
    ])

    await storage.setItem(`selectedApplication`, answers.application.name)

    return answers.application;
}

// Inject the given scripts in the chosen application
async function injectApplicationOnDevice(device, application) {
    let pid = application.pid ? application.pid : await device.spawn(application.identifier)

    var scripts = [`console.log('[*] Injected a test script (this runs from within the injected application)!')`]
    for (index in argv[`scripts`]) {
        var file = __dirname + `/scripts/${argv[`scripts`][index]}.js`
        if (fs.existsSync(file)) {
            scripts.push(file)
        } else {
            console.error(`[!] File '${file}' does not exist.`)
        }
    }

    return await fridaInject({
        pid: pid,
        device: device,
        scripts: scripts,
        onAttach: session => console.log(`[*] Attached to application (session: ${session.pid}).`),
        onDetach: (session, reason) => console.log(`[*] Detached from application (session: ${session.pid}): ${reason}.`),
        onUnload: script => console.log(`[*] Script unloaded.`)
    })
}

main()