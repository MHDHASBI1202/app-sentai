import { useMemo, useState } from 'react'
import {
  ArrowRight, Check, ChevronDown, Clipboard, Clapperboard, Copy, Film, Flame,
  Layers3, Plus, Settings2, Sparkles, WandSparkles, X,
} from 'lucide-react'

const AURAS = [
  ['Crimson Red', '#f0444b', 'crimson plasma embers, hot red light trails'],
  ['Ruby Blaze', '#e21d48', 'ruby fire shards, scarlet heat haze'],
  ['Scarlet Comet', '#ff3b30', 'scarlet comet trails, fast glowing particles'],
  ['Vermilion Flare', '#f35b1c', 'vermilion flame wisps, sparking orange cinders'],
  ['Cherry Pulse', '#d8124e', 'cherry-red pulse rings, glossy red motes'],
  ['Blood Moon', '#8f1729', 'deep blood-red moon dust, dark crimson mist'],
  ['Coral Inferno', '#ff665c', 'coral fireflies, warm rolling light bursts'],
  ['Rose Ember', '#f35177', 'rose embers, soft magenta heat ripples'],
  ['Tangerine Rush', '#ff7a18', 'tangerine sparks, kinetic orange speed trails'],
  ['Ember Orange', '#e85d04', 'burning amber embers, smoky orange glows'],
  ['Copper Spark', '#c76b35', 'copper metallic sparks, burnished light flakes'],
  ['Solar Gold', '#f8c84e', 'golden sun sparks, warm radiant flares'],
  ['Amber Voltage', '#ffb000', 'amber electric arcs, charged golden dust'],
  ['Citrine Ray', '#f9dd45', 'citrine sunbeams, crystalline yellow motes'],
  ['Marigold Burst', '#f5a524', 'marigold fireworks, bright warm starbursts'],
  ['Lemon Nova', '#e8f132', 'lemon plasma flashes, neon yellow light streaks'],
  ['Emerald Pulse', '#35d17f', 'emerald pulse waves, bioluminescent particles'],
  ['Jade Vortex', '#0c9f6e', 'jade spiral wind, polished green fragments'],
  ['Lime Reactor', '#9bea32', 'radioactive lime glow, fizzing energy bubbles'],
  ['Mint Frost', '#5fe2d1', 'mint frost crystals, cold luminous vapor'],
  ['Forest Prism', '#287a4b', 'forest-green prism leaves, dappled light shards'],
  ['Teal Surge', '#0aa6a6', 'teal ocean spray, turquoise wave ribbons'],
  ['Seafoam Halo', '#8be4c3', 'seafoam halos, pale green glimmering dust'],
  ['Aqua Surge', '#31bdf6', 'aqua kinetic droplets, electric blue arcs'],
  ['Cerulean Tide', '#168ddd', 'cerulean tidal ribbons, crystalline blue spray'],
  ['Cyan Plasma', '#00d9e8', 'cyan plasma pulses, icy electric filaments'],
  ['Skyline Blue', '#5ca9ff', 'clear sky-blue gusts, airy light motes'],
  ['Cobalt Nova', '#4766f3', 'cobalt stardust, deep-blue energy ribbons'],
  ['Sapphire Arc', '#2354d7', 'sapphire lightning, faceted blue sparks'],
  ['Indigo Storm', '#3c3fb4', 'indigo thundercloud mist, violet-blue bolts'],
  ['Navy Eclipse', '#172554', 'navy eclipse shadows, dark blue lunar dust'],
  ['Violet Prism', '#aa61ec', 'violet prism fragments, purple lens flares'],
  ['Amethyst Rift', '#7e3ace', 'amethyst rift cracks, floating purple crystals'],
  ['Orchid Nebula', '#c56ae6', 'orchid nebula fog, soft cosmic glitter'],
  ['Lavender Dream', '#a99cf5', 'lavender haze, gentle pastel light ribbons'],
  ['Magenta Pulse', '#dc2f9d', 'magenta heartbeat waves, vivid pink sparks'],
  ['Fuchsia Aurora', '#ed4acb', 'fuchsia aurora curtains, luminous pink dust'],
  ['Rose Quasar', '#f06ca5', 'rose quasar dust, pink aurora pulses'],
  ['Peach Starlight', '#ffa58c', 'peach starlight, soft warm glitter'],
  ['Obsidian Void', '#596376', 'inky void mist, dark silver motes'],
  ['Black Diamond', '#171717', 'black diamond glints, charcoal smoke ribbons'],
  ['Gunmetal Eclipse', '#34404d', 'gunmetal eclipse dust, cold steel flashes'],
  ['Smoke Chrome', '#7a858c', 'chrome vapor, metallic silver particle trails'],
  ['Silver Photon', '#c5d2d9', 'silver photon sparks, bright chrome flares'],
  ['Pearl Halo', '#f4f4ed', 'pearl-white halos, soft floating light specks'],
  ['Arctic White', '#dff7ff', 'arctic snow crystals, clean blue-white glow'],
  ['Ivory Starlight', '#fff0c9', 'ivory stardust, gentle champagne rays'],
  ['Bronze Tectonic', '#9a5b37', 'bronze rock fragments, earthy seismic pulses'],
  ['Umber Meteor', '#5b3828', 'umber meteor dust, dark earthen sparks'],
  ['Holographic Spectrum', '#79e8ff', 'shifting holographic rainbow refractions, spectral particles'],
  ['Aurora Borealis', '#62f0bd', 'green-violet aurora curtains, polar light mist'],
  ['Ultraviolet Cosmic', '#6428ff', 'ultraviolet cosmic rays, deep-space star flecks'],
  ['Infrared Reactor', '#ff3157', 'infrared heat waves, red thermal sparks'],
  ['Laser Rainbow', '#ff6dff', 'multicolor laser trails, refracted rainbow motes'],
  ['Mercury Mirror', '#aab6c2', 'mirror-silver reflections, liquid metal glints'],
  ['Void Teal', '#0d5e66', 'dark teal fog, submerged neon particles'],
  ['Royal Purple', '#6e2aa5', 'royal purple velvet haze, regal star flakes'],
  ['Electric Blue', '#1d8cff', 'electric blue bolts, high-energy ion sparks'],
  ['Neon Green', '#46ff79', 'neon green laser grid, radioactive glow dust'],
  ['Hot Pink', '#ff2c9a', 'hot pink shockwaves, vivid sparkling flares'],
]

const AURA_LABELS = {
  'Crimson Red': 'Merah tua', 'Ruby Blaze': 'Merah delima', 'Scarlet Comet': 'Merah terang',
  'Vermilion Flare': 'Jingga merah', 'Cherry Pulse': 'Merah ceri', 'Blood Moon': 'Merah darah gelap',
  'Coral Inferno': 'Merah koral', 'Rose Ember': 'Merah mawar', 'Tangerine Rush': 'Oranye cerah',
  'Ember Orange': 'Oranye bara', 'Copper Spark': 'Oranye tembaga', 'Solar Gold': 'Emas matahari',
  'Amber Voltage': 'Kuning amber', 'Citrine Ray': 'Kuning sitrin', 'Marigold Burst': 'Kuning marigold',
  'Lemon Nova': 'Kuning neon', 'Emerald Pulse': 'Hijau zamrud', 'Jade Vortex': 'Hijau giok',
  'Lime Reactor': 'Hijau limau neon', 'Mint Frost': 'Hijau mint es', 'Forest Prism': 'Hijau hutan',
  'Teal Surge': 'Hijau teal', 'Seafoam Halo': 'Hijau busa laut', 'Aqua Surge': 'Biru muda',
  'Cerulean Tide': 'Biru langit', 'Cyan Plasma': 'Biru cyan es', 'Skyline Blue': 'Biru terang',
  'Cobalt Nova': 'Biru kobalt', 'Sapphire Arc': 'Biru safir', 'Indigo Storm': 'Biru indigo',
  'Navy Eclipse': 'Biru navy gelap', 'Violet Prism': 'Ungu violet', 'Amethyst Rift': 'Ungu ametis',
  'Orchid Nebula': 'Ungu anggrek', 'Lavender Dream': 'Ungu lavender', 'Magenta Pulse': 'Magenta',
  'Fuchsia Aurora': 'Merah muda fuchsia', 'Rose Quasar': 'Pink mawar', 'Peach Starlight': 'Pink persik',
  'Obsidian Void': 'Abu-abu gelap', 'Black Diamond': 'Hitam pekat', 'Gunmetal Eclipse': 'Abu besi gelap',
  'Smoke Chrome': 'Abu metalik', 'Silver Photon': 'Perak terang', 'Pearl Halo': 'Putih mutiara',
  'Arctic White': 'Putih es', 'Ivory Starlight': 'Putih gading', 'Bronze Tectonic': 'Perunggu tanah',
  'Umber Meteor': 'Coklat gelap', 'Holographic Spectrum': 'Pelangi hologram', 'Aurora Borealis': 'Aurora hijau-ungu',
  'Ultraviolet Cosmic': 'Ultraviolet gelap', 'Infrared Reactor': 'Inframerah', 'Laser Rainbow': 'Pelangi laser',
  'Mercury Mirror': 'Perak cermin', 'Void Teal': 'Teal gelap', 'Royal Purple': 'Ungu kerajaan',
  'Electric Blue': 'Biru listrik', 'Neon Green': 'Hijau neon', 'Hot Pink': 'Pink terang',
}

