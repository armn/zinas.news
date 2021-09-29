<div class="bg"></div>

<div class="wrapper">
<div class="content">
    <h1>Zinas.news</h1>
    <h3>29.07.2021 - 29.09.2021</h3>
    <p>Šis projekts bija ziņu agregators no lielākajiem Latvijas medijiem, izmantojot to piedāvātās RSS plūsmas. Tā mērķis bija viegli pārskatāmā veidā atspoguļot jaunākās ziņas Latvijā. Katra ziņa no RSS plūsmas saturēja saiti uz oriģinālo rakstu no attiecīgā portāla. Lapa neievāca apmeklētāju datus, bija bez reklāmām vai komerciāla nolūka.</p>
    <p>29. septembrī saņēmu paziņojumu no Rīgas reģiona pārvaldes Kārtības policijas nodaļas par nepieciešamību ierasties iecirknī saskaņā ar resoriskās pārbaudes uzsākšanu.</p>
    <p>Izrādās, ka portāls TVNET ir vērsies policijā ar iesniegumu par autortiesību pārkāpumu. Es nezinu, vai tas ir dēļ tā, ka ziņu autorības norādīšanai izmantoju portāla logo, vai arī viņi nebija mierā ar RSS plūsmas vizuālu atspoguļojumu. Pēc līdzīga darbības principa no RSS ziņu lentēm informāciju iegūst arī Google Ziņas, Feedly un citi RSS lasītāji, taču man, kā vienkāršam izstrādātājam, nav spēkos cīnīties pret Goliātu, tāpēc <strong>šī vietne tiek slēgta.</strong></p>

    <em style="text-align: right; display: block;">&mdash; Armands Leimanis, <a href="https://twitter.com/armn">@armn</a></em>
</div>
</div>

<style>

    * {
        box-sizing: border-box;
    }
    .bg {
        width: 100vw;
        height: 100vh;
        background-image: url('/zinas-bg.jpg');
        opacity: 0.2;
        position: absolute;
        left: 0;
        top: 0;
        background-size: cover;
        }

        h1, h3 {
            margin: 0;
        }

        .wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            max-width: 90vw;
            margin: 2rem auto;
            
        }
    .content {
        background: rgba( 0, 0, 0, 0.15 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.17 );
        backdrop-filter: blur( 14px );
        -webkit-backdrop-filter: blur( 14px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        width: auto;
        height: auto;
        max-width: 600px;
        margin: auto;
        padding: 1rem;
        text-align: center;

        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 1.2rem;
    }

    @media (max-width: 720px) {

        .content {
            font-size: 1rem;
        }
    }

</style>