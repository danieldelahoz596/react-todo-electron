
const {BrowserWindow} = require('electron');

class ChildWindow{
    constructor(parent, url, options){
        this.window = new BrowserWindow({
            ...options,
            parent,
        })

        this.window.loadURL(url)


    }
}

class PickerWindow extends ChildWindow{
    constructor(parent, url, options){
        super(parent, url, options);

        this.window.on('ready-to-show', ()=>{

            this.window.show()

            // ASSIGN FOCUS EVENT HANDLER ON PARENT FOCUS
            parent.webContents.executeJavaScript("document.getElementById('root').style = 'pointer-events:none; filter: brightness(50%);'");

            parent.once('focus', ()=>{
              // START EXIT ANIMATION
              this.window.webContents.send('start-exit-anim')

              parent.webContents.executeJavaScript("document.getElementById('root').style = 'pointer-events:auto; filter: none;'");

              this.window.on('ready-to-close', ()=>{
                this.window.close()
                this.window = null
              })
        
            })
          })
    }

    get isDestroyed(){
        return (!this.window)
    }

}

module.exports = {
    PickerWindow,
    ChildWindow
}