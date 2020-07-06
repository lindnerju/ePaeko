/*
MIT License

Copyright (c) 2020 Julian Lindner, Simon Lindner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*Gloabale Variablen*/
var wurde_geaendert = false;
var Schulen = [];
var FaecherGrundauswahl = [];
var FaecherZwischenspeicher = [];
var Checkboxes_Klasse9 = [];
var Checkboxes_Klasse10 = [];
var Pruefungsfaecher = [];
var LeistungsKursregelCheck = false;
var ZweiPruefungsfaecherRegelCheck = false;
var mathePF = false;
var deutschPF = false;
var sprachePF = false;
var AnzahlGewaehltAusMaDeFS = 0;
var AufgabenfelderRegel = false;
var AF1_belegt = false;
var AF2_belegt = false;
var AF3_belegt = false;
var EntspannteFaecherInDreiVier = 0;
var Kein_AF = [];
var AF1_OhneMaDeFS = [];
var AF1_NurMaDeFS = [];
var AF2 = [];
var AF3_OhneMaDeFS = [];
var AF3_NurMaDeFS = [];
var TestModus = false;
var bll = false;
var ErfuellbarkeitsArray = [];
var DeFSMaArray = [];
var ZusammenfassungErfuellbarkeitsArray = [];
var schule = "";
var SchulBeschreibung = "";
var Beschreibung_sichtbar = false;
var Gesetze_sichtbar = false;
//Hier nur alle Fächer hinschreiben, die auch im Code benötigt werden. Die Nummer muss unbedingt mit der Indexnummer des Fachs in FaecherMenge übereinstimmen!!!
var Deutsch = 1;
var Englisch = 2;
var Mathematik = 26;
var Physik = 27;
var Chemie = 28;
var Biologie = 29;
/*Sport=0;Franzoesisch=3;Italienisch=4;Spanisch=5;
Polnisch=6;Portugiesisch=7;Russisch=8;Tuerkisch=9;Japanisch=10;Chinesisch=11;
Latein=12;AltGriechisch=13;Neugriechisch=14;Musik=15;BildendeKunst=16;
DarstellendesSpiel=17;Politikwissenschaft=18;Geschichte=19;Geografie=20;
Sozialwissenschaften=21;Psychologie=22;Philosophie=23;Wirtschaftswissenschaft=24;
Recht=25;Informatik=30;
RechnungswesenUndControlling=31;VolksUndBetriebswirtschaftslehre=32;
Projektmanagement=33;Pädagogik=34;Wirtschaftsinformatik=35;Bautechnik=36;
Biologielabortechnik=37;Chemielabortechnik=38;Chemietechnik=39;Elektrotechnik=40;
GestaltungsUndMedientechnik=41;Informationstechnik=42;Mechatronik=43;Medientechnik=44;
Medizintechnik=45;MetalltechnikMaschinenbau=46;Physiklabortechnik=47;Physiktechnik=48;
RegenerativeEnergietechnik=49;TechnikUndManagement=50;Umwelttechnik=51;Gesundheit=52;
Gestaltung=53;Medizininformatik=54;TechnischeInformatik=55;Ernährung=56;
AgrartechnikMitBiologie=57;Biotechnologie=58;*/
var FaecherMenge = ['Sport','Deutsch','Englisch','Französisch','Italienisch','Spanisch',
'Polnisch','Portugiesisch','Russisch','Türkisch','Japanisch','Chinesisch','Latein',
'Alt-Griechisch','Neu-Griechisch','Musik','Bildende Kunst','Darstellendes Spiel',
'Politikwissenschaft','Geschichte','Geografie','Sozialwissenschaften','Psychologie',
'Philosophie','Wirtschaftswissenschaft','Recht','Mathematik','Physik','Chemie',
'Biologie','Informatik','Rechnungswesen und Controlling','Volks- und Betriebswirtschaftslehre',
'Projektmanagement','Pädagogik','Wirtschaftsinformatik','Bautechnik','Biologielabortechnik',
'Chemielabortechnik','Chemietechnik','Elektrotechnik','Gestaltungs- und Medientechnik',
'Informationstechnik','Mechatronik','Medientechnik','Medizintechnik','Metalltechnik/ Maschinenbau',
'Physiklabortechnik','Physiktechnik','Regenerative Energietechnik','Technik und Management',
'Umwelttechnik','Gesundheit','Gestaltung','Medizininformatik','Technische Informatik','Ernährung',
'Agrartechnik mit Biologie','Biotechnologie'];
/*Erste Ausführung*/
fuegeSchulenEin();
MengenDefinieren();
Eventlisteneranfuegen();
document.getElementById("Javascript_banner").classList.add("hidden");
document.getElementsByTagName("footer")[0].classList.remove("default_cookie_padding");
//document.getElementById("Cookie_banner").classList.remove("hidden");
function Eventlisteneranfuegen() {
    if (navigator.userAgent.indexOf("Firefox") != -1 && !navigator.userAgent.match(/mobile/i)) {
        document.getElementById("Combobox1").setAttribute("onclick", "PruefungsfachClick(1, this)");
        document.getElementById("Combobox2").setAttribute("onclick", "PruefungsfachClick(2, this);");
        document.getElementById("Combobox3").setAttribute("onclick", "PruefungsfachClick(3, this);");
        document.getElementById("Combobox4").setAttribute("onclick", "PruefungsfachClick(4, this);");
        document.getElementById("Combobox5").setAttribute("onclick", "PruefungsfachClick(5, this);");
        document.getElementById("Combobox1").setAttribute("onchange", "PruefungsfachChange(1, value, 'Firefox')");
        document.getElementById("Combobox2").setAttribute("onchange", "PruefungsfachChange(2, value, 'Firefox')");
        document.getElementById("Combobox3").setAttribute("onchange", "PruefungsfachChange(3, value, 'Firefox')");
        document.getElementById("Combobox4").setAttribute("onchange", "PruefungsfachChange(4, value, 'Firefox')");
        document.getElementById("Combobox5").setAttribute("onchange", "PruefungsfachChange(5, value, 'Firefox')");
    } else {
        document.getElementById("Combobox1").setAttribute("onmousedown", "PruefungsfachClick(1, this);");
        document.getElementById("Combobox2").setAttribute("onmousedown", "PruefungsfachClick(2, this);");
        document.getElementById("Combobox3").setAttribute("onmousedown", "PruefungsfachClick(3, this);");
        document.getElementById("Combobox4").setAttribute("onmousedown", "PruefungsfachClick(4, this);");
        document.getElementById("Combobox5").setAttribute("onmousedown", "PruefungsfachClick(5, this);");
        document.getElementById("Combobox1").setAttribute("onchange", "PruefungsfachChange(1, value, 'Else')");
        document.getElementById("Combobox2").setAttribute("onchange", "PruefungsfachChange(2, value, 'Else')");
        document.getElementById("Combobox3").setAttribute("onchange", "PruefungsfachChange(3, value, 'Else')");
        document.getElementById("Combobox4").setAttribute("onchange", "PruefungsfachChange(4, value, 'Else')");
        document.getElementById("Combobox5").setAttribute("onchange", "PruefungsfachChange(5, value, 'Else')");
    }
}

function BeschreibungAnzeigen() {
    //Klappt unter der Schul-Combobox die schulspezifischen Informationen aus
    if (Beschreibung_sichtbar == false) {
        document.getElementById("Beschreibungs_section").classList.remove("hidden");
        Beschreibung_sichtbar = true;
    } else {
        document.getElementById("Beschreibungs_section").classList.add("hidden");
        Beschreibung_sichtbar = false;
    }
}
function GesetzeAnzeigen() {
    //Klappt die weiteren Absätze des dargestellten Gesetzestextes aus
    if (Gesetze_sichtbar == false) {
        document.getElementById("Gesetzes_div").classList.remove("hidden");
        document.getElementById("section_criteria").scrollIntoView(true);
        Gesetze_sichtbar = true;
    } else {
        document.getElementById("Gesetzes_div").classList.add("hidden");
        document.getElementById("section_criteria").scrollIntoView(true);
        Gesetze_sichtbar = false;
    }
}

function hide_Cookie_banner() {
    //Blende (Anti-)Cookie-Banner ein, wenn Javascript aktiviert ist
    document.getElementById("Cookie_banner").classList.add("hidden");
}
/*Funktionen*/
function fuegeSchulenEin() {
    //Fügt Schulen aus Schulen-Array in die SchulAuswahl-Combobox ein
    DefiniereSchulauswahl();
    let Element = document.getElementById("SchulAuswahl");
    let neuesElement = [];
    for (let Schule of Schulen) {
        neuesElement += "<option id=" + "\'" + Schule + "\'" + " value=" + "\'" + Schule + "\'" + ">" + Schule + "</option>";
    }
    Element.insertAdjacentHTML('afterbegin', neuesElement);
    Element.value = "";
}

function wechselSchule(Schule) {
    //Aufruf bei Schulwechsel/Erst-Auswahl von Schule;
    //Zurücksetzen von Oberfläche, Laden der FaecherGrundauswahl, Darstellung von Schulspezifischem
    //Beschreibungstext, schulspezifischen FachCheckboxes und Schulbeschreibungs-Button
    schule = Schule.slice();
    OberflaecheZuruecksetzen();
    FaecherGrundauswahlUebertragen();
    Beschreibungstexterzeugen();
    FachCheckBoxesErzeugen();
    BeschreibungsButtonanzeigen();
}

function OberflaecheZuruecksetzen() {
    //Aufruf bei Schul-Erstauswahl oder Schul-Wechsel
    //Verstecke, leere und unchecke die Elemente auf der Oberfläche
    document.getElementById("Checkboxes_Klasse9").classList.add("hidden");
    document.getElementById("Checkboxes_Klasse10").classList.add("hidden");
    document.getElementById("div_criteria").classList.remove("hidden");
    document.getElementById("Checkboxes_Klasse9").textContent = "";
    document.getElementById("Checkboxes_Klasse10").textContent = "";
    document.getElementById("Beschreibungs_div").textContent = "";
    document.getElementById("Beschreibungs_section").classList.add("hidden");
    for (let j = 0; j < 5;j++) {
        document.getElementsByClassName("div_selection_menu")[j].classList.remove("hidden");
    }
    for (let Pruefungsfach = 1; Pruefungsfach < 6;Pruefungsfach++) {
        document.getElementById("Combobox" + Pruefungsfach).textContent = '';
    }
    // document.getElementById("LeistungsKursregelCheckbox").checked = false;
    document.getElementById("AufgabenfelderRegelCheckbox").checked = false;
    document.getElementById("AF1Checkbox").checked = false;
    document.getElementById("AF2Checkbox").checked = false;
    document.getElementById("AF3Checkbox").checked = false;
    document.getElementById("ZweiPruefungsfaecherRegelCheckbox").checked = false;
    document.getElementById("Beschreibungs_button").classList.add("hidden");
    document.getElementById("Klassen_section").classList.add("hidden");
    document.getElementById("Selection_section").classList.remove("hidden");
    document.getElementById("section_criteria").classList.remove("hidden");
    Beschreibung_sichtbar = false;
}

