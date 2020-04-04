import {html,render} from '../../node_modules/lit-html/lit-html.js';
import TImg from '../t-img.js';

customElements.define('t-img', TImg);


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
                color:#000;
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
                    <h3>Pilihan Kategori Topik</h3>
                    <p>
                        Berikut adalah kategori topik yang bisa kamu submit:
                    </p>
                    <ul>
                        <li>
                            <h4>Progressive Web App (PWA)</h4>
                            <p>Bukan sekedar Add to homescreen, tapi lebih bagaimana menyelesaikan masalah yang dihadapi user dengan penggunaan API baru di web. Kombinasi UX dan teknologi web bisa menjadi materi yang baik untuk dibagikan.</p>
                        </li>
                        <li>
                            <h4>Product Development</h4>
                            <p>Bagaimana teknologi web membantu kalian mengembangkan suatu produk yang bermanfaat, bukan sekedar memilih platformnya tapi bagaimana web membantu dalam mengembangkan fitur yang dibutuhkan.</p>
                        </li>
                        <li>
                            <h4>Data dan visualisasi di web</h4>
                            <p>Data scrapping sudah menjadi hal umum, tapi apakah ada hal unik dari sekedar scrapping dalam pengolahan data? Bagaimana mengolah dan menampilkan data lebih visual dan interaktif dengan teknologi web?</p>
                        </li>
                        <li>
                            <h4>Streaming & Real Time Communication</h4>
                            <p>Di kondisi yang mengharuskan kita untuk isolasi diri saat ini, tool streaming dan komunikasi online merupakan hal yang menjadi barang wajib bagi semua lapisan masyarakat. Bagaimana sebenarnya teknologi itu bekerja di platform web? Arsitektur seperti apa yang memungkinkan kita bertatap muka dengan banyak orang sekaligus?</p>
                        </li>
                    </ul>
                    <p>Kami tetap menerima topik lain di luar kategori di atas selama tetap relevan dengan teknologi web. Pilihan kategori di atas adalah referensi topik apa yang kalian bisa submit.</p>
                    <p><a class="button" target="_blank" rel="noopener" href="https://docs.google.com/forms/d/e/1FAIpQLSdqXrDFsUHJK_8pLy3o_h_jM7P3X9bTXbzGb93KufvZakPwtw/viewform">Submit Topik</a></p>
                    </article>
                </div>
                <div class="block-content">
                    <article>
                        <h3>Bagaimana kami memilih?</h3>
                        <p>Terlepas dari penilaian umum seperti kualitas konten dan lainnya, berikut adalah sesuatu yang kami perhatikan dalam memilih topik:</p>
                        <ul>
                            <li>
                                <h4>Keunikan</h4>
                                <p>Topik yang disampaikan jarang ditemukan di internet atau event lainnya terutama untuk konten Bahasa Indonesia.</p>
                            </li>
                            <li>
                                <h4>Menginspirasi</h4>
                                <p>Informasi yang disampaikan memberikan inspirasi dan informasi bagi web developer lain untuk berkarya. Materi yang disampaikan mampu memberikan dorongan dan pengetahuan bagi developer untuk mengembangkan suatu karya baru.</p>
                            </li>
                            <li>
                                <h4>Terkait Situasi COVID19</h4>
                                <p>Tidak wajib terkait, tapi ini adalah nilai plus. Topik yang disampaikan bisa membantu teman-teman web developer lainnya di situasi pandemic COVID19 saat ini, baik dalam menciptakan solusi yang dapat membantu masyarakat luas atau membantu web developer tetap produktif.</p>
                            </li>
                        </ul>
                    </article>
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
