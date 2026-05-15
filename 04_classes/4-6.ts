export interface User {
  readonly id: number;
  userName: string;
  surname: string;
  age?: number;
  country?: string;
  coins: number;

  addCoin(amount: number): void;
  removeCoin(amount: number): void;
  getCoins(): string;
}

interface EmployedUser extends User {
  job: string;
}

const ivan: User = {
  id: 1,
  userName: "Ivan",
  surname: "Ivanov",
  coins: 5,
  age: 25,

  addCoin(amount: number) {
    this.coins += amount;
  },
  removeCoin(amount: number) {
    this.coins -= amount;
  },
  getCoins() {
    return `Количество монет ${this.coins}`;
  },
};

class AnyClass implements EmployedUser {
  readonly id: number;
  userName: string;
  surname: string;
  coins: number;
  age: number;
  job: string;
  country?: string;

  constructor(
    id: number = 1,
    userName: string = "test",
    surname: string = "testov",
    coins: number = 5,
    age: number = 25,
    job: string = "developer",
    country: string = "russia",
  ) {
    this.id = id;
    this.userName = userName;
    this.surname = surname;
    this.coins = coins;
    this.age = age;
    this.job = job;
    this.country = this.country;
  }

  addCoin(amount: number) {
    this.coins += amount;
  }

  removeCoin(amount: number) {
    this.coins -= amount;
  }

  getCoins() {
    return `Количество монет ${this.coins}`;
  }
}
