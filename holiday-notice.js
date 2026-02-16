/**
 * Modern center-of-page notice – Holiday Notice
 * Usage: HolidayNotice.show('Your holiday notice message');
 * Supports browser locale: ar,bg,bs,cs,da,de,el,en,es,et,fa,fi,fr,he,hr,hu,id,it,ja,ka,ko,lt,lv,nl,no,pl,pt,ro,ru,sk,sl,sr,sv,th,tr,uk,uz,vi
 */

(function () {
  'use strict';

  const SUPPORTED_LOCALES = ['ar', 'bg', 'bs', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fa', 'fi', 'fr', 'he', 'hr', 'hu', 'id', 'it', 'ja', 'ka', 'ko', 'lt', 'lv', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'th', 'tr', 'uk', 'uz', 'vi'];

  function getBrowserLocale() {
    const raw = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en').toLowerCase();
    const code = raw.split(/[-_]/)[0];
    return SUPPORTED_LOCALES.includes(code) ? code : 'en';
  }

  const defaultOptions = {
    title: 'Holiday Notice',
    message: '',
    duration: 0,        // 0 = no auto-close, manual close only
    showClose: true,
    theme: 'info',      // info | success | warning
    closeLabel: 'Close',
  };

  const themes = {
    info: {
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '📢',
    },
    success: {
      bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      icon: '✅',
    },
    warning: {
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '⚠️',
    },
  };

  const EN_MSG = 'Dear Valued Customers,\n\n'
    + 'Please be advised that our office will be closed in observance of the Chinese New Year (Spring Festival) from February 15, 2026 to February 23, 2026. Normal business operations will resume on February 24, 2026.\n\n'
    + '🚚 Shipping & Logistics Suspension:\n'
    + 'Due to the nationwide holiday and carrier closures, all shipping and delivery services will be temporarily suspended during the above period. Orders placed during this time will be processed and shipped once logistics resume. Please expect possible delays in transit.\n\n'
    + '💬 Customer Service Availability:\n'
    + 'While our office is closed, we will have limited customer service support available online. Our agents will do their best to assist you, but please note that response times may be slower than usual due to the holiday.\n\n'
    + 'We appreciate your understanding and patience during this festive season. Thank you for your continued support, and we wish you and your family a prosperous Year of the Horse!\n\n'
    + 'Best regards,\n'
    + 'VIPservice Team';

  const translations = {
    en: { title: 'Chinese New Year Holiday Notice & Customer Service Arrangements', message: EN_MSG, closeLabel: 'Close' },
    ar: { title: 'إشعار عطلة رأس السنة الصينية وترتيبات خدمة العملاء', message: 'السادة العملاء الكرام،\n\nيرجى العلم بأن مكتبنا سيكون مغلقاً بمناسبة عيد رأس السنة الصينية (عيد الربيع) من 15 إلى 23 فبراير 2026. ستستأنف العمليات اعتباراً من 24 فبراير 2026.\n\n🚚 تعليق الشحن والخدمات اللوجستية:\nخلال العطلة الوطنية وإغلاق شركات النقل، سيتم تعليق خدمات الشحن مؤقتاً. الطلبات المقدمة خلال هذه الفترة ستُعالج وتُشحن بعد استئناف الخدمات. يرجى توقع تأخير محتمل.\n\n💬 توفر خدمة العملاء:\nخلال إغلاق المكتب، سيتوفر دعم محدود عبر الإنترنت. قد تكون أوقات الرد أبطأ من المعتاد.\n\nنقدّر تفهمكم وصبركم. نشكركم على دعمكم ونهنئكم بعام الحصان الميمون!\n\nمع أطيب التحيات،\nفريق VIPservice', closeLabel: 'إغلاق', rtl: true },
    bg: { title: 'Известие за празника Китайска Нова година и обслужване на клиенти', message: 'Уважаеми клиенти,\n\nОфисът ни ще бъде затворен по случай Китайската Нова година (Празник на пролетта) от 15 до 23 февруари 2026 г. Работата възобновява на 24 февруари 2026 г.\n\n🚚 Доставки: По време на празника доставките ще бъдат спрени. Поръчките ще се обработват след възобновяване. Очаквайте възможни закъснения.\n\n💬 Обслужване: Ще има ограничена онлайн поддръжка. Времето за отговор може да е по-бавно.\n\nБлагодарим за разбирането! Весела Китайска Нова година!\n\nС уважение,\nЕкип VIPservice', closeLabel: 'Затваряне' },
    bs: { title: 'Obavijest o prazniku Kineske Nove godine i usluzi korisnika', message: 'Poštovani kupci,\n\nNaša kancelarija će biti zatvorena povodom Kineske Nove godine (15.–23. februar 2026.). Rad nastavljamo 24. februara 2026.\n\n🚚 Dostava: Tokom praznika dostava će biti obustavljena. Narudžbe će se obraditi nakon nastavka rada.\n\n💬 Podrška: Dostupna će biti ograničena online podrška. Odgovori mogu biti sporiji.\n\nHvala na razumijevanju. Sretna Kineska Nova godina!\n\nS poštovanjem,\nVIPservice tim', closeLabel: 'Zatvori' },
    cs: { title: 'Oznámení o svátcích Čínského nového roku a zákaznické službě', message: 'Vážení zákazníci,\n\nNaše kancelář bude uzavřena u příležitosti Čínského nového roku (15.–23. února 2026). Provoz obnovíme 24. února 2026.\n\n🚚 Doprava: Během svátků bude doprava přerušena. Objednávky budou vyřízeny po obnovení provozu.\n\n💬 Zákaznická podpora: Bude dostupná omezená online podpora. Doba odezvy může být delší.\n\nDěkujeme za pochopení. Šťastný Čínský nový rok!\n\nS pozdravem,\nTým VIPservice', closeLabel: 'Zavřít' },
    da: { title: 'Meddelelse om Kinesisk Nytår og kundeservice', message: 'Kære kunder,\n\nVores kontor er lukket i anledning af Kinesisk Nytår (15.–23. februar 2026). Normal drift genoptages 24. februar 2026.\n\n🚚 Forsendelse: Under helligdagen vil forsendelser være suspenderet. Ordre vil blive behandlet efter genoptagelse.\n\n💬 Kundeservice: Begrænset online support vil være tilgængelig. Svar kan tage længere tid.\n\nTak for forståelsen. Godt Kinesisk Nytår!\n\nMed venlig hilsen,\nVIPservice team', closeLabel: 'Luk' },
    de: { title: 'Mitteilung zum Chinesischen Neujahrsfest & Kundenservice', message: 'Sehr geehrte Kunden,\n\nUnser Büro ist vom 15. bis 23. Februar 2026 anlässlich des Chinesischen Neujahrsfests geschlossen. Der Betrieb wird am 24. Februar 2026 wieder aufgenommen.\n\n🚚 Versand: Während des Feiertags wird der Versand ausgesetzt. Bestellungen werden nach Wiederaufnahme bearbeitet.\n\n💬 Kundenservice: Es gibt eingeschränkten Online-Support. Die Reaktionszeiten können länger sein.\n\nVielen Dank für Ihr Verständnis. Frohes Chinesisches Neujahr!\n\nMit freundlichen Grüßen,\nVIPservice Team', closeLabel: 'Schließen' },
    el: { title: 'Ειδοποίηση Γιορτών Κινεζικής Πρωτοχρονιάς & Εξυπηρέτηση Πελατών', message: 'Αγαπητοί πελάτες,\n\nΤο γραφείο μας θα είναι κλειστό για την Κινεζική Πρωτοχρονιά (15–23 Φεβρουαρίου 2026). Η λειτουργία θα συνεχιστεί από 24 Φεβρουαρίου 2026.\n\n🚚 Αποστολές: Κατά τη διάρκεια των γιορτών οι αποστολές θα ανασταλούν. Οι παραγγελίες θα επεξεργαστούν μετά την επαναφορά.\n\n💬 Εξυπηρέτηση: Θα υπάρχει περιορισμένη online υποστήριξη. Οι χρόνοι απόκρισης μπορεί να είναι πιο αργοί.\n\nΕυχαριστούμε για την κατανόησή σας. Ευτυχισμένο Κινεζικό Νέο Έτος!\n\nΜε εκτίμηση,\nΟμάδα VIPservice', closeLabel: 'Κλείσιμο' },
    es: { title: 'Aviso de festivos por Año Nuevo Chino y atención al cliente', message: 'Estimados clientes,\n\nNuestra oficina permanecerá cerrada con motivo del Año Nuevo Chino (15–23 de febrero de 2026). La actividad se reanudará el 24 de febrero de 2026.\n\n🚚 Envíos: Durante el festivo los envíos quedarán suspendidos. Los pedidos se procesarán al reanudar el servicio.\n\n💬 Atención al cliente: Habrá soporte en línea limitado. Los tiempos de respuesta pueden ser más lentos.\n\nGracias por su comprensión. ¡Feliz Año Nuevo Chino!\n\nAtentamente,\nEquipo VIPservice', closeLabel: 'Cerrar' },
    et: { title: 'Hiina uusaasta puhkusteade ja klienditeenindus', message: 'Lugupeetud kliendid,\n\nMeie kontor on suletud Hiina uusaasta puhul (15.–23. veebruar 2026). Töö jätkub 24. veebruaril 2026.\n\n🚚 Saadetised: Pühade ajal saadetised peatatakse. Tellimused töödeldakse pärast taastumist.\n\n💬 Klienditugi: Pakutakse piiratud võrgutuge. Vastamisaeg võib olla pikem.\n\nTänan mõistmise eest. Head Hiina uusaasta!\n\nLugupidamisega,\nVIPservice meeskond', closeLabel: 'Sulge' },
    fa: { title: 'اعلام تعطیلات سال نوی چینی و خدمات مشتری', message: 'مشتریان گرامی،\n\nدفتر ما به مناسبت سال نوی چینی (۱۵ تا ۲۳ فوریه ۲۰۲۶) تعطیل است. فعالیت از ۲۴ فوریه ۲۰۲۶ از سر گرفته می‌شود.\n\n🚚 ارسال: در ایام تعطیل ارسال‌ها متوقف می‌شوند. سفارشات پس از ازسرگیری پردازش می‌شوند.\n\n💬 پشتیبانی: پشتیبانی آنلاین محدود در دسترس است. زمان پاسخ ممکن است طولانی‌تر باشد.\n\nاز درک شما سپاسگزاریم. سال نوی چینی مبارک!\n\nبا احترام،\nتیم VIPservice', closeLabel: 'بستن', rtl: true },
    fi: { title: 'Kiinan uudenvuoden loma-ilmoitus ja asiakaspalvelu', message: 'Hyvät asiakkaat,\n\nToimistomme on suljettu Kiinan uudenvuoden johdosta (15.–23.2.2026). Toiminta jatkuu 24.2.2026.\n\n🚚 Toimitukset: Loman aikana toimitukset keskeytyvät. Tilaukset käsitellään toiminnan jatkuttua.\n\n💬 Asiakaspalvelu: Rajoitettu verkkotuki on käytettävissä. Vastausajat voivat pidentyä.\n\nKiitämme ymmärryksestä. Hyvää Kiinan uutta vuotta!\n\nYstävällisin terveisin,\nVIPservice-tiimi', closeLabel: 'Sulje' },
    fr: { title: 'Avis de fermeture – Nouvel An chinois et service client', message: 'Chers clients,\n\nNotre bureau sera fermé à l\'occasion du Nouvel An chinois (15–23 février 2026). Reprise le 24 février 2026.\n\n🚚 Expéditions : Pendant les fêtes, les expéditions seront suspendues. Les commandes seront traitées à la reprise.\n\n💬 Service client : Un support en ligne limité sera disponible. Les délais de réponse peuvent être plus longs.\n\nMerci de votre compréhension. Bonne année du Cheval !\n\nCordialement,\nÉquipe VIPservice', closeLabel: 'Fermer' },
    he: { title: 'הודעת חגיגת ראש השנה הסינית ושירות לקוחות', message: 'לקוחות יקרים,\n\nהמשרד שלנו יהיה סגור לרגל ראש השנה הסינית (15–23 בפברואר 2026). הפעילות תחדש ב-24 בפברואר 2026.\n\n🚚 משלוחים: במהלך החג המשלוחים יושעו. הזמנות יטופלו לאחר החידוש.\n\n💬 שירות לקוחות: יתאפשר תמיכה מקוונת מוגבלת. זמני תגובה עלולים להתארך.\n\nתודה על ההבנה. שנה סינית שמחה!\n\nבברכה,\nצוות VIPservice', closeLabel: 'סגור', rtl: true },
    hr: { title: 'Obavijest o prazniku Kineske Nove godine i korisničkoj podršci', message: 'Poštovani kupci,\n\nNaš ured bit će zatvoren povodom Kineske Nove godine (15.–23. veljače 2026.). Rad nastavljamo 24. veljače 2026.\n\n🚚 Dostava: Tijekom praznika dostava će biti obustavljena. Narudžbe će se obraditi nakon nastavka.\n\n💬 Podrška: Dostupna će biti ograničena online podrška. Vremena odgovora mogu biti sporija.\n\nHvala na razumijevanju. Sretna Kineska Nova godina!\n\nS poštovanjem,\nVIPservice tim', closeLabel: 'Zatvori' },
    hu: { title: 'Kínai Újév ünnepi értesítés és ügyfélszolgálat', message: 'Tisztelt Ügyfeleink!\n\nIrodánk a Kínai Újév (2026. február 15.–23.) alkalmából zárva tart. A munka 2026. február 24-én folytatódik.\n\n🚚 Szállítás: Az ünnep alatt a szállítás szünetel. A rendeléseket az újraindítás után dolgozzuk fel.\n\n💬 Ügyfélszolgálat: Korlátozott online támogatás érhető el. A válaszidő hosszabb lehet.\n\nKöszönjük megértésüket. Boldog Kínai Újévet!\n\nÜdvözlettel,\nVIPservice csapat', closeLabel: 'Bezárás' },
    id: { title: 'Pemberitahuan Libur Tahun Baru Imlek & Layanan Pelanggan', message: 'Pelanggan yang terhormat,\n\nKantor kami akan tutup dalam rangka Tahun Baru Imlek (15–23 Februari 2026). Operasi normal dilanjutkan 24 Februari 2026.\n\n🚚 Pengiriman: Selama libur pengiriman akan ditunda. Pesanan akan diproses setelah layanan aktif kembali.\n\n💬 Layanan pelanggan: Dukungan daring terbatas tersedia. Waktu respons mungkin lebih lambat.\n\nTerima kasih atas pengertian Anda. Selamat Tahun Baru Imlek!\n\nSalam hormat,\nTim VIPservice', closeLabel: 'Tutup' },
    it: { title: 'Comunicazione festività Capodanno cinese e servizio clienti', message: 'Gentili clienti,\n\nIl nostro ufficio resterà chiuso in occasione del Capodanno cinese (15–23 febbraio 2026). Riprenderemo il 24 febbraio 2026.\n\n🚚 Spedizioni: Durante le festività le spedizioni saranno sospese. Gli ordini saranno evasi dopo la ripresa.\n\n💬 Servizio clienti: Sarà disponibile un supporto online limitato. I tempi di risposta potrebbero essere più lunghi.\n\nGrazie per la comprensione. Buon Anno del Cavallo!\n\nCordiali saluti,\nTeam VIPservice', closeLabel: 'Chiudi' },
    ja: { title: '旧正月休業およびカスタマーサービスに関するお知らせ', message: 'お客様\n\n誠にありがとうございます。当社は2026年2月15日～23日、旧正月（春節）のため休業いたします。2月24日より通常営業を再開します。\n\n🚚 配送について：休業期間中は発送を一時停止いたします。ご注文は再開後に順次対応いたします。お届けに遅れが生じる場合がございます。\n\n💬 カスタマーサービス：休業中もオンラインサポートは限定的にご利用いただけます。お返事が通常より遅くなる場合がございます。\n\nご理解のほどよろしくお願いいたします。 Happy Year of the Horse!\n\nVIPservice チーム', closeLabel: '閉じる' },
    ka: { title: 'ჩინური ახალი წლის შეტყობინება და მომხმარებელთა მომსახურება', message: 'ძვირფასო მომხმარებლებო,\n\nჩვენი ოფისი დახურული იქნება ჩინური ახალი წლის აღსანიშნავად (2026 წ. 15–23 თებერვალი). მუშაობა გაგრძელდება 2026 წ. 24 თებერვალიდან.\n\n🚚 მიწოდება: არდადეგების დროს მიწოდება შეჩერებული იქნება. შეკვეთები დაუმუშავდება განახლების შემდეგ.\n\n💬 მომსახურება: ხელმისაწვდომი იქნება შეზღუდული ონლაინ მხარდაჭერა.\n\nმადლობა გაგიხარჯოთ. ბედნიერი ჩინური ახალი წელი!\n\nპატივისცემით,\nVIPservice გუნდი', closeLabel: 'დახურვა' },
    ko: { title: '설날 휴무 및 고객 서비스 안내', message: '고객님께,\n\n2026년 2월 15일부터 2월 23일까지 설날(춘절) 휴무입니다. 2월 24일부터 정상 영업합니다.\n\n🚚 배송: 휴무 기간 중 배송이 일시 중단됩니다. 주문은 업무 재개 후 처리되며, 배송 지연이 있을 수 있습니다.\n\n💬 고객 서비스: 휴무 중에도 제한적으로 온라인 지원을 제공합니다. 응대가 평소보다 느릴 수 있습니다.\n\n이해해 주셔서 감사합니다. 말띠 해 복 많이 받으세요!\n\nVIPservice 팀 드림', closeLabel: '닫기' },
    lt: { title: 'Kinų Naujųjų metų atostogų pranešimas ir klientų aptarnavimas', message: 'Gerbiami klientai,\n\nMūsų biuras bus uždarytas Kinų Naujųjų metų proga (2026 m. vasario 15–23 d.). Darbas bus atnaujintas 2026 m. vasario 24 d.\n\n🚚 Pristatymai: Per atostogas pristatymai bus sustabdyti. Užsakymai bus apdoroti atnaujinus.\n\n💬 Klientų aptarnavimas: Bus teikiama ribota internetinė pagalba. Atsakymo laikai gali būti ilgesni.\n\nDėkojame už supratingumą. Laimingų Kinų Naujųjų metų!\n\nPagarbiai,\nVIPservice komanda', closeLabel: 'Uždaryti' },
    lv: { title: 'Ķīnas Jaunā gada brīvdienu paziņojums un klientu apkalpošana', message: 'Cienījamie klienti,\n\nMūsu birojs būs slēgts Ķīnas Jaunā gada dēļ (2026. gada 15.–23. februāris). Darbi tiks atsākti 2026. gada 24. februārī.\n\n🚚 Piegādes: Brīvdienu laikā piegādes tiks apturētas. Pasūtījumi tiks apstrādāti pēc atsākšanas.\n\n💬 Klientu atbalsts: Būs pieejama ierobežota tiešsaistes atbalsta. Atbildes laiki var būt garāki.\n\nPaldies par sapratni. Laimīgu Ķīnas Jauno gadu!\n\nAr cieņu,\nVIPservice komanda', closeLabel: 'Aizvērt' },
    nl: { title: 'Mededeling Chinees Nieuwjaar & klantenservice', message: 'Geachte klanten,\n\nOns kantoor is gesloten vanwege het Chinees Nieuwjaar (15–23 februari 2026). We hervatten op 24 februari 2026.\n\n🚚 Verzendingen: Tijdens de feestdagen worden verzendingen opgeschort. Bestellingen worden verwerkt na hervatting.\n\n💬 Klantenservice: Er is beperkte online ondersteuning. Reactietijden kunnen langer zijn.\n\nBedankt voor uw begrip. Gelukkig Chinees Nieuwjaar!\n\nMet vriendelijke groet,\nVIPservice team', closeLabel: 'Sluiten' },
    no: { title: 'Kinesisk nyttår – feriemelding og kundeservice', message: 'Kjære kunder,\n\nKontoret vårt er stengt i anledning Kinesisk nyttår (15.–23. februar 2026). Normal drift gjenopptas 24. februar 2026.\n\n🚚 Sending: Under helligdagen vil sendinger være satt på pause. Bestillinger behandles etter gjenopptak.\n\n💬 Kundeservice: Begrenset nettsupport er tilgjengelig. Svartid kan være lengre.\n\nTakk for forståelsen. Godt kinesisk nyttår!\n\nMed vennlig hilsen,\nVIPservice team', closeLabel: 'Lukk' },
    pl: { title: 'Komunikat o święcie Chińskiego Nowego Roku i obsłudze klienta', message: 'Szanowni Państwo,\n\nNasze biuro będzie zamknięte z okazji Chińskiego Nowego Roku (15–23 lutego 2026). Wznowienie pracy 24 lutego 2026.\n\n🚚 Wysyłki: W trakcie świąt wysyłki będą wstrzymane. Zamówienia będą realizowane po wznowieniu.\n\n💬 Obsługa klienta: Dostępne będzie ograniczone wsparcie online. Czas odpowiedzi może być dłuższy.\n\nDziękujemy za zrozumienie. Wesołego Chińskiego Nowego Roku!\n\nZ poważaniem,\nZespół VIPservice', closeLabel: 'Zamknij' },
    pt: { title: 'Aviso de feriado – Ano Novo Chinês e atendimento ao cliente', message: 'Prezados clientes,\n\nNosso escritório estará fechado por ocasião do Ano Novo Chinês (15–23 de fevereiro de 2026). Atividades retomam em 24 de fevereiro de 2026.\n\n🚚 Envios: Durante o feriado os envios ficarão suspensos. Pedidos serão processados após o retorno.\n\n💬 Atendimento: Haverá suporte online limitado. O tempo de resposta pode ser maior.\n\nAgradecemos a compreensão. Feliz Ano do Cavalo!\n\nAtenciosamente,\nEquipe VIPservice', closeLabel: 'Fechar' },
    ro: { title: 'Anunț sărbătoare Anul Nou Chinez și servicii clienți', message: 'Stimați clienți,\n\nBiroul nostru va fi închis cu ocazia Anului Nou Chinez (15–23 februarie 2026). Reluăm activitatea la 24 februarie 2026.\n\n🚚 Livrări: În perioada sărbătorii livrările vor fi suspendate. Comenzile vor fi procesate după reluare.\n\n💬 Servicii clienți: Va fi disponibil suport online limitat. Timpul de răspuns poate fi mai mare.\n\nMulțumim pentru înțelegere. Un An Nou Chinez fericit!\n\nCu stimă,\nEchipa VIPservice', closeLabel: 'Închide' },
    ru: { title: 'Уведомление о празднике Китайского Нового года и службе поддержки', message: 'Уважаемые клиенты!\n\nНаш офис будет закрыт в связи с празднованием Китайского Нового года (15–23 февраля 2026 г.). Работа возобновится 24 февраля 2026 г.\n\n🚚 Доставка: В период праздника доставка приостанавливается. Заказы будут обработаны после возобновления работы.\n\n💬 Поддержка: Будет доступна ограниченная онлайн-поддержка. Время ответа может увеличиться.\n\nБлагодарим за понимание. Счастливого года Лошади!\n\nС уважением,\nКоманда VIPservice', closeLabel: 'Закрыть' },
    sk: { title: 'Oznámenie o sviatkoch Čínskeho nového roka a zákazníckej podpore', message: 'Vážení zákazníci,\n\nNaša kancelária bude uzavretá pri príležitosti Čínskeho nového roka (15.–23. februára 2026). Prevádzka sa obnoví 24. februára 2026.\n\n🚚 Doprava: Počas sviatkov bude doprava prerušená. Objednávky budú spracované po obnovení.\n\n💬 Podpora: Bude dostupná obmedzená online podpora. Čas odozvy môže byť dlhší.\n\nĎakujeme za pochopenie. Šťastný Čínsky nový rok!\n\nS pozdravom,\nTím VIPservice', closeLabel: 'Zavrieť' },
    sl: { title: 'Obvestilo o prazniku Kitajske novo leto in storitvah za stranke', message: 'Spoštovani kupci,\n\nNaša pisarna bo zaprta ob prazniku Kitajskega novega leta (15.–23. februar 2026). Delo se nadaljuje 24. februarja 2026.\n\n🚚 Dostava: Med prazniki bo dostava prekinjena. Naročila bodo obdelana po nadaljevanju.\n\n💬 Podpora: Na voljo bo omejena spletna podpora. Odzivni časi so lahko daljši.\n\nHvala za razumevanje. Srečno kitajsko novo leto!\n\nS spoštovanjem,\nEkipa VIPservice', closeLabel: 'Zapri' },
    sr: { title: 'Obaveštenje o prazniku Kineske Nove godine i korisničkoj podršci', message: 'Poštovani kupci,\n\nNaša kancelarija će biti zatvorena povodom Kineske Nove godine (15.–23. februara 2026.). Rad nastavlja 24. februara 2026.\n\n🚚 Dostava: Tokom praznika dostava će biti obustavljena. Narudžbine će biti obrađene nakon nastavka.\n\n💬 Podrška: Dostupna će biti ograničena online podrška. Vremena odgovora mogu biti sporija.\n\nHvala na razumevanju. Srećna Kineska Nova godina!\n\nS poštovanjem,\nVIPservice tim', closeLabel: 'Zatvori' },
    sv: { title: 'Meddelande om Kinesisk nyår & kundservice', message: 'Bästa kund,\n\nVårt kontor är stängt med anledning av Kinesisk nyår (15–23 februari 2026). Verksamheten återupptas den 24 februari 2026.\n\n🚚 Leveranser: Under helgdagen kommer leveranser att ställas in. Beställningar behandlas efter återstart.\n\n💬 Kundservice: Begränsad online-support finns tillgänglig. Svarstider kan bli längre.\n\nTack för er förståelse. Gott kinesiskt nytt år!\n\nMed vänliga hälsningar,\nVIPservice-teamet', closeLabel: 'Stäng' },
    th: { title: 'ประกาศวันหยุดปีใหม่จีนและการบริการลูกค้า', message: 'เรียน ลูกค้าที่เคารพ\n\nทางเราปิดทำการเนื่องในเทศกาลปีใหม่จีน (15–23 ก.พ. 2026) เปิดทำการตามปกติวันที่ 24 ก.พ. 2026\n\n🚚 การจัดส่ง: ในช่วงวันหยุดการจัดส่งจะหยุดชั่วคราว คำสั่งซื้อจะดำเนินการหลังเปิดทำการ\n\n💬 บริการลูกค้า: จะมีฝ่ายสนับสนุนออนไลน์จำกัด เวลาตอบอาจช้ากว่าปกติ\n\nขอบคุณที่เข้าใจ ปีใหม่จีนมีความสุข!\n\nด้วยความเคารพ\nทีม VIPservice', closeLabel: 'ปิด' },
    tr: { title: 'Çin Yeni Yılı tatil duyurusu ve müşteri hizmetleri', message: 'Değerli Müşterilerimiz,\n\nOfisimiz Çin Yeni Yılı (15–23 Şubat 2026) nedeniyle kapalı olacaktır. 24 Şubat 2026 tarihinde normal faaliyetlere devam edilecektir.\n\n🚚 Kargo: Tatil süresince kargolama durdurulacaktır. Siparişler hizmet devam ettikten sonra işlenecektir.\n\n💬 Müşteri hizmetleri: Sınırlı çevrimiçi destek sunulacaktır. Yanıt süreleri uzayabilir.\n\nAnlayışınız için teşekkür ederiz. Mutlu Çin Yeni Yılı!\n\nSaygılarımızla,\nVIPservice Ekibi', closeLabel: 'Kapat' },
    uk: { title: 'Повідомлення про свято Китайського Нового року та підтримку', message: 'Шановні клієнти!\n\nНаш офіс буде закритий з нагоди Китайського Нового року (15–23 лютого 2026 р.). Роботу відновлено 24 лютого 2026 р.\n\n🚚 Доставка: Під час свята доставка призупиняється. Замовлення будуть оброблені після відновлення.\n\n💬 Підтримка: Буде доступна обмежена онлайн-підтримка. Час відповіді може збільшитися.\n\nДякуємо за розуміння. З Новим роком!\n\nЗ повагою,\nКоманда VIPservice', closeLabel: 'Закрити' },
    uz: { title: 'Xitoy Yangi yili bayrami va mijozlar xizmati haqida', message: 'Hurmatli mijozlar,\n\nXitoy Yangi yili munosabati bilan ofisimiz 2026 yil 15–23 fevral kunlari yopiladi. Ish 2026 yil 24 fevraldan qayta boshlanadi.\n\n🚚 Yetkazib berish: Bayram davrida yetkazib berish to\'xtatiladi. Buyurtmalar qayta ishga tushgach bajariladi.\n\n💬 Mijozlar xizmati: Cheklangan onlayn qo\'llab-quvvatlash mavjud. Javob vaqti uzoqroq bo\'lishi mumkin.\n\nTushunganingiz uchun rahmat. Xitoy Yangi yili muborak!\n\nHurmat bilan,\nVIPservice jamoasi', closeLabel: 'Yopish' },
    vi: { title: 'Thông báo nghỉ Tết Nguyên đán & Dịch vụ khách hàng', message: 'Kính gửi quý khách,\n\nVăn phòng chúng tôi sẽ đóng cửa nhân dịp Tết Nguyên đán (15–23/02/2026). Hoạt động trở lại từ 24/02/2026.\n\n🚚 Giao hàng: Trong kỳ nghỉ giao hàng tạm ngưng. Đơn hàng sẽ được xử lý sau khi hoạt động trở lại.\n\n💬 Dịch vụ khách hàng: Hỗ trợ trực tuyến có giới hạn. Thời gian phản hồi có thể chậm hơn.\n\nCảm ơn sự thông cảm của quý khách. Chúc mừng năm mới!\n\nTrân trọng,\nĐội ngũ VIPservice', closeLabel: 'Đóng' },
  };

  function createStyles() {
    if (document.getElementById('holiday-notice-styles')) return;
    const style = document.createElement('style');
    style.id = 'holiday-notice-styles';
    style.textContent = `
      .hn-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        pointer-events: none;
      }
      .hn-overlay * {
        box-sizing: border-box;
      }
      .hn-box {
        max-width: 740px;
        width: 100%;
        padding: 18px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset;
        color: #fff;
        display: flex;
        align-items: flex-start;
        gap: 16px;
        pointer-events: auto;
        animation: hn-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes hn-pop-in {
        from {
          opacity: 0;
          transform: scale(0.92);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      .hn-box.hn-hiding {
        animation: hn-pop-out 0.3s ease forwards;
      }
      @keyframes hn-pop-out {
        to {
          opacity: 0;
          transform: scale(0.92);
        }
      }
      .hn-icon {
        font-size: 28px;
        line-height: 1;
        flex-shrink: 0;
      }
      .hn-body {
        flex: 1;
        min-width: 0;
      }
      .hn-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 6px 0;
        letter-spacing: 0.02em;
      }
      .hn-message {
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
        opacity: 0.95;
        white-space: pre-line;
      }
      .hn-close {
        width: 32px;
        height: 32px;
        border: none;
        background: rgba(255,255,255,0.2);
        color: #fff;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.2s;
        font-size: 18px;
        line-height: 1;
      }
      .hn-close:hover {
        background: rgba(255,255,255,0.35);
      }
      .hn-close:active {
        transform: scale(0.96);
      }
      .hn-box[dir="rtl"] .hn-body { text-align: right; }
      .hn-box[dir="rtl"] .hn-message { text-align: right; }
    `;
    document.head.appendChild(style);
  }

  function hide(el, overlay, callback) {
    if (!el || el.classList.contains('hn-hiding')) return;
    el.classList.add('hn-hiding');
    setTimeout(() => {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (typeof callback === 'function') callback();
    }, 300);
  }

  window.HolidayNotice = {
    show(message, options = {}) {
      const opts = { ...defaultOptions, ...options };
      if (typeof message === 'string') opts.message = message;
      else if (message && typeof message === 'object') Object.assign(opts, message);

      createStyles();

      const theme = themes[opts.theme] || themes.info;
      const overlay = document.createElement('div');
      overlay.className = 'hn-overlay';

      const box = document.createElement('div');
      box.className = 'hn-box';
      box.style.background = theme.bg;
      if (opts.dir === 'rtl') box.setAttribute('dir', 'rtl');

      box.innerHTML = `
        <span class="hn-icon" aria-hidden="true">${theme.icon}</span>
        <div class="hn-body">
          <p class="hn-title">${escapeHtml(opts.title)}</p>
          <p class="hn-message">${escapeHtml(opts.message)}</p>
        </div>
        ${opts.showClose ? '<button type="button" class="hn-close" aria-label="' + escapeHtml(opts.closeLabel || 'Close') + '">×</button>' : ''}
      `;

      overlay.appendChild(box);
      document.body.appendChild(overlay);

      const closeBtn = box.querySelector('.hn-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => hide(box, overlay, opts.onClose));
      }

      if (opts.duration > 0) {
        setTimeout(() => hide(box, overlay, opts.onClose), opts.duration);
      }

      return {
        close() {
          hide(box, overlay, opts.onClose);
        },
      };
    },
  };

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Show default holiday notice on page load (locale-aware)
  function showDefault() {
    const locale = getBrowserLocale();
    const t = translations[locale] || translations.en;
    HolidayNotice.show({
      title: t.title,
      message: t.message,
      closeLabel: t.closeLabel,
      dir: t.rtl ? 'rtl' : undefined,
      theme: 'info',
      showClose: true
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showDefault);
  } else {
    showDefault();
  }
})();
