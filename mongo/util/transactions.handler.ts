import { startSession } from "mongoose";

export const handleTransaction = async (fn: Function) => {
    const session = await startSession();
    session.startTransaction();
    try {
        await fn(session);
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};