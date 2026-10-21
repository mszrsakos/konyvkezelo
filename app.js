function Konyv(cim, szerzo, kiadasiEv, oldalszam, kategoria) {
    this.cim = cim;
    this.szerzo = szerzo;
    this.kiadasiEv = kiadasiEv;
    this.oldalszam = oldalszam;
    this.kategoria = kategoria;
    this.kolcsonozheto = true;
    this.kolcsonozve = false;
}

Konyv.prototype.kolcsonoz = function() {
    if (!this.kolcsonozheto) return false;
    this.kolcsonozve = true;
    this.kolcsonozheto = false;
    return true;
};

Konyv.prototype.visszahoz = function() {
    if (!this.kolcsonozve) return false;
    this.kolcsonozve = false;
    this.kolcsonozheto = true;
    return true;
}
function torles(i) {
    konyvek.splice(i, 1);
    konyvekMegjelenitese()
}

const konyvek = [
    new Konyv("Egri csillagok", "Gárdonyi Géza", 1901, 560, "Történelmi"),
    new Konyv("A Pál utcai fiúk", "Molnár Ferenc", 1906, 208, "Regény"),
    new Konyv("Tüskevár", "Fekete István", 1957, 256, "Regény"),
    new Konyv("Az arany ember", "Jókai Mór", 1872, 480, "Regény"),
    new Konyv("Liliom", "Molnár Ferenc", 1909, 144, "Regény"),
    new Konyv("A kis herceg", "Antoine de Saint-Exupéry", 1943, 96, "Fantasy"),
    new Konyv("1984", "George Orwell", 1949, 328, "Sci-fi"),
    new Konyv("A hobbit", "J. R. R. Tolkien", 1937, 310, "Fantasy"),
    new Konyv("A nagy Gatsby", "F. Scott Fitzgerald", 1925, 180, "Regény"),
];



let adatok=document.getElementById("adatok")
function konyvHozzaadasa() {
    const cim = document.getElementById("cim").value;
    const szerzo = document.getElementById("szerzo").value;
    const kiadasiEv = Number(document.getElementById("kiadasiEv").value);
    const oldalszam = Number(document.getElementById("oldalszam").value);
    const kategoria = document.getElementById("kategoriaValaszto").value;

    const ujKonyv = new Konyv(
        cim,
        szerzo,
        kiadasiEv,
        oldalszam,
        kategoria
    );

    konyvek.push(ujKonyv);

    konyvekMegjelenitese();
    szabadKonyvekMegjelenitese();
}
function kolcsonzes(index) {
    konyvek[index].kolcsonoz();
    konyvekMegjelenitese();
}

function visszahozas(index) {
    konyvek[index].visszahoz();
    konyvekMegjelenitese();
}

function konyvekMegjelenitese() {
    const thead = document.querySelector("#tablazat thead");
    const tbody = document.querySelector("#tablazat tbody");
    const kategoria = document.getElementById("legordulo").value;
    const lathatoKonyvek = konyvek.filter((konyv) =>
        kategoria === "" || konyv.kategoria === kategoria
    );

    thead.innerHTML = `<tr>
        <th>Cím</th>
        <th>Szerző</th>
        <th>Kiadás éve</th>
        <th>Oldalszám</th>
        <th>Kategória</th>
        <th>Állapot</th>
        <th>Művelet</th>
        <th>Törlés</th>
    </tr>`;

    tbody.innerHTML = lathatoKonyvek.map((konyv) => {
        const i = konyvek.indexOf(konyv);
        return `<tr>
        <td>${konyv.cim}</td>
        <td>${konyv.szerzo}</td>
        <td>${konyv.kiadasiEv}</td>
        <td>${konyv.oldalszam}</td>
        <td>${konyv.kategoria}</td>
        <td>${konyv.kolcsonozve ? "Kölcsönözve" : "Kölcsönözhető"}</td>
        <td>${konyv.kolcsonozve
            ? `<button onclick="visszahozas(${i})">Visszahozás</button>`
            : `<button onclick="kolcsonzes(${i})">Kölcsönzés</button>`}</td>
        <td><button onclick="torles(${i})">Törlés</button></td>

    </tr>`;
    }).join("");


    atlagOldalszam()
}

function osszesKonyvMegjelenitese() {
    document.getElementById("legordulo").value = "";
    konyvekMegjelenitese();
}



let legregebbiK=document.getElementById("legregebbi")
function legRegebbiKonyv() {
    let legregebbi = konyvek[0];

    for (let i = 1; i < konyvek.length; i++) {
        if (konyvek[i].kiadasiEv < legregebbi.kiadasiEv) {
            legregebbi = konyvek[i];
        }
    }

    legregebbiK.innerHTML = `A legrégebbi könyv: ${legregebbi.cim} (${legregebbi.kiadasiEv})`;
    legregebbiK.style.visibility = "visible";
}
function legVastagabb(){
    let legvastagabb=konyvek[0]
    for(let i=1;i<konyvek.length;i++){

        if(konyvek[i].oldalszam> legvastagabb.oldalszam){
            legvastagabb=konyvek[i];
        }
    }
    document.getElementById("legvastagabb").innerHTML=`A legvastagabb könyv: ${legvastagabb.cim} (${legvastagabb.oldalszam})
    `
}
function atlagOldalszam(){
    let db=0
    let osszOldal=0
    let atlagOldal=osszOldal/db
    for(let i=0;i<konyvek.length;i++){
        osszOldal+=konyvek[i].oldalszam
        db++

    }

    document.getElementById("atlagOldalSzam").innerHTML=`Átlag oldalszám: ${Math.round(osszOldal/db)} oldal`

}
function megjelenitKategoriaSzerint(kategoria){
    let szoveg = kategoria + " kategória:\n";
    let talaltKonyvet = false;

    for (let i = 0; i < konyvek.length; i++) {
        if (konyvek[i].kategoria === kategoria) {
            szoveg += konyvek[i].cim + "\n";
            talaltKonyvet = true;
        }
    }

    if (!talaltKonyvet) {
        szoveg = "Nincs könyv ebben a kategóriában.";
    }

    const kiiras = document.getElementById("kategoria");
    kiiras.style.whiteSpace = "pre-line";
    kiiras.textContent = szoveg;
}

function megjelenitesLegordulo(){
    konyvekMegjelenitese();
}

konyvekMegjelenitese();