function BeschreibungsButtonanzeigen() {
    //Falls Schulbeschreibung vorhanden, zeige den Schulbeschreibungs-Button an
    if (SchulBeschreibung != "") {
        document.getElementById("Beschreibungs_button").classList.remove("hidden");
    }
}

function DefiniereSchulauswahl() {
    //Definiere die Auswahl an Schulen (die woanders dann in die SchulAuswahl-Combobox geladen werden)
    Schulen = ["Heinz-Berggruen-Gymnasium"/*,"Musikgymnasium Carl Philipp Emanuel Bach"*/];
}

function Beschreibungstexterzeugen() {
    //Falls SchulBeschreibung vorhanden, zeige diesen Text im Schulbeschreibungsbereich an
    if (SchulBeschreibung != "") {
        let neuesElement = "<p id='Beschreibungstext'>" + SchulBeschreibung + "</p>"
        document.getElementById("Beschreibungs_div").insertAdjacentHTML('afterbegin', neuesElement);
    }
}

function FaecherGrundauswahlUebertragen() {
    //Erzeuge je nach angeklickter Schule schulspezifisch zunächst als Strings:
    //FaecherGrundauswahl, FachCheckboxes-Listen Klasse 9 und 10, Schulbeschreibung;
    //Am Ende: Übersetze in FaecherGrundauswahl[Pruefungsfach][FachID] mit booleans,
    //setze FaecherZwischenspeicher zurück, übersetze FachCheckbox-Listen in FachIDs,
    //setze Pruefungsfaecher-Speicher zurück.
    //CheckBoxes_Klasse9_String enthält jene Fremdsprachen, die ab spätestens der 9. Klasse
    //durchgehend belegt werden mussten, um als 1. Prüfungsfach gewählt werden können;
    //dabei muss es zur Wahl gestanden haben, aber nicht Pflicht and der Schule gewesen sein.
    //CheckBoxes_Klasse10_String enthält jene Fächer, die ab spätestens der 10. Klasse
    //durchgehend belegt werden mussten, um als PF 1-4 wählbar zu sein; dabei müssen diese Fächer
    //an der Schule zur Wahl gestanden haben, aber nicht Pflicht gewesen sein.
    let FaecherGrundauswahl_String = [];
    let Checkboxes_Klasse9_String = [];
    let Checkboxes_Klasse10_String = [];
    //1. Schule: TEST-SCHULE
    if (schule == 'Test-Schule') {
        FaecherGrundauswahl_String[1] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch'];
        FaecherGrundauswahl_String[2] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst'];
        FaecherGrundauswahl_String[3] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst','Politikwissenschaft','Geschichte',
        'Geografie','Philosophie','Physik','Chemie','Biologie','Informatik'];
        FaecherGrundauswahl_String[4] = ['Musik','Bildende Kunst','Darstellendes Spiel','Sport'];
        FaecherGrundauswahl_String[5] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst','Politikwissenschaft','Geschichte',
        'Geografie','Philosophie'];
        Checkboxes_Klasse9_String = ['Französisch','Latein',
        'Alt-Griechisch'];
        Checkboxes_Klasse10_String = ['Informatik'];
        SchulBeschreibung = "Testschule";
    //2. Schule: Heinz-Berggruen-Gymnasium
    } else if (schule == 'Heinz-Berggruen-Gymnasium') {
        FaecherGrundauswahl_String[1] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Mathematik'];
        FaecherGrundauswahl_String[2] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst','Politikwissenschaft','Geschichte',
        'Geografie','Philosophie','Mathematik'];
        FaecherGrundauswahl_String[3] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst','Politikwissenschaft','Geschichte',
        'Geografie','Philosophie','Mathematik','Physik','Chemie','Biologie','Informatik'];
        FaecherGrundauswahl_String[4] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst','Politikwissenschaft','Geschichte',
        'Geografie','Philosophie','Mathematik','Physik','Chemie','Biologie','Informatik','Sport'];
        FaecherGrundauswahl_String[5] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst','Darstellendes Spiel',
        'Politikwissenschaft','Geschichte','Geografie','Philosophie','Mathematik',
        'Physik','Chemie','Biologie','Informatik','Sport'];
        Checkboxes_Klasse9_String = ['Französisch','Alt-Griechisch'];
        Checkboxes_Klasse10_String = ['Informatik'];
        SchulBeschreibung = "Philosophie im 2. Prüfungsfach wird zwar prinzipiell angeboten, kommt aber nur selten zustande.<br><br>Das Wahltool auf dieser Seite berücksichtigt nicht die Verpflichtungen, die sich für den altsprachlichen Bildungsgang in der Qualifikationsphase ergeben.";
    //3. Schule: Musikgymnasium Carl Philipp Emanuel Bach
    } else if (schule == 'Musikgymnasium Carl Philipp Emanuel Bach') {
        FaecherGrundauswahl_String[1] = ['Deutsch','Englisch','Mathematik'];
        FaecherGrundauswahl_String[2] = ['Musik'];
        FaecherGrundauswahl_String[3] = ['Politikwissenschaft','Geschichte'];
        FaecherGrundauswahl_String[4] = ['Deutsch','Englisch','Mathematik'];
        FaecherGrundauswahl_String[5] = ['Deutsch','Englisch','Französisch','Bildende Kunst',
        'Politikwissenschaft','Geschichte','Physik','Chemie','Biologie','Musik'];
        Checkboxes_Klasse9_String = [];
        Checkboxes_Klasse10_String = [];
        SchulBeschreibung = "Aus organisatorischen Gründen können Deutsch und Englisch im 1. und 4. Prüfungsfach nur mit Mathematik im jeweils anderen Prüfungsfach kombiniert werden.";
    //4. Schule: Test-Schule 3
    } else if (schule == 'Test-Schule 3') {
        FaecherGrundauswahl_String[1] = ['Deutsch','Englisch','Französisch','Latein',
        'Alt-Griechisch'];
        FaecherGrundauswahl_String[2] = ['Deutsch','Englisch','Französisch','Agrartechnik mit Biologie',
        'Alt-Griechisch','Musik','Mathematik','Bildende Kunst','Chemielabortechnik',
        'Technik und Management','Projektmanagement','Pädagogik'];
        FaecherGrundauswahl_String[3] = ['Deutsch','Englisch','Französisch','Hebräisch',
        'Alt-Griechisch','Musik','Bildende Kunst','Politikwissenschaft','Geschichte',
        'Geografie','Philosophie','Physik','Chemie','Biologie','Informatik'];
        FaecherGrundauswahl_String[4] = ['Gestaltungs- und Medientechnik','Bildende Kunst','Darstellendes Spiel','Sport'];
        FaecherGrundauswahl_String[5] = ['Deutsch','Englisch','Regenerative Energietechnik','Latein',
        'Alt-Griechisch','Musik','Bildende Kunst','Politikwissenschaft','Geschichte',
        'Geografie','Ernährung','Chemielabortechnik',
        'Technik und Management','Projektmanagement','Pädagogik'];
        Checkboxes_Klasse9_String = ['Pädagogik','Medizininformatik','Technische Informatik','Ernährung',
    'Agrartechnik mit Biologie','Biotechnologie'];
        Checkboxes_Klasse10_String = ['Informatik'];
        SchulBeschreibung = "Testschule3texxt";
    }
    //Übersetzen der Strings von FaecherGrundauswahl_String in FaecherGrundauswahl
    //Initialisierung
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        FaecherGrundauswahl[Pruefungsfach] = [];
        FaecherGrundauswahl[Pruefungsfach].length = FaecherMenge.length;
        for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
            FaecherGrundauswahl[Pruefungsfach][FachID] = false;
        }
    //Beschreibe
        for (let j = 0; j < FaecherGrundauswahl_String[Pruefungsfach].length; j++) {
            FaecherGrundauswahl[Pruefungsfach][FachZuID(FaecherGrundauswahl_String[Pruefungsfach][j])] = true;
        }
    }
    //Anpassen der Länge von FaecherZwischenspeicher an FaecherGrundauswahl und zurücksetzen
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        FaecherZwischenspeicher[Pruefungsfach] = [];
        FaecherZwischenspeicher[Pruefungsfach].length = FaecherGrundauswahl[Pruefungsfach].length;
        for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
        }
    }
    //Passe Checkboxlisten-Längen an und übersetze Checkboxes-Listen von String in FachIDs
    Checkboxes_Klasse9.length = Checkboxes_Klasse9_String.length;
    for (let i = 0; i < Checkboxes_Klasse9_String.length; i++) {
        Checkboxes_Klasse9[i] = FachZuID(Checkboxes_Klasse9_String[i]);
    }
    Checkboxes_Klasse10.length = Checkboxes_Klasse10_String.length;
    for (let i = 0; i < Checkboxes_Klasse10_String.length; i++) {
        Checkboxes_Klasse10[i] = FachZuID(Checkboxes_Klasse10_String[i]);
    }
    //Zurücksetzen von Pruefungsfaecher-Speicher
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        Pruefungsfaecher[Pruefungsfach] = -1;
    }
}

function FachCheckBoxesErzeugen() {
    //Erzeuge FachCheckBoxes, wenn es Fächer in den entsprechenden Listen gibt
    //für Checkboxes Klasse 9
    if (Checkboxes_Klasse9 != "") {
        let Klasse9 = document.getElementById("Checkboxes_Klasse9");
        Klasse9.classList.remove("hidden");
        let neuesElement = "<h3>Klasse 9</h3>";
        for (let FachID of Checkboxes_Klasse9) {
            let Fach = IDzuFach(FachID);
            neuesElement += '<input type=checkbox class="buttons active_buttons" name=' + "\'" + Fach + "9" + "\'" + " value=" + "\'" + Fach + "\'" + " id=" + "\'" + FachID + "ab9" + "\'" + " onchange='CheckboxKlasse9Change(value, checked);'><label class='checkboxlabels active_labels' for=" + "\'" + FachID + "ab9" + "\'" + ">" + Fach + "</label><br>";
        }
        Klasse9.insertAdjacentHTML('afterbegin', neuesElement);
        document.getElementById("Klassen_section").classList.remove("hidden");
    }
    //für Checkboxes Klasse 10
    if (Checkboxes_Klasse10 != "") {
        let Klasse10 = document.getElementById("Checkboxes_Klasse10");
        Klasse10.classList.remove("hidden");
        neuesElement = "<h3>Klasse 10</h3>";
        for (let FachID of Checkboxes_Klasse10) {
            let Fach = IDzuFach(FachID);
            neuesElement += '<input type=checkbox class="buttons active_buttons" name=' + "\'" + Fach + "\'" + " value=" + "\'" + Fach + "\'" + " id=" + "\'" + FachID + "ab10" + "\'" + " onchange='CheckboxKlasse10Change(value, checked);'><label class='checkboxlabels active_labels' for=" + "\'" + FachID + "ab10" + "\'" + ">" + Fach + "</label><br>";
        }
        Klasse10.insertAdjacentHTML('afterbegin', neuesElement);
        document.getElementById("Klassen_section").classList.remove("hidden");
    }
}

