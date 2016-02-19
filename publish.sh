#!/usr/bin/env bash
cd build/production/android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk cs-network-tester
$ANDROID_HOME/build-tools/23.0.1/zipalign 4 \release-unsigned.apk cs-network-tester.apk
