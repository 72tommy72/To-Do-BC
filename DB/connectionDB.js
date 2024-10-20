import mongoose from "mongoose";

export const connectionDB = async () => {
    await mongoose
        .connect(process.env.DB)
        .then(() => {
            console.log("connect with DB is successfully");
        })
        .catch((err) => {
            console.log("connect with DB is Filed" + err);
        });
};
