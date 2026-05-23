interface Car {
  model: "bmw";
  dynamic_1: boolean;
  tuple: [number, number];
  optionalFeature?: string;
}

type PickDynamic1 = Pick<Car, "dynamic_1">;
type OmitTuple = Omit<Car, "tuple">;
type AllRequired = Required<Car>;
type UpperModel = Uppercase<Car["model"]>;
type PartialCar = Partial<Car>;

const car: Car = {
  model: "bmw",
  dynamic_1: true,
  tuple: [1, 2],
  optionalFeature: "sunroof",
};

const dynamicOnly: PickDynamic1 = {
  dynamic_1: car.dynamic_1,
};

const withoutTuple: OmitTuple = {
  model: car.model,
  dynamic_1: car.dynamic_1,
  optionalFeature: car.optionalFeature,
};

const partial: PartialCar = {
  model: car.model,
};

const upperModel: UpperModel = "BMW";
