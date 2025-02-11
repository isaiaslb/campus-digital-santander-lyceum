import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private iab: InAppBrowser,
  ) {
    this.initializeApp();
  }
  
  declare url: any;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#032554");

      this.openDocenteResponsivo();
      
      this.splashScreen.hide();
    })
  }

  openDocenteResponsivo() {

    const browser = this.iab.create(environment.url_dol, '_blank', {
      location: 'no',
      clearcache: 'yes',
      clearsessioncache: 'yes',
      hidenavigationbuttons: 'yes',
      hideurlbar: 'yes',
      fullscreen: 'yes',
      toolbar : 'no',
      disallowoverscroll: 'yes'
    });
    
    browser.on('loadstop').subscribe((event) => {
      browser.executeScript({code: `(function() { 
        let originalXMLHttpRequest = XMLHttpRequest;

        XMLHttpRequest = function() {
            let xhr = new originalXMLHttpRequest();

            // Store the original send method
            let originalSend = xhr.send;

            // Override the send method
            xhr.send = function() {
                let originalOnReadyStateChange = xhr.onreadystatechange;
                xhr.onreadystatechange = function(event) {
                
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        
                        // if (xhr._method && xhr._method.toLowerCase() === 'post') {
                         
                            try {
                                let responseData = JSON.parse(xhr.responseText);

                                // Here you can add checks for specific values
                                if (responseData.commands && responseData.commands[0] 
                                    && responseData.commands[0].function === 'cronapi.util.downloadFile') {
                                      url = '${environment.url_dol}'  + responseData.commands[0].params[0];                                    
                                    if(url.indexOf('download') > -1){
                                     var url_download = '?url-download=' + responseData.commands[0].params[0];
                                    window.history.pushState("object or string", "Title", url_download);
                                    }
                                }

                            } catch (error) {
                                console.error('Error processing JSON:', error);
                            }
                        // }

                        // Ensure other listeners are called
                        if (originalOnReadyStateChange) {
                            originalOnReadyStateChange.apply(this, arguments);
                        }
                    }
                };

                // Store the method for later use in onreadystatechange
                if (arguments[0]) {
                    xhr._method = arguments[0];
                }

                // Call the original send method
                originalSend.apply(this, arguments);
            };

            return xhr;
        };
        })()`
      })
      if(event.url.indexOf('url-download') > -1){
        console.log('Url download = ' + event.url)
        var urlPart = event.url.split('url-download=');
        console.log('url saida = ' + environment.url_dol + urlPart[1]);
        window.open(environment.url_dol + urlPart[1]);
      }

    });
  }

}
