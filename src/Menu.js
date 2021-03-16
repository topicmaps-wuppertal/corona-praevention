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
      menuTitle='Einstellungen, Statistik und Kompaktanleitung'
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
            sectionTitle='Statistik (aktuelle Fallzahlen)'
            sectionBsStyle='danger'
            sectionContent={
              <div>
                <p>
                  Das folgende Diagramm wird stündlich automatisch an die beim Gesundheitsamt zur
                  COVID-19-Epidemie erfassten Fallzahlen angepasst. Bewegen Sie den Mauszeiger auf
                  eine der farbigen Säulen in der Grafik, um sich die jeweilige Fallzahl und das
                  zugehörige Referenzdatum anzeigen zu lassen. Durch Anklicken der farbigen Punkte
                  in der Legende unterhalb des Diagramms können Sie einzelne Rubriken aus- und
                  wieder einblenden.
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
