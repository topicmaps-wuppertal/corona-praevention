import { useEffect } from "react";

import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-cismap/topicMaps.css";
import { md5FetchText, fetchJSON } from "react-cismap/tools/fetching";
import { getGazDataForTopicIds } from "react-cismap/tools/gazetteerHelper";

import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import { getClusterIconCreatorFunction } from "react-cismap/tools/uiHelper";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import FeatureCollection from "react-cismap/FeatureCollection";
import GenericInfoBoxFromFeature from "react-cismap/topicmaps/GenericInfoBoxFromFeature";
import getGTMFeatureStyler from "react-cismap/topicmaps/generic/GTMStyler";
import { addSVGToProps } from "react-cismap/tools/svgHelper";

const host = "https://wupp-topicmaps-data.cismet.de";

const getGazData = async (setGazData) => {
  const prefix = "GazDataForStories";
  const sources = {};

  sources.adressen = await md5FetchText(prefix, host + "/data/adressen.json");
  sources.bezirke = await md5FetchText(prefix, host + "/data/bezirke.json");
  sources.quartiere = await md5FetchText(prefix, host + "/data/quartiere.json");
  sources.pois = await md5FetchText(prefix, host + "/data/pois.json");
  sources.kitas = await md5FetchText(prefix, host + "/data/kitas.json");

  const gazData = getGazDataForTopicIds(sources, [
    "pois",
    "kitas",
    "bezirke",
    "quartiere",
    "adressen",
  ]);

  setGazData(gazData);
};
const convertPOIItemsToFeature = async (itemIn) => {
  console.log("itemIn", itemIn);

  let item = await addSVGToProps(
    itemIn,
    (i) => i.signatur || i?.mainlocationtype?.signatur || "Platz.svg"
  );
  const text = item?.name || "Kein Name";
  const type = "Feature";
  const selected = false;
  const geometry = item?.geojson;
  item.color = "#CB0D0D";
  const info = {
    header: item?.mainlocationtype?.lebenslagen?.join(","),
    title: text,
    additionalInfo: item?.info,
    subtitle: <span>{item?.adresse}</span>,
  };
  item.info = info;

  return {
    text,
    type,
    selected,
    geometry,
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:EPSG::25832",
      },
    },
    properties: item,
  };
};

const mapTitle = "Corona-Präventionskarte";
function App() {
  const [gazData, setGazData] = useState([]);
  useEffect(() => {
    document.title = mapTitle;
    getGazData(setGazData);
  }, []);
  return (
    <TopicMapContextProvider
      appKey='CoronaPraeventionskarteWuppertal.TopicMap'
      featureItemsURL={"https://wupp-topicmaps-data.cismet.de/data/poi.data.json"}
      getFeatureStyler={getGTMFeatureStyler}
      convertItemToFeature={convertPOIItemsToFeature}
      clusteringOptions={{
        iconCreateFunction: getClusterIconCreatorFunction(30, (props) => props.color),
      }}
      itemFilterFunction={() => {
        return (item) => item?.mainlocationtype?.name?.toLowerCase().includes("corona");
        // item?.name?.toLowerCase().includes("test");
      }}
      clusteringEnabled={true}
      getColorFromProperties={(props) => props.color}
      titleFactory={() => {
        return (
          <div>
            <b>{mapTitle}</b>
          </div>
        );
      }}
    >
      <TopicMapComponent
        homeCenter={[51.2425605868143, 7.185153968951078]}
        homeZoom={8}
        locatorControl={true}
        gazData={gazData}
        infoBox={
          <GenericInfoBoxFromFeature
            pixelwidth={400}
            config={{
              city: "Wuppertal",
              navigator: {
                noun: {
                  singular: "Zentrum",
                  plural: "Zentren",
                },
              },
              noCurrentFeatureTitle: "Keine Zentren gefunden",
              noCurrentFeatureContent: "",
            }}
          />
        }
      >
        <FeatureCollection />
      </TopicMapComponent>
    </TopicMapContextProvider>
  );
}

export default App;
