interface Car {
  model: string;
  price: number;
  dynamic_1: Record<string, string>;
  dynamic_2: {
    [key: string]: string;
  };
  tuple: [string, number, string];
}

type a = keyof Car;
