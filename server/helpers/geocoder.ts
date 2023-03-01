//@ts-ignore
import NodeGeocoder, { GenericOptions } from "node-geocoder";

const generic: GenericOptions = {
  provider: "openstreetmap",
};

const geocoder = NodeGeocoder(generic);
export default geocoder;
