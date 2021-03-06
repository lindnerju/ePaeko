# ePäko
ePäko soll Berliner Schülerinnen und Schüler dabei unterstützen, ihre individuellen Stärken und Interessen optimal in die Kurswahl für das Abitur einfließen zu lassen.

Zu diesem Zweck stehen interaktive Eingabefelder für die vier Prüfungsfächer und die 5. Prüfungskomponente zur Verfügung, die stets die verbleibenden Fachkombinationen unter Einhaltung der Vorgaben durch die Verordnung über die gymnasiale Oberstufe (VO-GO) anzeigen. Zudem kann die Erfüllung verschiedener Wahlvorgaben aus der VO-GO bei der Wahl live mitverfolgt werden.

ePäko ist erreichbar unter: https://lindnerju.github.io/ePaeko

![Screenshoot von ePäko](img/Screenshoot.png)

## Implementierte Schulen
Implementiert wurden bislang (05.07.2020):
- Heinz-Berggruen-Gymnasium

## Spenden
Da die Entwicklung von ePäko mit hohem zeitlichen Aufwand verbunden war und es als Open-Source Projekt zum Nutzen der Allgemeinheit veröffentlicht wurde, freuen wir uns sehr über Spenden.
[![paypal](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KEBJ9ZKSB2VH8)

## Für Schulen
Zurzeit befindet sich ePäko noch in der Pilotphase, um erste Erfahrungen zu sammeln und Rückmeldungen einzuarbeiten. Falls Interesse an einer Integration Ihrer Schule in ePäko besteht, können Sie gerne hier auf Github [einen Issue eröffnen](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue) mit allen benötigten Informationen. Die nachfolgenden Erläuterungen sollten aber zunächst ausführlich durchgelesen werden.

### ePäko unterliegt bisher in Bezug auf seine Möglichkeiten folgenden Beschränkungen:
- Es ist bisher nur für G8 vorgesehen (Fächer-Abfrage nach § 23 Abs. 5 VO-GO erfolgt für Klasse 10 und nicht E-Phase)
- Die Bedingungen, die sich für den altsprachlichen Bildungsgang nach § 48 VO-GO ergeben, sind bisher nicht eingebaut
- Es besteht prinzipiell aufgrund der komplizierten interaktiven Implementierung der Vorgaben aus der VO-GO die Möglichkeit, dass ePäko nicht ganz korrekt arbeitet; für diese Fälle sind Meldungen an den/die Nutzer/in implementiert, während sich zugleich die Erfüllung der Regeln anhand der Checkboxes unterhalb der Prüfungsfach-Felder nachverfolgen und studieren lässt; zudem ist ein Testmodus eingebaut, der alle an der jeweiligen Schule möglichen Wahlen simuliert und nach Fehlern analysiert

### Für die Aufnahme einer neuen Schule in ePäko werden folgende Informationen benötigt:
- Eine Übersicht aller Fächer, die prinzipiell an der Schule als Prüfungsfächer oder 5. Prüfungskomponente zur Auswahl stehen (Grundauswahl), aufgeschlüsselt nach Prüfungsfächer 1 bis 4 und 5. Prüfungskomponente, also in 5 verschiedene Teillisten
- Diese Grundauswahl darf keine Fächer enthalten, die für sich genommen bereits Anforderungen der VO-GO widersprechen, da ePäko dies nicht überprüft; zum Beispiel Chinesisch oder Darstellendes Spiel als Prüfungsfach 2 (ausgeschlossen nach § 23 Abs. 7 VO-GO)
- Eine Liste jener Fremdsprachen, die ab oder vor der 9. Klasse belegt werden konnten aber nicht mussten (§ 23 Abs. 4 VO-GO)
- Eine Liste jener Fächer, die ab oder vor der 10. Klasse belegt werden konnten aber nicht mussten (§ 23 Abs. 5 VO-GO); Fremdsprachen, die schon in der Liste ab Klasse 9 oder früher stehen, sollen in dieser Liste hier nur dann zusätzlich aufgeschrieben werden, wenn es ab der 10. Klasse nochmals die Möglichkeit für deren Belegung gab
- Zusatzregeln, die es an der Schule gibt, die sich nicht aus der VO-GO ergeben (z. B. stehen an einer Schule Ma/De/En in Prüfungsfach 1 und Prüfungsfach 4 zur Auswahl, wo beschlossen wurde, dass die Wahl von De oder En in dem einen Prüfungsfach immer mit Ma im jeweils anderen Prüfungsfach kombiniert werden muss); dies muss stets zusätzlich in ePäko implementiert werden
- Bemerkungen, die über das „i“ neben der Schulauswahl ausgeklappt werden können; dort kann beispielsweise vermerkt werden, dass bestimmte Leistungskurse zwar prinzipiell angeboten werden, aber häufig nicht zustande kommen