const LABELS = {
  // Gender
  'Pria': 'Laki-laki', 'Wanita': 'Perempuan',
  'Humanoid pria': 'Makhluk mirip manusia ♂', 'Humanoid wanita': 'Makhluk mirip manusia ♀',
  'Robot pria': 'Robot bentuk ♂', 'Robot wanita': 'Robot bentuk ♀',
  'Alien pria': 'Alien bentuk ♂', 'Alien wanita': 'Alien bentuk ♀',

  // Body
  'Standar proporsional': 'Tubuh ideal seimbang', 'Atletis': 'Kekar & bugar',
  'Berlekuk / curvaceous': 'Lekuk tubuh menonjol', 'Berotot': 'Otot besar',
  'Sangat berotot': 'Otot sangat besar', 'Rampung / lincah': 'Kurus gesit',
  'Tinggi ramping': 'Jangkung & kurus', 'Kompak kuat': 'Pendek tapi kuat',
  'Bahu lebar': 'Pundak bidang', 'Elegan ramping': 'Ramping anggun',
  'Petite': 'Mungil', 'Tinggi atletis': 'Jangkung & atletis',
  'Powerlifter': 'Badan angkat besi', 'Perenang': 'Badan perenang',
  'Pesilat lincah': 'Badan silat', 'Penari fleksibel': 'Badan penari lentur',
  'Binaraga ringan': 'Otot proporsional', 'Berisi proporsional': 'Agak berisi, seimbang',
  'Ramping panjang': 'Kurus panjang', 'Tangguh lapangan': 'Kokoh & tahan banting',
  'Voluptuous hourglass figure': 'Seksi jam pasir (dada & pantat besar)',
  'Thick and curvy': 'Sangat seksi dan berisi (thicc)',
  'Slim thick': 'Ramping dengan pantat pinggul besar',
  'Busty athletic': 'Atletis dengan dada besar',

  // Hair
  'Rambut pendek bertekstur': 'Pendek acak alami', 'French crop': 'Pendek rata depan',
  'Caesar cut': 'Pendek rata ala Caesar', 'Buzz cut': 'Cepak/gundul tipis',
  'Crew cut': 'Cepak samping pendek', 'High and tight': 'Cepak militer atas tinggi',
  'Undercut rapi': 'Samping cukur, atas rapi', 'Undercut panjang': 'Samping cukur, atas panjang',
  'Fade rendah': 'Gradasi bawah halus', 'Fade tinggi': 'Gradasi atas tajam',
  'Taper klasik': 'Pendek klasik rapi', 'Pompadour modern': 'Jambul ke atas modern',
  'Slick back': 'Sisir belakang licin', 'Side part klasik': 'Belah samping klasik',
  'Curtain hair': 'Belah tengah tirai', 'Wolf cut pendek': 'Layer pendek berantakan',
  'Bob modern': 'Sebahu lurus modern', 'Bob pendek lurus': 'Pendek sebahu lurus',
  'Bob bergelombang': 'Sebahu bergelombang', 'Lob bertekstur': 'Long bob bertekstur',
  'Pixie cut': 'Sangat pendek feminin', 'Bixie cut': 'Antara bob & pixie',
  'Shag pendek': 'Pendek layer berantakan', 'Layered shag': 'Layer bertingkat berantakan',
  'Mullet modern': 'Pendek depan panjang belakang', 'Hime cut': 'Poni rata + panjang lurus ala Jepang',
  'Rambut panjang lurus': 'Lurus panjang ke bawah', 'Panjang bergelombang': 'Panjang ikal lembut',
  'Panjang keriting': 'Panjang ikal kuat', 'Layered panjang': 'Panjang berlapis',
  'Feathered layers': 'Layer ringan mengembang', 'Rambut panjang dengan poni': 'Panjang + poni depan',
  'Ponytail tinggi': 'Kuncir kuda tinggi', 'Ponytail rendah': 'Kuncir kuda rendah',
  'Messy bun': 'Cepol berantakan', 'Top knot': 'Cepol atas/sanggul pria',
  'Space buns': 'Dua cepol kecil', 'Half-up half-down': 'Setengah diikat setengah terurai',
  'Kepang praktis': 'Kepang sederhana', 'Dutch braid': 'Kepang Belanda timbul',
  'French braid': 'Kepang Prancis rata', 'Box braids': 'Kepang kotak-kotak kecil',
  'Cornrows': 'Kepang rapat ke kulit kepala', 'Fishtail braid': 'Kepang ekor ikan',
  'Twist braids': 'Kepang putar', 'Dreadlocks pendek': 'Gimbal pendek',
  'Dreadlocks panjang': 'Gimbal panjang',
  'Keriting natural': 'Ikal alami', 'Afro pendek': 'Afro kecil',
  'Afro bulat': 'Afro bulat besar', 'Coily natural': 'Ikal sangat rapat',
  'Wavy surfer hair': 'Bergelombang ala peselancar', 'Textured curls': 'Ikal bertekstur',
  'Perm lembut': 'Keriting kimiawi halus', 'Spiky anime-realistic': 'Jabrik ala anime realistis',
  'Mohawk modern': 'Jambul tengah punk', 'Faux hawk': 'Jambul palsu',
  'Rambut dicat silver': 'Warna perak', 'Rambut ombre': 'Gradasi warna ujung',
  'Rambut highlight neon': 'Sorotan warna neon', 'Rambut two-tone': 'Dua warna kontras',
  'Bald / helm prostetik': 'Botak / helm buatan', 'Rambut robotik serat-optik': 'Rambut robot fiber optik',

  // Outfit
  'Kasual urban': 'Santai perkotaan', 'Kasual minimalis': 'Santai simpel',
  'Streetwear retro': 'Jalanan gaya retro', 'Streetwear Y2K': 'Jalanan gaya 2000-an',
  'Streetwear Jepang': 'Jalanan gaya Jepang', 'Hoodie minimalis': 'Jaket hoodie simpel',
  'Hoodie oversized': 'Hoodie kebesaran', 'Jaket varsity': 'Jaket kampus/sekolah',
  'Jaket denim': 'Jaket jeans', 'Jaket bomber': 'Jaket pilot pendek',
  'Jaket coach': 'Jaket pelatih tipis', 'Jaket biker kulit': 'Jaket kulit motor',
  'Jaket puffer': 'Jaket gembung', 'Parka teknis': 'Mantel outdoor tebal',
  'Windbreaker sporty': 'Jaket angin tipis sporty',
  'Techwear': 'Busana teknis futuristik', 'Dark techwear': 'Teknis futuristik gelap',
  'Gorpcore outdoor': 'Gaya mendaki kasual', 'Utility jumpsuit': 'Jumpsuit serbaguna',
  'Coverall mekanik': 'Wearpack mekanik', 'Pakaian kerja lapangan': 'Baju kerja outdoor',
  'Seragam keamanan': 'Baju satpam', 'Seragam polisi modern': 'Baju polisi modern',
  'Seragam paramedis': 'Baju paramedis', 'Seragam pemadam': 'Baju pemadam kebakaran',
  'Seragam pilot': 'Baju pilot', 'Seragam teknisi': 'Baju teknisi',
  'Seragam ilmuwan': 'Baju ilmuwan', 'Jas laboratorium': 'Jas lab putih',
  'Jas hujan transparan': 'Jas hujan bening',
  'Jas rapi': 'Setelan formal', 'Jas tiga potong': 'Setelan 3 potong + rompi',
  'Tuxedo modern': 'Tuksedo modern', 'Blazer kasual': 'Blazer santai',
  'Kemeja linen': 'Kemeja kain linen', 'Kemeja Hawaii': 'Kemeja motif tropis',
  'Kemeja flanel': 'Kemeja kotak-kotak', 'Kemeja oxford': 'Kemeja oxford rapi',
  'Turtleneck elegan': 'Kerah tinggi elegan', 'Busana formal modern': 'Formal kontemporer',
  'Busana formal tradisional': 'Formal tradisional', 'Smart casual monokrom': 'Rapi santai satu warna',
  'Business casual': 'Kantor santai', 'Office core': 'Gaya kantoran khas',
  'Preppy academy': 'Gaya akademi rapi',
  'Seragam sekolah Jepang': 'Gakuran / sailor fuku', 'Seragam sekolah Korea': 'Seragam ala Korea',
  'Seragam sekolah Indonesia': 'Seragam ala Indonesia', 'Seragam kampus': 'Baju mahasiswa',
  'Atletik sekolah': 'Baju olahraga sekolah', 'Pakaian olahraga lari': 'Baju lari',
  'Jersey sepak bola': 'Kaos bola', 'Jersey basket': 'Kaos basket',
  'Set badminton': 'Baju badminton', 'Baju selam': 'Wetsuit',
  'Surfwear': 'Baju selancar', 'Motorsport jumpsuit': 'Wearpack balap',
  'Pakaian balap jalanan': 'Baju balap jalanan', 'Skatewear': 'Baju skater',
  'Dance practice wear': 'Baju latihan tari',
  'Pakaian ninja modern': 'Ninja kontemporer', 'Pakaian samurai kasual': 'Samurai santai',
  'Kimono modern': 'Kimono kontemporer', 'Hanbok modern': 'Hanbok kontemporer',
  'Batik formal': 'Batik resmi', 'Batik kasual': 'Batik santai',
  'Kebaya modern': 'Kebaya kontemporer', 'Kemeja koko modern': 'Koko kontemporer',
  'Sari modern': 'Sari kontemporer', 'Kurta kasual': 'Kurta santai',
  'Thobe modern': 'Jubah Arab modern', 'Kaftan kontemporer': 'Kaftan modern',
  'Poncho urban': 'Ponco perkotaan', 'Western ranch': 'Gaya koboi peternakan',
  'Bohemian festival': 'Gaya boho festival',
  'Grunge 90-an': 'Grunge era 90-an', 'Punk rock': 'Gaya punk',
  'Gothic elegant': 'Gotik elegan', 'Cyber goth': 'Gotik siber',
  'Visual kei': 'Gaya visual kei Jepang', 'K-pop stage casual': 'Gaya panggung K-pop',
  'J-pop idol casual': 'Gaya idol J-pop', 'Hip-hop streetwear': 'Gaya hip-hop jalanan',
  'Skater casual': 'Santai ala skater', 'Vintage workwear': 'Baju kerja vintage',
  'Safari explorer': 'Gaya penjelajah safari', 'Photographer vest': 'Rompi fotografer',
  'Chef uniform modern': 'Baju koki modern', 'Barista apron': 'Celemek barista',
  'Monk-inspired minimal': 'Gaya biksu minimalis',
  'Bikini pantai': 'Bikini', 'Bikini sporty': 'Bikini sporty',
  'One-piece swimsuit': 'Baju renang satu potong', 'Tankini set': 'Tankini',
  'Swim trunks & rash guard': 'Celana renang & kaos renang', 'Resort beachwear': 'Baju resor pantai',
  'Tropical sarong set': 'Set sarung tropis', 'Cover-up pantai': 'Penutup pantai',
  'Pool party outfit': 'Baju pesta kolam', 'Beach volleyball set': 'Baju voli pantai',
  'Crop top & high-waist': 'Atasan pendek & celana tinggi', 'Tank top kasual': 'Singlet santai',
  'Kaos oblong polos': 'Kaos polos', 'Dress kasual pendek': 'Gaun pendek santai',
  'Dress maxi elegan': 'Gaun panjang elegan', 'Rok mini & jaket': 'Rok mini + jaket',
  'Cardigan oversized': 'Kardigan kebesaran', 'Sweater rajut': 'Sweter rajut',
  'Romper kasual': 'Romper santai', 'Jumpsuit elegan': 'Jumpsuit elegan',

  // Accessory
  'Tanpa aksesori': 'Tidak pakai aksesori', 'Kacamata': 'Kacamata bening',
  'Kacamata hitam': 'Sunglasses', 'Tato tribal': 'Tato motif suku',
  'Earpiece taktis': 'Alat komunikasi telinga', 'Kalung sederhana': 'Kalung simpel',
  'Sarung tangan tanpa jari': 'Gloves tanpa jari', 'Jam tangan digital': 'Jam digital',
  'Cincin minimalis': 'Cincin simpel', 'Anting kecil': 'Anting-anting kecil',
  'Gelang kulit': 'Gelang kulit', 'Scarf tipis': 'Syal tipis',
  'Masker respirator futuristik': 'Masker gas futuristik', 'Headset komunikasi': 'Headset komando',
  'Bandana': 'Bandana kepala', 'Jepit rambut dekoratif': 'Jepit rambut hias',

  // Coverage
  'Tertutup penuh': 'Full spandex menutupi seluruh tubuh',
  'Tertutup penuh dengan kerah tinggi': 'Full spandex + kerah tinggi',
  'Tanpa lengan': 'Tanpa penutup lengan', 'Lengan pendek': 'Lengan separuh',
  'Dada terbuka': 'Dada tidak tertutup', 'Dada dengan panel transparan': 'Dada panel tembus pandang',
  'Perut terbuka': 'Area perut terbuka', 'Panel perut jala': 'Area perut jaring-jaring',
  'Paha terbuka': 'Area paha terbuka', 'Paha dengan holster ringan': 'Paha + sarung senjata',
  'Punggung terbuka': 'Punggung tidak tertutup', 'Satu bahu': 'Hanya satu bahu tertutup',
  'Cutout samping': 'Potongan terbuka di sisi', 'Jaket pendek di atas suit': 'Cropped jacket di atas suit',
  'Kain asimetris ringan': 'Kain tidak simetris', 'Cape pendek': 'Jubah pendek',
  'Rok panel taktis': 'Rok panel tempur', 'Legging dua warna': 'Legging 2 warna',
  'Mantel hero tanpa lengan': 'Mantel hero tanpa lengan', 'Armor bahu minimal': 'Pelindung bahu ringan',

  // Motif categories
  'Mythical beast': 'Makhluk mitologi', 'Dinosaur': 'Dinosaurus',
  'Ninja': 'Ninja', 'Samurai': 'Samurai',
  'Space patrol': 'Patroli luar angkasa', 'Deep sea': 'Laut dalam',
  'Insect': 'Serangga', 'Celestial knights': 'Ksatria langit',
  'Street racers': 'Pembalap jalanan', 'Ancient guardians': 'Penjaga kuno',
  'Wild animals': 'Hewan liar', 'Birds of prey': 'Burung pemangsa',
  'Big cats': 'Kucing besar', 'Canine': 'Anjing & serigala',
  'Reptile': 'Reptil', 'Arachnid': 'Laba-laba & kalajengking',
  'Ocean life': 'Kehidupan laut', 'Forest spirits': 'Roh hutan',
  'Elemental': 'Elemen alam', 'Weather': 'Cuaca & badai',
  'Gemstone': 'Batu mulia', 'Metalworks': 'Logam & baja',
  'Music and sound': 'Musik & suara', 'Art and color': 'Seni & warna',
  'Playing cards': 'Kartu & tarot', 'Detective': 'Detektif & misteri',
  'Rescue': 'Tim penyelamat', 'Medical': 'Medis & kesehatan',
  'Firefighter': 'Pemadam kebakaran', 'Police': 'Polisi & keamanan',
  'Pirate': 'Bajak laut', 'Explorer': 'Penjelajah',
  'Railway': 'Kereta api', 'Construction': 'Konstruksi & alat berat',
  'Culinary': 'Kuliner & masakan', 'Sports': 'Olahraga',
  'Digital network': 'Jaringan digital & siber', 'Magic academy': 'Akademi sihir',
  'Royalty': 'Kerajaan & bangsawan', 'Zodiac': 'Zodiak',
  'Constellation': 'Rasi bintang', 'Planets': 'Planet tata surya',
  'Time traveler': 'Penjelajah waktu', 'Mecha pilot': 'Pilot robot raksasa',
  'Prehistoric': 'Hewan prasejarah', 'Monster hunter': 'Pemburu monster',
  'Sacred relics': 'Relik suci', 'Cyber idol': 'Idol digital',
  'Urban legends': 'Legenda urban', 'Indonesian heritage': 'Warisan budaya Indonesia',
  'Japanese folklore': 'Cerita rakyat Jepang', 'Korean folklore': 'Cerita rakyat Korea',
  'Kustom': 'Buat sendiri',

  // Team name presets
  'Ryuusei Sentai Starger': 'Sentai Bintang Jatuh', 'Shinwa Sentai Mythger': 'Sentai Mitologi',
  'Kesshou Sentai Crystger': 'Sentai Kristal', 'Hayate Sentai Stormger': 'Sentai Angin Kencang',
  'Rekka Sentai Blazeger': 'Sentai Api Membara', 'Soukai Sentai Oceaneger': 'Sentai Lautan Biru',
  'Tenkuu Sentai Skyger': 'Sentai Langit', 'Raijin Sentai Thunderger': 'Sentai Dewa Petir',
  'Gekkou Sentai Lunager': 'Sentai Cahaya Bulan', 'Taiyou Sentai Solager': 'Sentai Matahari',
  'Seirei Sentai Spiriger': 'Sentai Roh Alam', 'Koutetsu Sentai Ironger': 'Sentai Baja',
  'Mirai Sentai Futurger': 'Sentai Masa Depan', 'Kizuna Sentai Bondger': 'Sentai Ikatan',
  'Ryuujin Sentai Dragager': 'Sentai Dewa Naga', 'Senkou Sentai Flashger': 'Sentai Kilat',
  'Ginga Sentai Cosmger': 'Sentai Galaksi', 'Kenshi Sentai Bladeger': 'Sentai Pendekar Pedang',
  'Shinobi Sentai Shadowger': 'Sentai Ninja Bayangan', 'Yuusha Sentai Braveger': 'Sentai Pahlawan Pemberani',

  // Suit systems
  'Heisei unified spandex': 'Gaya era Heisei — panel warna rapi, armor ringan',
  'Classic Showa cleanline': 'Gaya era Showa — blok warna tegas, hampir tanpa armor',
  'Modern tactical minimal': 'Taktikal modern — jahitan utilitas, detail kompak',
  'Space patrol uniform': 'Seragam patroli luar angkasa — pola orbital di dada',
  'Ceremonial guardian': 'Penjaga seremonial — geometri dada formal, mantel halus',
  'Neo-ninja streamline': 'Neo-ninja — garis dada diagonal, bungkus halus',
  'Motorsport racing': 'Balap — panel aerodinamis, garis stripe racing',
  'Military ranger': 'Militer ranger — blok warna fatigue, sabuk utilitas',
  'Aquatic diver': 'Penyelam — panel hidrodinamis, sirip di boots & sarung tangan',
  'Feudal heritage': 'Warisan feodal — panel kimono, obi di pinggang',
  'Athletic competition': 'Kompetisi atletik — potongan sporty, stripe dinamis',
  'Cybernetic interface': 'Antarmuka siber — jalur sirkuit, aksen LED',
  'Stealth operative': 'Operasi siluman — panel matte, desain low-profile',
  'Royal court': 'Istana kerajaan — panel regal, aksen selempang & ornamen',
  'Wilderness explorer': 'Penjelajah alam — rompi utilitas, kerah kokoh',
  'Mecha pilot flight': 'Pilot mecha — panel flight suit, harness kokpit',

  // Accent finishes
  'Brushed silver': 'Perak disikat', 'Champagne gold': 'Emas sampanye',
  'Gunmetal': 'Abu-abu besi gelap', 'Pearl white': 'Putih mutiara reflektif',
  'Iridescent chrome': 'Krom pelangi halus', 'Matte black': 'Hitam doff',
  'Rose gold': 'Emas mawar', 'Copper bronze': 'Tembaga perunggu antik',
  'Titanium blue': 'Biru titanium dingin', 'Obsidian gloss': 'Hitam obsidian kilap',
  'Platinum frost': 'Platinum beku', 'Antique brass': 'Kuningan antik',
  'Carbon fiber': 'Serat karbon bertekstur', 'Holographic prismatic': 'Holografik berubah warna',
  'Jade green metallic': 'Hijau giok metalik', 'Crimson metallic': 'Merah tua metalik',
}

const LOCATIONS = [
  'Pantai karang saat senja', 'Reruntuhan kota berkabut', 'Jalan cyberpunk basah setelah hujan',
  'Atap gedung metropolis', 'Hutan bambu berkabut', 'Stasiun luar angkasa orbit rendah',
  'Gudang industri terbengkalai', 'Lembah vulkanik berasap', 'Kuil kuno di pegunungan',
  'Jembatan layang kota saat malam', 'Danau garam yang luas', 'Terowongan kereta bawah tanah',
  'Gang kota tua selepas hujan', 'Pelabuhan kontainer malam hari', 'Pasar malam Asia yang ramai',
  'Desa pegunungan dengan sawah bertingkat', 'Hutan hujan tropis', 'Padang pasir berbatu',
  'Gurun garam saat matahari terbit', 'Gletser arktik', 'Tebing pantai berangin',
  'Jalan raya kosong di tengah gurun', 'Ladang bunga liar musim panas', 'Lapangan sepak bola kota',
  'Arena olahraga tertutup', 'Kampus modern', 'Laboratorium riset bawah tanah',
  'Pembangkit listrik yang ditinggalkan', 'Bendungan raksasa berkabut', 'Pabrik baja aktif',
  'Kereta komuter malam hari', 'Stasiun kereta Shinkansen', 'Bandara futuristik',
  'Museum sejarah yang gelap', 'Perpustakaan tua bergaya gotik', 'Kastel pegunungan',
  'Kuil Shinto saat malam', 'Candi batu di hutan', 'Masjid modern berarsitektur futuristik',
  'Kapal kargo di laut lepas', 'Kapal pesiar kosong', 'Dek observatorium antariksa',
  'Koloni Mars berdebu', 'Bulan dengan Bumi di cakrawala', 'Kota bawah laut berkubah',
  'Pusat data neon', 'Ruang server dingin', 'Studio televisi tokusatsu',
]

const AESTHETICS = [
  'Sinematik Era Heisei', 'Drama Tokusatsu Modern', 'Tokusatsu Noir — Gelap Atmosferik',
  'Realisme Neon Cyberpunk', 'Cahaya Siang Musim Panas Terang', 'Retro Showa Film Grain',
  'Kaiju Disaster Epic', 'Analog 90s Direct-to-Film',
  'Super Sentai Pop 2000-an', 'Sinematik Praktikal 35mm', 'Drama Korea Sinematik',
  'Action Hong Kong 90-an', 'Science Fiction Bersih', 'Horror Folklore Berkabut',
  'Spy Thriller Modern', 'Neo-Western Berdebu', 'Hujan Malam Berpantulan Neon',
  'Golden Hour Heroik', 'Blue Hour Melankolis', 'Matahari Terik Tropis',
  'Moonlight Silver', 'Kontras Tinggi Black-and-White', 'Handheld Dokumenter Gritty',
  'Lensa Anamorphic Epik', 'VHS 80-an Bertekstur', 'Jidaigeki Jepang Modern',
  'Steampunk Industri', 'Solarpunk Tropis', 'Afrofuturisme Cerah', 'Dieselpunk Perang Kota',
]