function PruefungsFormWechsel(value) {
    //Aufruf bei Betätigung der Radiobuttons zur Prüfungsform der 5. PK
    if (value == "BLL") {
        bll = true;
    } else {
        bll = false;
    }
    Pruefungsfaecher[5] = -1;
    document.getElementById("Combobox5").value = "";
    RegelCheck();
}

function FachZuID(Fach) {
    //Übersetze ein mitgegebenes Fach über das Array FaecherMenge von String zu der zugehörigen ID und gibt dies zurück
    for (let i = 0; i < FaecherMenge.length; i++) {
        if (FaecherMenge[i] == Fach) {
        return i;
        }
    }
}

function IDzuFach(FachID) {
    //Übersetze eine mitgegebene FachID über das Array FaecherMenge in das entsprechende Fach, was als String zurückgegeben wird
    return FaecherMenge[FachID];
}

function CheckboxKlasse9Change(Fach, checked) {
    //Falls Fach aus dieser Menge abgewählt wird (prinzipiell dürfen nur Fremdsprachen in dieser Menge stehen),
    //bedeutet das, dass es nach VO-GO § 23 Abs. 4 nicht mehr als 1. Prüfungsfach gewählt werden kann;
    //Es kann allerdings auch die Anforderungen nach VO-GO § 23 Abs. 5 mit einschließen.
    //Wenn dieses Fach nämlich auch in Checkboxes_Klasse10 steht und dort gecheckt ist, muss es bei unchecken von Kl.9
    //nur aus 1. PF gelöscht werden, bei ungecheckter Kl.10 aber aus allen Prüfungsfächern 1-4.
    //Steht das Fach nur in der Klasse9-Liste, muss es aus PF1-4 gelöscht werden.
    if (checked == false) {
        for (let j = 0; j < Checkboxes_Klasse10.length; j++) {
            if (FachZuID(Fach) == Checkboxes_Klasse10[j]) {
                if (document.getElementById(FachZuID(Fach) + "ab10").checked == true) {
                    if (IDzuFach(Pruefungsfaecher[1]) == Fach) {
                        let Element = document.getElementById("Combobox1");
                        Element.value = "";
                        Pruefungsfaecher[1] = -1;
                        RegelCheck();
                    }
                } else {
                    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
                        if (IDzuFach(Pruefungsfaecher[Pruefungsfach]) == Fach) {
                            let Element = document.getElementById("Combobox" + Pruefungsfach);
                            Element.value = "";
                            Pruefungsfaecher[Pruefungsfach] = -1;
                            RegelCheck();
                        }
                    }
                }
                return;
            }
        }
        for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
            if (IDzuFach(Pruefungsfaecher[Pruefungsfach]) == Fach) {
                let Element = document.getElementById("Combobox" + Pruefungsfach);
                Element.value = "";
                Pruefungsfaecher[Pruefungsfach] = -1;
                RegelCheck();
            }
        }
    }
}

function CheckboxKlasse10Change(Fach, checked) {
    //Bei Abwählen der Checkbox eines Faches aus der CheckBox-Klasse10-Liste erfüllt es nicht mehr VO-GO §23 Abs. 5,
    //und muss damit eigentlich falls angewählt aus PF1-4 gelöscht werden, außer es steht auch in der klasse-9-Liste.
    //Ist das Fach dort angewählt hat das Abwählen von Klasse 10 keinen Einfluss; ist das Fach jedoch bereits
    //unchecked, so muss das Fach auf PF1-4 gelöscht werden.
    if (checked == false) {
        for (let j = 0; j < Checkboxes_Klasse9.length; j++) {
            if ((FachZuID(Fach)) == (Checkboxes_Klasse9[j])) {
                if (document.getElementById(FachZuID(Fach) + "ab9").checked == false) {
                    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
                        if (IDzuFach(Pruefungsfaecher[Pruefungsfach]) == Fach) {
                            let Element = document.getElementById("Combobox" + Pruefungsfach);
                            Element.value = "";
                            Pruefungsfaecher[Pruefungsfach] = -1;
                            RegelCheck();
                        }
                    }
                }
                return;
            }
        }
        for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
            if (IDzuFach(Pruefungsfaecher[Pruefungsfach]) == Fach) {
                console.log('Check2');
                let Element = document.getElementById("Combobox" + Pruefungsfach);
                Element.value = "";
                Pruefungsfaecher[Pruefungsfach] = -1;
                RegelCheck();
            }
        }
    }
}

function RegelCheck() {
    //Überprüfe die Erfüllung der Regeln und stelle diese durch einen Aufruf von DestellungDerErfuelltenRegeln dar.
    RegelnErfuelltCheck();
    DarstellungDerErfuelltenRegeln();
}

function RegelnErfuelltCheck() {
    //Überprüft, welche der Regeln, die sich aus der VO-GO ergeben, bisher schon erfüllt sind.
    //TEST 1: Ist ein Leistungskurs aus Deutsch, Mathe, Fremdsprache oder Naturwissenschaft -> Vorgabe VO-GO § 23 Abs. 4
    LeistungsKursregelCheck = false;
    for (let Pruefungsfach = 1; Pruefungsfach < 3; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            for (let FachID of ([].concat(AF1_NurMaDeFS,[Mathematik,Physik,Chemie,Biologie]))) {
                if (Pruefungsfaecher[Pruefungsfach] == FachID) {
                    LeistungsKursregelCheck = true;
                    break;
                }
            }
        }
    }
    //TEST 2: Sind zwei PRUEFUNGSFAECHER (1-4) aus Deutsch, Fremdsprachen oder Mathe? -> Vorgabe VO-GO § 23 Abs. 2
    ZweiPruefungsfaecherRegelCheck = false;
    mathePF = false;
    deutschPF = false;
    sprachePF = false;
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            if (Pruefungsfaecher[Pruefungsfach] == Mathematik) {
                mathePF = true;
                break;
            }
        }   
    }
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            if (Pruefungsfaecher[Pruefungsfach] == Deutsch) {
                deutschPF = true;
                break;
            }
        }   
    }
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            for (let FachID of AF1_NurMaDeFS) {
                if (FachID != Deutsch) {
                    if (Pruefungsfaecher[Pruefungsfach] == FachID) {
                        sprachePF = true;
                        break;
                    }
                }
            }
        }
    }
    //Zusammenzählen, wieviele Bereiche aus Deutsch, FS und Mathe in den PF belegt sind
    AnzahlGewaehltAusMaDeFS = 0;
    if (mathePF == true) {
        AnzahlGewaehltAusMaDeFS++;
    }
    if (deutschPF == true) {
        AnzahlGewaehltAusMaDeFS++;
    }
    if (sprachePF == true) {
        AnzahlGewaehltAusMaDeFS++;
    }
    //Abschließender Test: min. 2 PF aus De, Ma, FS bedeuten: Regel  erfüllt
    if (AnzahlGewaehltAusMaDeFS >= 2) {
        ZweiPruefungsfaecherRegelCheck = true;
    }
    //TEST 3: Sind alle Aufgabenfelder abgedeckt? -> Vorgabe VO-GO § 23 Abs. 3
    AufgabenfelderRegel = false;
    AF1_belegt = false;
    AF2_belegt = false;
    AF3_belegt = false;
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            for (let FachID of ([].concat(AF1_NurMaDeFS,AF1_OhneMaDeFS))) {
                if (Pruefungsfaecher[Pruefungsfach] == FachID) {
                    AF1_belegt = true;
                    break;
                }
            }
        }
    }
    //2.AF testen
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            for (let FachID of AF2) {
                if (Pruefungsfaecher[Pruefungsfach] == FachID) {
                    AF2_belegt = true;
                    break;
                }
            }
        }
    }
    //3.AF testen
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            for (let FachID of ([].concat(AF3_NurMaDeFS,AF3_OhneMaDeFS))) {
                if (Pruefungsfaecher[Pruefungsfach] == FachID) {
                    AF3_belegt = true;
                    break;
                }
            }
        }
    }
    //Zusammenfassung für die AF-Belegt-Regel
    if (AF1_belegt == true && AF2_belegt == true && AF3_belegt == true) {
        AufgabenfelderRegel = true;
    }
    //TEST 4: Enthält max. eines der PF 3/4 ein Fach aus BK/Mu/DS/Sport? -> Vorgabe VO-GO § 23 Abs. 6
    EntspannteFaecherInDreiVier = 0;
    for (let Pruefungsfach = 3; Pruefungsfach < 5; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            for (let FachID of ([].concat(Kein_AF,AF1_OhneMaDeFS))) {
                if (Pruefungsfaecher[Pruefungsfach] == FachID) {
                    EntspannteFaecherInDreiVier++;
                }
            }
        }
    }
}

function DarstellungDerErfuelltenRegeln() {
    //Stelle durch Checken/Unchecken der Checkboxes im Gesetzestext dar, welche Anforderungen an
    //die Kurswahl zum aktuellen Zeitpunkt bereits erfüllt sind und welche nicht.
    //
    //folgende Zeilen sind auskommentiert, weil wir die Darstellung mit der Checkbox inkonsistent
    //mit den anderen Absätzen fanden.
    if (LeistungsKursregelCheck == true) {
        // document.getElementById("LeistungsKursregelCheckbox").checked = true;
    } else {
        // document.getElementById("LeistungsKursregelCheckbox").checked = false;
    }
    if (ZweiPruefungsfaecherRegelCheck == true) {
        document.getElementById("ZweiPruefungsfaecherRegelCheckbox").checked = true;
    } else {
        document.getElementById("ZweiPruefungsfaecherRegelCheckbox").checked = false;
    }
    if (AF1_belegt == true) {
        document.getElementById("AF1Checkbox").checked = true;
    } else {
        document.getElementById("AF1Checkbox").checked = false;
    }
    if (AF2_belegt == true) {
        document.getElementById("AF2Checkbox").checked = true;
    } else {
        document.getElementById("AF2Checkbox").checked = false;
    }
    if (AF3_belegt == true) {
        document.getElementById("AF3Checkbox").checked = true;
    } else {
        document.getElementById("AF3Checkbox").checked = false;
    }
    if (AufgabenfelderRegel == true) {
        document.getElementById("AufgabenfelderRegelCheckbox").checked = true;
    } else {
        document.getElementById("AufgabenfelderRegelCheckbox").checked = false;
    }
}

