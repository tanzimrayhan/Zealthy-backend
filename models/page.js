import mongoose from "mongoose";

const pageSchema= new mongoose.Schema({
    pageNo: {
        type: Number,
        required: true
    },
    componentList: {
        type: Array,
        required: true
    }
});

const Page= mongoose.model('Page', pageSchema);

export default Page;