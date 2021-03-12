import { useContext } from "react";
import { ResponsiveTopicMapContext } from "react-cismap/contexts/ResponsiveTopicMapContextProvider";
import DefaultAppMenu from "react-cismap/topicmaps/menu/DefaultAppMenu";
import Section from "react-cismap/topicmaps/menu/Section";
const Menu = () => {
  const { windowSize } = useContext(ResponsiveTopicMapContext);
  let height;

  if (windowSize?.height) {
    height = windowSize?.height * 0.6;
  } else {
    height = 250;
  }
  return (
    <DefaultAppMenu
      menuTitle='Einstellungen und Kompaktanleitung'
      titleCheckBoxlabel='Titel anzeigen'
      introductionMarkdown={`Über **Einstellungen** können Sie die Darstellung der Hintergrundkarte 
                und der Objekte an Ihre Vorlieben anpassen. Unter **Statistik** finden 
                Sie eine Darstellung der aktuellen Fallzahlen. Wählen Sie 
                **Kompaktanleitung** für detailliertere Bedienungsinformationen.
      `}
      simpleHelp={{
        content: `Mit Blick auf die aktuelle Verbreitung des Corona-Virus sind in Deutschland 
                    bereits zahlreiche Schutzmaßnahmen erlassen worden. Ziel ist es, eine Ausbreitung 
                    des Virus zu verlangsamen. Ein kostenloser Schnelltest pro Woche - dieses Angebot 
                    richtet sich seit Mitte März an jede Bürgerin und jeden Bürger. Auch in Wuppertal 
                    entstehen immer mehr Schnelltestzentren. `,
      }}
      sections={{
        _10statistics: (
          <Section
            key='statistik'
            sectionKey='StatistikSection'
            sectionTitle='Statistik'
            sectionBsStyle='danger'
            sectionContent={
              <div>
                <h4>Aktuelle Fallzahlen-Grafik für Wuppertal </h4>
                <p>
                  Die folgende Grafik wird stündlich an aktuelle Fallzahlen angepasst. Sie können
                  mit dem Mauszeiger einen Tag auswählen und bekommen die entsprechende Zahl mit
                  Datum angezeigt. Zwischen Grafik und den oberen Tabellen kann es leichte
                  Unterschiede geben, denn die Tabellen werden nur einmal am Tag (montags bis
                  freitags) aktualisiert.
                </p>
                <h4>Funktionen:</h4>
                <p>
                  Durch Anklicken der farbigen Punkte unten in der Legende können Sie einzelne
                  Rubriken ausblenden.
                </p>
                <iframe
                  width='100%'
                  frameBorder='0'
                  height={height}
                  src='https://stadt-wuppertal.maps.arcgis.com/apps/opsdashboard/index.html#/08a2f92cd26c4f459a7f0ee42f7653ce'
                ></iframe>
              </div>
            }
          />
        ),
      }}
    ></DefaultAppMenu>
  );
};
export default Menu;