function MengenDefinieren() {
    //Definiere Teilmengen der Gesamtheit an Fächern, die sich aus den gesetzlichen Bestimmungen zur 
    //Prüfungsfachwahl ergeben -> VO-GO § 23 Abs. 2 (ZweiPFRegel) und Abs. 3 (AufgabenfelderRegel).
    //Unterscheide somit nach Zugehörigkeit zu Aufgabenfeldern 1, 2 und 3 bzw. ohne Zuordnung (Sport)
    //und zusätzlich nach Zugehörigkeit zu jenen Fächern, die § 23 Abs. 2 erfüllen (De,FS und Ma).
    //Übersetze diese Arrays am Ende noch von String-Arrays in Integer-Arrays, welche dann die FachIDs beinhalten.
    let Kein_AF_String,AF1_OhneMaDeFS_String,AF1_NurMaDeFS_String,AF2_String,AF3_OhneMaDeFS_String,AF3_NurMaDeFS_String = [];
    //Ohne Aufgabenfeld-Zuordnung
    Kein_AF_String = ['Sport'];
    //Aufgabenfeld 1 (sprachlich-literarisch-künstlerisches Aufgabenfeld)
    AF1_NurMaDeFS_String = ['Deutsch','Englisch','Französisch','Italienisch','Spanisch',
    'Polnisch','Russisch','Türkisch','Japanisch','Chinesisch',
    'Latein','Alt-Griechisch','Neu-Griechisch','Hebräisch','Portugiesisch'];
    AF1_OhneMaDeFS_String = ['Musik','Bildende Kunst','Darstellendes Spiel'];
    //Aufgabenfeld 2 (gesellschaftswissenschaftliches Aufgabenfeld)
    AF2_String = ['Politikwissenschaft','Geschichte','Geografie','Sozialwissenschaften',
    'Psychologie','Philosophie','Recht','Wirtschaftswissenschaft',
    /*nun noch für berufl. Gymn.*/'Rechnungswesen und Controlling','Volks- und Betriebswirtschaftslehre',
    'Projektmanagement','Pädagogik'];
    //Aufgabenfeld 3 (mathematisch-naturwissenschaftlich-technisches Aufgabenfeld)
    AF3_NurMaDeFS_String = ['Mathematik'];
    AF3_OhneMaDeFS_String = ['Physik','Chemie','Biologie','Informatik',
    /*nun noch für berufl. Gymn.*/'Wirtschaftsinformatik','Bautechnik','Biologielabortechnik',
    'Chemielabortechnik','Chemietechnik','Elektrotechnik','Gestaltungs- und Medientechnik',
    'Informationstechnik','Mechatronik','Medientechnik','Medizintechnik','Metalltechnik/ Maschinenbau',
    'Physiklabortechnik','Physiktechnik','Regenerative Energietechnik','Technik und Management',
    'Umwelttechnik','Gesundheit','Gestaltung','Medizininformatik','Technische Informatik','Ernährung',
    'Agrartechnik mit Biologie','Biotechnologie'];
    //Übersetzen der Strings in Integer-Arrays
    Kein_AF = SchreibeZuArray(Kein_AF_String);
    AF1_NurMaDeFS = SchreibeZuArray(AF1_NurMaDeFS_String);
    AF1_OhneMaDeFS = SchreibeZuArray(AF1_OhneMaDeFS_String);
    AF2 = SchreibeZuArray(AF2_String);
    AF3_NurMaDeFS = SchreibeZuArray(AF3_NurMaDeFS_String);
    AF3_OhneMaDeFS = SchreibeZuArray(AF3_OhneMaDeFS_String);
}

function SchreibeZuArray(StringArray){
    //Übersetze das mitgegebene Array, welches Fächer als Strings enthält in eines, welches die zugehörigen
    //FachIDs enthält, und gebe dieses zurück.
    IntegerArray = [];
    IntegerArray.length = StringArray.length;
    for (let i = 0; i < StringArray.length; i++) {
        IntegerArray[i] = FachZuID(StringArray[i]);
    }
    return IntegerArray;
}

function PruefungsfachClick(Pruefungsfach, Element) {
    //Aufruf bei Klick auf eine Combobox der Prüfungsfächer 1-4 bzw. 5. Prüfungskomponente
    //Lösche das enthaltene Fach raus, setze den Prüfungsfaecher-Speicher des Faches zurück,
    //rufe Regelcheck und RegelAnwendung auf, trage die verbleibenden Fächer in die Combobox ein
    //und ruft die Funktion auf, die einen Alarm bei keinen verbleibenden Wahlmöglichkeiten gibt
    if (wurde_geaendert == false) {
        Element.textContent = '';
        Pruefungsfaecher[Pruefungsfach] = -1;
        RegelCheck();
        RegelAnwendung();
        FaecherInComboBoxesEintragen(Pruefungsfach, Element);
        Element.value = "";
        AlarmBeiUnvollstaendigerWahl(Pruefungsfach);
    } else {
        wurde_geaendert = false;
    }
}

function AlarmBeiUnvollstaendigerWahl(Pruefungsfach) {
    //Gib einen Alarm, falls keine Fächer mehr eingefügt werden können, falls es also keinen Wahlmöglichkeiten
    //mehr für dieses Prüfungsfach gibt, was eigentlich nicht passieren sollte!
    let counter = 0;
    for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
            counter++;
        }
    }
    if (counter == 0) {
        setTimeout(function(){ alert('Es scheint für dieses Prüfungsfach keine verbliebenen Fächer zur Auswahl zu geben.\nIrgendetwas ist schiefgelaufen, das sollte nicht passieren.\nVielleicht musst Du noch einige Fächer ab Klasse 9 oder 10 als belegt markieren?'); }, 200);
    }
}

function PruefungsfachChange(Pruefungsfach, Fach, Browser) {
    //Aufruf, wenn ein neues Fach in einem Prüfungsfach/der 5.PK angeklickt wird
    //Speichere das Fach in Pruefungsfaecher, mach den Regelcheck und rufe die Funktion auf, die einen Alarm
    //gibt, falls die Wahl vollständig, aber leider ungültig ist.
    if (Browser == "Firefox") {
        wurde_geaendert = true;
    }
    Pruefungsfaecher[Pruefungsfach] = FachZuID(Fach);
    RegelCheck();
    AlarmBeiUngueltigerWahl();
}

function AlarmBeiUngueltigerWahl() {
    //Falls die Wahl vollständig ist, rufe noch zusätzlich zwei Funktionen auf, die überprüfen, ob evtl.
    //vorhandene schulspezifische Regeln erfüllt wurden und ob Fächer unzulässigerweise mehrmals belegt wurden.
    //Falls irgendeine Regel nicht erfüllt ist, gib einen Alarm.
    let counter = 0;
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1) {
            counter++;
        }
    }
    if (counter == 5) {
        let SchulEigenRegelnErfuellt = SchuleigeneRegelnCheck();
        let fachmehrmals = MehrfachbelegungsCheck();
        if (fachmehrmals == true || SchulEigenRegelnErfuellt == false || ZweiPruefungsfaecherRegelCheck == false || AufgabenfelderRegel == false || LeistungsKursregelCheck == false || EntspannteFaecherInDreiVier > 1) {
            setTimeout(function(){ alert('Die Wahl scheint leider ungültig zu sein!\nIrgendetwas ist schiefgelaufen.'); }, 500);
        }
    }
}

function FaecherInComboBoxesEintragen(Pruefungsfach, Element) {
    //Trage alle Fächer aus dem FaecherZwischenspeicher, die noch wählbar sind in die entsprechende Combobox ein
    let neuesElement = [];
    for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
            let Fach = IDzuFach(FachID);
            neuesElement += "<option id=" + '\"' + Fach + '\"' + " value=" + '\"' + Fach + '\"' + ">" +  Fach + "</option>";
        }
    }
    Element.insertAdjacentHTML('afterbegin', neuesElement);
}

function RegelAnwendung() {
    //Diese Funktion soll während der Wahl der Prüfungsfächer garantieren, dass alle Regeln aus der VO-GO
    //für die weitere Wahl eingehalten werden. Sie analysiert die verbleibenden Wahlmöglichkeiten und
    //löscht, falls es zu eng wird mit den verbleibenden Fächern, jene raus, die zu einer ungültigen Wahl führen
    //würden.
    //Ablauf: Zwischenspeicher über Grundspeicher zurücksetzen, Nicht gehabte Fächer rauslöschen (gemäß
    //Checkboxes ab Klasse 9 oder 10), angewählte Fächer aus den anderen als Wahlmöglichkeit rauslöschen
    //(Ausnahme für BLL), Schuleigene Regeln anwenden und §23 Abs. 6 umsetzen, das heißt nur ein Fach von
    //Mu/BK/DS/Sp darf in PF3 oder PF4 gewählt werden, außerdem die SonderregelEinFach aufrufen, die sicherstellt,
    //dass wenn nur noch ein verbleibendes Fach in einem Prüfungsfach gewählt werden kann, das das sonst überall
    //rausgelöscht wird, damit es dort nicht "weggewählt" wird.
    //Dann werden die weiteren Regeln in einer while-Schleife durchlaufen, bis keine Regel mehr Fächer rauslöscht.
    //Die Regeln sind die ZweiprüfungsfächerRegel zur Erfüllung von VO-GO § 23 Abs. 2, die AufgabenfelderRegeln
    //nach Abs. 3 und die gemeinsame Anwendung dieser Regeln in RegelzusammenspielBeschneidung.
    //Geplant ist noch, die Regeln in beliebiger Kombination anzuwenden, um sicherzustellen, dass mit jeder
    //Schul-FächerGrundauswahl korrekt umgegangen wird. Wird vermutlich leider sehr viel weniger performant werden.
    ZwischenspeicherZuruecksetzen();
    LoescheNichtGehabteFaecher();
    EinfachbelegungUmsetzen();
    SchuleigeneRegelnAnwendung();
    EntspannteFaecherBegrenzung();
    SonderregelEinFach();
    //Funktionen, die nur aufgerufen werden müssen, wenn Regeln noch nicht erfüllt sind
    if (ZweiPruefungsfaecherRegelCheck == false || AufgabenfelderRegel == false || EntspannteFaecherInDreiVier != 0) {
        let changed = 1;
        while (changed > 0) {
            changed = 0;
            changed = changed + SonderregelEinFach();
            changed = changed + ZweiPruefungsfaecherRegel();
            changed = changed + AF1Regel();
            changed = changed + AF2Regel();
            changed = changed + AF3Regel();
            changed = changed + RegelzusammenspielBeschneidung();
        }
    }
}

