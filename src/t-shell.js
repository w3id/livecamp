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
            
            const module= this.importModule('/src/routes/t-app.js');
            this.activePage=html`<t-app active="${window.location.hash}"></t-app>`;
            this.render(true);
        });

        this.router.on('/about',async ()=>{
            const TSchedule= this.importModule('/src/routes/t-about.js');
            this.activePage=html`<t-about></t-about>`;
            this.render(true);
        });

        this.router.on('/groups',async ()=>{
            this.importModule('/src/routes/t-groups.js');
            this.activePage=html`<t-groups></t-groups>`;
            this.render(true);
        });

        this.router.on('/groups/create',async ()=>{
            this.importModule('/src/routes/t-groups-create.js');
            this.activePage=html`<t-groups-create></t-groups-create>`;
            this.render(true);
        });

        this.router.on('/expenses/*',async ()=>{
            this.importModule('/src/routes/t-expenses.js');
            this.activePage=html`<t-expenses></t-expenses>`;
            this.render(true);
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
        });
    }

    

    importModule(url){
        const script=document.createElement('script');
        script.setAttribute('src',url);
        script.setAttribute('type','module');
        document.head.appendChild(script);
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
            }
            #drawer-container{
                position: relative;
                height: 100vh;
                width: 100vw;
            }
            
            #content-container {
                height:
            }
            header{
                padding:0 1rem;
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

            #drawer ul{
                list-style:none;
                padding-left:1rem;
            }

            #drawer.active{
                left:0;
                border-right: 1px solid #CCC;
            }

            #drawer ul li{
                line-height:4rem;
            }
            #nav-toggle{
                position: fixed;
                left: 1rem;
                top:1rem;
                font-size: 3rem;
                text-decoration: none;
                color: #FFF;
                z-index:100;
                vertical-align:top;
                height: 50px;
                width: 50px;
                text-align: center;
            }
            #nav-close{
                position: absolute;
                right: 2rem;
                font-size: 3rem;
                top:1rem;
                padding:0;
                margin:0;
                text-decoration:none;
            }

             @media (min-width: 40.0rem) { 
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

                #drawer{
                    width:70vw;
                    right:2rem;
                    top:1rem;
                    left:30vw;
                    height:3rem;
                    background:transparent;
                    position: absolute;
                }

                #drawer.active{
                    left:30vw;
                    border-right: none;
                }
                
                #drawer ul{
                    display:flex;
                    flex-direction:row;
                    justify-content:flex-end;
                    margin:0 4rem 0 0;
                }

                #drawer ul li{
                    padding:1rem 2rem 1rem 4rem;
                    text-align:right;
                    line-height:2rem;
                }
                #drawer ul li a{
                    color:#FFF;
                }
                #drawer header,#nav-close,#nav-toggle{
                    display:none;
                }
             }

        </style>
        <div id="drawer-container">
                <button id="nav-toggle" class="nav-toggle">&#9776;</button>
                <div id="drawer">
                        <button id="nav-close" class="nav-toggle">&times;</button>
                        <header>
                                <h2>Menu</h2>
                        </header>
                        <ul id="menu">
                            <li><a href="/home#tentang">Tentang</a></li>
                            <li><a href="/home#venue-content">Lokasi</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                </div>
                <div id="content-container">
                    ${this.activePage}
                </div>
        </div>
        `;
    }
    
}
customElements.define('t-shell', TShell);