import {html,render} from '../node_modules/lit-html/lit-html.js';
import TImg from './t-img.js';

customElements.define('t-img', TImg);


export class TApp extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
    }  

    static get observedAttributes() {return ['active']; }

    render(callback){
        window.requestAnimationFrame(()=>{
            render(this.template,this._shadowRoot);
            if(typeof callback==='function'){
                callback();
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name==='active'){
            this.scrollTo(newValue);
        }
        this.render();
    }

    connectedCallback(){
        this.render(()=>{
            this.scrollTo(this.getAttribute('active'));
        });
    }

    get template(){
        return html`
        <style>
            :host{
                display:block;
                margin:0;
                padding:0;
            }

            a{
                text-decoration:none;
            }

            
            #featured-image{
                background: url(../img/featured.jpg) no-repeat center center fixed;
                background-size: cover;
                height: 100vh;
                margin-bottom:5rem;
                color:#FFF;
                position:relative;

                display: flex;
                align-items: center;
                justify-content: center;
            }
            #arrow-down{
                display: none;
            }
            #featured-image .dark-bg{
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                left:0;
                background-color:#000;
                opacity:0.5;
            }
            #featured-image .content{
                position:relative;
                text-align:center;
                margin:0 auto;
                width:80%;
                // top:20%;
                font-size:1.2em;
            }
            
            header{
                margin:16px;
            }

           .block-content{
               margin:0 auto 8rem auto;
               padding:0 1rem;
               max-width:960px;
           }
           
           .block-content h2{
               width:100%;
           }

            .app-container{
                text-align:center; 
            }

                
            

            .block-content ul{
                column-count:3;
                padding: 0;
                margin:0;
            }
            .block-content ul li{
                list-style-type:none;
                margin-bottom:1em;
            }

            

            /* Larger than mobile screen */
            @media (min-width: 40.0rem) {                 
               
            }


        </style>
        <div class="app-container">
            <div id="featured-image">
                <div class="dark-bg"></div>
                <a id="arrow-down" href="#main-content">&#8964;</a>
                <div class="content">
                    <h1>WC Starter Kit</h1>
                    <h4>Web Component Web App Starter Kit</h4>
                    <p>Template to develop a web app based on web component.</p>
                    
                </div>
            </div>
            <div id="main-content">
                <div id="tentang" class="block-content">
                    <h2>Bootcamp Untuk Aktivis Komunitas Pengembang Web Indonesia</h2>
                    <article>
                    <p>Indonesia adalah negara besar dengan pertumbuhan industri startup yang sangat cepat. Tapi pertumbuhan ini tidak dibarengi dengan pertumbuhan suplai talenta. Bahkan lulusan universitas belum memenuhi kebutuhan standar industri. Karena itu komunitas di sini memainkan peran yang sangat penting untuk mengembangkan talenta kita dan menyiapkan mereka untuk siap dengan standar industri.
                    </p>
                    <p>Bootcamp ini diperuntukkan untuk kalian yang aktif di komunitas pengembang web Indonesia sehingga kita bisa saling mengenal satu sama lain dan bersama-sama berdiskusi untuk membuat para pengembang web di Indonesia bisa membuat web yang lebih baik.</p>
                    </article>
                </div>
                
                <div id="footer" class="block-content">
                    <p>Develop by <a href="//github.com/tyohan">@tyohan</a>,<a href="//github.com/ri7nz">@ri7nz</a> and <a href="//github.com/satyakresna">@satyakresna</a>. Available in our <a href="//github.com/w3id/webunconfid-website">Github</a>.</p>
                    <p>Join our <a href="https://t.me/wwwid_pwa">group discussion</a> and read our <a href="https://medium.com/wwwid">publication</a></p>
                </div>
            </div>
        </div>
        `;
    }

    scrollTo(selector){
        if(selector.length>0){
            const el=this._shadowRoot.querySelector(selector);
            if(el!==null){
                el.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
    }
}

customElements.define('t-app',TApp);