function ZwischenspeicherZuruecksetzen() {
    //Setze den FaecherZwischenspeicher auf den Stand der FaecherGrundauswahl zurück
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
            FaecherZwischenspeicher[Pruefungsfach][FachID] = FaecherGrundauswahl[Pruefungsfach][FachID];
        }
    }
}

function LoescheNichtGehabteFaecher() {
    //Lösche Fächer, die als Checkboxes über den Comboboxes dargestellt werden und unchecked sind, raus.
    //Wenn ein Fach als Checkbox ab Kl.9 unchecked ist, hängt es von dem Vorkommen in Kl.10 ab, ob das Fach
    //nur in PF 1 rausgelöscht wird oder ob es komplett aus PF1-4 gelöscht wird -> Erfüllung VO-GO § 23 Abs. 4-5
    //Eine ähnliche Fallunterscheidung wird gemacht, wenn von der Checkbox ab Kl. 10 ausgegangen wird.
    //checkbox ab Klasse 9 unchecked:
    for (let FachID of Checkboxes_Klasse9) {
        if (document.getElementById(FachID + "ab9").checked == false) {
            let gefundenInKlasse10 = false;
            for (let j = 0; j < Checkboxes_Klasse10.length; j++) {
                if (FachID == Checkboxes_Klasse10[j]) {
                    gefundenInKlasse10 = true;
                    FaecherZwischenspeicher[1][FachID] = false;
                    break;
                }
            }
            if (gefundenInKlasse10 == false) {
                for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
                    FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                }
            }
        }
    }
    //checkbox ab Klasse 10 unchecked:
    for (let FachID of Checkboxes_Klasse10) {
        if (document.getElementById(FachID + "ab10").checked == false) {
            let gefundenInKlasse9 = false;
            for (let j = 0; j < Checkboxes_Klasse9.length; j++) {
                if (FachID == Checkboxes_Klasse9[j]) {
                    gefundenInKlasse9 = true;
                    if (document.getElementById(FachID + "ab9").checked == false) {
                        for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
                            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                        }
                    }
                    break;
                }
            }
            if (gefundenInKlasse9 == false) {
                for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
                    FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                }
            }
        }
    }
}

function EinfachbelegungUmsetzen() {
    //Wenn ein Fach als Prüfungsfach oder 5. PK gewählt wurde, kann es woanders nicht mehr gewählt werden
    //unter Ausnahme der BLL in der 5. PK.
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] != -1 && (Pruefungsfach != 5 || bll == false)) {
            for (let counter = 1; counter < 6; counter++) {
                if (counter != Pruefungsfach && (counter != 5 || bll == false)) {
                    FaecherZwischenspeicher[counter][Pruefungsfaecher[Pruefungsfach]] = false;
                }
            }
        }
    }
}


function SchuleigeneRegelnAnwendung() {
    //Hier finden Regeln ihren Platz, die nicht in der VO-GO definiert sind, sondern schulspezifisch sind
    if (schule == "Musikgymnasium Carl Philipp Emanuel Bach") {
        if (Pruefungsfaecher[1] == Deutsch || Pruefungsfaecher[1] == Englisch) {
            FaecherZwischenspeicher[4][Deutsch] = false;
            FaecherZwischenspeicher[4][Englisch] = false;
        } else if (Pruefungsfaecher[4] == Deutsch || Pruefungsfaecher[4] == Englisch) {
            FaecherZwischenspeicher[1][Deutsch] = false;
            FaecherZwischenspeicher[1][Englisch] = false;
        }
    }
}

function SonderregelEinFach() {
    //Wenn in einem Prüfungsfach/5. PK nur noch ein Fach zur Wahl steht, muss dieses überall sonst rausgelöscht
    //werden, damit es dort nicht "weggewählt" wird. Ausnahme: BLL in 5. PK
    let FachIDstorage = -1;
    ErfuellbarkeitsCheck();
    let cash = 0;
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        let fachzaehler = 0;
        if (Pruefungsfaecher[Pruefungsfach] == -1) {
            for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
                if (fachzaehler < 2) {  //ab zwei wählbaren Fächern in einem Prüfungsfach muss diese Regel nicht mehr greifen; hier also aus Effizienzgründen eingebaut
                    if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                        fachzaehler++;
                        FachIDstorage = FachID;
                    }
                }
            }
        }
        if (fachzaehler == 1) {
            for (let counter = 1; counter < 6; counter++) {
                if (Pruefungsfaecher[counter] == -1) {
                    if (counter != Pruefungsfach && (counter != 5 || bll == false)) {
                        if (FaecherZwischenspeicher[counter][FachIDstorage] == true) {
                            FaecherZwischenspeicher[counter][FachIDstorage] = false;
                            cash = 1;
                        }
                    }
                }
            }
        }
    }
    return cash;
}

function ErfuellbarkeitsCheck() {
    //Analysiert den FaecherZwischenspeicher in den noch nicht gewählten PF/5.PK auf die Möglichkeiten
    //hinsichtlich ihrer Belegbarkeit und Erfüllung von Regeln; speichere die Ergebnisse in vielen globalen
    //Variablen ab, um dann in den verschiedenen Regeln Anwendung zu finden.
    //
    //Initialisiere ErfuellbarkeitsArray
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        ErfuellbarkeitsArray[Pruefungsfach] = [];
        for (let j = 1; j < 6; j++) {
            ErfuellbarkeitsArray[Pruefungsfach][j] = false;
        }
    }
    //Belege ErfuellbarkeitsArray, es enthält für alle unbelegten Prüfungsfaecher (1-5) im 1. Eintrag die Belegbarkeit von AF1_NurMaDeFS, im 2. von AF1_OhneMaDeFS, im 3. von AF2, im 4. von AF3_NurMaDeFS und im 5. von AF3_OhneMaDeFS
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] == -1) {
            for (let FachID of AF1_NurMaDeFS) {
                if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                    ErfuellbarkeitsArray[Pruefungsfach][1] = true;
                    break;
                }
            }
            for (let FachID of AF1_OhneMaDeFS) {
                if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                    ErfuellbarkeitsArray[Pruefungsfach][2] = true;
                    break;
                }
            }
            for (let FachID of AF2) {
                if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                    ErfuellbarkeitsArray[Pruefungsfach][3] = true;
                    break;
                }
            }
            for (let FachID of AF3_NurMaDeFS) {
                if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                    ErfuellbarkeitsArray[Pruefungsfach][4] = true;
                    break;
                }
            }
            for (let FachID of AF3_OhneMaDeFS) {
                if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                    ErfuellbarkeitsArray[Pruefungsfach][5] = true;
                    break;
                }
            }
        }
    }
    //Initialisiere DeFSMaArray
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        DeFSMaArray[Pruefungsfach] = [];
        for (let j = 1; j < 4; j++) {
            DeFSMaArray[Pruefungsfach][j] = false;
        }
    }
    //Das DeFSMaArray hat im 1. Eintrag die Belegbarkeit von Deutsch, im 2. die von Fremdsprachen und im 3. die von Mathe
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] == -1) {
            if (FaecherZwischenspeicher[Pruefungsfach][Deutsch] == true) {
                DeFSMaArray[Pruefungsfach][1] = true;
            }
            for (let FachID of AF1_NurMaDeFS) {
                if (FachID != Deutsch) {
                    if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                        DeFSMaArray[Pruefungsfach][2] = true;
                        break;
                    }
                }
            }
            if (FaecherZwischenspeicher[Pruefungsfach][Mathematik] == true) {
                DeFSMaArray[Pruefungsfach][3] = true;
            }
        }
    }
    //ZusammenfassungErfuellbarkeitsArray hat im 1. Eintrag die Anzahl freier PFs mit Fächern aus dem 1. AF zur Auswahl stehen; der zweite Eintrag das 2.AF, der dritte das 3.AF und der 4. die aus Deutsch, Mathe, Fremdsprachen
    for (let j = 1; j < 5; j++) {
        ZusammenfassungErfuellbarkeitsArray[j] = 0;
    }
    //Belegbarkeit von Aufgabenfeldern zusammenfassen
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (ErfuellbarkeitsArray[Pruefungsfach][1] == true || ErfuellbarkeitsArray[Pruefungsfach][2] == true) {
            ZusammenfassungErfuellbarkeitsArray[1]++;
        }
        if (ErfuellbarkeitsArray[Pruefungsfach][3] == true) {
            ZusammenfassungErfuellbarkeitsArray[2]++;
        }
        if (ErfuellbarkeitsArray[Pruefungsfach][4] == true || ErfuellbarkeitsArray[Pruefungsfach][5] == true) {
            ZusammenfassungErfuellbarkeitsArray[3]++;
        }
    }
    //Erfüllbarkeit der Regel zu Ma/De/FS in PF 1-4 zusammenfassen
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        if (DeFSMaArray[Pruefungsfach][1] == true || (DeFSMaArray[Pruefungsfach][2] == true && sprachePF == false) || DeFSMaArray[Pruefungsfach][3] == true) {
            ZusammenfassungErfuellbarkeitsArray[4]++;
        }
    }
}

