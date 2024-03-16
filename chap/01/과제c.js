function Worker (health) {
    this._health = health ?? 10;
}

function JuniorEngineer(health, intelligence) {
    this._super(health);
    this._intelligence = intelligence ?? 1;
    this._isBornGenius = false;
}
//- 생성자 함수는 수정하지 마세요

// 여기에 코드를 작성하세요
// TO-DO
//- 여기에 코드를 작성하세요


Worker.prototype.work = function () {
    this._health--;
}

Worker.prototype.getHealth = function () {
    return this._health;
}

JuniorEngineer.prototype = Object.create(Worker.prototype);
JuniorEngineer.prototype._super = Worker;
JuniorEngineer.prototype.getIntelligence = function () {
    return this._intelligence;
}

JuniorEngineer.prototype.isBornGenius = function () {
    return this._isBornGenius ?? false;
}

JuniorEngineer.prototype.work = function () {
    Worker.prototype.work.call(this);
    this._intelligence++;
    if (this._intelligence > 10) {
        this._isBornGenius = true;
    }
}