const TEAM_SUIT_SYSTEMS = [
  ['Heisei unified spandex', 'the same sleek Heisei-style spandex architecture: color-blocked torso panels, charcoal side panels, a narrow V-shaped chest line, and minimal lightweight armor'],
  ['Classic Showa cleanline', 'the same classic Showa-inspired cleanline architecture: bold color blocks, white collar trim, crisp geometric chest panels, and almost no armor'],
  ['Modern tactical minimal', 'the same modern tactical-minimal architecture: fitted color panels, matte charcoal undersuit zones, subtle utility seams, and only compact protective details'],
  ['Space patrol uniform', 'the same space-patrol architecture: fitted color armorless suit panels, a shared orbital chest pattern, clean collar ring, and identical belt geometry'],
  ['Ceremonial guardian', 'the same ceremonial guardian architecture: fitted spandex color blocks, shared formal chest geometry, restrained mantle seams, and minimal armor'],
  ['Neo-ninja streamline', 'the same neo-ninja streamlined architecture: fitted color panels, unified diagonal chest line, subtle wrap seams, and light action-ready protection'],
  ['Motorsport racing', 'the same motorsport-inspired architecture: aerodynamic color panels, racing stripe accents along the torso, streamlined collar, and speed-contoured shoulder lines with no heavy armor'],
  ['Military ranger', 'the same military ranger architecture: fitted fatigue-inspired color blocks, subtle chest webbing pattern, reinforced collar, and compact utility belt without heavy armor'],
  ['Aquatic diver', 'the same aquatic-diver architecture: hydrodynamic color panels, ribbed undersuit zones, streamlined collar ring, and fin-inspired boot and glove geometry'],
  ['Feudal heritage', 'the same feudal heritage architecture: layered kimono-inspired color panels, subtle obi-style waist wrap, formal collar geometry, and clean traditional linework without bulky armor'],
  ['Athletic competition', 'the same athletic competition architecture: breathable performance-cut color panels, dynamic stripe accents, ergonomic collar, and lightweight competition-ready construction'],
  ['Cybernetic interface', 'the same cybernetic interface architecture: circuit-traced color panels, LED-line accents along the seams, tech collar ring, and data-node belt construction'],
  ['Stealth operative', 'the same stealth operative architecture: matte fitted color panels, shadow-blend undersuit zones, low-profile collar, and silent-action boot and glove design'],
  ['Royal court', 'the same royal court architecture: regal color-blocked panels, formal sash accent line, ornamental collar trim, and ceremonial belt buckle geometry without heavy armor'],
  ['Wilderness explorer', 'the same wilderness explorer architecture: earthy-layered color panels, utility vest accents, rugged collar, and expedition-ready boot and glove construction'],
  ['Mecha pilot flight', 'the same mecha pilot architecture: flight-suit color panels, cockpit harness accent lines, pressure collar ring, and thruster-inspired boot geometry'],
]

const TEAM_ACCENT_FINISHES = [
  ['Brushed silver', 'brushed-silver piping, emblems, belt trim, and helmet edge details'],
  ['Champagne gold', 'restrained champagne-gold piping, emblems, belt trim, and helmet edge details'],
  ['Gunmetal', 'gunmetal metallic piping, emblems, belt trim, and helmet edge details'],
  ['Pearl white', 'pearl-white reflective piping, emblems, belt trim, and helmet edge details'],
  ['Iridescent chrome', 'subtle iridescent-chrome piping, emblems, belt trim, and helmet edge details'],
  ['Matte black', 'matte-black raised piping, emblems, belt trim, and helmet edge details'],
  ['Rose gold', 'warm rose-gold piping, emblems, belt trim, and helmet edge details'],
  ['Copper bronze', 'antique copper-bronze piping, emblems, belt trim, and helmet edge details'],
  ['Titanium blue', 'cool titanium-blue piping, emblems, belt trim, and helmet edge details'],
  ['Obsidian gloss', 'high-gloss obsidian piping, emblems, belt trim, and helmet edge details'],
  ['Platinum frost', 'frosted platinum piping, emblems, belt trim, and helmet edge details'],
  ['Antique brass', 'aged antique-brass piping, emblems, belt trim, and helmet edge details'],
  ['Carbon fiber', 'carbon-fiber textured piping, emblems, belt trim, and helmet edge details'],
  ['Holographic prismatic', 'holographic prismatic-shift piping, emblems, belt trim, and helmet edge details'],
  ['Jade green metallic', 'jade-green metallic piping, emblems, belt trim, and helmet edge details'],
  ['Crimson metallic', 'deep crimson metallic piping, emblems, belt trim, and helmet edge details'],
]

const TEAM_NAME_PRESETS = [
  'Ryuusei Sentai Starger', 'Shinwa Sentai Mythger', 'Kesshou Sentai Crystger',
  'Hayate Sentai Stormger', 'Rekka Sentai Blazeger', 'Soukai Sentai Oceaneger',
  'Tenkuu Sentai Skyger', 'Raijin Sentai Thunderger', 'Gekkou Sentai Lunager',
  'Taiyou Sentai Solager', 'Seirei Sentai Spiriger', 'Koutetsu Sentai Ironger',
  'Mirai Sentai Futurger', 'Kizuna Sentai Bondger', 'Ryuujin Sentai Dragager',
  'Senkou Sentai Flashger', 'Ginga Sentai Cosmger', 'Kenshi Sentai Bladeger',
  'Shinobi Sentai Shadowger', 'Yuusha Sentai Braveger',
]

const DEVICES = [
  ['Morpher pergelangan tangan', 'worn securely on the wrist; activated with a decisive cross-body gesture'],
  ['Sabuk transformasi', 'mounted at the waist; the hero locks the central device into place'],
  ['Cincin morpher', 'worn on the index finger; held up toward the camera before activation'],
  ['Pistol morpher', 'gripped in the dominant hand; aimed safely toward the sky during activation'],
  ['Kartu transformasi', 'held between two fingers and scanned across the chest'],
  ['Pedang pendek morpher', 'drawn from a compact scabbard and raised in a strong guard pose'],
  ['Lensa visor', 'clipped over one eye then swept across the face in one fluid motion'],
  ['Medali transformasi', 'worn as a pendant and pressed into a chest-mounted emblem'],
  ['Staf mini morpher', 'held vertically, then spun once to trigger the transformation'],
  ['Gelang kristal', 'worn on the forearm and tapped with the opposite palm'],
  ['Smartphone morpher', 'held in one hand; the screen is swiped before the device flips into activation mode'],
  ['Kamera mini morpher', 'held at chest height; the lens snaps open and scans the hero'],
  ['Kunci transformasi', 'inserted into a compact keyhole device held in the hand'],
  ['Jam saku chronomorpher', 'held open in the palm; its hands spin rapidly during activation'],
  ['Koin morpher', 'flipped once into the air then caught in the palm to trigger the suit'],
  ['Dadu transformasi', 'rolled between both hands and locked on its glowing symbol'],
  ['Kipas perang morpher', 'opened in front of the face then swept outward in a precise pose'],
  ['Topeng ritual morpher', 'held before the face and lowered as the helmet materializes'],
  ['Sepasang sarung tangan morpher', 'both hands are clenched together, activating the built-in knuckle emblems'],
  ['Headset visor morpher', 'lowered from the forehead over the eyes, then tapped at the temple'],
  ['Gitar mini morpher', 'strummed once at waist height to create a sonic transformation wave'],
  ['Harmonika morpher', 'held briefly at the mouth, releasing a visible energy note'],
  ['Remote control morpher', 'aimed forward and clicked with a decisive thumb press'],
  ['Kubus energi', 'held between both palms and rotated until its inner core lights up'],
  ['Bola kristal', 'raised at chest height; swirling light inside projects the hero suit'],
  ['Buku mantra morpher', 'opened with one hand and stamped with the other palm'],
  ['Stempel transformasi', 'pressed against the back of the hand to summon the suit'],
  ['Lentera morpher', 'lifted overhead; its light pours down around the hero'],
  ['Kompas navigator', 'held flat in the palm; the needle spins and points to the sky'],
  ['Peluit morpher', 'blown once, creating a sharp visible soundwave and transformation flash'],
]

const MOTIFS = {
  'Mythical beast': ['Phoenix', 'Kitsune', 'Dragon', 'Griffin', 'Kirin', 'Hydra', 'Pegasus', 'Basilisk', 'Thunderbird', 'Chimera'],
  Dinosaur: ['Tyrannosaurus Rex', 'Triceratops', 'Pteranodon', 'Velociraptor', 'Ankylosaurus', 'Stegosaurus', 'Spinosaurus', 'Brachiosaurus', 'Pachycephalosaurus', 'Carnotaurus'],
  Ninja: ['Shadow Fox', 'Storm Falcon', 'Moon Spider', 'River Serpent', 'Smoke Crow', 'Frost Scorpion', 'Thunder Weasel', 'Wind Mantis', 'Night Panther', 'Mist Chameleon'],
  Samurai: ['Crane Ronin', 'Tiger Shogun', 'Dragon Daimyo', 'Wolf Ashigaru', 'Hawk General', 'Bear Kensei', 'Serpent Bushido', 'Stag Warlord', 'Phoenix Bannerman', 'Boar Champion'],
  'Space patrol': ['Orion Ranger', 'Nova Comet', 'Lunar Scout', 'Cosmo Voyager', 'Nebula Pilot', 'Asteroid Warden', 'Solar Flare', 'Galaxy Cruiser', 'Quasar Sentinel', 'Pulsar Navigator'],
  'Deep sea': ['Manta Ray', 'Hammerhead', 'Orca', 'Nautilus', 'Anglerfish', 'Leviathan', 'Cuttlefish', 'Blue Marlin', 'Moray Eel', 'Giant Squid'],
  Insect: ['Stag Beetle', 'Firefly', 'Mantis', 'Dragonfly', 'Atlas Moth', 'Hercules Beetle', 'Wasp', 'Cicada', 'Ant Soldier', 'Bombardier Beetle'],
  'Celestial knights': ['Sun Knight', 'Moon Knight', 'Star Knight', 'Eclipse Knight', 'Dawn Paladin', 'Twilight Guardian', 'Comet Lancer', 'Aurora Crusader', 'Meteor Vanguard', 'Zenith Champion'],
  'Street racers': ['Turbo Falcon', 'Neon Panther', 'Volt Viper', 'Chrome Wolf', 'Nitro Hawk', 'Drift Shark', 'Apex Lynx', 'Boost Phoenix', 'Flash Stallion', 'Blitz Cobra'],
  'Ancient guardians': ['Temple Lion', 'Stone Golem', 'Sky Serpent', 'Forest Stag', 'Sand Sphinx', 'Iron Tortoise', 'Crystal Sentinel', 'Jade Emperor', 'Obsidian Watcher', 'Amber Guardian'],
  'Wild animals': ['Bengal Tiger', 'Arctic Wolf', 'Red Panda', 'Black Bear', 'Silver Fox', 'White Stallion', 'Mountain Gorilla', 'Elk Monarch', 'Honey Badger', 'Snow Hare'],
  'Birds of prey': ['Golden Eagle', 'Peregrine Falcon', 'Snowy Owl', 'Red Kite', 'Harpy Eagle', 'Raven', 'Osprey', 'Condor', 'Secretary Bird', 'Goshawk'],
  'Big cats': ['Black Panther', 'White Tiger', 'Snow Leopard', 'Cheetah', 'Lion King', 'Jaguar', 'Cougar', 'Clouded Leopard', 'Lynx', 'Caracal'],
  Canine: ['Shiba Inu', 'Dire Wolf', 'Doberman', 'Coyote', 'Husky', 'Jackal', 'Fenrir', 'Akita', 'Dingo', 'African Wild Dog'],
  Reptile: ['King Cobra', 'Komodo Dragon', 'Chameleon', 'Alligator', 'Gecko', 'Sea Turtle', 'Iguana', 'Taipan', 'Tuatara', 'Frilled Lizard'],
  Arachnid: ['Tarantula', 'Scorpion', 'Black Widow', 'Orb Weaver', 'Emperor Scorpion', 'Whip Spider', 'Jumping Spider', 'Trapdoor Spider', 'Vinegaroon', 'Camel Spider'],
  'Ocean life': ['Dolphin', 'Blue Whale', 'Sea Turtle', 'Swordfish', 'Jellyfish', 'Seahorse', 'Octopus', 'Stingray', 'Barracuda', 'Narwhal'],
  'Forest spirits': ['Kodama', 'Dryad', 'Moss Giant', 'White Stag', 'Willow Wisp', 'Tanuki', 'Leshy', 'Spriggan', 'Ent Guardian', 'Sylph'],
  Elemental: ['Inferno', 'Tidal Wave', 'Thunderbolt', 'Tornado', 'Earthquake', 'Aurora', 'Magma', 'Glacier', 'Sandstorm', 'Plasma'],
  Weather: ['Monsoon', 'Typhoon', 'Blizzard', 'Heatwave', 'Thunderstorm', 'Solar Eclipse', 'Cyclone', 'Fog Bank', 'Rainbow Arc', 'Meteor Shower'],
  Gemstone: ['Ruby', 'Sapphire', 'Emerald', 'Amethyst', 'Diamond', 'Onyx', 'Topaz', 'Opal', 'Garnet', 'Turquoise'],
  Metalworks: ['Chrome', 'Titanium', 'Gold Alloy', 'Copper', 'Meteor Iron', 'Mercury', 'Platinum', 'Cobalt Steel', 'Bronze Cast', 'Tungsten'],
  'Music and sound': ['Electric Guitar', 'Taiko Drum', 'Synthwave', 'Orchestra', 'Bassline', 'Sonic Wave', 'Violin Virtuoso', 'DJ Turntable', 'Trumpet Blaze', 'Harp Resonance'],
  'Art and color': ['Graffiti', 'Ink Wash', 'Origami', 'Stained Glass', 'Oil Paint', 'Neon Sign', 'Mosaic', 'Charcoal Sketch', 'Watercolor', 'Pixel Art'],
  'Playing cards': ['Ace of Spades', 'Royal Heart', 'Joker', 'Diamond King', 'Black Club', 'Tarot Sun', 'Red Queen', 'Wild Card', 'Tarot Moon', 'Royal Flush'],
  Detective: ['Noir Sleuth', 'Forensic Agent', 'Phantom Thief', 'Private Eye', 'Cipher Analyst', 'Night Watch', 'Cold Case', 'Shadow Profiler', 'Evidence Hunter', 'Undercover Ghost'],
  Rescue: ['Mountain Rescue', 'Coast Guard', 'Urban Search', 'Disaster Relief', 'Air Rescue', 'Cave Rescue', 'Avalanche Patrol', 'Flood Response', 'Earthquake Relief', 'Wildfire Evac'],
  Medical: ['Paramedic', 'Surgeon', 'Biochemist', 'Field Medic', 'Pharmacist', 'Virus Hunter', 'Trauma Specialist', 'Gene Therapist', 'Combat Nurse', 'Vaccine Pioneer'],
  Firefighter: ['Fire Engine', 'Wildfire Crew', 'Smoke Jumper', 'Ladder Unit', 'Hazmat Unit', 'Rescue Dog', 'Aerial Tanker', 'Chemical Response', 'Ember Watch', 'Firebreak Builder'],
  Police: ['Traffic Patrol', 'K9 Unit', 'Cyber Police', 'SWAT', 'Detective Unit', 'Highway Patrol', 'Air Support', 'Harbor Patrol', 'Bomb Squad', 'Forensic Unit'],
  Pirate: ['Crimson Corsair', 'Ghost Ship', 'Treasure Hunter', 'Sky Pirate', 'Kraken Captain', 'Royal Navy', 'Storm Raider', 'Black Flag', 'Cannon Master', 'Deep Diver'],
  Explorer: ['Jungle Expedition', 'Arctic Explorer', 'Desert Scout', 'Deep Cave', 'Ocean Voyager', 'Lost Temple', 'Mountain Summit', 'Volcano Diver', 'Skyship Navigator', 'Ruin Cartographer'],
  Railway: ['Bullet Train', 'Steam Locomotive', 'Metro Express', 'Cargo Rail', 'Maglev', 'Night Train', 'Mountain Railway', 'Monorail', 'Armored Train', 'Ghost Express'],
  Construction: ['Excavator', 'Tower Crane', 'Bulldozer', 'Cement Mixer', 'Road Roller', 'Bridge Builder', 'Wrecking Ball', 'Tunnel Borer', 'Scaffold Master', 'Pile Driver'],
  Culinary: ['Ramen', 'Sushi', 'Spice Market', 'Pastry', 'Barbecue', 'Street Food', 'Pizza Forge', 'Wok Inferno', 'Dessert Artisan', 'Fermentation Master'],
  Sports: ['Football', 'Badminton', 'Motorsport', 'Basketball', 'Archery', 'Surfing', 'Boxing', 'Fencing', 'Gymnastics', 'Ice Hockey'],
  'Digital network': ['Firewall', 'Quantum Code', 'Data Stream', 'Hacker Ghost', 'Cloud Server', 'Neural Link', 'Blockchain', 'Malware Hunter', 'AI Core', 'Encryption Key'],
  'Magic academy': ['Arcane Scholar', 'Spellbook', 'Rune Mage', 'Potion Master', 'Crystal Wand', 'Elemental Tome', 'Familiar Bond', 'Enchanter', 'Hex Breaker', 'Astral Scribe'],
  Royalty: ['Crown Guard', 'Princess Knight', 'Imperial Dragon', 'Royal Falcon', 'Palace Guard', 'Regal Rose', 'Throne Sentinel', 'Duke Champion', 'Herald Knight', 'Sovereign Shield'],
  Zodiac: ['Aries', 'Taurus', 'Gemini', 'Leo', 'Scorpio', 'Pisces', 'Sagittarius', 'Aquarius', 'Virgo', 'Capricorn'],
  Constellation: ['Orion', 'Cassiopeia', 'Andromeda', 'Pegasus', 'Lyra', 'Draco', 'Ursa Major', 'Centaurus', 'Aquila', 'Cygnus'],
  Planets: ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Neptune', 'Uranus', 'Pluto', 'Titan', 'Europa'],
  'Time traveler': ['Clockwork', 'Victorian Future', 'Retro Futurist', 'Chrono Knight', 'Time Paradox', 'Hourglass', 'Epoch Rider', 'Temporal Anchor', 'Past Echo', 'Future Glimpse'],
  'Mecha pilot': ['Jet Fighter', 'Tank Unit', 'Space Mecha', 'Drill Robot', 'Carrier Unit', 'Battle Drone', 'Artillery Walker', 'Submarine Mech', 'Scout Speeder', 'Fortress Titan'],
  Prehistoric: ['Mammoth', 'Saber-tooth', 'Megalodon', 'Terror Bird', 'Glyptodon', 'Dire Bear', 'Giant Sloth', 'Woolly Rhino', 'Cave Lion', 'Dunkleosteus'],
  'Monster hunter': ['Vampire Hunter', 'Werewolf Hunter', 'Kaiju Hunter', 'Ghost Buster', 'Demon Slayer', 'Witch Hunter', 'Kraken Slayer', 'Dragon Bane', 'Golem Breaker', 'Chimera Tracker'],
  'Sacred relics': ['Holy Grail', 'Sun Disc', 'Dragon Orb', 'Moon Mirror', 'Ancient Key', 'Celestial Bell', 'Phoenix Feather', 'Thunder Hammer', 'Frost Crown', 'Star Compass'],
  'Cyber idol': ['Hologram Singer', 'Digital DJ', 'Laser Dancer', 'Virtual Popstar', 'Synth Idol', 'Pixel Diva', 'Beat Dropper', 'Vocaloid Echo', 'Neon MC', 'Glitch Performer'],
  'Urban legends': ['Phantom Train', 'Mirror Ghost', 'Midnight Taxi', 'Tunnel Whisper', 'Paper Doll', 'City Guardian', 'Rooftop Shadow', 'Sewer Dweller', 'Elevator Phantom', 'Neon Specter'],
  'Indonesian heritage': ['Garuda', 'Barong', 'Komodo', 'Wayang Knight', 'Cendrawasih', 'Keris Guardian', 'Naga Batak', 'Reog Ponorogo', 'Jatayu', 'Hanoman'],
  'Japanese folklore': ['Oni', 'Tengu', 'Yokai Fox', 'Kappa', 'Shikigami', 'Tanuki', 'Jorogumo', 'Raijin', 'Fujin', 'Yamata no Orochi'],
  'Korean folklore': ['Haetae', 'Gumiho', 'Dokebi', 'Cheongnyong', 'Samjoko', 'Tiger Spirit', 'Bulgasari', 'Imugi', 'Bonghwang', 'Gwishin'],
}

