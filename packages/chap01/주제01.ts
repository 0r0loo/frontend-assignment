type Painter = (indicator: number) => void;

const drawLinearProgressDraw: Painter = (indicator) => {
  // 선형
};

const drawCircularProgressDraw: Painter = (indicator) => {
  // 원형
};

type Config = {
  intervalSecond?: number;
  completeIndicator?: number;
  completeCallback?: () => void;
};

const startWork = (
  painterCallback: Painter,
  initIndicator = 0,
  config: Config = {
    intervalSecond: 1000,
    completeIndicator: 100,
  },
) => {
  let indicator = initIndicator;
  const intervalId = setInterval(() => {
    if (indicator === config.completeIndicator) {
      clearInterval(intervalId);
      config.completeCallback?.();
    }
    indicator += 10;
    painterCallback(indicator);
  }, config.completeIndicator);
};

startWork(drawLinearProgressDraw, 0, {
  completeCallback: () => {
    console.log("작업 완료");
  },
});
