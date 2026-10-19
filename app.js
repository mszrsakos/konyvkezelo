function Konyv(cim, szerzo, kiadasiEv, oldalszam) {
    this.cim = cim;
    this.szerzo = szerzo;
    this.kiadasiEv = kiadasiEv;
    this.oldalszam = oldalszam;
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

const konyvek = [
    new Konyv("Egri csillagok", "Gárdonyi Géza", 1901, 560),
    new Konyv("A Pál utcai fiúk", "Molnár Ferenc", 1906, 208),
    new Konyv("Tüskevár", "Fekete István", 1957, 256),
    new Konyv("Az arany ember", "Jókai Mór", 1872, 480),
    new Konyv("Liliom", "Molnár Ferenc", 1909, 144),
    new Konyv("A kis herceg", "Antoine de Saint-Exupéry", 1943, 96),
    new Konyv("1984", "George Orwell", 1949, 328),
    new Konyv("A hobbit", "J. R. R. Tolkien", 1937, 310),
    new Konyv("A nagy Gatsby", "F. Scott Fitzgerald", 1925, 180),
    new Konyv("Pál utcai fiúk", "Molnár Ferenc", 1906, 208)
];



let adatok=document.getElementById("adatok")
function konyvHozzaadasa() {
    document.getElementById("cim").value;
    document.getElementById("szerzo").value;
    document.getElementById("kiadasiEv").value;
    document.getElementById("oldalszam").value;
    const ujKonyv = new Konyv(document.getElementById("cim").value, document.getElementById("szerzo").value, document.getElementById("kiadasiEv").value, document.getElementById("oldalszam").value);
    konyvek.push(ujKonyv);
    konyvekMegjelenitese();
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

    thead.innerHTML = `<tr>
        <th>Cím</th>
        <th>Szerző</th>
        <th>Kiadás éve</th>
        <th>Oldalszám</th>
        <th>Állapot</th>
        <th>Művelet</th>
    </tr>`;

    tbody.innerHTML = konyvek.map((konyv, i) => `<tr>
        <td>${konyv.cim}</td>
        <td>${konyv.szerzo}</td>
        <td>${konyv.kiadasiEv}</td>
        <td>${konyv.oldalszam}</td>
        <td>${konyv.kolcsonozve ? "Kölcsönözve" : "Kölcsönözhető"}</td>
        <td>${konyv.kolcsonozve
            ? `<button onclick="visszahozas(${i})">Visszahozás</button>`
            : `<button onclick="kolcsonzes(${i})">Kölcsönzés</button>`}</td>
    </tr>`).join("");

    szabadKonyvekMegjelenitese();
    legRegebbiKonyv();
    legVastagabb();
    atlagOldalszam()
}

function szabadKonyvekMegjelenitese() {
    const thead = document.querySelector("#szabadTablazat thead");
    const tbody = document.querySelector("#szabadTablazat tbody");

    thead.innerHTML = `<tr>
        <th>Cím</th>
        <th>Szerző</th>
        <th>Kiadás éve</th>
        <th>Oldalszám</th>
    </tr>`;

    tbody.innerHTML = konyvek
        .filter((konyv) => konyv.kolcsonozve === false)
        .map((konyv) => `<tr>
            <td>${konyv.cim}</td>
            <td>${konyv.szerzo}</td>
            <td>${konyv.kiadasiEv}</td>
            <td>${konyv.oldalszam}</td>
        </tr>`)
        .join("");
}


    
function legRegebbiKonyv(){
    let legregebbi=konyvek[0]
    for(let i=1;i<konyvek.length;i++){

        if(konyvek[i].kiadasiEv< legregebbi.kiadasiEv){
            legregebbi=konyvek[i];
        }
    }
    document.getElementById("legregebbi").innerHTML=`A legrégebbi könyv: ${legregebbi.cim} (${legregebbi.kiadasiEv})
    `
}
function legVastagabb(){
    let legvastagabb=konyvek[0]
    for(let i=1;i<konyvek.length;i++){

        if(konyvek[i].oldalszam> legvastagabb.oldalszam){
            legvastagabb=konyvek[i];
        }
    }
    document.getElementById("legvastagabb").innerHTML=`A legrégebbi könyv: ${legvastagabb.cim} (${legvastagabb.oldalszam})
    `
}
function atlagOldalszam(){
    let db=0
    let osszOldal=0
    let atlagOldal=osszOldal/db
    for(let i=0;i<konyvek.length;i++){
        osszOldal+=konyvek[i].oldalszam
        db++
        let atlagOldal=osszOldal/db
    }
    document.getElementById("atlagOldalSzam").innerHTML=`${atlagOldal}`

}
        

konyvekMegjelenitese();

