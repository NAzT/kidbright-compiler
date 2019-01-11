const path = require('path');
const util = require('util');
const execPromise = util.promisify(require('child_process').exec);
let G = {};

const ospath = function (p) {
    if (process.platform == 'win32') {
        return p.replace(/\//g, '\\');
    }
    return p;
}

const setConfig = (AppContext) => {
    G = Object.assign({}, AppContext)
    G.compiler = AppContext.compiler
    G.Log = require('./log')
    G.user_app_dir = AppContext.user_app_dir
    G.ospath = ospath
    G.esptool = AppContext.esptool
    G.board_name = AppContext.board_name
    G.toolchain_dir = AppContext.toolchain_dir
    G.COMPILER_AR = `${G.toolchain_dir}/xtensa-esp32-elf-ar`
    G.COMPILER_GCC = `${G.toolchain_dir}/xtensa-esp32-elf-gcc`
    G.COMPILER_CPP = `${G.toolchain_dir}/xtensa-esp32-elf-c++`
    G.ELF_FILE = `${G.user_app_dir}/${G.board_name}.elf`
    G.BIN_FILE = `${G.user_app_dir}/${G.board_name}.bin`
    G.ARCHIVE_FILE = `${G.user_app_dir}/libmain.a`
    G.PROCESS_DIR = AppContext.PROCESS_DIR || `${__dirname}/../..`
    console.log(`APP_PATH=${G.PROCESS_DIR}`)
}
const getName = (file) => path.basename(file).split('.')[0]
let compileFiles = async function ({plugins_sources, cflags, plugins_includes_switch}, cb) {
    const cppOptions = ["-std=gnu++11",
        "-fno-rtti", "-Og", "-ggdb", "-ffunction-sections", "-fdata-sections", "-fstrict-volatile-bitfields",
        "-mlongcalls", "-nostdlib", "-Wall", "-Werror=all", "-Wno-error=unused-function", "-Wno-error=unused-but-set-variable",
        "-Wno-error=unused-variable", "-Wno-error=deprecated-declarations", "-Wextra", "-Wno-unused-parameter", "-Wno-sign-compare",
        "-fno-exceptions", "-DESP_PLATFORM", "-D", "IDF_VER='\"\"'", "-MMD", "-MP", "-Wno-unused-variable", "-Wno-unused-value",
        "-DESP32=1", "-DWITH_POSIX", "-DMBEDTLS_CONFIG_FILE='\"mbedtls/esp_config.h\"'", "-DHAVE_CONFIG_H",
        "-Iesp32/lib/release/netpie/include"].join(" ")
    plugins_sources.forEach(async (file, idx, arr) => {
        let filename = getName(file)
        let fn_obj = `${G.user_app_dir}/${filename}.o`;
        let cmd = `"${G.COMPILER_CPP}" ${cppOptions} ${cflags} ${plugins_includes_switch} -c "${file}" -o "${fn_obj}"`;

        try {
            const {stdout, stderr} = await execPromise(G.ospath(cmd), {cwd: G.PROCESS_DIR})
            if (!stderr) {
                G.Log.i(`compiling... ${path.basename(file)} ok.`);
                G.Log.i(`${stdout}`);
            }
        } catch (e) {
            console.log(`catch error when compile file ${file}`)
            cb && cb(e)
        }
        if (idx === arr.length - 1) {
            console.log('compile all ok')
            cb && cb()
        }
    })
}


async function createBin() {
    console.log(`creating bin image... ${G.BIN_FILE}`);
    let cmd = `"${G.esptool}" --chip esp32 elf2image --flash_mode "dio" --flash_freq "40m" --flash_size "4MB" -o "${G.BIN_FILE}" "${G.ELF_FILE}"`
    return execPromise(G.ospath(cmd), {cwd: G.PROCESS_DIR})
}

async function linkObject({ldflags}) {
    console.log(`linking... ${G.ELF_FILE}`);
    var cmd = `"${G.COMPILER_GCC}"` + ` -nostdlib -u call_user_start_cpu0 -Wl,--gc-sections -Wl,-static -Wl,` +
        `--start-group ${ldflags} -L"${G.user_app_dir}" -lgcc -lstdc++ -lgcov -Wl,--end-group -Wl,-EL` +
        ` -o "${G.ELF_FILE}"`;

    return execPromise(G.ospath(cmd), {cwd: G.PROCESS_DIR})
}


async function archiveProgram({plugins_sources}) {
    console.log(`archiving... ${G.ARCHIVE_FILE} `);
    let obj_files = plugins_sources.map(plugin => `${G.user_app_dir}/${getName(plugin)}.o`).join(" ")
    var cmd = `"${G.COMPILER_AR}" cru "${G.ARCHIVE_FILE}" ${obj_files}`
    return execPromise(G.ospath(cmd), {cwd: G.PROCESS_DIR})
}

module.exports = {
    createBin,
    linkObject,
    archiveProgram,
    compileProgram: util.promisify(compileFiles),
    setConfig,
}
