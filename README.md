# kidbright-compiler

		

## Installation
	npm i -g kidbright-compiler


## Usage
    Usage: kidbright-compiler <cmd> [options]

    Commands:
      kidbright-compiler compile   compile kidbright program.
      kidbright-compiler flash     flash device using esptool.
      kidbright-compiler generate  generate a dummy context configuration.

    Options:
      --help, -h     Show help                                             [boolean]
      --version, -v  1.1.3                                                 [boolean]


# Example
    $ kidbright-compiler compile --context=context.json
    $ kidbright-compiler flash --context=context.json --port=/dev/tty.usbserial-DO01WLR4

## Compile
    $ kidbright-compiler compile --context=context.json
    
    process_dir=/Users/nat/kidbright/KidBrightDev
    compiling... lcd_i2c.cpp ok.
    compiling... lcd1604.cpp ok.
    compiling... user_app.cpp ok. (with warnings)
    archiving... /Users/nat/kidbright/KidBrightDev/esp32/build/80-7d-3a-a5-8c-0c/libmain.a
    linking... /Users/nat/kidbright/KidBrightDev/esp32/build/80-7d-3a-a5-8c-0c/80-7d-3a-a5-8c-0c.elf
    creating bin image... /Users/nat/kidbright/KidBrightDev/esp32/build/80-7d-3a-a5-8c-0c/80-7d-3a-a5-8c-0c.bin
    compile all files done

## Flash
    $ kidbright-compiler flash --context=context.json --port=/dev/tty.usbserial-DO01WLR4
    
    esptool.py v2.3.1
    Connecting....
    Chip is ESP32D0WDQ6 (revision (unknown 0xa))
    Features: WiFi, BT, Dual Core, VRef calibration in efuse
    Uploading stub...
    Running stub...
    Stub running...
    Changing baud rate to 480600
    Changed.
    Configuring flash size...
    Auto-detected Flash size: 4MB
    Compressed 22800 bytes to 13413...
    Wrote 22800 bytes (13413 compressed) at 0x00001000 in 0.3 seconds (effective 599.4 kbit/s)...
    Hash of data verified.
    Compressed 3072 bytes to 103...
    Wrote 3072 bytes (103 compressed) at 0x00008000 in 0.0 seconds (effective 1573.0 kbit/s)...
    Hash of data verified.
    Compressed 257552 bytes to 120526...
    Wrote 257552 bytes (120526 compressed) at 0x00010000 in 3.0 seconds (effective 692.4 kbit/s)...
    Hash of data verified.

    Leaving...
    Hard resetting via RTS pin...
 
