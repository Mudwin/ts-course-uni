class Stack<T> {
  stack: T[];

  constructor() {
    this.stack = [];
  }

  add(elem: T) {
    this.stack.push(elem);
  }

  delete() {
    return this.stack.pop();
  }

  getLength() {
    return this.stack.length;
  }

  checkLastElement() {
    return this.stack[this.stack.length - 1];
  }

  showElements() {
    console.log(this.stack.join(" "));
  }
}

class HanoiTower<T = string, U = number> {
  rod1: T;
  rod2: T;
  rod3: T;

  stack1: Stack<U>;
  stack2: Stack<U>;
  stack3: Stack<U>;

  constructor(
    rod1: T = "First" as T,
    rod2: T = "Second" as T,
    rod3: T = "Third" as T,
  ) {
    this.rod1 = rod1;
    this.rod2 = rod2;
    this.rod3 = rod3;

    this.stack1 = new Stack<U>();
    this.stack2 = new Stack<U>();
    this.stack3 = new Stack<U>();
  }

  addDisks(arr: U[]) {
    for (let disk of arr) {
      this.stack1.add(disk);
    }
  }

  getStack(rod: T) {
    if (rod == this.rod1) {
      return this.stack1;
    }

    if (rod == this.rod2) {
      return this.stack2;
    }

    if (rod == this.rod3) {
      return this.stack3;
    }
  }

  moveOne(from: T, to: T) {
    const disk = this.getStack(from)?.delete();

    if (disk === undefined) {
      throw new Error(`На стержне ${from} нет дисков`);
    }

    this.getStack(to)?.add(disk);
    console.log(`Переместить диск ${disk} с ${from} на ${to}`);
  }

  moveTower(height: number, source: T, target: T, extra: T) {
    if (height == 1) {
      this.moveOne(source, target);
    } else {
      this.moveTower(height - 1, source, extra, target);
      this.moveOne(source, target);
      this.moveTower(height - 1, extra, target, source);
    }
  }

  solve() {
    let n = this.stack1.getLength();

    if (n > 0) {
      this.moveTower(n, this.rod1, this.rod2, this.rod3);
    }
  }
}
