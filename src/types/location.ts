import { Location } from 'history'

interface ILocation {
  [stateElement: string]: any;
  background?: Location<ILocation>;
  from?: {pathname: string};
};

export default ILocation;