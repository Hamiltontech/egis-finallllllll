import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
  GeoJSON,
  WMSTileLayer,
  ZoomControl,
} from "react-leaflet";
import "esri-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import SPF from "../../public/data/Station_Point_Final.json";
import GOV from "../../public/data/Governorate.json";
import AREA from "../../public/data/MyArea.json";
import CONSTRUCTION from "../../public/data/Construction_projects.json";
import { map, marker, popup, CircleMarker } from "leaflet";
import VectorTileLayerUmdMin from "leaflet-vector-tile-layer";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import useSupercluster from "use-supercluster";
import { markerClusterGroup } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import VectorTileLayer from "react-esri-leaflet/plugins/VectorTileLayer";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";

// component
export default function Map({
  areazone,
  areazone1,
  projectCoordinated,
  projectCoordinated1,
  projectDescription,
  projectName,
  projectPosition,
  areaGov,
  proImage,
  govid,
}) {
  const apiKey =
    "AAPK1f12d3f9f7e0446b97bd5fad297b62dfNs64weAwjHl0BHUdtKX9GisBgUj4312WkhiIHfzTuTes26tENgAO6tBOGEErF-0r";
  var wmsLayerString =
    "Sample_Data:Connection_File,Sample_Data:Station_Buildings,Sample_Data:Pipe_Line,Sample_Data:House_Pipe,Sample_Data:House_connection,Sample_Data:Manhole_Final,Sample_Data:Construction_projects_Poly,Sample_Data:Governorate,Sample_Data:Gov_Polyline,Sample_Data:Area,Sample_Data:FlowDirectionFinal";

  var greenIcon = L.icon({
    iconUrl: "https://i.imgur.com/ld3rkCP.png",
    iconSize: [70, 70],
    iconAnchor: [15, 40],
    popupAnchor: [30, -30],
  });
  var constructionIcon = L.icon({
    iconUrl: "https://i.imgur.com/jR1ZGvi.png",
    iconSize: [30, 30],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });
  var stationIcon = L.icon({
    iconUrl: "https://i.imgur.com/4LWG8pQ.png",
    iconSize: [30, 30],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

  const innerBounds = [
    // Governertes
    {
      id: "0",
      coordinates: [
        [29.09761931, 47.73245187],
        [29.97594744, 47.1889171],
      ],
    },
    {
      id: "1",
      coordinates: [
        [28.55926626, 48.38977797],
        [29.17495179, 47.80978435],
      ],
    },
    {
      id: "2",
      coordinates: [
        [29.27912757, 48.07948138],
        [29.33881734, 48.00965907],
      ],
    },
    {
      id: "3",
      coordinates: [
        [29.19525157, 48.10089653],
        [29.25886745, 47.99918944],
      ],
    },
    {
      id: "4",
      coordinates: [
        [29.31660408, 47.99917457],
        [29.37320858, 47.81151523],
      ],
    },
    {
      id: "5",
      coordinates: [
        [29.19346697, 47.98311321],
        [29.30074596, 47.87640926],
      ],
    },

    // Areas
    {
      id: "6",
      coordinates: [
        [29.28929687, 47.94541866],
        [29.30303394, 47.96596248],
      ],
    },
    {
      id: "7",
      coordinates: [
        [29.26606567, 47.86431817],
        [29.27866779, 47.90789709],
      ],
    },
    {
      id: "8",
      coordinates: [
        [29.26572874, 47.96746912],
        [29.28393225, 47.98787607],
      ],
    },
    {
      id: "9",
      coordinates: [
        [29.26709886, 47.90554815],
        [29.30057915, 47.92830209],
      ],
    },
    {
      id: "10",
      coordinates: [
        [29.28844607, 47.92757538],
        [29.30179651, 47.94780645],
      ],
    },
    {
      id: "11",
      coordinates: [
        [29.27970607, 47.92725744],
        [29.28929687, 47.94959916],
      ],
    },
    {
      id: "12",
      coordinates: [
        [29.24436736, 47.86431801],
        [29.2676381, 47.93073736],
      ],
    },
    {
      id: "13",
      coordinates: [
        [29.17956168, 47.92907655],
        [29.26603096, 48.00779458],
      ],
    },
    {
      id: "14",
      coordinates: [
        [29.25582842, 47.95213167],
        [29.26613739, 47.97181485],
      ],
    },
    {
      id: "15",
      coordinates: [
        [29.29510298, 47.85266268],
        [29.31091561, 47.86569507],
      ],
    },
    {
      id: "16",
      coordinates: [
        [29.27525709, 47.87873042],
        [29.29870586, 47.90698505],
      ],
    },
    {
      id: "17",
      coordinates: [
        [29.29552088, 47.86476695],
        [29.31061476, 47.90575734],
      ],
    },
    {
      id: "18",
      coordinates: [
        [29.23931421, 47.90789709],
        [29.26742405, 47.95766118],
      ],
    },
    {
      id: "19",
      coordinates: [
        [29.2259574, 47.86027392],
        [29.26605431, 47.94022735],
      ],
    },
    {
      id: "20",
      coordinates: [
        [29.31433433, 48.03278653],
        [29.35601991, 48.10349414],
      ],
    },
    {
      id: "21",
      coordinates: [
        [29.28393256, 47.9791841],
        [29.30544324, 48.00301098],
      ],
    },
    {
      id: "22",
      coordinates: [
        [29.28806026, 47.99954099],
        [29.30749875, 48.02945332],
      ],
    },
    {
      id: "23",
      coordinates: [
        [29.27693322, 48.00220287],
        [29.29067563, 48.03503714],
      ],
    },
    {
      id: "24",
      coordinates: [
        [29.26460486, 47.98551373],
        [29.28568538, 48.014007],
      ],
    },
    {
      id: "25",
      coordinates: [
        [29.26441178, 48.01271826],
        [29.28004487, 48.04232162],
      ],
    },
    {
      id: "26",
      coordinates: [
        [29.26439519, 48.05171172],
        [29.29350465, 48.0848221],
      ],
    },
    {
      id: "27",
      coordinates: [
        [29.27981234, 48.02241272],
        [29.31433433, 48.06944387],
      ],
    },
    {
      id: "28",
      coordinates: [
        [29.26884403, 48.06104709],
        [29.30960593, 48.09288165],
      ],
    },
    {
      id: "29",
      coordinates: [
        [29.30416538, 48.05304003],
        [29.32590045, 48.09459092],
      ],
    },
    {
      id: "30",
      coordinates: [
        [29.33811796, 48.01344034],
        [29.36330315, 48.04930051],
      ],
    },
    {
      id: "31",
      coordinates: [
        [29.32293574, 48.00065566],
        [29.3498032, 48.03965363],
      ],
    },
    {
      id: "32",
      coordinates: [
        [29.30749875, 48.01228411],
        [29.33088505, 48.05304003],
      ],
    },
    {
      id: "33",
      coordinates: [
        [29.26439523, 48.03503714],
        [29.2849417, 48.05689945],
      ],
    },
    {
      id: "34",
      coordinates: [
        [29.34573346, 47.79272264],
        [29.48965516, 48.44296554],
      ],
    },
    {
      id: "35",
      coordinates: [
        [29.35881608, 47.95666356],
        [29.37991288, 47.9825627],
      ],
    },
    {
      id: "36",
      coordinates: [
        [29.36573628, 47.99645961],
        [29.38262293, 48.01495954],
      ],
    },
    {
      id: "37",
      coordinates: [
        [29.33199344, 47.94568372],
        [29.34893959, 47.97251778],
      ],
    },
    {
      id: "38",
      coordinates: [
        [29.30408554, 47.97463331],
        [29.3206285, 47.99954099],
      ],
    },
    {
      id: "39",
      coordinates: [
        [29.31855618, 47.97130309],
        [29.33496595, 47.99331696],
      ],
    },
    {
      id: "40",
      coordinates: [
        [29.30544324, 47.99331696],
        [29.32293574, 48.02241272],
      ],
    },
    {
      id: "41",
      coordinates: [
        [29.3206285, 47.98743957],
        [29.34046899, 48.01228411],
      ],
    },
    {
      id: "42",
      coordinates: [
        [29.30303426, 47.96089847],
        [29.31855618, 47.9791841],
      ],
    },
    {
      id: "43",
      coordinates: [
        [29.31703274, 47.95202026],
        [29.334184, 47.97463331],
      ],
    },
    {
      id: "44",
      coordinates: [
        [29.3498032, 48.00335435],
        [29.37252039, 48.03185223],
      ],
    },
    {
      id: "45",
      coordinates: [
        [29.34046899, 47.99410362],
        [29.35691849, 48.01344034],
      ],
    },
    {
      id: "46",
      coordinates: [
        [29.33496595, 47.98303986],
        [29.35039209, 48.00065566],
      ],
    },
    {
      id: "47",
      coordinates: [
        [29.33199344, 47.97122241],
        [29.34573316, 47.98743957],
      ],
    },
    {
      id: "48",
      coordinates: [
        [29.34114438, 47.93554424],
        [29.36645187, 47.9631153],
      ],
    },
    {
      id: "49",
      coordinates: [
        [29.34363062, 47.95629018],
        [29.35960854, 47.97422713],
      ],
    },
    {
      id: "50",
      coordinates: [
        [29.34363062, 47.97251182],
        [29.36127885, 47.99410362],
      ],
    },
    {
      id: "51",
      coordinates: [
        [29.35039209, 47.986847],
        [29.36494754, 48.00335435],
      ],
    },
    {
      id: "52",
      coordinates: [
        [29.35691849, 47.9922183],
        [29.37393137, 48.01087587],
      ],
    },
    {
      id: "53",
      coordinates: [
        [29.38061591, 47.9938931],
        [29.39097387, 48.00276873],
      ],
    },
    {
      id: "54",
      coordinates: [
        [29.37204237, 47.9733229],
        [29.39097387, 47.99818972],
      ],
    },
    {
      id: "55",
      coordinates: [
        [29.37432074, 47.96451076],
        [29.39415723, 48.00637271],
      ],
    },
    {
      id: "56",
      coordinates: [
        [29.35900414, 47.97414575],
        [29.37530028, 47.99645961],
      ],
    },
    {
      id: "57",
      coordinates: [
        [29.31305437, 47.92016949],
        [29.34852826, 47.96089847],
      ],
    },
    {
      id: "58",
      coordinates: [
        [29.3398187, 47.89869809],
        [29.36358141, 47.93983975],
      ],
    },
    {
      id: "59",
      coordinates: [
        [29.30965833, 47.87780618],
        [29.34674887, 47.93072247],
      ],
    },
    {
      id: "60",
      coordinates: [
        [29.30659046, 47.88693545],
        [29.32695125, 47.92638559],
      ],
    },
  ];

  const [coords, setCoords] = useState([]);

  useEffect(() => {
    innerBounds.map((item) => {
      if (item.id === govid.toString()) {
        setCoords(item.coordinates);
      }
    });
  }, [govid]);

  console.log(govid);

  function onEachConstruction(construction, layer) {
    const COProjectName = construction.properties.co_name_eng;
    const COProjectDescription = construction.properties.description_eng;
    const COProjectImage1 =
      "https://geo1.esmrts.com/image/" + construction.properties.image1;
    layer.bindPopup(
      `
        <div style="font-family: 'Tajawal', sans-serif;">
        <div style=" width:100%; float:left; background-image: url('${COProjectImage1}'); background-size: cover; padding-top: 40px; padding-bottom: 40px; background-blend-mode: overlay; background-color: currentcolor;  image-repeat:no-repeat; margin-bottom:20px; font-weight:10px">
         <h1 style='font-size: 18px; color: white; text-align:center; padding:20px; font-weight: 700;'> ${COProjectName} </h1>
        </div>
        <br></br>
        <p style="text-align:center; padding:10px; margin-top:5px; font-weight: bold;"> ${COProjectDescription}</p>
       <hr />
       <p style="text-align:center; padding:10px; font-weight: bold;">${construction.geometry.coordinates[0]}, ${construction.geometry.coordinates[1]}</p>
        <hr/>
      </div>
        `
    );
  }

  function onEachSPF(spf, layer) {
    const SPFProjectName = spf.properties.st_name_eng;
    const COProjectDescription = spf.properties.description_eng;
    const COProjectImage1 =
      "https://geo1.esmrts.com/image/" + spf.properties.image1;
    layer.bindPopup(
      `
      <div style="font-family: 'Tajawal', sans-serif;">
      <div style=" width:100%; float:left; background-image: url('${COProjectImage1}'); background-size: cover; padding-top: 40px; padding-bottom: 40px; background-blend-mode: overlay; background-color: currentcolor;  image-repeat:no-repeat; margin-bottom:20px; font-weight:10px">
       <h1 style='font-size: 18px; color: white; text-align:center; padding:20px; font-weight: 700;'> ${SPFProjectName} </h1>
      </div>
      <br></br>
      <p style="text-align:center; padding:10px; margin-top:5px; font-weight: bold;"> ${COProjectDescription}</p>
     <hr />
     <p style="text-align:center; padding:10px; font-weight: bold;">${spf.geometry.coordinates}</p>
      <hr/>
    </div>
      `
    );
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.zoomIn(2));
      },
    });

    useEffect(() => {
      if (areaGov === true) {
        map.flyTo([areazone, areazone1], map.getZoom());
        setPosition([areazone, areazone1]);
        map.fitBounds(coords);
      } else {
        setPosition([projectCoordinated, projectCoordinated1]);
        map.flyTo([projectCoordinated, projectCoordinated1], map.getZoom(), map.setZoom(13));
        
      }
      // if(projectPosition === true)
      // else{
      //   map.locate()
      // }
    }, [projectCoordinated]);

    return position === null ? null : (
      <>
        <Marker position={position} icon={greenIcon}>
          <Popup>
            {areaGov ? (
              <h1 className="font-extrabold mt-5 p-4 font-tajwal">
                You Are Here
              </h1>
            ) : projectPosition ? (
              <>
                <div>
                  <img src={proImage} height={200} width={400} />
                </div>
                <h1 className="font-extrabold text-lg p-4 text-center font-tajwal">
                  {projectName}
                </h1>
                <hr />
                <h1 className="font-extrabold mt-5 text-center p-4 font-tajwal">
                  {projectDescription}
                </h1>
              </>
            ) : (
              <h1 className="font-extrabold mt-5 font-tajwal p-4">
                You Are Here
              </h1>
            )}
          </Popup>
        </Marker>
      </>
    );
  }

  return (
    <div className=" flex relative lg:mt-[69.38px]" id="map">
      <MapContainer
        center={[47.4818, 29.3117]}
        zoom={9}
        scrollWheelZoom
        className="h-screen w-full"
      >
        <LayersControl position="topright">
          <GeoJSON data={GOV} />
          <GeoJSON data={AREA} />

          {/* streetmap */}
          <LayersControl.BaseLayer radio checked name="Open Street Name">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* satelite */}
          <LayersControl.BaseLayer radio name="Satalite">
            <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
              url="https://api.mapbox.com/styles/v1/lzahrani/clb7ov42s001q15qgj54sms68/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHphaHJhbmkiLCJhIjoiY2xiN295YzU5MGRjaDN0bGo1ZmdkbmNtdSJ9.lZ0_MSSUHq5gDmXFqbrc1Q"
            />
          </LayersControl.BaseLayer>

          {/* paci map */}
          <LayersControl.BaseLayer radio name="Paci Map">
            {apiKey && (
              <VectorBasemapLayer name="ArcGIS:Streets" token={apiKey} />
            )}

            <LayersControl.Overlay checked name="Vector Tile Layer">
              <VectorTileLayer url="https://tiles.arcgis.com/tiles/2zwTmDUxTzTVBytU/arcgis/rest/services/KuwaitFinder3Basemap/VectorTileServer" />
            </LayersControl.Overlay>
          </LayersControl.BaseLayer>

          {/* construction */}
          <LayersControl.Overlay
            radio
            checked
            name="Construction Projects"
            icon={greenIcon}
          >
            <GeoJSON
              data={CONSTRUCTION.features}
              onEachFeature={onEachConstruction}
              pointToLayer={function (feature, latlng) {
                return L.marker(latlng, { icon: constructionIcon });
              }}
            ></GeoJSON>
          </LayersControl.Overlay>

          <WMSTileLayer
            url="http://geo1.esmrts.com/geoserver/ows?"
            version="1.3.0"
            layers={wmsLayerString}
            format="image/png"
            height="768"
            width="677"
            zIndex={10000}
            opacity={1}
            maxZoom={24}
            transparent={true}
          />

          {/* station */}
          <LayersControl.Overlay
            radio
            checked
            name="Station Projects"
            icon={greenIcon}
          >
            <GeoJSON
              data={SPF.features}
              onEachFeature={onEachSPF}
              pointToLayer={function (feature, latlng) {
                return L.marker(latlng, { icon: stationIcon });
              }}
            ></GeoJSON>
          </LayersControl.Overlay>
        </LayersControl>
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
