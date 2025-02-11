# App campus digital

### Build
1. Adicione a plataforma correspondente:  

1.1 Android
```sh
ionic cordova platform add android
```
1.2 iOS
```sh
ionic cordova platform add ios
```

2. Para realizar o build execute o comando:  

2.1 Android
```sh
npm run android-release
```
2.2 iOS
```sh
npm run ios-release
```

### Testes
1. Para realizar os testes em seu dispositivo **ANDROID**, plugue o mesmo no USB da sua máquina e execute o seguinte comando:
```sh
ionic cordova run android --device
```
ou
```sh
ionic cordova run android --configuration=<cliente> --device
```

### Teste do pacote gerado para ANDROID (.aab)
1. Baixar o **BUNDLETOOL**
    - Bundletool Download: https://github.com/google/bundletool/releases
    - Documentação: https://developer.android.com/studio/command-line/bundletool

2. Copiar o pacote (**.aab**) gerado pelo Build para a mesma pasta do '**bundletool.jar**':
    - Localização do pacote: campus-digital-santander-lyceum\platforms\android\app\build\outputs\bundle\release\

3. Gerar o pacote '**.apks**' a partir do '**.aab**'. Para isso execute o seguinte comando via terminal, informando o nome completo do pacote '**.aab**' na propriedade '**--bundle**' e o nome do pacote '**.apks**' a ser gerado na propriedade '**--output**'. Abaixo temos um pacote de exemplo do cliente Link:
```sh
java -jar bundletool.jar build-apks --bundle=LinkStudent.aab --output=LinkStudent.apks
```

4. É necessário habilitar a depuração USB no dispositivo e ter o **Android ADB** instalado na máquina, geralmente instalado junto com o Android Studio ou pode ser baixado em:
    Android ADB: https://developer.android.com/studio/command-line/adb

5. Para instalar em um dispositivo Android (com o aparelho conectado ao computador via USB e modo depuração ativada) execute o seguinte comando:
```sh
java -jar bundletool.jar install-apks --apks=LinkStudent.apks
```

### Problemas conhecidos
1. Caso ocorra o erro **Error: No Java files found which extend CordovaActivity**. Execute o comando:
```sh
cordova platform rm android && cordova platform add android
```

### Resources
1. Para gerar os resources do seu app (icon.png e splash.png) execute o comando:
```sh
ionic cordova resources --force
```
Cordova documentação de referência:
- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/