import mongoose, {Schema} from "mongoose"; 


const SubscriptionSchema = new Schema({})



export const Subscription = mongoose.model("Subscription", SubscriptionSchema);