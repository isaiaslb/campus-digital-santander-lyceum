#!/usr/bin/env bash

## || : Ignora os erros quando o arquivo não existir

## Limpa pastas
rm -rf platforms &&
rm -rf plugins &&

## Plataforma
if [ $npm_config_plataforma = "iOS" ]; then
    cordova platform rm ios && 
    cordova platform add ios@6.2.0
fi

if [ $npm_config_plataforma = "android" ]; then
    cordova platform rm android && 
    cordova platform add android@11
fi