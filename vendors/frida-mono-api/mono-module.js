let monoModule = Process.findModuleByName('mono.dll')

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

if (!monoModule) throw new Error('Cant find mono!')

export default monoModule