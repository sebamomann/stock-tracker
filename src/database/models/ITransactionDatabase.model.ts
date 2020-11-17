import {ITransactionShared} from "../../interface/shared/ITrasactionShared";

export interface ITransactionDatabaseModel extends ITransactionShared {
    // defines if is purchase or sale transaction
    option: number;
}
