
// # Zadanie 1
const asyncAdd = async (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Argumenty muszą mieć typ number!");
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sum = a + b;
      resolve(sum);
    }, 100);
  });
};

const addNumbers = async (...args) => {
  const startTime = performance.now();
  if (args.length === 0) return 0;
  if (args.length === 1) return args[0];

  while (args.length > 1) {
    const promises = [];
    for (let i = 0; i < args.length; i += 2) {
      if (i + 1 < args.length) {
        promises.push(asyncAdd(args[i], args[i + 1]));
      } else {
        promises.push(Promise.resolve(args[i]));
      }
    }
    args = await Promise.all(promises);
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return { result: args[0], executionTime };
};

const measurePerformance = async () => {
  const data = generateRandomArray();
  const resultWithTime = await addNumbers(...data);
  const { result, executionTime } = resultWithTime;

  console.log(`Rozmiar danych: ${100}`);
  console.log(`Wynik dodawania: ${result}`);
  console.log(`Czas wykonania: ${executionTime} ms`);
};

const generateRandomArray = () => {
  const array = [];
  for (let i = 0; i < 100; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

measurePerformance();