const FINISHERS = {
  'Mythical beast': ['Mythic Aura Breaker', 'Phoenix Ascension Strike', 'Kirin Thunder Verdict'],
  Dinosaur: ['Primal Extinction Slash', 'Tyrant Meteor Charge', 'Tri-Horn Impact'],
  Ninja: ['Shadow Shuriken Finale', 'Silent Storm Barrage', 'Moonblade Execution'],
  Samurai: ['Bushido Final Cut', 'Rising Sun Iai Strike', 'Dragon Banner Verdict'],
  'Space patrol': ['Galactic Patrol Cannon', 'Orbital Justice Burst', 'Nova Formation Finish'],
  default: [
    'Spectrum Sentai Final Burst', 'Unity Energy Strike', 'Cinematic Power Verdict',
    'Prismatic Nova Cannon', 'Ranger Formation Breaker', 'Infinity Aura Slash',
    'Chromatic Thunder Impact', 'Sentai Hyperdrive Finish', 'Celestial Force Verdict',
    'Quantum Unity Strike', 'Heroic Spiral Overload', 'Radiant Justice Beam',
    'Meteor Formation Crash', 'Ultimate Team Synchronize', 'Aurora Cross Finisher',
    'Photon Vanguard Assault', 'Legendary Color Burst', 'Final Horizon Break',
    'Tactical Prism Execution', 'Supernova Sentai Verdict',
  ],
}

const SELECTS = {
  gender: ['Pria', 'Wanita', 'Humanoid pria', 'Humanoid wanita', 'Robot pria', 'Robot wanita', 'Alien pria', 'Alien wanita'],
  ethnicity: [
    'Indonesia (Jawa)', 'Indonesia (Sunda)', 'Indonesia (Betawi)', 'Indonesia (Bali)', 'Indonesia (Minangkabau)', 'Indonesia (Batak)', 'Indonesia (Bugis)', 'Indonesia (Dayak)', 'Indonesia (Melayu)', 'Indonesia (Papua)', 'Indonesia (Tionghoa Indonesia)', 'Indonesia (Ambon / Maluku)',
    'Malaysia (Melayu)', 'Malaysia (Tionghoa Malaysia)', 'Malaysia (Tamil Malaysia)', 'Singapura', 'Brunei Darussalam', 'Filipina (Tagalog)', 'Filipina (Cebuano)', 'Thailand (Thai)', 'Thailand (Isan)', 'Vietnam (Kinh)', 'Kamboja (Khmer)', 'Laos (Lao)', 'Myanmar (Bamar)', 'Timor-Leste',
    'Jepang (Yamato)', 'Jepang (Ryukyuan / Okinawa)', 'Jepang (Ainu)', 'Jepang (Hāfu / campuran)', 'Jepang (Zainichi Korean-Japanese)', 'Jepang (Nikkei / keturunan diaspora)', 'Korea Selatan', 'Korea Utara', 'Tiongkok (Han)', 'Tiongkok (Hokkien)', 'Tiongkok (Kanton)', 'Taiwan (Han)', 'Mongolia', 'Hong Kong', 'Makau',
    'India (Hindi)', 'India (Bengali)', 'India (Tamil)', 'India (Punjabi)', 'India (Malayali)', 'India (Marathi)', 'Pakistan (Punjabi)', 'Pakistan (Sindhi)', 'Bangladesh (Bengali)', 'Sri Lanka (Sinhalese)', 'Sri Lanka (Tamil)', 'Nepal (Khas)', 'Bhutan', 'Maladewa',
    'Arab Saudi', 'Yaman', 'Oman', 'Uni Emirat Arab', 'Qatar', 'Kuwait', 'Bahrain', 'Irak (Arab)', 'Irak (Kurdish)', 'Iran (Persia)', 'Iran (Azeri)', 'Turki', 'Suriah', 'Lebanon', 'Yordania', 'Palestina', 'Israel (Yahudi)', 'Afghanistan (Pashtun)', 'Afghanistan (Hazara)',
    'Mesir', 'Maroko (Arab)', 'Maroko (Amazigh)', 'Aljazair', 'Tunisia', 'Libya', 'Sudan', 'Ethiopia (Amhara)', 'Ethiopia (Oromo)', 'Somalia', 'Kenya (Kikuyu)', 'Kenya (Luo)', 'Tanzania (Swahili)', 'Uganda (Baganda)', 'Nigeria (Yoruba)', 'Nigeria (Igbo)', 'Nigeria (Hausa)', 'Ghana (Akan)', 'Senegal (Wolof)', 'Afrika Selatan (Zulu)', 'Afrika Selatan (Xhosa)', 'Afrika Selatan (Afrikaner)', 'Kongo', 'Rwanda', 'Madagaskar',
    'Inggris', 'Skotlandia', 'Wales', 'Irlandia', 'Prancis', 'Jerman', 'Belanda', 'Belgia (Flemish)', 'Belgia (Walloon)', 'Swiss', 'Austria', 'Italia', 'Spanyol', 'Portugal', 'Yunani', 'Polandia', 'Ceko', 'Slowakia', 'Hungaria', 'Rumania', 'Bulgaria', 'Serbia', 'Kroasia', 'Bosnia', 'Slovenia', 'Albania', 'Ukraina', 'Rusia', 'Belarus', 'Lituania', 'Latvia', 'Estonia', 'Nordik (Swedia)', 'Nordik (Norwegia)', 'Nordik (Denmark)', 'Nordik (Finlandia)', 'Islandia',
    'Amerika Serikat (African American)', 'Amerika Serikat (European American)', 'Amerika Serikat (Asian American)', 'Kanada (French Canadian)', 'Kanada (First Nations)', 'Meksiko (Mestizo)', 'Guatemala (Maya)', 'Kuba', 'Puerto Rico', 'Republik Dominika', 'Kolombia', 'Venezuela', 'Ekuador', 'Peru (Quechua)', 'Bolivia (Aymara)', 'Brasil', 'Argentina', 'Chile', 'Uruguay', 'Paraguay',
    'Australia (Anglo-Celtic)', 'Australia (Aboriginal)', 'Selandia Baru (Pakeha)', 'Selandia Baru (Māori)', 'Samoa', 'Fiji', 'Tonga', 'Papua Nugini', 'Hawaii (Native Hawaiian)', 'Campuran multikultural',
  ],
  body: ['Standar proporsional', 'Atletis', 'Berlekuk / curvaceous', 'Voluptuous hourglass figure', 'Thick and curvy', 'Slim thick', 'Busty athletic', 'Berotot', 'Sangat berotot', 'Rampung / lincah', 'Tinggi ramping', 'Kompak kuat', 'Bahu lebar', 'Elegan ramping', 'Petite', 'Tinggi atletis', 'Powerlifter', 'Perenang', 'Pesilat lincah', 'Penari fleksibel', 'Binaraga ringan', 'Berisi proporsional', 'Ramping panjang', 'Tangguh lapangan'],
  hair: [
    'Rambut pendek bertekstur', 'French crop', 'Caesar cut', 'Buzz cut', 'Crew cut', 'High and tight', 'Undercut rapi', 'Undercut panjang', 'Fade rendah', 'Fade tinggi', 'Taper klasik', 'Pompadour modern', 'Slick back', 'Side part klasik', 'Curtain hair', 'Wolf cut pendek',
    'Bob modern', 'Bob pendek lurus', 'Bob bergelombang', 'Lob bertekstur', 'Pixie cut', 'Bixie cut', 'Shag pendek', 'Layered shag', 'Mullet modern', 'Hime cut', 'Rambut panjang lurus', 'Panjang bergelombang', 'Panjang keriting', 'Layered panjang', 'Feathered layers', 'Rambut panjang dengan poni',
    'Ponytail tinggi', 'Ponytail rendah', 'Messy bun', 'Top knot', 'Space buns', 'Half-up half-down', 'Kepang praktis', 'Dutch braid', 'French braid', 'Box braids', 'Cornrows', 'Fishtail braid', 'Twist braids', 'Dreadlocks pendek', 'Dreadlocks panjang',
    'Keriting natural', 'Afro pendek', 'Afro bulat', 'Coily natural', 'Wavy surfer hair', 'Textured curls', 'Perm lembut', 'Spiky anime-realistic', 'Mohawk modern', 'Faux hawk', 'Rambut dicat silver', 'Rambut ombre', 'Rambut highlight neon', 'Rambut two-tone', 'Bald / helm prostetik', 'Rambut robotik serat-optik',
  ],
  outfit: [
    'Kasual urban', 'Kasual minimalis', 'Streetwear retro', 'Streetwear Y2K', 'Streetwear Jepang', 'Hoodie minimalis', 'Hoodie oversized', 'Jaket varsity', 'Jaket denim', 'Jaket bomber', 'Jaket coach', 'Jaket biker kulit', 'Jaket puffer', 'Parka teknis', 'Windbreaker sporty',
    'Techwear', 'Dark techwear', 'Gorpcore outdoor', 'Utility jumpsuit', 'Coverall mekanik', 'Pakaian kerja lapangan', 'Seragam keamanan', 'Seragam polisi modern', 'Seragam paramedis', 'Seragam pemadam', 'Seragam pilot', 'Seragam teknisi', 'Seragam ilmuwan', 'Jas laboratorium', 'Jas hujan transparan',
    'Jas rapi', 'Jas tiga potong', 'Tuxedo modern', 'Blazer kasual', 'Kemeja linen', 'Kemeja Hawaii', 'Kemeja flanel', 'Kemeja oxford', 'Turtleneck elegan', 'Busana formal modern', 'Busana formal tradisional', 'Smart casual monokrom', 'Business casual', 'Office core', 'Preppy academy',
    'Seragam sekolah Jepang', 'Seragam sekolah Korea', 'Seragam sekolah Indonesia', 'Seragam kampus', 'Atletik sekolah', 'Pakaian olahraga lari', 'Jersey sepak bola', 'Jersey basket', 'Set badminton', 'Baju selam', 'Surfwear', 'Motorsport jumpsuit', 'Pakaian balap jalanan', 'Skatewear', 'Dance practice wear',
    'Pakaian ninja modern', 'Pakaian samurai kasual', 'Kimono modern', 'Hanbok modern', 'Batik formal', 'Batik kasual', 'Kebaya modern', 'Kemeja koko modern', 'Sari modern', 'Kurta kasual', 'Thobe modern', 'Kaftan kontemporer', 'Poncho urban', 'Western ranch', 'Bohemian festival',
    'Grunge 90-an', 'Punk rock', 'Gothic elegant', 'Cyber goth', 'Visual kei', 'K-pop stage casual', 'J-pop idol casual', 'Hip-hop streetwear', 'Skater casual', 'Vintage workwear', 'Safari explorer', 'Photographer vest', 'Chef uniform modern', 'Barista apron', 'Monk-inspired minimal',
    'Bikini pantai', 'Bikini sporty', 'One-piece swimsuit', 'Tankini set', 'Swim trunks & rash guard', 'Resort beachwear', 'Tropical sarong set', 'Cover-up pantai', 'Pool party outfit', 'Beach volleyball set',
    'Crop top & high-waist', 'Tank top kasual', 'Kaos oblong polos', 'Dress kasual pendek', 'Dress maxi elegan', 'Rok mini & jaket', 'Cardigan oversized', 'Sweater rajut', 'Romper kasual', 'Jumpsuit elegan',
  ],
  accessory: ['Tanpa aksesori', 'Kacamata', 'Kacamata hitam', 'Tato tribal', 'Earpiece taktis', 'Kalung sederhana', 'Sarung tangan tanpa jari', 'Jam tangan digital', 'Cincin minimalis', 'Anting kecil', 'Gelang kulit', 'Scarf tipis', 'Masker respirator futuristik', 'Headset komunikasi', 'Bandana', 'Jepit rambut dekoratif'],
  coverage: ['Tertutup penuh', 'Tertutup penuh dengan kerah tinggi', 'Tanpa lengan', 'Lengan pendek', 'Dada terbuka', 'Dada dengan panel transparan', 'Perut terbuka', 'Panel perut jala', 'Paha terbuka', 'Paha dengan holster ringan', 'Punggung terbuka', 'Satu bahu', 'Cutout samping', 'Jaket pendek di atas suit', 'Kain asimetris ringan', 'Cape pendek', 'Rok panel taktis', 'Legging dua warna', 'Mantel hero tanpa lengan', 'Armor bahu minimal'],
}

