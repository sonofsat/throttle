import throttle from './throttle'; 

jest.useFakeTimers();

describe('throttle', () => {
  it('debería limitar las llamadas', () => {
    const func = jest.fn();
    const throttledFunc = throttle(func, 1000);

    throttledFunc();
    throttledFunc();
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);

    throttledFunc();

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('debería llamar a la función con los últimos argumentos', () => {
    const func = jest.fn();
    const throttledFunc = throttle(func, 1000);

    throttledFunc(1);
    throttledFunc(2);
    throttledFunc(3);

    jest.advanceTimersByTime(1000);

    expect(func).toHaveBeenCalledWith(1);
    jest.advanceTimersByTime(1000);

    throttledFunc(4);
    jest.advanceTimersByTime(1000);

    expect(func).toHaveBeenLastCalledWith(4);
  });
});
