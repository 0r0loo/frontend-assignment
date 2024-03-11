class HardWork {
    constructor() {
        this._result = 0;
        this._tasks = this._initTasks();
    }

    do() {
        // for (let i = 0; i < this._tasks.length; i++) {
        //   this._tasks[i]();
        // }
        this.doTaskListInBatch(0, 500)
    }

    doTaskListInBatch(index, batchSize) {
        const endIndex = Math.min(index + batchSize, this._tasks.length);

        for (let i = index; i < endIndex; i++) {
            this._tasks[i]();
        }

        if (endIndex < this._tasks.length) {
            setTimeout(() => this.doTaskListInBatch(endIndex, batchSize), 0);
        }
    }


    // do() 이외의 메서드는 수정하지마세요
    get result() {
        return this._result;
    }
    _initTasks() {
        const count = 10000;
        const tasks = new Array(count);

        for (let i = 0; i < count; i++) {
            tasks[i] = this._createTask(Math.floor(Math.random() * 3) + 1);
        }

        return tasks;
    }
    _createTask = (n) => () => {
        for (let i = 0; i < 1000; i++) {
            const randnum = Math.random();
            const alpha = Math.floor(randnum * 10) % n;

            if (alpha > 0) {
                this._result += alpha;
            }
        }

        this._sendLog();
    }
    async _sendLog() {
        const blob = new Blob([JSON.stringify({
            value: this._result.toFixed(2),
        }, null, 2)], {
            type: "application/json",
        });

        const res = await blob.text();
        JSON.parse(res);
    }
    //- do() 이외의 메서드는 수정하지마세요
}