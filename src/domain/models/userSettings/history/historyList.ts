import { ValueObject } from "../../utils/valueObject";
import { History } from "./history";
import type { HistoryJSON } from "./historyJSON";

export class HistoryList extends ValueObject<readonly History[]> {
    constructor(histories?: readonly History[]) {
        super(histories ?? []);
    }

    static fromHistoryJSON(objs: readonly HistoryJSON[]): HistoryList {
        return new HistoryList(
            objs
                .map((v) => History.create(v.id, v.closedPageIndex))
                .filter((v) => v != null),
        );
    }

    equals(other: this): boolean {
        if (this.value.length !== other.value.length) return false;
        return this.value.every((v, i) => other.value[i].equals(v));
    }

    /**
     * 新たな履歴をリストの先頭に追加する（最大100件）\
     * すでに存在する場合、リストの先頭に移動する
     */
    tryPrepend(id: string): HistoryList {
        const index = this.value.findIndex((v) => v.id === id);
        if (index === -1) return new HistoryList(this.prepend(id));
        return new HistoryList(this.moveToHead(index));
    }

    private prepend(id: string): readonly History[] {
        const histories = [History.createSafe(id), ...this.value];
        if (histories.length <= 100) return histories;
        return histories.slice(0, 100);
    }

    private moveToHead(index: number): readonly History[] {
        if (index <= 0) return this.value;

        const array = [...this.value];
        const [element] = array.splice(index, 1);
        array.unshift(element);
        return array;
    }

    /** 履歴を更新した新しいインスタンスを返す */
    update(history: History): HistoryList {
        const newHistories = this.value.map((v) =>
            v.equals(history) ? history : v,
        );
        return new HistoryList(newHistories);
    }

    /** idに紐付く最後に閉じたページのインデックスを返す */
    getClosedPageIndex(id: string): number | undefined {
        return this.value.find((v) => v.id === id)?.closedPageIndex;
    }
}