function ZweiPruefungsfaecherRegel(){
    //Diese Regel soll die Erfüllung von VO-GO § 23 Abs. 2 sicherstellen.
    ErfuellbarkeitsCheck();
    let cash = 0;
    //Weitere Informationen sammeln für ZweiPrüfungsfächerRegel 
    let DeutschAlsXWaehlbar = false;
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] == -1) {
            if (DeFSMaArray[Pruefungsfach][1] == true) {
                DeutschAlsXWaehlbar = true;
                break;
            }
        }
    }
    let MatheAlsXWaehlbar = false;
    for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] == -1) {
            if (DeFSMaArray[Pruefungsfach][3] == true) {
                MatheAlsXWaehlbar = true;
                break;
            }
        }
    }
    let nochNuetzlicheWaehlbareXMengen = 0;
    for (let j = 1; j < 4; j++) {
        if (j != 2 || sprachePF ==  false) {
            for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
                if (Pruefungsfaecher[Pruefungsfach] == -1) {
                    if (DeFSMaArray[Pruefungsfach][j] == true) {
                        nochNuetzlicheWaehlbareXMengen++;
                        break;
                    }
                }
            }
        }
    }
    //AnzahlAlsXWaehlbareSprachen speichert auf dem ersten Speicherplatz die Anzahl, auf dem zweiten die FachID der letzten untersuchten Sprache
    let AnzahlAlsXWaehlbareSprachen = [0,-1];
    for (let FachID of AF1_NurMaDeFS) {
        if (FachID != Deutsch) {
            for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
                if (Pruefungsfaecher[Pruefungsfach] == -1) {
                    if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                        AnzahlAlsXWaehlbareSprachen[0]++;
                        AnzahlAlsXWaehlbareSprachen[1] = FachID;
                        break;
                    }
                }
            }
        }
    }
    if ((ZweiPruefungsfaecherRegelCheck == false) && (AnzahlGewaehltAusMaDeFS + nochNuetzlicheWaehlbareXMengen < 3)) {
        //Falls man noch genau die X-Mengen braucht, die es gibt, und nur eine Sprache zur Wahl steht oder es sich um Ma oder De handelt, muss man sicherstellen, dass dieses Fach nicht als 5. PK weggewählt wird
        if (Pruefungsfaecher[5] == -1 && bll == false) {
            if (DeutschAlsXWaehlbar == true) {
                if (FaecherZwischenspeicher[5][Deutsch] == true) {
                    FaecherZwischenspeicher[5][Deutsch] = false;
                    cash = 1;
                    // console.log('ZweiPFRegelAufruf0');
                }
            }
            if (MatheAlsXWaehlbar == true) {
                if (FaecherZwischenspeicher[5][Mathematik] == true) {
                    FaecherZwischenspeicher[5][Mathematik] = false;
                    cash = 1;
                    // console.log('ZweiPFRegelAufruf0');
                }
            }
            if (sprachePF == false) {
                if (AnzahlAlsXWaehlbareSprachen[0] == 1) {
                    if (FaecherZwischenspeicher[5][AnzahlAlsXWaehlbareSprachen[1]] == true) {
                        FaecherZwischenspeicher[5][AnzahlAlsXWaehlbareSprachen[1]] = false;
                        cash = 1;
                        // console.log('ZweiPFRegelAufruf0');
                    }
                }
            }
        } 
        //Falls man alle X-Mengen braucht, die es zur Auswahl gibt, und eine der X-Mengen nur in einem PF wählbar ist, muss dort diese X-Menge erzwungen werden  
        for (let j = 1; j < 4; j++) {
            let counter = [0,-1];
            for (let Pruefungsfach = 1;Pruefungsfach < 5;Pruefungsfach++) {
                if (DeFSMaArray[Pruefungsfach][j] == true) {
                    counter[0]++;
                    counter[1] = Pruefungsfach;
                }
            }
            if (counter[0] == 1) {
                if (j == 1) {
                    for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
                        if (FachID != Deutsch) {
                            if (FaecherZwischenspeicher[counter[1]][FachID] == true) {
                                FaecherZwischenspeicher[counter[1]][FachID] = false;
                                cash = 1;
                                // console.log('ZweiPFRegelAufruf0');
                            }
                        }
                    }
                } else if (j == 2) {
                    if (sprachePF == false) {
                        for (let FachID of ([].concat(Kein_AF,AF1_OhneMaDeFS,AF2,AF3_OhneMaDeFS,AF3_NurMaDeFS,[Deutsch]))) {
                            if (FaecherZwischenspeicher[counter[1]][FachID] == true) {
                                FaecherZwischenspeicher[counter[1]][FachID] = false;
                                cash = 1;
                                // console.log('ZweiPFRegelAufruf0');
                            }
                        }
                    }
                } else if (j == 3) {
                    for (let FachID = 0; FachID < FaecherMenge.length; FachID++) {
                        if (FachID != Mathematik) {
                            if (FaecherZwischenspeicher[counter[1]][FachID] == true) {
                                FaecherZwischenspeicher[counter[1]][FachID] = false;
                                cash = 1;
                                // console.log('ZweiPFRegelAufruf0');
                            }
                        }
                    }
                }
            }
        }
    }
    if ((ZweiPruefungsfaecherRegelCheck == false) && (AnzahlGewaehltAusMaDeFS + ZusammenfassungErfuellbarkeitsArray[4] == 2)) {
        for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {   //nur Zurechtschneiden der Fächerauswahl in den Prüfungsfaechern (1-4). Nicht in der 5. PK!
            if (Pruefungsfaecher[Pruefungsfach] == -1) {
                if (DeFSMaArray[Pruefungsfach][1] == true || (DeFSMaArray[Pruefungsfach][2] == true && sprachePF == false) || DeFSMaArray[Pruefungsfach][3] == true) {
                    for (let FachID of ([].concat(Kein_AF,AF1_OhneMaDeFS,AF2,AF3_OhneMaDeFS))) {
                        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                            cash = 1;
                            // console.log('ZweiPFRegelAufruf1');
                        }
                    }
                    if (sprachePF == true) {
                        for (let FachID of AF1_NurMaDeFS) {
                            if (FachID != Deutsch) {
                                if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                    FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                    cash = 1;
                                    // console.log('ZweiPFRegelAufruf2');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return cash;
}

function AF1Regel() {
    //Diese Regel soll die Erfüllung von VO-GO § 23 Abs. 3 sicherstellen hinsichtlich des Aufgabenfeldes 1.
    ErfuellbarkeitsCheck();
    let cash = 0;
    if (AF1_belegt == false && ZusammenfassungErfuellbarkeitsArray[1] == 1) {
        for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
            if (Pruefungsfaecher[Pruefungsfach] == -1) {
               if (ErfuellbarkeitsArray[Pruefungsfach][1] == true || ErfuellbarkeitsArray[Pruefungsfach][2] == true) {
                    for (let FachID of ([].concat(Kein_AF,AF2,AF3_NurMaDeFS,AF3_OhneMaDeFS))) {
                        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                           FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                            cash = 1;
                            // console.log('AF1RegelAufruf');
                        }
                    }
                    break;
                }
            }
        }
    }
    return cash;
}

function AF2Regel() {
    //Diese Regel soll die Erfüllung von VO-GO § 23 Abs. 3 sicherstellen hinsichtlich des Aufgabenfeldes 2.
    ErfuellbarkeitsCheck();
    let cash = 0;
    if (AF2_belegt == false && ZusammenfassungErfuellbarkeitsArray[2] == 1) {
        for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
            if (Pruefungsfaecher[Pruefungsfach] == -1) {
                if (ErfuellbarkeitsArray[Pruefungsfach][3] == true) {
                    for (let FachID of ([].concat(Kein_AF,AF1_NurMaDeFS,AF1_OhneMaDeFS,AF3_NurMaDeFS,AF3_OhneMaDeFS))) {
                        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                            cash = 1;
                            // console.log('AF2RegelAufruf');
                        }
                    }
                    break;
                }
            }
        }
    }
    return cash;
}

function AF3Regel() {
    //Diese Regel soll die Erfüllung von VO-GO § 23 Abs. 3 sicherstellen hinsichtlich des Aufgabenfeldes 3.
    ErfuellbarkeitsCheck();
    let cash = 0;
    if (AF3_belegt == false && ZusammenfassungErfuellbarkeitsArray[3] == 1) {
        for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
            if (Pruefungsfaecher[Pruefungsfach] == -1) {
                if (ErfuellbarkeitsArray[Pruefungsfach][4] == true || ErfuellbarkeitsArray[Pruefungsfach][5] == true) {
                    for (let FachID of ([].concat(Kein_AF,AF1_NurMaDeFS,AF1_OhneMaDeFS,AF2))) {
                        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                            cash = 1;
                            // console.log('AF3RegelAufruf');
                        }
                    }
                    break;
                }
            }
        }
    }
    return cash;
}

function EntspannteFaecherBegrenzung() {
    //Diese Regel soll die Erfüllung von VO-GO § 23 Abs. 6 sicherstellen (nur 1 Fach von Mu/BK/DS/Sp unter PF3/4).
    ErfuellbarkeitsCheck();
    let cash = 0;
    if (EntspannteFaecherInDreiVier != 0) {
        for (let FachID of ([].concat(Kein_AF,AF1_OhneMaDeFS))) {
            if (Pruefungsfaecher[3] != -1) {
                if (Pruefungsfaecher[3] == FachID) {
                    for (let counter of ([].concat(Kein_AF,AF1_OhneMaDeFS))) {
                        if (FaecherZwischenspeicher[4][counter] == true) {
                            FaecherZwischenspeicher[4][counter] = false;
                            cash = 1;
                            // console.log('EntspFaecherBegrAufruf1');
                        }
                    }
                    break;
                }
            }
            if (Pruefungsfaecher[4] != -1) {
                if (Pruefungsfaecher[4] == FachID) {
                    for (let counter of ([].concat(Kein_AF,AF1_OhneMaDeFS))) {
                        if (FaecherZwischenspeicher[3][counter] == true) {
                            FaecherZwischenspeicher[3][counter] = false;
                            cash = 1;
                            // console.log('EntspFaecherBegrAufruf2');
                        }
                    }
                    break;
                }
            }
        }
    }
    return cash;
}