const FEMININE_SUIT_DESIGNS = [
  ['Siluet feminin minimal', 'a refined feminine hero silhouette focusing only on the selected motif emblem, subtle helmet contouring, tailored waist shaping, and a modest athletic spandex fit'],
  ['Lengan pendek sporty', 'clean short sleeves with a streamlined feminine cut, lightweight athletic seams, and practical wrist cuffs'],
  ['Lengan panjang elegan', 'sleek fitted long sleeves with graceful linework, practical glove transitions, and a refined feminine helmet profile'],
  ['Detached sleeve ringan', 'modest detached upper-arm sleeves secured with functional bands, paired with a clean fitted bodice and gloves'],
  ['Lengan asimetris', 'one fitted sleeve and one sleeveless shoulder with balanced asymmetric paneling, designed for agile action'],
  ['Rok panel taktis pendek', 'a modest short tactical overskirt made from flexible spandex panels, layered over full mobility shorts and leggings'],
  ['Rok panel lipit', 'a modest pleated skirt-panel silhouette over a fully covered action suit, engineered for movement rather than decoration'],
  ['Kain pinggang asimetris', 'an asymmetric waist drape made from lightweight technical fabric, with clean edges and full combat mobility'],
  ['Capelet bahu ringan', 'a compact shoulder capelet attached to the collar line, short enough for stunt work and clean silhouette readability'],
  ['Ekor mantel ganda', 'two short split coat tails at the waist, tailored to move naturally during poses without adding heavy armor'],
  ['Kerah tinggi beraksen pita', 'a high collar with restrained ribbon-like trim and subtle feminine linework, kept practical and non-bulky'],
  ['Peplum taktis halus', 'a subtle peplum waist guard with flexible segmented fabric, adding a feminine contour while preserving action mobility'],
  ['Sash pinggang heroik', 'a secured narrow waist sash with a compact knot detail, integrated into the belt and designed not to obstruct stunts'],
  ['Panel hakama modern', 'short modern hakama-inspired split panels over the legs, modest, tailored, and appropriate for fast movement'],
  ['Panel lengan kimono modern', 'compact kimono-inspired sleeve panels with clean technical seams, adapted for live-action stunt choreography'],
  ['Tunik atletis', 'a fitted athletic tunic hem over a fully covered suit, with a clean feminine profile and minimal decorative detail'],
  ['Aksen kelopak geometris', 'small geometric petal-like waist panels in matching suit fabric, subtle, durable, and non-flowing'],
  ['Aksen sayap punggung kecil', 'two compact folded wing-like back panels made from lightweight suit material, sculpted for silhouette only'],
  ['Jaket pendek terintegrasi', 'a cropped technical jacket layer integrated directly into the spandex suit, fitted and modest with minimal armor'],
  ['Bahu berlapis ringan', 'light layered shoulder fabric with a feminine angular silhouette, avoiding bulky armor and preserving flexibility'],
  ['Mantel tanpa lengan pendek', 'a short sleeveless coat overlay with split sides, tailored for action and worn over a fully functional hero suit'],
  ['Aksen garis floral minimal', 'very subtle floral geometric seam lines embossed into the suit material'],
]

const SIXTH_RANGER_STYLES = [
  ['Armor ringan', 'same base suit as the main team but with subtle additional lightweight armor accents — compact shoulder caps, slim forearm bracers, and thin shin guards made from matching suit material — giving a slightly upgraded silhouette while preserving the spandex-first tokusatsu design'],
  ['Aksen warna berbeda', 'same base suit silhouette as the main team but with a distinctly different accent piping and trim color, replacing the shared team accent finish with an exclusive secondary metallic color for all piping, emblems, belt trim, and helmet edge details'],
  ['Sub-motif unik', 'same base suit architecture and accent finish as the main team but with a uniquely evolved version of the member motif — the crest, emblem, and helmet design carry a visibly different, rarer interpretation of the motif that feels like an evolved or awakened variant'],
  ['Armor + aksen unik', 'same base suit as the main team but combines subtle additional lightweight armor accents (compact shoulder caps, slim forearm bracers, thin shin guards) with a distinctly different accent piping and trim color exclusive to this ranger'],
  ['Kombinasi lengkap', 'same base suit family but with all sixth-ranger distinctions combined: subtle additional lightweight armor accents, a unique accent piping and trim color, and an evolved unique version of the member motif crest and emblem'],
]

const SIXTH_RANGER_ACCENTS = [
  ['Navy & gold', 'exclusive navy-blue and gold metallic'],
  ['Black & silver', 'exclusive black and polished silver'],
  ['Dark crimson & bronze', 'exclusive dark crimson and aged bronze metallic'],
  ['White & platinum', 'exclusive pearl white and platinum metallic'],
  ['Forest green & antique gold', 'exclusive deep forest green and antique gold'],
  ['Royal purple & silver', 'exclusive royal purple and silver chrome'],
  ['Gunmetal & rose gold', 'exclusive gunmetal and warm rose gold'],
  ['Midnight blue & chrome', 'exclusive midnight blue and bright chrome'],
  ['Obsidian & emerald', 'exclusive obsidian black and emerald metallic'],
  ['Charcoal & amber', 'exclusive charcoal grey and amber metallic'],
]

const isFeminineGender = (gender) => gender.toLowerCase().includes('wanita')
const feminineSuitDetail = (design) => FEMININE_SUIT_DESIGNS.find(([label]) => label === design)?.[1] ?? FEMININE_SUIT_DESIGNS[0][1]
const feminineDesignName = (hero) => isFeminineGender(hero.gender) ? `, ${feminineSuitDetail(hero.feminineDesign)}` : ''
const sixthStyleDetail = (style) => SIXTH_RANGER_STYLES.find(([label]) => label === style)?.[1] ?? SIXTH_RANGER_STYLES[0][1]
const sixthAccentDetail = (accent) => SIXTH_RANGER_ACCENTS.find(([label]) => label === accent)?.[1] ?? SIXTH_RANGER_ACCENTS[0][1]

const CIVILIAN_OUTFIT_DETAILS = {
  Techwear: 'a complete head-to-toe techwear set: a structured technical jacket, matching cargo trousers, utility belt, and weatherproof tactical sneakers',
  'Dark techwear': 'a complete dark techwear set: a black technical shell, coordinated tapered cargo trousers, modular belt, and dark utility boots',
  'Kasual urban': 'a complete casual urban look: coordinated overshirt or jacket, fitted trousers or skirt, and matching everyday sneakers',
  'Kasual minimalis': 'a complete minimalist look: a clean neutral top, matching tailored trousers or skirt, and simple low-profile shoes',
  'Seragam sekolah Jepang': (feminine) => feminine ? 'a complete Japanese school uniform: a fitted blazer or sailor top, modest pleated skirt, knee socks, and loafers' : 'a complete Japanese school uniform: a fitted blazer, collared shirt, tailored trousers, and loafers',
  'Seragam sekolah Korea': (feminine) => feminine ? 'a complete Korean school uniform: a blazer, ribbon tie, modest pleated skirt, socks, and loafers' : 'a complete Korean school uniform: a blazer, necktie, tailored trousers, and loafers',
  'Seragam sekolah Indonesia': (feminine) => feminine ? 'a complete Indonesian school uniform: a crisp white shirt, matching skirt, socks, and formal black shoes' : 'a complete Indonesian school uniform: a crisp white shirt, matching trousers, socks, and formal black shoes',
  'Kebaya modern': (feminine) => feminine ? 'a complete modern kebaya ensemble: a fitted kebaya top, matching batik or satin long skirt, coordinated sash, and formal low heels' : 'a complete tailored kebaya-inspired formal ensemble: a long-sleeve kebaya-style top, matching tailored trousers, subtle sash, and formal shoes',
  'Kimono modern': 'a complete modern kimono ensemble: a coordinated kimono layer, secure obi belt, matching hakama or long skirt, and traditional-inspired footwear',
  'Hanbok modern': 'a complete modern hanbok ensemble: a tailored jeogori jacket, matching skirt or trousers, a restrained ribbon tie, and coordinated traditional-style shoes',
  'Batik formal': 'a complete batik formal look: a tailored batik top, matching dark trousers or long skirt, a slim belt, and polished formal shoes',
  'Batik kasual': 'a complete batik casual look: a relaxed batik overshirt, coordinated chinos or skirt, and clean casual shoes',
  'Kemeja koko modern': 'a complete modern baju koko ensemble: a tailored koko shirt, matching trousers or long skirt, and simple formal slip-on shoes',
  'Sari modern': 'a complete modern sari ensemble: a coordinated sari drape, fitted blouse, matching petticoat, subtle jewelry, and formal sandals',
  'Kurta kasual': 'a complete kurta ensemble: a tailored kurta top, matching pajama or slim trousers, optional waistcoat, and traditional loafers',
  'Thobe modern': 'a complete modern thobe ensemble: a clean tailored thobe, coordinated outer layer, and traditional leather sandals or formal shoes',
  'Kaftan kontemporer': 'a complete contemporary kaftan ensemble: a flowing but tailored kaftan, matching trousers or long skirt, a slim belt, and coordinated shoes',
  'Pakaian ninja modern': 'a complete modern ninja-inspired outfit: a fitted wrap jacket, matching flexible trousers, forearm wraps, and soft-soled action boots',
  'Pakaian samurai kasual': 'a complete casual samurai-inspired outfit: a structured wrap top, coordinated hakama trousers, fabric belt, and tabi-style boots',
  'Motorsport jumpsuit': 'a complete motorsport look: a fitted racing jumpsuit, matching gloves, sponsor-free belt, and fireproof racing boots',
  'Baju selam': 'a complete diving look: a full wetsuit, coordinated neoprene boots, gloves, and a compact mask or snorkel accessory',
  Surfwear: 'a complete surfwear set: a fitted rash guard, matching board shorts or leggings, water shoes, and a lightweight beach layer',
  'Set badminton': 'a complete badminton outfit: a breathable performance shirt, matching shorts or skirt-over-shorts, ankle socks, and indoor court shoes',
  'Jersey sepak bola': 'a complete football kit: matching jersey, shorts or skirt-over-shorts, knee socks, and football boots',
  'Jersey basket': 'a complete basketball kit: matching sleeveless jersey, coordinated shorts or athletic leggings, crew socks, and court sneakers',
  'Pakaian olahraga lari': 'a complete running set: a technical running top, matching shorts or leggings, sport watch, and running shoes',
  'Jas rapi': 'a complete tailored suit: fitted blazer, coordinated trousers or skirt, crisp shirt, belt or sash, and polished formal shoes',
  'Jas tiga potong': 'a complete three-piece suit: blazer, vest, coordinated trousers, dress shirt, and polished leather shoes',
  'Tuxedo modern': 'a complete modern tuxedo: tailored jacket, formal shirt, matching trousers or skirt, bow tie detail, and formal shoes',
  'Jaket biker kulit': 'a complete biker look: leather jacket, coordinated dark jeans or skirt-over-leggings, belt, and sturdy ankle boots',
  'Gorpcore outdoor': 'a complete outdoor gorpcore set: technical shell, coordinated hiking trousers or skirt-over-leggings, compact backpack, and trail shoes',
  'Safari explorer': 'a complete explorer look: lightweight field shirt, matching cargo trousers or skirt-over-shorts, sun hat or neck scarf, and hiking boots',
  'Chef uniform modern': 'a complete modern chef uniform: chef jacket, matching checked trousers, apron, and slip-resistant kitchen shoes',
  'Barista apron': 'a complete barista look: coordinated shirt, fitted trousers or skirt, canvas apron, and comfortable work shoes',
  'Visual kei': 'a complete visual-kei inspired look: coordinated statement jacket, matching tailored lower garment, layered accessories, and platform boots',
  'Gothic elegant': 'a complete gothic-elegant ensemble: structured dark top, matching long skirt or tailored trousers, restrained lace detail, and dress boots',
  'Bikini pantai': (feminine) => feminine ? 'a stylish beach bikini set: a well-fitted bikini top and matching bottom, paired with a light see-through sarong or cover-up wrap, and strappy beach sandals' : 'fitted swim trunks, bare torso with toned physique, and casual beach sandals',
  'Bikini sporty': (feminine) => feminine ? 'a sporty bikini set: a supportive sports-cut bikini top and matching high-waist bottom, with a lightweight athletic cover-up tied at the waist, and sport sandals' : 'athletic swim jammers, bare torso, and sport sandals',
  'One-piece swimsuit': (feminine) => feminine ? 'a sleek one-piece swimsuit with clean lines and modest coverage, paired with a light beach wrap and sandals' : 'a fitted full-coverage rash guard top and matching swim shorts, with casual sandals',
  'Tankini set': (feminine) => feminine ? 'a coordinated tankini set: a fitted tank-style swim top and matching bottom, with a light sarong wrap and flat sandals' : 'a fitted tank rash guard with coordinating swim trunks and casual sandals',
  'Swim trunks & rash guard': 'a complete swim set: a fitted rash guard top, coordinating swim trunks, and water-sport sandals',
  'Resort beachwear': (feminine) => feminine ? 'a complete resort look: a breezy linen or chiffon midi dress with a coordinated sun hat, delicate jewelry, and elegant flat sandals' : 'a complete resort look: an open linen shirt over a fitted tank, tailored swim-ready shorts, and leather sandals',
  'Tropical sarong set': (feminine) => feminine ? 'a tropical sarong ensemble: a fitted tube or halter top, a vibrant printed sarong wrap skirt, flower hair accessory, and strappy sandals' : 'a tropical set: a relaxed printed camp shirt, lightweight linen shorts, and woven sandals',
  'Cover-up pantai': (feminine) => feminine ? 'a sheer beach cover-up over a bikini or one-piece, with oversized sunglasses and flat woven sandals' : 'an open-front linen cover-up over bare torso, with swim shorts and slide sandals',
  'Pool party outfit': (feminine) => feminine ? 'a pool party look: a trendy swimsuit or bikini with a coordinated mesh or crochet cover-up, statement sunglasses, and platform sandals' : 'a pool party look: bold printed swim trunks, bare torso, a casual unbuttoned shirt draped on shoulders, and slides',
  'Beach volleyball set': (feminine) => feminine ? 'an athletic beach volleyball outfit: a supportive sports bikini top and fitted shorts, with a visor and sport sandals' : 'athletic beach volleyball gear: fitted tank top, sport shorts, and beach sport shoes',
  'Crop top & high-waist': (feminine) => feminine ? 'a complete crop-top look: a fitted crop top, matching high-waist trousers or skirt, and platform sneakers' : 'a fitted cropped tee, high-waist wide trousers, and clean sneakers',
  'Tank top kasual': 'a casual tank-top look: a fitted tank or sleeveless top, coordinated shorts or joggers, and low-profile sneakers',
  'Kaos oblong polos': 'a clean basic look: a well-fitted plain t-shirt, coordinated trousers or skirt, and simple sneakers',
  'Dress kasual pendek': (feminine) => feminine ? 'a casual short dress with a coordinated belt or sash, and ankle boots or sneakers' : 'a relaxed button-up short-sleeve shirt, matching chino shorts, and loafers',
  'Dress maxi elegan': (feminine) => feminine ? 'an elegant maxi dress with subtle draping, a coordinated thin belt or jewelry, and strappy sandals' : 'a tailored long kurta-style top, matching wide-leg trousers, and leather sandals',
  'Rok mini & jaket': (feminine) => feminine ? 'a mini skirt paired with a structured cropped jacket, coordinated tights or bare legs, and ankle boots' : 'fitted chino shorts, a structured jacket, and clean sneakers',
  'Cardigan oversized': 'an oversized cardigan layered over a fitted basic top, coordinated trousers or skirt, and comfortable loafers',
  'Sweater rajut': 'a chunky knit sweater, coordinated fitted trousers or skirt, and clean boots',
  'Romper kasual': (feminine) => feminine ? 'a casual romper with a coordinated belt, and ankle boots or sneakers' : 'a utility-style short jumpsuit, coordinated belt, and casual boots',
  'Jumpsuit elegan': 'an elegant tailored jumpsuit with a clean belt or sash detail, and polished shoes',
}

const civilianOutfitDetail = (hero) => {
  const selected = CIVILIAN_OUTFIT_DETAILS[hero.outfit]
  if (typeof selected === 'function') return selected(isFeminineGender(hero.gender))
  if (selected) return selected
  return `a complete, cohesive ${hero.outfit.toLowerCase()} ensemble from head to toe: a matching top or outer layer, coordinated trousers or skirt, and appropriate footwear`
}

