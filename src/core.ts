export const check = (limit: number, nums: number[], checkFunc: any) => {
  if (nums.length < limit) {
    return false;
  }
  return nums.map((num) => checkFunc(num)).length == 5;
};

export const randomNum = (min = 1, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fibo = (max: number) => {
  const result = [1, 1];
  let i = 2;
  let num = 0;
  while (num < max) {
    num = result[i - 1] + result[i - 2];
    if (num < max) {
      result.push(num);
    }
    i++;
  }

  return result;
};

export const isPrime = (num: number) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
  return num > 1;
};

export const prime = () => {
  const result = [];

  for (let i = 1; i < 100; i++) {
    if (isPrime(i)) {
      result.push(i);
    }
  }

  return result;
};

export const pick = (limit: number, option: number[]) => {
  if (option.length < limit) {
    return option;
  }
  let arr = [...option];
  return Array.from({ length: limit }, (_, i) => {
    const index = Math.floor(Math.random() * arr.length);
    const num = arr[index];
    arr = arr.filter((item) => item !== num);

    return num;
  });
};

export const isComposite = (n: number) => {
  // Corner cases
  if (n <= 1) return false;
  if (n <= 3) return false;

  if (n % 2 === 0 || n % 3 === 0) return true;

  for (let i = 5; i * i <= n; i = i + 6) if (n % i === 0 || n % (i + 2) === 0) return true;

  return false;
};

export const composite = () => {
  const result = [];

  for (let i = 1; i < 100; i++) {
    if (isComposite(i)) {
      result.push(i);
    }
  }

  return result;
};

export const even = (min = 0, max = 100) => {
  const result = [];

  for (let i = min; i < max; i++) {
    if (isEven(i)) {
      result.push(i);
    }
  }

  return result;
};

export const odd = (min = 0, max = 100) => {
  const result = [];

  for (let i = min; i < max; i++) {
    if (isOdd(i)) {
      result.push(i);
    }
  }

  return result;
};

export const isDivisible = (base: number, num: number) => num % base === 0;

export const divisible = (base: number, limit = 5, min = 0, max = 100) => {
  const result = [];
  for (let i = min; i < max; i++) {
    if (isDivisible(base, i)) {
      result.push(i);
      if (result.length >= limit) {
        return result;
      }
    }
  }

  return result;
};

export const isPerfectSquare = (x: number) => {
  let s = parseInt(String(Math.sqrt(x)));
  return s * s === x;
};
export const isFibonacci = (n: any) => {
  return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
};

export const isEven = (num: number) => num % 2 === 0;
export const isOdd = (num: number) => num % 2 !== 0;

export const genOption = (limitOption: number, max: number, result: number[]) => {
  const options = Array.from({ length: limitOption }, () => 0);
  Array.from({ length: limitOption }, () => 0).map((item, index) => {
    while (true) {
      const num = randomNum(0, max);
      if (!options.includes(num) && !result.includes(num)) {
        options[index] = num;
        return;
      }
    }
  });
  return options;
};

export const quest: any = {
  fibonacci: {
    name: 'fibonacci',
    quest_title: (limit: number, min: number, max: number) =>
      `Tìm ${limit} số trong dãy fibonacci${min ? ` Lớn hơn ${min}` : ''}${max ? ` Bé hơn ${max}` : ''}`,
    check: (limit: number, nums: number[], min: number, max: number) => check(limit, nums, isFibonacci),
    options: (limitOption: number, limitResult: number, max = 100, result: number[]) => {
      const options = genOption(limitOption, max, result);
      const indexArray: any[] = [];
      result.map((item) => {
        while (true) {
          const index = randomNum(0, limitOption);
          if (!indexArray.includes(index)) {
            options[index] = item;
            indexArray.push(index);
            return;
          }
        }
      });

      return options;
    },
  },
  odd: {
    name: 'odd',
    quest_title: (limit: number, min = 0, max: number) =>
      `Tìm ${limit} số lẻ${min ? ` Lớn hơn ${min}` : ''}${max ? ` Bé hơn ${max}` : ''}`,
    check: (limit: number, nums: number[], min = 0, max = 100) =>
      check(limit, nums, isOdd) && checkMinMax(nums, limit, min, max),
    options: (limitOption: number, limitResult: number, min = 0, max = 100, result: number[]) => {
      const options = genOption(limitOption, max, result);
      const indexArray: any[] = [];
      result.map((item) => {
        while (true) {
          const index = randomNum(0, limitOption);
          if (!indexArray.includes(index)) {
            options[index] = item;
            indexArray.push(index);
            return;
          }
        }
      });

      return options;
    },
  },
  even: {
    name: 'even',
    quest_title: (limit: number, min = 0, max: any) =>
      `Tìm ${limit} số chẳn${min ? ` Lớn hơn ${min}` : ''}${max ? ` Bé hơn ${max}` : ''}`,
    check: (limit: number, nums: number[], min = 0, max = 100) =>
      check(limit, nums, isEven) && checkMinMax(nums, limit, min, max),
    options: (limitOption: number, limitResult: number, min = 0, max = 100, result: number[]) => {
      const options = genOption(limitOption, max, result);
      const indexArray: any[] = [];
      result.map((item) => {
        while (true) {
          const index = randomNum(0, limitOption);
          if (!indexArray.includes(index)) {
            options[index] = item;
            indexArray.push(index);
            return;
          }
        }
      });

      return options;
    },
  },
};

export const genQuest = (
  name: string,
  min: number,
  max: number,
  limitResult: number,
  limitOption = 50,
  result: number[]
) => {
  return {
    quest_title: quest[name].quest_title(limitResult, min, max),
    check: (nums: any) => quest[name].check(limitResult, nums, min, max),
    options: quest[name].options(limitOption, limitResult, min, max, result),
  };
};
const checkMinMax = (arr: number[], limit: number, min = 0, max = 100) => {
  const result = arr.filter((item) => item >= min && item <= max);
  return result.length === limit;
};

export const appContent = {
  easy: {
    quest: [
      genQuest('odd', 10, 100, 5, 50, pick(5, odd(10, 100))),
      genQuest('odd', 10, 100, 5, 50, pick(5, odd(10, 100))),
      genQuest('odd', 10, 100, 5, 50, pick(5, odd(10, 100))),
      genQuest('odd', 10, 100, 5, 50, pick(5, odd(10, 100))),
      genQuest('even', 0, 100, 5, 50, pick(5, even(0, 100))),
      genQuest('even', 0, 100, 5, 50, pick(5, even(0, 100))),
      genQuest('even', 0, 100, 5, 50, pick(5, even(0, 100))),
      genQuest('even', 0, 100, 5, 50, pick(5, even(0, 100))),
      genQuest('even', 0, 100, 5, 50, pick(5, even(0, 100))),
      genQuest('even', 0, 100, 5, 50, pick(5, even(0, 100))),
      // genQuest('fibonacci', 0, 100, 5, 50, pick(5, fibo(100))),
      // genQuest('fibonacci', 0, 100, 5, 50, pick(5, fibo(100))),
    ],
  },
};
