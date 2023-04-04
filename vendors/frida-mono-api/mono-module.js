const KNOWN_RUNTIMES = ['mono.dll', 'libmonosgen-2.0.so' ];
const KNOWN_EXPORTS = ['mono_thread_attach'];

let monoModule = null;

// Look for a known runtime module.
for (let x in KNOWN_RUNTIMES) {
    let foundModule = Process.findModuleByName(KNOWN_RUNTIMES[x]);
    if (foundModule) {
        monoModule = foundModule;
        break;
    }
}

// Look for a known mono export.
if (!monoModule) {
    const monoThreadAttach = Module.findExportByName(null, 'mono_thread_attach')
    if (monoThreadAttach) monoModule = Process.findModuleByAddress(monoThreadAttach)
}

// Extended support to find the mono library by searching in module exports
// This should fix issue #1 (https://github.com/NorthwaveNL/fridax/issues/1)
if (!monoModule) {
    Process.enumerateModulesSync().forEach(function (singleModule) {
        Module.enumerateExportsSync(singleModule.name).forEach(function (singleExport) {
            if (singleExport.name.includes('mono_thread_attach')) {
                monoModule = Process.findModuleByName(singleModule.name)
            }
        })
    })
}

if (!monoModule) throw new Error('Can\'t find Mono runtime!')

export default monoModule