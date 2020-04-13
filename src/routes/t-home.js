import {html,render} from '../../node_modules/lit-html/lit-html.js';
import TSpeakers from '../t-speakers.js';
customElements.define('t-speakers',TSpeakers);

export class THome extends HTMLElement {
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
                color:#D7182A;
            }

            h1,h2,h3,h4,h5{
                line-height:1.5em;
                color:#000;
            }
            
            
            #featured-image{
                background: #FFF url(../img/bg-mobile.png) no-repeat top center;
                background-size: 100% auto;
                height: 100vh;
                margin-bottom:5rem;
                color:#FFF;
                position:relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

           a.button{
                background:#D7182A;
                color:#FFF;
                padding:12px 8px;
                font-size:16px;
                text-transform:uppercase;
                border-radius:4px;
                border:none;
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
                position:absolute;
                bottom:32px;
                text-align:center;
                margin:0 auto;
                width:80%;
                color:#444;
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
               color:#000;
           }

            .app-container{
                text-align:center; 
            }

            .block-content ul{
                padding: 0;
                margin:0;
            }
            .block-content ul li{
                list-style-type:none;
                margin-bottom:1em;
            }

            .block-content p{
                padding-bottom:24px;
            }
            

            /* Larger than mobile screen */
            @media screen and (min-width : 720px)  {   
                #featured-image{              
                    background: #FFF url(../img/bg-desktop-hd.png) no-repeat center right;
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    position:relative;
                }

                #featured-image .content{
                    position:absolute;
                    top: 40%;
                    bottom:auto;
                    transform: translateY(-40%);
                    text-align:left;
                    margin:64px;
                    width:35%;
                    font-size:1.2rem;
                    line-height:1.2rem;
                    color: #444;
                }

                #featured-image .content h4{
                    line-height:1.6em;
                }

                .block-content ul{
                    display:grid;
                    grid-template-columns: auto auto;
                    grid-gap:1rem;
                }
                .block-content ul>li{
                    
                }
            }
            
            @media screen and (min-width : 1400px) {
                #featured-image{              
                    background: #FFF url(../img/bg-desktop-fhd.png) no-repeat top right;
                }
            }
        </style>
        <div class="app-container">
            <div id="featured-image">
                <a id="arrow-down" href="#main-content">&#8964;</a>
                <div class="content">
                    <h1>WWWID Live Camp</h1>
                    <h4>Konferensi online seharian seputar teknologi web</h4>
                    <h4>Sabtu, 18 April 2020</h4>
                    <h5>10.00 - 17.00 WIB<h5>
                    <p><a class="button" href="/home#detail">Lihat Detail</a></p>
                    
                </div>
            </div>
            <div id="main-content">
                <div id="detail" class="block-content">
                    <h2>Belajar online seputar teknologi web</h2>
                    <article>
                    <p>Mengingat situasi pandemic COVID-19 yang mewajibkan kita untuk tetap tinggal di rumah, kami ingin mengisi waktu teman-teman untuk tetap produktif dan update dengan teknologi web terkini. Untuk itu kami mengundang teman-teman yang tertarik untuk berbagi apapun yang terkait dengan teknologi web, yang bisa menginspirasi teman-teman untuk membuat sebuah aplikasi berbasis web yang baik.
                    </p>
                    <p>Konferensi ini akan diadakan dalam format online di mana teman-teman akan melakukan tele konferensi dengan organizer dan akan disiarkan melalui channel yang akan kami umumkan ke depan.</p>
                    </article>
                    <article>
                    <p>Terima kasih atas waktunya bagi yang sudah mengirimkan topik untuk konferensi online ini, walaupun singkat tapi kami menerima submission yang cukup untuk menyelenggaran konferensi online ini. Bagi yang topiknya tidak diterima, kami akan mengirimkan feedback agar ke depannya bisa lebih baik.</p>
                    <p>Kami memilih <a href="#speakers">7 pembicara</a> yang akan mengisi konferensi online ini. Jangan lupa bikin pengingat di kalender kalian agar tidak terlewat event ini dengan klik tombol di bawah.</p>
                    <p><a class="button" target="_blank" rel="noopener" href="https://www.google.com/calendar/render?action=TEMPLATE&text=WWWID+Live+Camp&details=Konferensi+online+seputar+teknologi+web.+%0AInfo%3A+https%3A%2F%2Flivecamp.wwwid.org&location=https%3A%2F%2Flivecamp.wwwid.org&dates=20200418T030000Z%2F20200418T100000Z">Simpan di Google Calendar</a></p>
                    </article>
                </div>
                <div class="block-content">
                    <t-speakers id="speakers"></t-speakers>
                </div>
                <div id="footer" class="block-content">
                    <p>Join our <a href="https://t.me/wwwid_pwa" target="_blank" rel="noopener">group discussion</a> and read our <a href="https://wwwid.org" target="_blank" rel="noopener">blog</a></p>
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

customElements.define('t-home',THome);
