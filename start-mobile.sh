#!/usr/bin/env bash
cd app
#meteor $1 --settings ../environments/local/settings.json --release velocity:METEOR@1.1.0.3_2 --raw-logs
#TODO: this might cause issues with running apps slower. We can remove this if we need to..
meteor run android
