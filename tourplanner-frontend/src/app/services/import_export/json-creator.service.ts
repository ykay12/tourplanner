import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonCreatorService {

  constructor() { }

  //Diese Funktion convertiert ein beliebiges JavaScript-Objekt in einen JSON-String.
  createJson(data: any): string {
    return JSON.stringify(data, null, 2); 
    // null entspricht dem Replacer-Parameter, dieser könnte verwendet werden, um bestimmte Werte zu filtern oder zu transformieren, bevor sie in JSON umgewandelt werden. Da wir hier keine Filterung oder Transformation vornehmen wollen, setzen wir ihn auf null.
    // 2 entspricht dem Space-Parameter, dieser gibt an, wie viele Leerzeichen für die Einrückung verwendet werden sollen. Durch die Angabe von 2 wird der JSON-String mit einer Einrückung von 2 Leerzeichen formatiert. Ohne diesen Parameter würde der JSON-String in einer einzigen Zeile ausgegeben werden.
  }

  //Todo: einzelne Schritte kommentieren
  saveJsonToFile(json: string, filename: string): void {
    const blob = new Blob([json], { type: 'application/json' }); //Blob steht für "Binary Large Object" und ist eine Möglichkeit, binäre Daten in JavaScript zu repräsentieren. In diesem Fall erstellen wir einen Blob aus unserem JSON-String, indem wir ihn in ein Array packen (da der Blob-Konstruktor ein Array von Daten erwartet) und den MIME-Typ 'application/json' angeben, damit der Browser weiß, dass es sich um eine JSON-Datei handelt.
    const url = window.URL.createObjectURL(blob); //Diese Methode erstellt eine temporäre URL, die auf den Blob verweist. 
    const link = document.createElement('a'); //Hier erstellen wir ein neues <a>-Element, das als Link zum Herunterladen der Datei dient.
      link.href = url;
      link.download = filename;
      link.click(); //Durch das Programmatische Klicken auf den Link wird der Download der Datei ausgelöst, ohne dass der:die Benutzer:In tatsächlich auf einen sichtbaren Link klicken muss.
    window.URL.revokeObjectURL(url); //Nachdem der Download-Link geklickt wurde, rufen wir revokeObjectURL auf, um die temporäre URL freizugeben und Speicherplatz zu sparen.
  }
}
