import {html,render} from '../node_modules/lit-html/lit-html.js';
import TRouter from './t-router.js';

export default class TShell extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
        this.activePage=``;
    }

    connectedCallback() {

        this.router=new TRouter;
        
        this.router.on('/home',async ()=>{
            import('./routes/t-home.js').then(({ THome })=> {
                this.activePage=html`<t-home active="${window.location.hash}"></t-app>`;
                this.render(true);
              });
        });


        if(this.router.activeRoute===null){
            this.router.goTo('/home');
        }
        
        this.render(false,()=>{
            this._shadowRoot.querySelectorAll('.nav-toggle').forEach(el=>{
                el.addEventListener('click',(e)=>{
                    this._shadowRoot.querySelector('#drawer').classList.toggle('active');
                });
            });
            const article = this._shadowRoot.querySelector('#drawer-container>article');
            article.addEventListener('click',(e) =>{
                this._shadowRoot.querySelector('#drawer').classList.remove('active');
            });
        });
    }

    
    render(toggle,callback){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
            if(toggle===true){
                this._shadowRoot.querySelector('#drawer').classList.remove('active');
            }
            if(typeof callback==='function'){
                callback();
            }
        });
    }

    get template(){
        return html`
        <style>
            :host{
                display:block;
            }
            a{
                text-decoration:none;
                color:#D7182A;
            }
            #drawer-container{
                position: relative;
                width: 100vw;
                display:grid;
            }

            #drawer-container>header{
                position:fixed;
                top:0;
                left:0;
                right:0;
                z-index:100;
                height:56px;
                background:#e3f0f3;
                line-height:56px;
            }
            
            #drawer-container>header .logo{
                height: 40px;
                display:inline-block;
                vertical-align:middle;
            }
            #drawer-container>article{
                grid-row-start:1;
                grid-row-end:span 1;
            }

            #drawer{
                width:70vw;
                height: 100vh;
                left:-70vw;
                top:0;
                position: fixed;
                background: #FFF;
                transition-duration: 0.2s;
                z-index:1000;
            }

            #drawer>header{
                height:56px;
                display:grid;
                grid-template-columns:auto 56px;
            }

            #drawer>header>h2{
                margin:0;
                padding-left:16px;
                line-height:56px;
            }

            #nav-close{
                grid-column-start:2;
                font-size: 24px;
                text-decoration: none;
                color: #999;
                z-index:100;
                vertical-align:middle;
                padding:12px;
                text-align: center;
                background:transparent;
                border:none;
                text-decoration:none;
            }

            #drawer ul{
                list-style:none;
                padding-left:1rem;
            }

            #drawer.active{
                left:0;
                border-right: 1px solid #CCC;
            }

            #drawer ul li{
                line-height:56px;
                margin-bottom:24px;
            }
            #nav-toggle{
                font-size: 24px;
                text-decoration: none;
                color: #C0C0C0;
                z-index:100;
                vertical-align:middle;
                padding:12px;
                text-align: center;
                background:transparent;
                border:none;
            }

            

             @media (min-width: 640px) { 
                #drawer-container>header{
                    position:absolute;
                    top:16px;
                    left:16px;
                    width:30%;
                    z-index:10;
                    background:transparent;
                }

                #drawer-container>header .logo{
                    display:inline-block;
                }
                #drawer-container>aside{
                    top:16px;
                    right:16px;
                    width:70%;
                    left:30%;
                    margin:0;
                    height:56px;
                    background: transparent;
                    position:absolute;
                }

                #arrow-down {
                    font-size: 8rem;
                    text-decoration: none;
                    color: #F0F0F0;
                    z-index:100;
                    bottom:0;
                    position:absolute;
                    left:50%;
                    transform: translateX(-50%);
                }    

                #drawer-container>aside>header{

                }
                

                #drawer-container>aside.active{
                    left:30vw;
                    border-right: none;
                }
                
                #drawer ul{
                    display:flex;
                    flex-direction:row;
                    justify-content:flex-end;
                    margin:0;
                }

                #drawer ul li{
                    padding:0 24px;
                    text-align:right;
                    line-height:56px;
                }
                #drawer ul li a{
                    color:#000;
                }
                #drawer header,#nav-close,#nav-toggle{
                    display:none;
                }
             }

        </style>
        <div id="drawer-container">
                <header>
                    <button id="nav-toggle" class="nav-toggle">&#9776;</button>
                    <img class="logo" 
                        srcset="/img/logo-light-bg@2x.png 2x,
                                /img/logo-light-bg.png"
                    src="/img/logo-light-bg@2x.png" alt="logo  WWWID"/>
                </header>
                <aside id="drawer">
                        <header>
                                <h2>Menu</h2>
                                <button id="nav-close" class="nav-toggle">&times;</button>
                        </header>
                        <ul id="menu">
                            <li><a href="/home#detail">Detail</a></li>
                            <li><a href="/home#speakers">Pembicara</a></li>
                            <li><a href="https://wwwid.org/pages/tentang-kami/">Organizer</a></li>
                        </ul>
                </aside>
                <article id="content-container">
                    <div id="active-page">
                        ${this.activePage}
                    </div>
                </article>
        </div>
        `;
    }
    
}
customElements.define('t-shell', TShell);