function RegelzusammenspielBeschneidung() {
    //Diese Regel betrachtet die ZweiPFRegel und AF-Regel zusammen (VO-GO § 23 Abs. 2 und 3) und soll deren
    //gemeinsame Erfüllung sicherstellen.
    //Dafür muss explizit auf Teilmengen, wie Ma/De und FS eingegangen werden,
    //die sowohl ein AF abdecken können, als auch die Anforderungen der ZweiPFRegel erfüllen können.
    ErfuellbarkeitsCheck;
    //Vorbereitung der Kombinationsregel
    let cash = 0;
    freiePF = 0;
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] == -1) {
            freiePF++;
        }
    }
    let benoetigteX = 0;
    if (AnzahlGewaehltAusMaDeFS < 2) {
        benoetigteX = 2 - AnzahlGewaehltAusMaDeFS;
    }
    let benoetigteAF = 3;
    if (AF1_belegt == true) {
        benoetigteAF--;
    }
    if (AF2_belegt == true) {
        benoetigteAF--;
    }
    if (AF3_belegt == true) {
        benoetigteAF--;
    }
    let EinsafxChance = false;
    let DreiafxChance = false;
    let EinsUndDreiAfxZusammen = false;
    if (AF1_belegt == false && AF3_belegt == true && benoetigteX > 0) {
        for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
            if (ErfuellbarkeitsArray[Pruefungsfach][1] == true) {
                EinsafxChance = true;
                break;
            }
        }
    }
    if (AF1_belegt == true && AF3_belegt == false && benoetigteX > 0) {
        for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
            if (ErfuellbarkeitsArray[Pruefungsfach][4] == true) {
                DreiafxChance = true;
                break;
            }
        }
    }
    if (AF1_belegt == false && AF3_belegt == false && benoetigteX > 0) {
        let Einsafxanzahl = 0;
        let Dreiafxanzahl = 0;
        for (let j = 1; j < 5; j++) {
            if (DeFSMaArray[j][1] == true || DeFSMaArray[j][2] == true) {
                Einsafxanzahl++;
            }
            if (DeFSMaArray[j][3] == true) {
                Dreiafxanzahl++;
            }
        }
        if (Einsafxanzahl == 1 && Dreiafxanzahl != 1) {
            EinsafxChance = true;
            if (Dreiafxanzahl > 1) {
                DreiafxChance = true;
            }
        }
        if (Einsafxanzahl != 1 && Dreiafxanzahl == 1) {
            DreiafxChance = true;
            if (Einsafxanzahl > 1) {
                EinsafxChance = true;
            }
        }
        if (Einsafxanzahl > 1 && Dreiafxanzahl > 1) {
            EinsafxChance = true;
            DreiafxChance = true;
        }
        if (Einsafxanzahl == 0 && Dreiafxanzahl != 0) {
            DreiafxChance = true;
        }
        if (Einsafxanzahl != 0 && Dreiafxanzahl == 0) {
            EinsafxChance = true;
        }
        if (Einsafxanzahl == 1 && Dreiafxanzahl == 1) {
            for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
                if (ErfuellbarkeitsArray[Pruefungsfach][1] != ErfuellbarkeitsArray[Pruefungsfach][4]) {
                    EinsafxChance = true;
                    DreiafxChance = true;
                    break;
                }
                if (ErfuellbarkeitsArray[Pruefungsfach][1] == true && ErfuellbarkeitsArray[Pruefungsfach][4] == true) {
                    EinsafxChance = true;
                    DreiafxChance = true;
                    EinsUndDreiAfxZusammen = true;
                    break;
                }
            }
        }
    }
    let moeglicheAFXKombi = 0;
    if (EinsafxChance == true) {
        moeglicheAFXKombi++;
    }
    if (DreiafxChance == true) {
        moeglicheAFXKombi++;
    }
    if (EinsUndDreiAfxZusammen == true) {
        moeglicheAFXKombi = 1;
    }
    //unbrauchbare Felder zählen, die nicht mehr zu Erfüllung irgendwelcher Belegregeln in den PF1-5 beitragen können
    let unbrauchbareFelder = [];
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        unbrauchbareFelder[Pruefungsfach] = false;
    }
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (Pruefungsfaecher[Pruefungsfach] == -1) {
            if ((AF1_belegt == false && ErfuellbarkeitsArray[Pruefungsfach][1] == false/*nicht das hier,weil man eh gezwungen ist mit De oder FS das AF1 zu belegen: && ErfuellbarkeitsArray[Pruefungsfach][2] == false*/) || AF1_belegt == true) {
                if ((AF2_belegt == false && ErfuellbarkeitsArray[Pruefungsfach][3] == false) || AF2_belegt == true) {
                    if ((AF3_belegt == false && ErfuellbarkeitsArray[Pruefungsfach][4] == false && ErfuellbarkeitsArray[Pruefungsfach][5] == false) || AF3_belegt == true) {
                        if (ZweiPruefungsfaecherRegelCheck == false && (Pruefungsfach == 5 || (DeFSMaArray[Pruefungsfach][1] == false && DeFSMaArray[Pruefungsfach][2] == false && DeFSMaArray[Pruefungsfach][3] == false)) || ZweiPruefungsfaecherRegelCheck == true) {
                            unbrauchbareFelder[Pruefungsfach] = true;
                        }
                    }
                }
            }
        }
    }
    let anzahlUnbrauchbarerFelder = 0;
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        if (unbrauchbareFelder[Pruefungsfach] == true) {
            anzahlUnbrauchbarerFelder++;
        }
    } 
    //Hier erst Start der Umsetzung der Kombinationsregel
    if (freiePF - anzahlUnbrauchbarerFelder == benoetigteX + benoetigteAF - moeglicheAFXKombi) {
    //erstmal nur für die Prüfungfächer (1-4). Die 5. PK kann keine nicht die Regel zur den X-Fächern erfüllen.
        for (let Pruefungsfach = 1; Pruefungsfach < 5; Pruefungsfach++) {
            if (Pruefungsfaecher[Pruefungsfach] == -1 && unbrauchbareFelder[Pruefungsfach] == false) {
                for (let FachID of Kein_AF) {
                    if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                        FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                        cash = 1;
                    }
                }
                if (AF1_belegt == true) {
                    if (benoetigteX > 0 && DreiafxChance == false) {
                        for (let FachID of AF1_OhneMaDeFS) {
                            if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                cash = 1;
                            }
                        }
                        if (sprachePF == true) {
                            for (let FachID of AF1_NurMaDeFS) {
                                if (FachID != Deutsch) {
                                    if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                        FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                        cash = 1;
                                    }
                                }
                            }
                        }
                    }
                    if (benoetigteX > 1) {
                        for (let FachID of AF1_OhneMaDeFS) {
                            if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                cash = 1;
                            }
                        }
                    }
                    if (benoetigteX == 0 || (benoetigteX == 1 && DreiafxChance == true)) {
                        for (let FachID of ([].concat(AF1_NurMaDeFS,AF1_OhneMaDeFS))) {
                            if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                cash = 1;
                            }
                        }
                    }
                }
                if (EinsafxChance == true) {
                    for (let FachID of AF1_OhneMaDeFS) {
                        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                            cash = 1;
                        }
                    }
                }
                if (AF2_belegt == true) {
                    for (let FachID of AF2) {
                        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                            cash = 1;
                        }
                    }
                }
                if (AF3_belegt == true) {
                    if (benoetigteX > 0 && EinsafxChance == false) {
                        for (let FachID of AF3_OhneMaDeFS) {
                            if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                cash = 1;
                            }
                        }
                    }
                    if (benoetigteX > 1) {
                        for (let FachID of AF3_OhneMaDeFS) {
                            if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                cash = 1;
                            }
                        }
                    }
                    if (benoetigteX == 0 || (benoetigteX == 1 && EinsafxChance == true)) {
                        for (let FachID of ([].concat(AF3_NurMaDeFS,AF3_OhneMaDeFS))) {
                            if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                                FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                                cash = 1;
                            }
                        }
                    }
                }
                if (DreiafxChance == true) {
                    for (let FachID of AF3_OhneMaDeFS) {
                        if (FaecherZwischenspeicher[Pruefungsfach][FachID] == true) {
                            FaecherZwischenspeicher[Pruefungsfach][FachID] = false;
                            cash = 1;
                        }
                    }
                }
            }
        }
         //hier der Extra-Part für die 5. PK
        if (Pruefungsfaecher[5] == -1 && unbrauchbareFelder[5] == false) {
            for (let FachID of Kein_AF) {
                if (FaecherZwischenspeicher[5][FachID] == true) {
                    FaecherZwischenspeicher[5][FachID] = false;
                    cash = 1;
                }
            }
            if (AF1_belegt == true) {
                for (let FachID of ([].concat(AF1_NurMaDeFS,AF1_OhneMaDeFS))) {
                    if (FaecherZwischenspeicher[5][FachID] == true) {
                        FaecherZwischenspeicher[5][FachID] = false;
                        cash = 1;
                    }
                }
            }
            if (AF2_belegt == true) {
                for (let FachID of AF2) {
                    if (FaecherZwischenspeicher[5][FachID] == true) {
                        FaecherZwischenspeicher[5][FachID] = false;
                        cash = 1;
                    }
                }
            }
            if (AF3_belegt == true) {
                for (let FachID of ([].concat(AF3_NurMaDeFS,AF3_OhneMaDeFS))) {
                    if (FaecherZwischenspeicher[5][FachID] == true) {
                        FaecherZwischenspeicher[5][FachID] = false;
                        cash = 1;
                    }
                }
            }
        }
    }
    if (cash == 1) {
        // console.log('KombinationsRegelAufruf');
    }
    return cash;
}

function SchuleigeneRegelnCheck() {
    //Überprüfe, ob die schuleigenen Regeln erfüllt sind, die sich nicht aus der VO-GO ergeben.
    let SchulEigenRegelnErfuellt = true;
    if (schule == "Musikgymnasium Carl Philipp Emanuel Bach") {
        if ((Pruefungsfaecher[1] == Deutsch && Pruefungsfaecher[4] == Englisch) || (Pruefungsfaecher[1] == Englisch && Pruefungsfaecher[4] == Deutsch)) {
            SchulEigenRegelnErfuellt = false;
        }
    }
    return SchulEigenRegelnErfuellt;
}

function MehrfachbelegungsCheck() {
    //Überprüfe, ob Fächer unzulässigerweise mehrfach als PF/5. PK belegt wurden mit Ausnahme der BLL.
    let fachmehrmals = false;
    for (let n = 1; n < 5; n++) {
        for (let o = n + 1; o < 6; o++) {
            if ((n != 5 && o != 5) || bll == false) {  //Ausnahme mit bll eingearbeitet; es wird also wenn bll=true ist auch ein doppeltes Fach in der 5. PK akzeptiert.
                if (Pruefungsfaecher[n] == Pruefungsfaecher[o]) {
                    fachmehrmals = true;
                }
            }
        }
    }
    return fachmehrmals;
}
                                                

function TestAufruf() {
    //Setze die Comboboxes und Pruefungsfaecher zurück und mache auf Grundlage der ausgewählten Schule und der
    //belegten Fächer (Kl.9/10) nach dem Zurücksetzen der Console 2 Tests: 1. die Berechnung gültiger             //vollständige Simulation der händischen Wahl mit den Comboboxes durch den Computer unter Nutzung von
    //Kombinationen an der Schule und 2. eine vollständige Simulation der Wahlen mit den Comboboxen durch den
    //Computer unter Nutzung von RegelAnwendung(). Gibt die Ergebnisse in der Browser-Konsole aus.
    if (schule != '') {
        if (confirm('Bist Du sicher, dass Du den Test starten möchtest?\nDies kann unter Umständen einige Minuten in Anspruch nehmen.\nDie Ausgabe erfolgt in der Konsole des Browsers.')) {
            //Comboboxes auf leer setzen
            document.getElementById("Combobox1").value = '';
            document.getElementById("Combobox2").value = '';
            document.getElementById("Combobox3").value = '';
            document.getElementById("Combobox4").value = '';
            document.getElementById("Combobox5").value = '';
            //Pruefungsfächer zurücksetzen
            for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
                Pruefungsfaecher[Pruefungsfach] = -1;
            }
            //RegelCheckboxes und Konsole zurücksetzen
            RegelCheck();
            console.clear();
            //Tests ausführen
            BerechnungGueltigerKombinationen();
            SimuliereWahl();
        }
    } else {
        alert("Bitte Schule auswählen");
    }
}