const TEAM_NAME_KATAKANA = {
  'Ryuusei Sentai Starger': '流星戦隊スタージャー',
  'Shinwa Sentai Mythger': '神話戦隊ミスジャー',
  'Kesshou Sentai Crystger': '結晶戦隊クリスジャー',
  'Hayate Sentai Stormger': '疾風戦隊ストームジャー',
  'Rekka Sentai Blazeger': '烈火戦隊ブレイジャー',
  'Soukai Sentai Oceaneger': '蒼海戦隊オーシャネジャー',
  'Tenkuu Sentai Skyger': '天空戦隊スカイジャー',
  'Raijin Sentai Thunderger': '雷神戦隊サンダージャー',
  'Gekkou Sentai Lunager': '月光戦隊ルナジャー',
  'Taiyou Sentai Solager': '太陽戦隊ソラジャー',
  'Seirei Sentai Spiriger': '精霊戦隊スピリジャー',
  'Koutetsu Sentai Ironger': '鋼鉄戦隊アイアンジャー',
  'Mirai Sentai Futurger': '未来戦隊フューチャジャー',
  'Kizuna Sentai Bondger': '絆戦隊ボンドジャー',
  'Ryuujin Sentai Dragager': '龍神戦隊ドラガジャー',
  'Senkou Sentai Flashger': '閃光戦隊フラッシュジャー',
  'Ginga Sentai Cosmger': '銀河戦隊コズムジャー',
  'Kenshi Sentai Bladeger': '剣士戦隊ブレイドジャー',
  'Shinobi Sentai Shadowger': '忍戦隊シャドージャー',
  'Yuusha Sentai Braveger': '勇者戦隊ブレイヴジャー',
}


const motifName = (hero) => hero.motif === 'Kustom' ? (hero.customMotif || 'custom heroic motif') : hero.motif
const motifSubName = (hero) => hero.motif === 'Kustom' ? (hero.customMotif || 'custom hero symbol') : hero.submotif

const helmetCrestShape = (hero) => {
  const sub = motifSubName(hero).toLowerCase()
  // Animals / creatures
  if (/phoenix|firebird/.test(sub)) return 'phoenix-wing crest fanning upward from the forehead'
  if (/dragon|drago|ryuu/.test(sub)) return 'dragon-horn crest with twin curved horns flanking the visor'
  if (/griffin/.test(sub)) return 'griffin-beak crest with eagle-like brow ridge and lion mane fins'
  if (/kitsune|fox/.test(sub)) return 'fox-ear crest with sharp pointed ear fins angled backward'
  if (/kirin/.test(sub)) return 'kirin-antler crest with a single spiraling horn above the forehead'
  if (/hydra/.test(sub)) return 'multi-headed serpent crest with three small fin-heads fanning from the crown'
  if (/pegasus|stallion/.test(sub)) return 'winged-horse crest with swept-back wing fins on each side'
  if (/basilisk|serpent|cobra|snake/.test(sub)) return 'serpent-fang crest with a hooded cobra crown on the forehead'
  if (/thunderbird/.test(sub)) return 'thunderbird-wing crest with jagged lightning-bolt feather fins'
  if (/chimera/.test(sub)) return 'chimera tri-horn crest blending lion mane, goat horn, and serpent tail fin'
  // Dinosaurs
  if (/t.?rex|tyranno/.test(sub)) return 'T-Rex jaw crest with sharp fanged brow ridge'
  if (/triceratops|tri.?horn/.test(sub)) return 'triceratops triple-horn crest with a wide forehead frill'
  if (/pterano/.test(sub)) return 'pteranodon swept-back head crest extending behind the helmet'
  if (/velociraptor|raptor/.test(sub)) return 'raptor-claw crest with a sharp sickle fin above the visor'
  if (/ankylo/.test(sub)) return 'ankylosaurus armored crest with a club-shaped rear fin'
  if (/stego/.test(sub)) return 'stegosaurus dorsal-plate crest with zigzag fins along the crown'
  if (/spino/.test(sub)) return 'spinosaurus sail-fin crest rising from forehead to crown'
  if (/brachio/.test(sub)) return 'brachiosaurus long-neck crest with a smooth dome and nasal ridge'
  if (/carno/.test(sub)) return 'carnotaurus bull-horn crest with two short curved horns above the brow'
  // Big cats
  if (/panther/.test(sub)) return 'panther-ear crest with sleek rounded ear fins'
  if (/tiger/.test(sub)) return 'tiger-fang crest with striped brow ridges'
  if (/leopard/.test(sub)) return 'leopard rosette-pattern crest with spotted brow fins'
  if (/cheetah/.test(sub)) return 'cheetah tear-line crest with aerodynamic speed fins'
  if (/lion/.test(sub)) return 'lion-mane crest with a regal crown ridge'
  if (/jaguar/.test(sub)) return 'jaguar-fang crest with broad spotted brow ridges'
  // Canine
  if (/wolf|dire|fenrir/.test(sub)) return 'wolf-ear crest with pointed upright ear fins and fang brow'
  if (/shiba|akita/.test(sub)) return 'shiba-ear crest with alert triangular ear fins'
  // Birds
  if (/eagle/.test(sub)) return 'eagle-beak crest with a curved raptor brow ridge and swept wings'
  if (/falcon/.test(sub)) return 'falcon-wing crest with sharp angled speed fins'
  if (/owl/.test(sub)) return 'owl-face crest with wide disc-shaped brow ridges'
  if (/raven|crow/.test(sub)) return 'raven-feather crest with dark swept-back blade fins'
  if (/hawk|kite/.test(sub)) return 'hawk-talon crest with sharp curved brow talons'
  if (/condor/.test(sub)) return 'condor-collar crest with a broad feathered crown ridge'
  // Insects
  if (/beetle|stag|hercules/.test(sub)) return 'beetle-horn crest with a large mandible horn'
  if (/firefly/.test(sub)) return 'firefly-glow crest with translucent light-organ forehead dome'
  if (/mantis/.test(sub)) return 'mantis-blade crest with triangular head fin and scythe brow'
  if (/dragonfly/.test(sub)) return 'dragonfly-wing crest with transparent double-wing fins'
  if (/moth/.test(sub)) return 'moth-antenna crest with feathered antennae fins'
  if (/wasp/.test(sub)) return 'wasp-stinger crest with a sharp pointed crown spike'
  // Marine
  if (/shark|hammerhead/.test(sub)) return 'shark-fin crest with a dorsal blade on the crown'
  if (/whale|orca/.test(sub)) return 'orca-fin crest with a tall dorsal blade'
  if (/manta|ray|stingray/.test(sub)) return 'manta-wing crest with wide swept fins on each side'
  if (/octopus|squid|nautilus/.test(sub)) return 'tentacle crest with curving appendage fins'
  if (/dolphin/.test(sub)) return 'dolphin-fin crest with a smooth curved dorsal blade'
  if (/jellyfish/.test(sub)) return 'jellyfish-dome crest with a translucent bell-shaped crown'
  // Elemental / Gemstone
  if (/ruby|garnet/.test(sub)) return 'faceted ruby gem crest embedded in the forehead'
  if (/sapphire/.test(sub)) return 'faceted sapphire gem crest embedded in the forehead'
  if (/emerald/.test(sub)) return 'faceted emerald gem crest embedded in the forehead'
  if (/diamond/.test(sub)) return 'faceted diamond gem crest with prismatic light crown'
  if (/amethyst/.test(sub)) return 'faceted amethyst gem crest embedded in the forehead'
  if (/inferno|fire|blaze/.test(sub)) return 'flame crest with flickering fire-shaped fins'
  if (/tidal|wave|tsunami|monsoon/.test(sub)) return 'wave crest with curling water-shaped fins'
  if (/thunder|lightning|volt/.test(sub)) return 'lightning-bolt crest with jagged electric fins'
  if (/tornado|cyclone|wind/.test(sub)) return 'vortex crest with spiraling wind fins'
  // Vehicles / Mecha
  if (/jet|fighter/.test(sub)) return 'jet-intake crest with angular air-scoop fins'
  if (/tank/.test(sub)) return 'tank-barrel crest with reinforced angular brow armor'
  if (/train|bullet|rail|locomotive/.test(sub)) return 'bullet-train nose crest with aerodynamic speed ridges'
  // Fallback
  return `${motifSubName(hero)}-inspired helmet crest sculpted into the forehead and crown`
}

const motifAccentDetail = (hero, chestEmblemMode) => {
  const motif = motifName(hero)
  const subMotif = motifSubName(hero)
  const lowerMotif = motif.toLowerCase()
  let accentLanguage = 'repeating original motif linework across the gauntlets, boots, collar, and visor'

  if (/(beast|dinosaur|animal|bird|cat|canine|reptile|arachnid|ocean|prehistoric)/.test(lowerMotif)) accentLanguage = 'matching animal-inspired crest geometry, scale, feather, fin, claw, or fang linework across the helmet, gauntlets, boots, and visor'
  else if (/(ninja|samurai|pirate|explorer|monster|folklore|guardian|relic|royalty)/.test(lowerMotif)) accentLanguage = 'matching crest geometry, layered heritage linework, and original emblem marks across the helmet, gauntlets, boots, and visor'
  else if (/(space|celestial|constellation|planet|time|mecha|digital|cyber|network|metal)/.test(lowerMotif)) accentLanguage = 'matching star, orbit, circuit, clockwork, or mechanical linework integrated across the helmet, gauntlets, boots, and visor'
  else if (/(elemental|weather|gemstone|music|art|zodiac|sports)/.test(lowerMotif)) accentLanguage = 'matching elemental, gem-cut, soundwave, brushstroke, zodiac, or athletic linework integrated across the helmet, gauntlets, boots, and visor'
  else if (/(rescue|medical|firefighter|police|railway|construction|culinary)/.test(lowerMotif)) accentLanguage = 'matching original service-inspired iconography and functional linework integrated across the helmet, gauntlets, boots, and visor'
  else if (/(indonesian|japanese|korean)/.test(lowerMotif)) accentLanguage = 'matching original heritage-inspired geometric patterns and emblem linework integrated across the helmet, gauntlets, boots, and visor'

  const chestEmblemText = ['Keduanya (Logo tim & Motif)', 'Hanya Motif Hero (Tengah dada)'].includes(chestEmblemMode)
    ? 'center-chest emblem and belt buckle'
    : 'belt buckle only, chest kept clean'

  return `a prominent original fictional ${subMotif}-inspired ${chestEmblemText}, a matching helmet crest, and ${accentLanguage}; these motif accents remain clearly visible over every suit silhouette`
}

// Classic Sentai team color order: Red, Blue, Yellow, Green, Pink, Black, Silver, White, Gold, Orange
const SENTAI_AURA_ORDER = [
  0,   // Crimson Red     — Leader / 1st
  28,  // Sapphire Arc    — Blue / 2nd
  11,  // Solar Gold      — Yellow / 3rd
  16,  // Emerald Pulse   — Green / 4th
  37,  // Rose Quasar     — Pink / 5th
  41,  // Black Diamond   — Black / 6th
  43,  // Silver Photon   — Silver / 7th
  44,  // Pearl Halo      — White / 8th
  12,  // Amber Voltage   — Gold / 9th
  8,   // Tangerine Rush  — Orange / 10th
]

const makeHero = (index) => ({
  id: crypto.randomUUID(),
  name: ['Hayate', 'Sora', 'Rin', 'Daichi', 'Mika', 'Rei', 'Kaito', 'Yuki', 'Haruto', 'Asuka'][index] || `Hero ${index + 1}`,
  aura: SENTAI_AURA_ORDER[index] ?? (index % AURAS.length),
  gender: [2, 4, 7, 9].includes(index) ? 'Wanita' : 'Pria',
  ethnicity: 'Jepang (Yamato)', body: index === 0 ? 'Atletis' : 'Standar proporsional', age: 24 + index,
  hair: [2, 4, 7, 9].includes(index)
    ? ['', '', 'Rambut panjang lurus', '', 'Panjang bergelombang', '', '', 'Layered panjang', '', 'Half-up half-down'][index]
    : 'Rambut pendek bertekstur', outfit: 'Techwear', accessory: 'Earpiece taktis',
  coverage: 'Tertutup penuh', feminineDesign: 'Siluet feminin minimal', motif: 'Mythical beast', submotif: MOTIFS['Mythical beast'][index % MOTIFS['Mythical beast'].length], customMotif: '',
  role: index >= 5 ? 'Sixth Ranger' : 'Main Team', sixthStyle: 'Armor ringan', sixthAccent: 'Navy & gold',
})

const option = (items) => items.map((item) => <option key={item} value={item}>{item}{LABELS[item] ? ` (${LABELS[item]})` : ''}</option>)
const safe = (text) => text.replaceAll('"', '')

function SelectField({ label, value, onChange, children }) {
  return <label className="field"><span>{label}</span><div className="select-wrap"><select value={value} onChange={(e) => onChange(e.target.value)}>{children}</select><ChevronDown size={15} /></div></label>
}

function HeroCard({ hero, index, expanded, onToggle, onChange, device, unifiedMotif }) {
  const aura = AURAS[hero.aura]
  const submotifs = MOTIFS[hero.motif] || []
  const female = isFeminineGender(hero.gender)
  return <section className={`hero-card ${expanded ? 'is-open' : ''}`} style={{ '--hero': aura[1] }}>
    <button className="hero-summary" onClick={onToggle} aria-expanded={expanded}>
      <span className="hero-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="hero-dot" style={{ background: aura[1] }} />
      <span className="hero-summary-name"><b>{hero.name || `Hero ${index + 1}`}</b><small>{aura[0]}{hero.role === 'Sixth Ranger' ? ' · ⚡ 6th Ranger' : ''}</small></span>
      <span className="hero-form-label">{female ? 'Feminine suit logic' : 'Hero suit logic'}</span>
      <ChevronDown size={18} className={expanded ? 'rotate' : ''} />
    </button>
    {expanded && <div className="hero-fields">
      <div className="hero-name-row"><label className="field grow"><span>Nama panggilan</span><input value={hero.name} onChange={(e) => onChange('name', e.target.value)} placeholder={`Hero ${index + 1}`} /></label><div className="aura-chip" style={{ color: aura[1] }}><span style={{ background: aura[1] }} />{aura[0]}</div></div>
      <div className="segmented slim" style={{ marginTop: 13 }}><button className={hero.role === 'Main Team' ? 'active' : ''} onClick={() => onChange('role', 'Main Team')}>Main Team</button><button className={hero.role === 'Sixth Ranger' ? 'active rose' : ''} onClick={() => onChange('role', 'Sixth Ranger')}>⚡ Sixth Ranger</button></div>
      {hero.role === 'Sixth Ranger' && <div className="feminine-design" style={{ borderColor: 'color-mix(in srgb, var(--hero) 28%, #3a2940)', background: 'linear-gradient(110deg,color-mix(in srgb, var(--hero) 5%, #140c1c),#0c141c)' }}>
        <div className="field-grid two"><SelectField label="Gaya sixth ranger" value={hero.sixthStyle} onChange={(v) => onChange('sixthStyle', v)}>{SIXTH_RANGER_STYLES.map(([label]) => <option key={label}>{label}</option>)}</SelectField>
        {(hero.sixthStyle === 'Aksen warna berbeda' || hero.sixthStyle === 'Armor + aksen unik' || hero.sixthStyle === 'Kombinasi lengkap') && <SelectField label="Warna aksen eksklusif" value={hero.sixthAccent} onChange={(v) => onChange('sixthAccent', v)}>{SIXTH_RANGER_ACCENTS.map(([label]) => <option key={label}>{label}</option>)}</SelectField>}</div>
        <p style={{ margin: '8px 0 0', color: '#7f979f', fontSize: 10, lineHeight: 1.45 }}>⚡ {SIXTH_RANGER_STYLES.find(([l]) => l === hero.sixthStyle)?.[1]?.slice(0, 120) || ''}…</p>
      </div>}
      <div className="field-grid three">
        <SelectField label="Jenis kelamin" value={hero.gender} onChange={(v) => onChange('gender', v)}>{option(SELECTS.gender)}</SelectField>
        <SelectField label="Etnis / ras" value={hero.ethnicity} onChange={(v) => onChange('ethnicity', v)}>{option(SELECTS.ethnicity)}</SelectField>
        <SelectField label="Bentuk tubuh" value={hero.body} onChange={(v) => onChange('body', v)}>{option(SELECTS.body)}</SelectField>
      </div>
      <label className="age-field"><span>Umur karakter <b>{hero.age} tahun</b></span><input type="range" min="10" max="50" value={hero.age} onChange={(e) => onChange('age', Number(e.target.value))} style={{ accentColor: aura[1] }} /><i>10</i><i>50</i></label>
      <div className="field-grid three">
        <SelectField label="Gaya rambut" value={hero.hair} onChange={(v) => onChange('hair', v)}>{option(SELECTS.hair)}</SelectField>
        <SelectField label="Outfit civilian — set lengkap" value={hero.outfit} onChange={(v) => onChange('outfit', v)}>{option(SELECTS.outfit)}</SelectField>
        <SelectField label="Aksesori" value={hero.accessory} onChange={(v) => onChange('accessory', v)}>{option(SELECTS.accessory)}</SelectField>
      </div>
      <div className="field-grid two">
        <SelectField label="Warna aura / energi" value={String(hero.aura)} onChange={(v) => onChange('aura', Number(v))}>{AURAS.map((a, i) => <option key={a[0]} value={i}>{a[0]}{AURA_LABELS[a[0]] ? ` (${AURA_LABELS[a[0]]})` : ''}</option>)}</SelectField>
        <SelectField label="Suit coverage" value={hero.coverage} onChange={(v) => onChange('coverage', v)}>{option(SELECTS.coverage)}</SelectField>
      </div>
      {female && <div className="feminine-design">
        <SelectField label="Desain kostum feminin" value={hero.feminineDesign} onChange={(v) => onChange('feminineDesign', v)}>{FEMININE_SUIT_DESIGNS.map(([label]) => <option key={label}>{label}</option>)}</SelectField>
        <p>Detail ini akan diterapkan pada Hero Form; tetap fungsional, modest, dan cocok untuk aksi tokusatsu.</p>
      </div>}
      <p className="aura-description"><Sparkles size={13} /> {aura[2]}</p>
      <div className="motif-block">
        <div className={`field-grid ${unifiedMotif ? 'one' : 'two'}`}>
          {!unifiedMotif && <SelectField label="Motif kostum spandex" value={hero.motif} onChange={(v) => onChange('motif', v)}>{[...Object.keys(MOTIFS), 'Kustom'].map((m) => <option key={m} value={m}>{m}{LABELS[m] ? ` (${LABELS[m]})` : ''}</option>)}</SelectField>}
          {hero.motif !== 'Kustom' ? <SelectField label={unifiedMotif ? `Sub-motif (${hero.motif})` : "Sub-motif"} value={hero.submotif} onChange={(v) => onChange('submotif', v)}>{option(submotifs)}</SelectField> : <label className="field"><span>Motif kustom</span><input value={hero.customMotif} onChange={(e) => onChange('customMotif', e.target.value)} placeholder="Contoh: urban thunderbird" /></label>}
        </div>
        <small><WandSparkles size={13} /> Alat: {device[0].toLowerCase()}</small>
      </div>
    </div>}
  </section>
}