## Generate a dummy configuration
    $ kidbright-compiler generate > context.json
    
    {
      "kidbright_path": "/Users/nat/kidbright/KidBrightDev",
      "user_app_dir": "esp32/build",
      "release_dir": "esp32/lib/release",
      "board_name": "80-7d-3a-a5-8c-0c",
      "compiler": {
        "plugins_sources": [
          "plugins/node_modules/display/lcd_i2c/lcd_i2c.cpp",
          "plugins/node_modules/kidbright-plugin-makerasia-lcd/lcd1604/lcd1604.cpp"
        ],
        "cflags": "-Iesp32/lib/release/include -Iesp32/lib/release/app_trace/include -Iesp32/lib/release/app_update/include -Iesp32/lib/release/arduino-esp32/cores/esp32 -Iesp32/lib/release/arduino-esp32/variants/esp32 -Iesp32/lib/release/arduino-esp32/libraries/ArduinoOTA -Iesp32/lib/release/arduino-esp32/libraries/ArduinoOTA/src -Iesp32/lib/release/arduino-esp32/libraries/AzureIoT -Iesp32/lib/release/arduino-esp32/libraries/AzureIoT/src -Iesp32/lib/release/arduino-esp32/libraries/BLE -Iesp32/lib/release/arduino-esp32/libraries/BLE/src -Iesp32/lib/release/arduino-esp32/libraries/BluetoothSerial -Iesp32/lib/release/arduino-esp32/libraries/BluetoothSerial/src -Iesp32/lib/release/arduino-esp32/libraries/DNSServer -Iesp32/lib/release/arduino-esp32/libraries/DNSServer/src -Iesp32/lib/release/arduino-esp32/libraries/EEPROM -Iesp32/lib/release/arduino-esp32/libraries/ESP32 -Iesp32/lib/release/arduino-esp32/libraries/ESP32/src -Iesp32/lib/release/arduino-esp32/libraries/ESPmDNS -Iesp32/lib/release/arduino-esp32/libraries/ESPmDNS/src -Iesp32/lib/release/arduino-esp32/libraries/FS -Iesp32/lib/release/arduino-esp32/libraries/FS/src -Iesp32/lib/release/arduino-esp32/libraries/HTTPClient -Iesp32/lib/release/arduino-esp32/libraries/HTTPClient/src -Iesp32/lib/release/arduino-esp32/libraries/Preferences -Iesp32/lib/release/arduino-esp32/libraries/Preferences/src -Iesp32/lib/release/arduino-esp32/libraries/SD -Iesp32/lib/release/arduino-esp32/libraries/SD/src -Iesp32/lib/release/arduino-esp32/libraries/SD_MMC -Iesp32/lib/release/arduino-esp32/libraries/SD_MMC/src -Iesp32/lib/release/arduino-esp32/libraries/SPI -Iesp32/lib/release/arduino-esp32/libraries/SPI/src -Iesp32/lib/release/arduino-esp32/libraries/SPIFFS -Iesp32/lib/release/arduino-esp32/libraries/SPIFFS/src -Iesp32/lib/release/arduino-esp32/libraries/SimpleBLE -Iesp32/lib/release/arduino-esp32/libraries/SimpleBLE/src -Iesp32/lib/release/arduino-esp32/libraries/Ticker -Iesp32/lib/release/arduino-esp32/libraries/Ticker/src -Iesp32/lib/release/arduino-esp32/libraries/Update -Iesp32/lib/release/arduino-esp32/libraries/Update/src -Iesp32/lib/release/arduino-esp32/libraries/WiFi -Iesp32/lib/release/arduino-esp32/libraries/WiFi/src -Iesp32/lib/release/arduino-esp32/libraries/WiFiClientSecure -Iesp32/lib/release/arduino-esp32/libraries/WiFiClientSecure/src -Iesp32/lib/release/arduino-esp32/libraries/Wire -Iesp32/lib/release/arduino-esp32/libraries/Wire/src -Iesp32/lib/release/bootloader_support/include -Iesp32/lib/release/bt/include -Iesp32/lib/release/bootloader_support/include -Iesp32/lib/release/bt/include -Iesp32/lib/release/bt/bluedroid/api/include/api -Iesp32/lib/release/coap/port/include -Iesp32/lib/release/coap/port/include/coap -Iesp32/lib/release/coap/libcoap/include -Iesp32/lib/release/coap/libcoap/include/coap -Iesp32/lib/release/console -Iesp32/lib/release/driver/include -Iesp32/lib/release/esp32/include -Iesp32/lib/release/esp_adc_cal/include -Iesp32/lib/release/esp_http_client/include -Iesp32/lib/release/esp_https_ota/include -Iesp32/lib/release/esp-tls -Iesp32/lib/release/ethernet/include -Iesp32/lib/release/expat/port/include -Iesp32/lib/release/expat/include/expat -Iesp32/lib/release/fatfs/src -Iesp32/lib/release/freertos/include -Iesp32/lib/release/heap/include -Iesp32/lib/release/idf_test/include -Iesp32/lib/release/jsmn/include -Iesp32/lib/release/json/cJSON -Iesp32/lib/release/kidbright32/include -Iesp32/lib/release/libsodium/libsodium/src/libsodium/include -Iesp32/lib/release/libsodium/port_include -Iesp32/lib/release/log/include -Iesp32/lib/release/lwip/include/lwip -Iesp32/lib/release/lwip/include/lwip/port -Iesp32/lib/release/lwip/include/lwip/posix -Iesp32/lib/release/lwip/apps/ping -Iesp32/lib/release/mbedtls/port/include -Iesp32/lib/release/mbedtls/mbedtls/include -Iesp32/lib/release/mdns/include -Iesp32/lib/release/micro-ecc/micro-ecc -Iesp32/lib/release/newlib/platform_include -Iesp32/lib/release/newlib/include -Iesp32/lib/release/nghttp/port/include -Iesp32/lib/release/nghttp/nghttp2/lib/includes -Iesp32/lib/release/nvs_flash/include -Iesp32/lib/release/openssl/include -Iesp32/lib/release/pthread/include -Iesp32/lib/release/sdmmc/include -Iesp32/lib/release/smartconfig_ack/include -Iesp32/lib/release/soc/esp32/include -Iesp32/lib/release/soc/include -Iesp32/lib/release/spiffs/include -Iesp32/lib/release/spi_flash/include -Iesp32/lib/release/tcpip_adapter/include -Iesp32/lib/release/ulp/include -Iesp32/lib/release/vfs/include -Iesp32/lib/release/wear_levelling/include -Iesp32/lib/release/wpa_supplicant/include -Iesp32/lib/release/wpa_supplicant/port/include -Iesp32/lib/release/xtensa-debug-module/include -Iesp32/lib/release/netpie/include",
        "ldflags": "-Lesp32/lib/release/app_trace -lapp_trace -Lesp32/lib/release/app_update -lapp_update -Lesp32/lib/release/arduino-esp32 -larduino-esp32 -Lesp32/lib/release/aws_iot -Lesp32/lib/release/bootloader_support -lbootloader_support -Lesp32/lib/release/bt -lbt -Lesp32/lib/release/bt/lib -lbtdm_app -Lesp32/lib/release/coap -lcoap -Lesp32/lib/release/console -lconsole -Lesp32/lib/release/cxx -lcxx -u __cxa_guard_dummy -Lesp32/lib/release/driver -ldriver -Lesp32/lib/release/esp32 -lesp32 esp32/lib/release/esp32/libhal.a -Lesp32/lib/release/esp32/lib -lcore -lrtc -lnet80211 -lpp -lwpa -lsmartconfig -lcoexist -lwps -lwpa2 -lespnow -lphy -lmesh -Lesp32/lib/release/esp32/ld -T esp32_out.ld -u ld_include_panic_highint_hdl -T esp32.common.ld -T esp32.rom.ld -T esp32.peripherals.ld -T esp32.rom.libgcc.ld -T esp32.rom.spiram_incompatible_fns.ld -Lesp32/lib/release/esp_adc_cal -lesp_adc_cal -Lesp32/lib/release/esp_http_client -lesp_http_client -Lesp32/lib/release/esp_https_ota -lesp_https_ota -Lesp32/lib/release/esp-tls -lesp-tls -Lesp32/lib/release/ethernet -lethernet -Lesp32/lib/release/expat -lexpat -Lesp32/lib/release/fatfs -lfatfs -Lesp32/lib/release/freertos -lfreertos -Wl,--undefined=uxTopUsedPriority -Lesp32/lib/release/heap -lheap -Lesp32/lib/release/idf_test -lidf_test -Lesp32/lib/release/jsmn -ljsmn -Lesp32/lib/release/json -ljson -Lesp32/lib/release/kidbright32 -lkidbright32 -Lesp32/lib/release/libsodium -llibsodium -Lesp32/lib/release/log -llog -Lesp32/lib/release/lwip -llwip -Lesp32/lib/release/main -lmain -Lesp32/lib/release/mbedtls -lmbedtls -Lesp32/lib/release/mdns -lmdns -Lesp32/lib/release/micro-ecc -lmicro-ecc -Lesp32/lib/release/newlib esp32/lib/release/newlib/lib/libc.a esp32/lib/release/newlib/lib/libm.a -lnewlib -Lesp32/lib/release/nghttp -lnghttp -Lesp32/lib/release/nvs_flash -lnvs_flash -Lesp32/lib/release/openssl -lopenssl -Lesp32/lib/release/pthread -lpthread -Lesp32/lib/release/sdmmc -lsdmmc -Lesp32/lib/release/smartconfig_ack -lsmartconfig_ack -Lesp32/lib/release/soc -lsoc -Lesp32/lib/release/spiffs -lspiffs -Lesp32/lib/release/spi_flash -lspi_flash -Lesp32/lib/release/tcpip_adapter -ltcpip_adapter -Lesp32/lib/release/ulp -lulp -Lesp32/lib/release/vfs -lvfs -Lesp32/lib/release/wear_levelling -lwear_levelling -Lesp32/lib/release/wpa_supplicant -lwpa_supplicant -Lesp32/lib/release/xtensa-debug-module -lxtensa-debug-module -Lesp32/lib/release/netpie -lnetpie",
        "plugins_includes_switch": "-I\"plugins/node_modules/display/lcd_i2c\" -I\"plugins/node_modules/display/lcd_i2c\" -I\"plugins/node_modules/kidbright-plugin-makerasia-lcd/lcd1604\" -I\"plugins/node_modules/kidbright-plugin-makerasia-lcd/lcd1604\""
      }
    }
