**HIKR - Glossar**

**Letzte Änderung:** 2025-11-19 

**Begriff:** Tour  
**Definition:** Fachliche Einheit einer Wanderung mit Startpunkt, (optionalem) Ziel, Distanz, Dauer, Höhenmetern, Schwierigkeit, Saison, Wegtyp, Bewertung und optionalen Warnhinweisen.  
**Domäne - Supportdomäne:** Touren-Verwaltung / Tour-Planung  
**Rolle im System:** Entity

**Begriff:** Geplante Tour  
**Definition:** Eine konkret geplante Durchführung einer Tour zu einem Termin (Datum/Uhrzeit) inklusive festgelegtem Startpunkt, optionalen Varianten (z. B. kürzere/längere Schleife) und organisatorischen Angaben. Dient als Aggregat, an das Teilnehmer, Matching-Ergebnisse und Benachrichtigungen andocken.  
**Domäne - Coredomäne:** Tour-Planung  
**Rolle im System:** Aggregat

**Begriff:** Matching (Tour-Matching / Gruppenbildung)  
**Definition:** Fachlicher Prozess und Aggregat-Root, das Personen für eine **Geplante Route** zusammenführt (Gesuche/Angebote, Kriterienabgleich, Vorschläge, Bestätigungen) und daraus eine verbindliche Gruppe bildet.  
**Domäne - Coredomäne:** Matching & Gruppentouren  
**Rolle im System:** Aggregate Root  

**Begriff:** Tourensuche (Wanderer)
**Definition:** Vereinfachte Suche/Entdeckung von Touren in der Nähe des aktuellen oder gewählten Ortes mit Fokus auf wenige, leicht bedienbare Filter.  
**Domäne - Supportdomäne:** Touren-Suche  
**Rolle im System:** Read Model

**Begriff:** Startpunkt  
**Definition:** Geolokation, an der eine Tour offiziell beginnt; zentraler Marker in Karte und Navigationsübergabe.  
**Domäne - Supportdomäne:** Tour-Planung / Startpunkt & Parken  
**Rolle im System:** Value Object in Tour

**Begriff:** Parkplatz  
**Definition:** Parkmöglichkeit in Startpunktnähe; im einfachen Modus nur als „P"-Symbol, im Expertenmodus mit Details (Kapazität, Entfernung, Kosten).  
**Domäne - Supportdomäne:** Parken / Auto abstellen 
**Rolle im System:** Value Object in Tour

**Begriff:** Tourdetails  
**Definition:** Ansicht mit Kernattributen (Distanz, Dauer, Schwierigkeit, Höhenmeter gesamt, Saison, Wegtyp) sowie optionalen Elementen (Höhenprofil, Wegbeschreibung, Gefahrenhinweise, Nutzerbewertungen).  
**Domäne - Supportdomäne:** Tour-Detailansicht  
**Rolle im System:** Value Objects in Tour

**Begriff:** Registrierung / Sign in
**Definition:** Anlegen eines neuen Benutzerkontos inkl. Datenprüfung.
**Domäne - Generic Domain:** Identität & Zugang
**Rolle im System:** Domainservice

**Begriff:** Login / Sign up
**Definition:** Anmeldung eines bestehenden Nutzers zur Zugangserteilung.
**Domäne - Generic Domain:** Identität & Zugriffskontrolle
**Rolle im System:** Domainservice