function CopyButton({ text, id, copied, onCopy }) {
  const done = copied === id
  return <button className={`copy-button ${done ? 'copied' : ''}`} onClick={() => onCopy(text, id)}>{done ? <Check size={15} /> : <Copy size={15} />}{done ? 'Disalin!' : 'Salin'}</button>
}

function OutputCard({ item, copied, onCopy }) {
  return <article className="output-card">
    <div className="output-card-top"><div><span className="output-kind">{item.kind}</span><h3>{item.title}</h3></div><CopyButton text={item.text} id={item.id} copied={copied} onCopy={onCopy} /></div>
    <pre>{item.text}</pre>
  </article>
}

const CHEST_EMBLEM_OPTIONS = ['Keduanya (Logo tim & Motif)', 'Hanya Logo Tim (Kiri dada)', 'Hanya Motif Hero (Tengah dada)', 'Tanpa logo di dada (Polos)']

function App() {
  const [mode, setMode] = useState('Henshin')
  const [sequence, setSequence] = useState('Bersama')
  const [aesthetic, setAesthetic] = useState(AESTHETICS[0])
  const [location, setLocation] = useState(LOCATIONS[1])
  const [deviceIndex, setDeviceIndex] = useState(0)
  const [teamNameMode, setTeamNameMode] = useState('preset')
  const [teamName, setTeamName] = useState(TEAM_NAME_PRESETS[0])
  const [teamSuitSystem, setTeamSuitSystem] = useState(TEAM_SUIT_SYSTEMS[0][0])
  const [teamAccentFinish, setTeamAccentFinish] = useState(TEAM_ACCENT_FINISHES[0][0])
  const [chestEmblemMode, setChestEmblemMode] = useState(CHEST_EMBLEM_OPTIONS[0])
  const [characterCount, setCharacterCount] = useState(6)
  const [unifiedMotif, setUnifiedMotif] = useState(true)
  const [heroes, setHeroes] = useState(() => [makeHero(0), makeHero(1), makeHero(2), makeHero(3), makeHero(4), makeHero(5)])
  const [openHero, setOpenHero] = useState(0)
  const [tab, setTab] = useState('image')
  const [copied, setCopied] = useState('')
  const [notice, setNotice] = useState('Prompt siap disusun dari set produksi Anda.')

  const activeHeroes = heroes.slice(0, characterCount)
  const device = DEVICES[deviceIndex]
  const sharedSuitSystem = TEAM_SUIT_SYSTEMS.find(([label]) => label === teamSuitSystem)?.[1] ?? TEAM_SUIT_SYSTEMS[0][1]
  const sharedAccentFinish = TEAM_ACCENT_FINISHES.find(([label]) => label === teamAccentFinish)?.[1] ?? TEAM_ACCENT_FINISHES[0][1]
  const teamMotif = activeHeroes[0]?.motif || 'Mythical beast'
  const finishers = FINISHERS[teamMotif] || FINISHERS.default
  const [finisher, setFinisher] = useState(finishers[0])

  const updateHero = (id, key, value) => setHeroes((current) => current.map((h, i) => h.id === id ? { ...h, [key]: value, ...(key === 'motif' ? { submotif: MOTIFS[value]?.[i % MOTIFS[value].length] || '' } : {}) } : h))
  const changeCount = (value) => {
    const count = Number(value)
    setCharacterCount(count)
    setHeroes((current) => {
      const next = [...current]
      while (next.length < count) next.push(makeHero(next.length))
      return next
    })
    setOpenHero(Math.min(openHero, count - 1))
  }
  const handleCopy = async (text, id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const helper = document.createElement('textarea')
        helper.value = text
        helper.setAttribute('readonly', '')
        helper.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
        document.body.appendChild(helper)
        helper.select()
        const copiedWithFallback = document.execCommand('copy')
        document.body.removeChild(helper)
        if (!copiedWithFallback) throw new Error('Clipboard fallback unavailable')
      }
      setCopied(id)
      setTimeout(() => setCopied(''), 2000)
    } catch {
      setNotice('Browser memblokir clipboard. Salin manual dari kotak prompt ini.')
    }
  }

  const outputs = useMemo(() => {
    const realism = 'hyperrealistic live-action photography, natural human anatomy, practical tokusatsu suit materials, cinematic lighting, 4k film still'
    const resolvedTeamName = safe(teamName.trim() || 'Sentai Aegis')
    const teamRoster = activeHeroes.map((h, index) => `${index + 1}. ${safe(h.name)} — ${AURAS[h.aura][0]} primary color, ${motifSubName(h)} ${motifName(h)} motif${h.role === 'Sixth Ranger' ? ' [SIXTH RANGER]' : ''}`).join(' | ')
    let teamCrestRule = `and the same original ${resolvedTeamName} crest fixed on the left chest.`
    if (chestEmblemMode === 'Hanya Motif Hero (Tengah dada)' || chestEmblemMode === 'Tanpa logo di dada (Polos)') {
      teamCrestRule = `with no team logo on the suit.`
    }
    
    let motifPlacementRule = `Member-specific motifs are always placed at the center chest, belt buckle, and helmet crest.`
    if (chestEmblemMode === 'Hanya Logo Tim (Kiri dada)' || chestEmblemMode === 'Tanpa logo di dada (Polos)') {
      motifPlacementRule = `Member-specific motifs are strictly placed on the belt buckle and helmet crest, leaving the chest completely clean of individual motifs.`
    }

    const teamBible = `TEAM DESIGN LOCK — ${resolvedTeamName}. All ${activeHeroes.length} heroes share: ${sharedSuitSystem}; ${sharedAccentFinish}; same base helmet shell shape, visor geometry, collar, glove/boot construction, belt housing, ${teamCrestRule} ${motifPlacementRule} Each hero's helmet has a unique submotif-specific crest sculpted on top of the shared base shell. Only personal color, member motif, and helmet crest may differ between heroes.`
    const sixthRangerNote = (h) => {
      if (h.role !== 'Sixth Ranger') return ''
      const style = sixthStyleDetail(h.sixthStyle)
      const needsAccent = ['Aksen warna berbeda', 'Armor + aksen unik', 'Kombinasi lengkap'].includes(h.sixthStyle)
      const accentNote = needsAccent ? ` The exclusive accent color for this sixth ranger is: ${sixthAccentDetail(h.sixthAccent)} piping, emblems, belt trim, and helmet edge details — distinctly different from the shared team accent finish.` : ''
      const needsEvolvedMotif = ['Sub-motif unik', 'Kombinasi lengkap'].includes(h.sixthStyle)
      const evolvedMotifNote = needsEvolvedMotif ? ` The motif emblem and helmet crest for this ranger should look like an evolved, awakened, or rare variant of ${motifSubName(h)} — visibly different from the standard team member version while staying within the same motif family.` : ''
      return ` SIXTH RANGER VARIANT — This hero is a special member of ${resolvedTeamName}. Design rule: ${style}.${accentNote}${evolvedMotifNote}`
    }
    const memberLock = (h) => `${safe(h.name)}: ${AURAS[h.aura][0]} ${h.role === 'Sixth Ranger' ? 'SIXTH RANGER' : 'member'}, ${h.body.toLowerCase()} build, ${motifSubName(h)} motif, helmet: ${helmetCrestShape(h)}, ${motifAccentDetail(h, chestEmblemMode)}${feminineDesignName(h)}.${sixthRangerNote(h)}`
    const heroHuman = (h) => {
      const aura = AURAS[h.aura]
      return `Full-body reference of ${safe(h.name)}, head to toe with feet visible. ${h.age}-year-old ${h.gender.toLowerCase()}, ${h.ethnicity} heritage, ${h.body.toLowerCase()} build, ${h.hair.toLowerCase()}. Wearing ${civilianOutfitDetail(h)} with ${h.accessory.toLowerCase()}. ${AURAS[h.aura][0]} civilian member of ${resolvedTeamName}, holding a ${device[0].toLowerCase()} (${device[1]}). Set at ${location}; ${aesthetic}. ${aura[2]}. ${realism}.`
    }
    const heroSuit = (h) => {
      const aura = AURAS[h.aura]; const motif = h.motif === 'Kustom' ? h.customMotif : `${h.submotif} ${h.motif}`
      const suitDesign = isFeminineGender(h.gender) ? feminineSuitDetail(h.feminineDesign) : 'streamlined helmet and fitted athletic silhouette'
      let sixthSuitExtra = ''
      if (h.role === 'Sixth Ranger') {
        const style = sixthStyleDetail(h.sixthStyle)
        const needsAccent = ['Aksen warna berbeda', 'Armor + aksen unik', 'Kombinasi lengkap'].includes(h.sixthStyle)
        const accentDesc = needsAccent ? `; accent trim: ${sixthAccentDetail(h.sixthAccent)}` : ''
        const needsEvolvedMotif = ['Sub-motif unik', 'Kombinasi lengkap'].includes(h.sixthStyle)
        const evolvedDesc = needsEvolvedMotif ? `; evolved/awakened ${motifSubName(h)} motif variant` : ''
        sixthSuitExtra = `. Sixth-ranger variant: ${style}${accentDesc}${evolvedDesc}`
      }
      return `[ATTACH YOUR 'MASTER TEAM REFERENCE' IMAGE AS CREF] Full-body hero suit reference of ${safe(h.name)}, head to toe with boots visible. ${aura[0]} spandex tokusatsu suit, ${h.body.toLowerCase()} build, ${h.coverage.toLowerCase()}, inspired by ${motif}, ${suitDesign}, helmet: ${helmetCrestShape(h)}, ${motifAccentDetail(h, chestEmblemMode)}${feminineDesignName(h)}${sixthSuitExtra}. ${teamBible} ${device[0].toLowerCase()} placed: ${device[1]}. ${aura[2]}. Match the Master Team Reference exactly — only change color to ${aura[0]}, motif to ${motif}, and helmet crest to ${helmetCrestShape(h)}. ${location}; ${aesthetic}. ${realism}.`
    }
    const heroLineupEntry = (h, i) => {
      const aura = AURAS[h.aura]
      const motif = h.motif === 'Kustom' ? h.customMotif : `${h.submotif} ${h.motif}`
      const suitDesign = isFeminineGender(h.gender) ? feminineSuitDetail(h.feminineDesign) : 'streamlined helmet and fitted athletic silhouette'
      let sixthTag = ''
      if (h.role === 'Sixth Ranger') {
        const style = sixthStyleDetail(h.sixthStyle)
        const needsAccent = ['Aksen warna berbeda', 'Armor + aksen unik', 'Kombinasi lengkap'].includes(h.sixthStyle)
        const accentDesc = needsAccent ? `; accent trim: ${sixthAccentDetail(h.sixthAccent)}` : ''
        const needsEvolvedMotif = ['Sub-motif unik', 'Kombinasi lengkap'].includes(h.sixthStyle)
        const evolvedDesc = needsEvolvedMotif ? '; evolved/awakened motif variant' : ''
        sixthTag = ` [SIXTH RANGER — ${style}${accentDesc}${evolvedDesc}]`
      }
      return `${String(i + 1).padStart(2, '0')}. ${safe(h.name)}: ${aura[0]} suit, ${h.body.toLowerCase()} build, ${h.coverage.toLowerCase()}, inspired by ${motif}, ${suitDesign}, helmet: ${helmetCrestShape(h)}, ${motifAccentDetail(h, chestEmblemMode)}${feminineDesignName(h)}${sixthTag}.`
    }
    const teamLineupDetails = activeHeroes.map(heroLineupEntry).join(' ')
    let teamReferenceChest = `left-chest team crest, center-chest member emblem,`
    if (chestEmblemMode === 'Hanya Logo Tim (Kiri dada)') teamReferenceChest = `left-chest team crest,`
    else if (chestEmblemMode === 'Hanya Motif Hero (Tengah dada)') teamReferenceChest = `center-chest member emblem,`
    else if (chestEmblemMode === 'Tanpa logo di dada (Polos)') teamReferenceChest = `clean chest,`

    const formationRule = activeHeroes.length > 0 ? `Place ${safe(activeHeroes[0].name)} (${AURAS[activeHeroes[0].aura][0]}) in the center. ` : ''
    const teamReference = { id: 'team-design-bible', kind: 'IMAGE • TEAM CONTINUITY', title: `${resolvedTeamName} — Master Team Reference`, text: `Master full-body lineup of ${resolvedTeamName}, ${activeHeroes.length} heroes standing together. ${formationRule}${teamBible} Each hero: ${teamLineupDetails} Show every hero front-facing full body, ${teamReferenceChest} belt buckle, gloves, boots. This is the canonical design reference for individual hero generation. ${location}; ${aesthetic}. ${realism}.` }
    const sheets = activeHeroes.flatMap((h, i) => [
      { id: `human-${h.id}`, kind: 'IMAGE • HUMAN FORM', title: `${String(i + 1).padStart(2, '0')} · ${h.name} — Civilian Reference`, text: heroHuman(h) },
      { id: `hero-${h.id}`, kind: 'IMAGE • HERO FORM', title: `${String(i + 1).padStart(2, '0')} · ${h.name} — Hero Reference`, text: heroSuit(h) },
      { id: `sheet-${h.id}`, kind: 'IMAGE • CHARACTER SHEET 9:16', title: `${h.name} — Character Sheet`, text: `[ATTACH 'MASTER TEAM REFERENCE' AS CREF] 9:16 portrait character sheet for ${safe(h.name)}, white background. ${memberLock(h)} Layout: 2 columns (left = civilian, right = hero), 5 rows. Row 1: front full body. Row 2: 3/4 angle full body. Row 3: side profile full body. Row 4: back full body. Row 5: close-up head/face (civilian) and close-up helmet (hero). Civilian column: ${civilianOutfitDetail(h)}. Hero column: ${h.motif === 'Kustom' ? h.customMotif : h.submotif}${feminineDesignName(h)}, helmet: ${helmetCrestShape(h)}, ${motifAccentDetail(h, chestEmblemMode)}. Label each panel. Orthographic reference style, clean even lighting, ${realism}. Aspect ratio 9:16.` },
    ])
    const macro = { id: 'macro-device', kind: 'IMAGE • PROP MACRO', title: 'Macro Henshin Device', text: `Product photo of a ${device[0].toLowerCase()}, brushed metal, painted ABS plastic, translucent resin lens, tactile buttons, tokusatsu TV prop quality. ${device[1]}. Dark studio tabletop, rim light, shallow depth of field, hyperrealistic, 4k.` }
    const teamColors = activeHeroes.map((h) => AURAS[h.aura][0]).join(', ')
    const primaryMotif = activeHeroes[0] ? (activeHeroes[0].motif === 'Kustom' ? (activeHeroes[0].customMotif || 'heroic') : activeHeroes[0].motif) : 'heroic'
    const katakanaText = TEAM_NAME_KATAKANA[teamName.trim()] || ''
    const logoTextInstruction = katakanaText
      ? `Include the Japanese text "${katakanaText}" rendered in bold stylized tokusatsu typography, integrated into the emblem design like a real Super Sentai series logo.`
      : `Include stylized Japanese katakana text of the team name, rendered in bold tokusatsu typography, integrated into the emblem design like a real Super Sentai series logo.`
    const teamLogo = { id: 'team-logo', kind: 'IMAGE • TEAM LOGO', title: `${resolvedTeamName} — Emblem / Crest`, text: `Professional sentai team emblem for "${resolvedTeamName}". Bold, symmetrical fictional logo inspired by ${primaryMotif.toLowerCase()} motif. Geometric shield or badge frame with stylized ${primaryMotif.toLowerCase()} silhouette. ${logoTextInstruction} Colors: ${teamColors} accent linework. Style: engraved metal badge — brushed chrome base, colored enamel fill, beveled edges. Tokusatsu TV prop crest for suits, belts, helmets. Black background, centered, flat-lay product shot, 4k.` }
    const group = activeHeroes.map((h) => `${h.name} in ${AURAS[h.aura][0]} energy`).join('; ')
    const heroDescriptor = (h) => `${safe(h.name)} in ${AURAS[h.aura][0]} ${h.motif === 'Kustom' ? h.customMotif : h.submotif} suit${feminineDesignName(h)}. ${memberLock(h)}`
    const storyboardLayout = 'Strict 2×3 grid layout (2 columns, 3 rows), each panel equal size, thin white border between panels, numbered 1-6 top-left to bottom-right.'
    const soloHenshinStoryboard = (h, i) => ({
      id: `storyboard-henshin-${h.id}`,
      kind: 'IMAGE • STORYBOARD 3:2',
      title: `${String(i + 1).padStart(2, '0')} · ${h.name} — Solo Henshin Storyboard`,
      text: `${storyboardLayout} Solo henshin storyboard for ${heroDescriptor(h)}. Panel 1 (medium shot, waist-up): civilian form in ${civilianOutfitDetail(h)}, standing alert. Panel 2 (close-up, chest-to-face): ${device[0].toLowerCase()} activation — ${device[1]}. Panel 3 (full body, low angle): ${AURAS[h.aura][2]} wraps around the civilian body. Panel 4 (full body, front): spandex suit materializes over the body. Panel 5 (extreme close-up, helmet only): helmet locks into place, visor glows. Panel 6 (full body, dramatic low angle): completed hero pose. ${location}; ${aesthetic}. Use identical camera angles and panel composition for every hero. ${realism}. Aspect ratio 3:2.`,
    })
    const soloFinisherStoryboard = (h, i) => ({
      id: `storyboard-finisher-${h.id}`,
      kind: 'IMAGE • STORYBOARD 3:2',
      title: `${String(i + 1).padStart(2, '0')} · ${h.name} — Solo Finisher Storyboard`,
      text: `${storyboardLayout} Solo finisher storyboard for ${heroDescriptor(h)} performing "${finisher}". Panel 1 (full body, front): battle-ready stance. Panel 2 (close-up, hands): ${device[0].toLowerCase()} activates with energy glow. Panel 3 (full body, side): ${AURAS[h.aura][2]} builds around suit. Panel 4 (full body, dynamic angle): martial-arts wind-up motion. Panel 5 (wide shot, dramatic): energy strike released toward camera. Panel 6 (full body, low angle): heroic victory pose. ${location}; ${aesthetic}. Use identical camera angles and panel composition for every hero. ${realism}. Aspect ratio 3:2.`,
    })
    const storyboardItems = mode === 'Henshin'
      ? sequence === 'Solo'
        ? activeHeroes.map(soloHenshinStoryboard)
        : [{ id: 'storyboard-henshin-team', kind: 'IMAGE • STORYBOARD 3:2', title: 'Team Henshin Storyboard', text: `${storyboardLayout} Team henshin storyboard, ${activeHeroes.length} tokusatsu heroes. Panel 1 (wide shot): civilian group formation at ${location}. Panel 2 (medium group shot): synchronized ${device[0].toLowerCase()} activation. Panel 3 (wide shot): ${group} — energy envelops each hero. Panel 4 (wide shot): suits materialize simultaneously. Panel 5 (close-up montage): helmets lock on each hero in sequence. Panel 6 (wide shot, low angle): full team landing pose. ${aesthetic}. ${realism}. Aspect ratio 3:2.` }]
      : sequence === 'Solo'
        ? activeHeroes.map(soloFinisherStoryboard)
        : [{ id: 'storyboard-finisher-team', kind: 'IMAGE • STORYBOARD 3:2', title: `Team Finisher Storyboard — ${finisher}`, text: `${storyboardLayout} Team finisher storyboard, ${activeHeroes.length}-hero team performing "${finisher}". Panel 1 (wide shot): tactical formation at ${location}. Panel 2 (medium group shot): each hero builds color-specific energy. Panel 3 (wide shot, dynamic): choreography in motion. Panel 4 (wide shot): energy combines into unified attack. Panel 5 (dramatic wide): combined strike released. Panel 6 (wide shot, low angle): team victory pose. ${aesthetic}. ${realism}. Aspect ratio 3:2.` }]
    const video = { id: 'video-main', kind: 'VIDEO • SEEDANCE 2.0', title: mode === 'Henshin' ? 'Live-Action Henshin Sequence' : 'Live-Action Finisher Sequence', text: `${mode === 'Henshin' ? `${sequence === 'Bersama' ? `Team of ${activeHeroes.length}` : 'Solo'} live-action tokusatsu henshin sequence` : `Live-action tokusatsu ${sequence.toLowerCase()} finisher: ${finisher}`}, at ${location}. ${teamBible} ${activeHeroes.map((h) => memberLock(h)).join(' ')} ${device[0].toLowerCase()}: ${device[1]}. Camera: slow push-in, low-angle orbit during energy build, wide pull for final pose. ${aesthetic}; practical VFX, cinematic lighting. 8s, 24fps, 16:9.` }
    const seo = { id: 'seo', kind: 'PRODUCTION • SEO', title: 'Metadata Produksi', text: `Title: ${mode} ${sequence} — ${activeHeroes.map((h) => h.name).join(', ')}\nDescription: Hyperrealistic live-action tokusatsu scene in ${location}, styled as ${aesthetic}.\nKeywords: tokusatsu, super sentai inspired, live action superhero, practical spandex suit, cinematic henshin, ${teamMotif.toLowerCase()}, hyperrealistic video.\nSafety intent: original fictional characters.` }
    return { image: [teamReference, teamLogo, ...sheets, macro, ...storyboardItems], video: [video], seo: [seo] }
  }, [activeHeroes, aesthetic, device, finisher, location, mode, sequence, sharedAccentFinish, sharedSuitSystem, teamMotif, teamName, chestEmblemMode])

  const generate = () => { setNotice(`Prompt ${mode.toLowerCase()} untuk ${activeHeroes.length} karakter telah diperbarui.`); setTab('image') }
  const currentOutputs = outputs[tab]

  return <main className="app-shell">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Sentai Forge home"><span className="brand-mark"><span /><span /><span /></span><span>SENTAI <em>FORGE</em></span></a>
      <div className="project-status"><span className="pulse" />Project · Hyperrealistic Sentai</div>
      <button className="settings-button"><Settings2 size={17} /> Pengaturan</button>
    </header>
    <div className="workspace" id="top">
      <aside className="left-pane">
        <div className="pane-title"><span className="pane-icon"><Settings2 size={18} /></span><div><p>CONTROL DECK</p><h1>Production Settings</h1></div></div>
        <section className="mode-control">
          <span className="section-label">Kategori adegan</span>
          <div className="segmented"><button className={mode === 'Henshin' ? 'active' : ''} onClick={() => setMode('Henshin')}><Sparkles size={17} /> Henshin</button><button className={mode === 'Finisher' ? 'active rose' : ''} onClick={() => setMode('Finisher')}><Flame size={17} /> Finisher</button></div>
          <div className="segmented slim"><button className={sequence === 'Bersama' ? 'active' : ''} onClick={() => setSequence('Bersama')}>Bersama</button><button className={sequence === 'Solo' ? 'active' : ''} onClick={() => setSequence('Solo')}>Solo / per hero</button></div>
        </section>
        <section className="settings-grid">
          <SelectField label="Estetika visual" value={aesthetic} onChange={setAesthetic}>{option(AESTHETICS)}</SelectField>
          <SelectField label="Latar tempat" value={location} onChange={setLocation}>{option(LOCATIONS)}</SelectField>
          <SelectField label="Alat henshin" value={String(deviceIndex)} onChange={(v) => setDeviceIndex(Number(v))}>{DEVICES.map((d, i) => <option value={i} key={d[0]}>{d[0]}</option>)}</SelectField>
          <SelectField label="Nama tim" value={teamNameMode === 'custom' ? 'Kustom' : teamName} onChange={(v) => { if (v === 'Kustom') { setTeamNameMode('custom') } else { setTeamNameMode('preset'); setTeamName(v) } }}>{TEAM_NAME_PRESETS.map((n) => <option key={n} value={n}>{n}{LABELS[n] ? ` (${LABELS[n]})` : ''}</option>)}<option value="Kustom">Kustom (Buat sendiri)</option></SelectField>
          {teamNameMode === 'custom' && <label className="field"><span>Nama tim kustom</span><input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Tulis nama tim sendiri..." /></label>}
          <SelectField label="Sistem kostum tim" value={teamSuitSystem} onChange={setTeamSuitSystem}>{TEAM_SUIT_SYSTEMS.map(([label]) => <option key={label} value={label}>{label}{LABELS[label] ? ` (${LABELS[label]})` : ''}</option>)}</SelectField>
          <SelectField label="Finishing aksen tim" value={teamAccentFinish} onChange={setTeamAccentFinish}>{TEAM_ACCENT_FINISHES.map(([label]) => <option key={label} value={label}>{label}{LABELS[label] ? ` (${LABELS[label]})` : ''}</option>)}</SelectField>
          <SelectField label="Penempatan Logo Dada" value={chestEmblemMode} onChange={setChestEmblemMode}>{CHEST_EMBLEM_OPTIONS.map((label) => <option key={label} value={label}>{label}</option>)}</SelectField>
          {mode === 'Finisher' && <SelectField label="Serangan pamungkas" value={finisher} onChange={setFinisher}>{option(finishers)}</SelectField>}
          <div className="field">
            <span style={{ display: 'block', fontSize: 13, marginBottom: 8, fontWeight: 500 }}>Sistem motif tim</span>
            <div className="segmented slim">
              <button className={unifiedMotif ? 'active' : ''} onClick={() => {
                setUnifiedMotif(true);
                const baseMotif = activeHeroes[0]?.motif || 'Mythical beast';
                setHeroes(current => current.map((h, i) => ({ ...h, motif: baseMotif, ...(baseMotif === 'Kustom' ? {} : { submotif: MOTIFS[baseMotif]?.includes(h.submotif) ? h.submotif : MOTIFS[baseMotif]?.[i % MOTIFS[baseMotif].length] || '' }) })))
              }}>1 Motif Utama</button>
              <button className={!unifiedMotif ? 'active' : ''} onClick={() => setUnifiedMotif(false)}>Beda-beda motif</button>
            </div>
          </div>
          {unifiedMotif && <SelectField label="Motif utama tim" value={activeHeroes[0]?.motif || 'Mythical beast'} onChange={(v) => setHeroes(current => current.map((h, i) => ({ ...h, motif: v, ...(v === 'Kustom' ? {} : { submotif: MOTIFS[v]?.[i % MOTIFS[v].length] || '' }) })))}>{[...Object.keys(MOTIFS), 'Kustom'].map((m) => <option key={m} value={m}>{m}{LABELS[m] ? ` (${LABELS[m]})` : ''}</option>)}</SelectField>}
          <label className="field character-count"><span>Jumlah karakter <b>{characterCount} hero</b></span><input type="range" min="1" max="10" value={characterCount} onChange={(e) => changeCount(e.target.value)} /><div className="range-pips">{[1,2,3,4,5,6,7,8,9,10].map((n) => <i className={n <= characterCount ? 'on' : ''} key={n}>{n}</i>)}</div></label>
        </section>
        <div className="section-rule"><span>Character lineup</span><small>{characterCount} / 10 aktif</small></div>
        <div className="hero-list">
          {activeHeroes.map((hero, index) => <HeroCard key={hero.id} hero={hero} index={index} expanded={openHero === index} onToggle={() => setOpenHero(openHero === index ? -1 : index)} onChange={(key, value) => updateHero(hero.id, key, value)} device={device} unifiedMotif={unifiedMotif} />)}
        </div>
        <button className="generate-button" onClick={generate}><span><WandSparkles size={20} /> Buat Prompt Produksi</span><ArrowRight size={19} /></button>
        <p className="build-note"><Check size={14} /> {notice}</p>
      </aside>
      <section className="right-pane">
        <div className="output-header"><div><div className="eyeline"><Layers3 size={16} /> Generator aktif</div><h2>Production Output</h2><p>Prompt English yang siap disalin untuk Whisk &amp; Dreamina Seedance 2.0.</p></div><button className="clear-button" onClick={() => setNotice('Output tetap tersedia — ubah set produksi untuk memperbarui.')}> <X size={15} /> Reset notice</button></div>
        <nav className="output-tabs" aria-label="Output categories"><button className={tab === 'image' ? 'selected' : ''} onClick={() => setTab('image')}><Clapperboard size={16} /> Prompt Image <span>{outputs.image.length}</span></button><button className={tab === 'video' ? 'selected' : ''} onClick={() => setTab('video')}><Film size={16} /> Prompt Video <span>{outputs.video.length}</span></button><button className={tab === 'seo' ? 'selected' : ''} onClick={() => setTab('seo')}>SEO <span>{outputs.seo.length}</span></button><button className="copy-all" onClick={() => handleCopy(currentOutputs.map((o) => `${o.title}\n${o.text}`).join('\n\n'), 'all')}><Clipboard size={15} /> {copied === 'all' ? 'Semua disalin!' : 'Salin semua'}</button></nav>
        <div className="output-scroll"><div className="output-lead"><span className="signal" />{tab === 'image' ? 'Mulai dari Master Team Reference, lalu gunakan sebagai acuan untuk prompt hero individual di Whisk.' : tab === 'video' ? 'Seedance 2.0 movement, cinematic camera, and sequence prompts.' : 'Metadata untuk menyimpan dan menemukan konsep produksi.'}</div>{currentOutputs.map((item) => <OutputCard item={item} key={item.id} copied={copied} onCopy={handleCopy} />)}<div className="output-footer"><Sparkles size={17} /><span>Guardrail aktif: karakter fiktif dewasa, tanpa kemiripan dengan orang nyata atau logo franchise.</span></div></div>
      </section>
    </div>
  </main>
}

export default App
