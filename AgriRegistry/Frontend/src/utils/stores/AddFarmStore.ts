import { action, makeAutoObservable, observable } from "mobx";
import { Location } from "../../types/TResponse";

class AddFarmStore {
  selectedLocation: Location | null = null;

  constructor() {
    makeAutoObservable(this, {
      selectedLocation: observable,
      handleSetSelectedLocation: action, // Mark this method as an action
    });
  }

  handleSetSelectedLocation = (location: Location) => {
    this.selectedLocation = location;
  };
}

export default new AddFarmStore();
