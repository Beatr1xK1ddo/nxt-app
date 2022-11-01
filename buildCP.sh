#!/usr/bin/env bash

BUILD_ROOT_PATH="./dist/apps/nxt-cp";
DAVINCI_ROOT_PATH="$HOME/dist/apps/nxt-cp";
DAVINCI_GRAPH_PATH="dv2@qa.nextologies.com:/home/www/dv2_qa/html/davinci/web/ui/";

#prepare build
#rm -rf ./build;
#nx run nxt-cp:build --prod --skip-nx-cache
npx nx run nxt-cp:build --prod

#copy files
#eval rm -rf ${DAVINCI_GRAPH_PATH}*;
eval scp -r ${BUILD_ROOT_PATH}/* ${DAVINCI_GRAPH_PATH};

#build assets
#eval cd ${DAVINCI_ROOT_PATH};
#bin/console assets:install --symlink;