function BerechnungGueltigerKombinationen() {
    //Vorbereitung: FaecherGrundauswahl der entsprechenden Schule übertragen, Zwischenspeicher zurücksetzen
    //und nicht gehabt Löscher (gemäß den Checkboxes ab Kl.9/10) rauslöschen.
    //Bilde anschließend alle Wahlmöglichkeiten dieser Fächer und untersuche jede Kombination auf Erfüllung
    //der Regeln, inkl. unzulässige Mehrfachbelegungen und schuleigene Regeln. Zähle die Summe aller gültigen
    //Fächerkombinationen und gebe diese in der Konsole aus.
    FaecherGrundauswahlUebertragen();
    ZwischenspeicherZuruecksetzen();
    LoescheNichtGehabteFaecher();
    let SchulEigenRegelnErfuellt = false;
    let fachmehrmals = true;
    let kombinationen = 0;
    for (let i = 0; i < FaecherMenge.length; i++) {
        if (FaecherZwischenspeicher[1][i] == true) {
            for (let j = 0; j < FaecherMenge.length; j++) {
                if (FaecherZwischenspeicher[2][j] == true) {
                    for (let k = 0; k < FaecherMenge.length; k++) {
                        if (FaecherZwischenspeicher[3][k] == true) {
                            for (let l = 0; l < FaecherMenge.length; l++) {
                                if (FaecherZwischenspeicher[4][l] == true) {
                                    for (let m = 0; m < FaecherMenge.length; m++) {
                                        if (FaecherZwischenspeicher[5][m] == true) {
                                            Pruefungsfaecher[1] = i;
                                            Pruefungsfaecher[2] = j;
                                            Pruefungsfaecher[3] = k;
                                            Pruefungsfaecher[4] = l;
                                            Pruefungsfaecher[5] = m;
                                            RegelnErfuelltCheck();
                                            SchulEigenRegelnErfuellt = SchuleigeneRegelnCheck();
                                            fachmehrmals = MehrfachbelegungsCheck();
                                            if (fachmehrmals == false && SchulEigenRegelnErfuellt == true && ZweiPruefungsfaecherRegelCheck == true && AufgabenfelderRegel == true && LeistungsKursregelCheck == true && EntspannteFaecherInDreiVier <= 1) {
                                                kombinationen++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(schule,' bietet unter Einbezug Deiner Angaben auf der Webseite ',kombinationen,' gültige Fachkombinationen für die Abitur-Prüfungsfächer und die 5. PK.');
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
            Pruefungsfaecher[Pruefungsfach] = -1;
    }
}



function SimuliereWahl() {
    //Vorbereitung: FaecherGrundauswahl übertragen.
    //Simuliert in Kombination mit der Funktion AutomatischeBelegung() Prüfungsfachwahlen unter Anwendung von
    //Regelanwendung(). Bildet alle Permutationen der Belegungsreihenfolge und macht da alle möglichen Wahlen.
    //Ausgabe verschiedener Werte: Permutationsnr., Wahlreihenfolge, gesamte Kombinationen,
    //vollständige Wahlen, unvollständige und ungültige.
    //Sollte im Idealfall, dass alles korrekt funktioniert, für jede Wahlreihenfolge die gleichen Zahlen liefern
    //und bei unvollständige und ungültige Wahlen Nullen haben. Außerdem sollte die Zahl bei Kombinationen und bei
    //vollständige Wahlen die gleiche sein wie die, die sich zuvor aus BerechnungGueltigerKombinationen() ergibt.
    let neuesElement = "";
    let kombinationsspeicher = [];
    Belegungsreihenfolge = 0;
    FaecherGrundauswahlUebertragen();
    console.log('Perm./120 | Reihenfolge | Kombinationen | vollständig | unvollst. | ungült.');
    for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 6; j++) {
            for (let k = 1; k < 6; k++) {
                for (let l = 1; l < 6; l++) {
                    for (let m = 1; m < 6; m++) {
                        if (i != j && i != k && i != l && i != m && j != k && j != l && j != m && k != l && k != m && l != m) {
                            Belegungsreihenfolge++;
                            kombinationsspeicher[Belegungsreihenfolge] = [];
                            kombinationsspeicher[Belegungsreihenfolge][1] = AutomatischeBelegung(i,j,k,l,m);
                            kombinationsspeicher[Belegungsreihenfolge][2] = [i,j,k,l,m];
                            console.log( "    " + Belegungsreihenfolge + "     |  " + kombinationsspeicher[Belegungsreihenfolge][2] + "  |     " + kombinationsspeicher[Belegungsreihenfolge][1]);
                        }
                    }
                }   
            }
        }
    }
}



function AutomatischeBelegung(Eins, Zwei, Drei, Vier, Fuenf) {
    //Simuliert die Wahl der Prüfungsfächer, indem ein Fach gewählt wird, anschließend die Erfüllung der Regeln
    //überprüft und es zur RegelAnwendung() kommt, wo potenziell Fächer rausgelöscht werden, die zu einer
    //ungültigen Wahl führen würden. Es geht alle möglichen Kombinationen durch, die sich nach Anwendung von
    //RegelAnwendung() ergeben. Es werden alle Kombinationen, aber auch unvollständige und ungültige gezählt.
    let cash = 'Preset';
    RegelnErfuelltCheck();
    RegelAnwendung();
    let vollstaendigekombinationen = 0;
    let unvollstaendigeKombi = 0;
    let ungueltigeKombinationen = 0;
    let kombinationszaehler = [];
    for (let i = 0; i < FaecherMenge.length; i++) {
        if (Pruefungsfaecher[Eins] != -1) {
            Pruefungsfaecher[Eins] = -1;
            Pruefungsfaecher[Zwei] = -1;
            Pruefungsfaecher[Drei] = -1;
            Pruefungsfaecher[Vier] = -1;
            Pruefungsfaecher[Fuenf] = -1;
            kombinationszaehler[Zwei] = 0;
            kombinationszaehler[Drei] = 0;
            kombinationszaehler[Vier] = 0;
            kombinationszaehler[Fuenf] = 0;
            RegelnErfuelltCheck();
            RegelAnwendung();
        }
        if (FaecherZwischenspeicher[Eins][i] == true) {
            Pruefungsfaecher[Eins] = i;
            kombinationszaehler[Eins]++;
            RegelnErfuelltCheck();
            RegelAnwendung();
            for (let j = 0; j < FaecherMenge.length; j++) {
                if (Pruefungsfaecher[Zwei] != -1) {
                    Pruefungsfaecher[Zwei] = -1;
                    Pruefungsfaecher[Drei] = -1;
                    Pruefungsfaecher[Vier] = -1;
                    Pruefungsfaecher[Fuenf] = -1;
                    kombinationszaehler[Drei] = 0;
                    kombinationszaehler[Vier] = 0;
                    kombinationszaehler[Fuenf] = 0;
                    RegelnErfuelltCheck();
                    RegelAnwendung();
                }
                if (FaecherZwischenspeicher[Zwei][j] == true) {
                    Pruefungsfaecher[Zwei] = j;
                    kombinationszaehler[Zwei]++;
                    RegelnErfuelltCheck();
                    RegelAnwendung();
                    for (let k = 0; k < FaecherMenge.length; k++) {
                        if (Pruefungsfaecher[Drei] != -1) {
                            Pruefungsfaecher[Drei] = -1;
                            Pruefungsfaecher[Vier] = -1;
                            Pruefungsfaecher[Fuenf] = -1;
                            kombinationszaehler[Vier] = 0;
                            kombinationszaehler[Fuenf] = 0;
                            RegelnErfuelltCheck();
                            RegelAnwendung();
                        }
                        if (FaecherZwischenspeicher[Drei][k] == true) {
                            Pruefungsfaecher[Drei] = k;
                            kombinationszaehler[Drei]++;
                            RegelnErfuelltCheck();
                            RegelAnwendung();
                            for (let l = 0; l < FaecherMenge.length; l++) {
                                if (Pruefungsfaecher[Vier] != -1) {
                                    Pruefungsfaecher[Vier] = -1;
                                    Pruefungsfaecher[Fuenf] = -1;
                                    kombinationszaehler[Fuenf] = 0;
                                    RegelnErfuelltCheck();
                                    RegelAnwendung();
                                }
                                if (FaecherZwischenspeicher[Vier][l] == true) {
                                    Pruefungsfaecher[Vier] = l;
                                    kombinationszaehler[Vier]++;
                                    RegelnErfuelltCheck();
                                    RegelAnwendung();
                                    for (let m = 0; m < FaecherMenge.length; m++) {
                                        if (Pruefungsfaecher[Fuenf] != -1) {
                                            Pruefungsfaecher[Fuenf] = -1;
                                            RegelnErfuelltCheck();
                                            RegelAnwendung();
                                        }
                                        if (FaecherZwischenspeicher[Fuenf][m] == true) {
                                            Pruefungsfaecher[Fuenf] = m;
                                            kombinationszaehler[Fuenf]++;
                                            vollstaendigekombinationen++;
                                            RegelnErfuelltCheck();
                                            if (ZweiPruefungsfaecherRegelCheck == false || LeistungsKursregelCheck == false || AufgabenfelderRegel == false || EntspannteFaecherInDreiVier > 1) {
                                                ungueltigeKombinationen++;
                                                console.log(Eins,Zwei,Drei,Vier,Fuenf,'Faecher:',i,j,k,l,m,';2PFRegel=',ZweiPruefungsfaecherRegelCheck,';LKRegel=',LeistungsKursregelCheck,';AFRegel=',AufgabenfelderRegel,';EntspFaecherin3/4=',EntspannteFaecherInDreiVier);
                                            }
                                        }
                                    }
                                    if (kombinationszaehler[Fuenf] == 0) {
                                        unvollstaendigeKombi++;
                                        // console.log(Eins,Zwei,Drei,Vier,Fuenf,'Faecher:',i,j,k,l);
                                    }
                                }
                            }
                            if (kombinationszaehler[Vier] == 0) {
                                unvollstaendigeKombi++;
                                // console.log(Eins,Zwei,Drei,Vier,Fuenf,'Faecher:',i,j,k);
                            }
                        }
                    }
                    if (kombinationszaehler[Drei] == 0) {
                        unvollstaendigeKombi++;
                        // console.log(Eins,Zwei,Drei,Vier,Fuenf,'Faecher:',i,j);
                    }
                }
            }
            if (kombinationszaehler[Zwei] == 0) {
                unvollstaendigeKombi++;
                // console.log(Eins,Zwei,Drei,Vier,Fuenf,'Faecher:',i);
            }
        }
    }
    cash = (unvollstaendigeKombi+vollstaendigekombinationen) + '     |    ' + vollstaendigekombinationen + '    |     ' + unvollstaendigeKombi + '     |    ' + ungueltigeKombinationen;
    for (let Pruefungsfach = 1; Pruefungsfach < 6; Pruefungsfach++) {
        Pruefungsfaecher[Pruefungsfach] = -1;
    }
    return cash;
}
