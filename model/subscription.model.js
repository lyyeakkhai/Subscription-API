import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    // subscription name is required it tell us who subscribed
    name:{
        type:String,
        required:[true,"Subscription name is required"],
        trim:true,
        minlength:2,
        maxlength:100,
    },
    // subscription price is required
    price:{
        type:Number,
        required:[true,"Subscription price is required"],
        min:[0, "Subscription price must be greater than 0"],
        max:[10000, "Subscription price must be at most 10000"],
    },
    // this is optional but it best practice to have currency field
    currency:{
        type:String,
        required:[true,"Currency is required"],
        enum:["USD","EUR","KHR"], // list of supported currencies
        default:"USD", // default currency is USD
    },
    // subscription frequency is required to know how often user will be charged
    frequency:{
        type:String,
        required:[true,"Subscription frequency is required"],
        enum:["daily","weekly","monthly","yearly"], // list of supported frequencies
        default:"monthly", // default frequency is monthly
    },
    // subscription category it is requirement to know what type of subscription it is
    category:{
        type:String,
        required:[true,"Subscription category is required"],
        enum:["entertainment","education","productivity","health","other"], // list of supported categories
        default:"other", // default category is other
    },
    paymentMethod:{
        type:String,
        required:[true,"Payment method is required"],
        trim:true,
        enum:["credit_card","debit_card","paypal","bank_transfer","other"], // list of supported payment methods
        default:"credit_card", // default payment method is credit card
    },
    status:{
        type:String,
        required:[true,"Subscription status is required"],
        enum:["active","inactive","canceled","paused"], // list of supported statuses
        defalut:"active", // default status is active
    },
    statertDate:{
        type:Date,
        required:[true,"Start date is required"],
        validate:{
            validator: (value) => {
                value <= new Date();
            },
            message:"Start date cannot be in the future"
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator: function (value) {
                return value > this.statertDate;
            },
            message:"Renewal date must be in the future"
        }
    },
    // reference to the user who subscribed 
    // we can point to another model using ref instead of create a dupplicate field
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"],
        index:true, // create index for faster query
    }
    

}, {timestamps:true})


// when user subscription we dont need user to pass the renewal every time they subscribe or new user create subscription
// we can create a function which calculate the date when ever user connitue the subscription monthly or yearly 
// this function will update the renewalDate field before saving the document
SubscriptionSchema.pre("save", async function() {
    
    // when user connitnue subscription we will update the renewalDate automatically

    // this will check if the renewalDate is not pass
    if(!this.renewalDate){

        // to calculate the renewal date based we need renewal period date month and year 
        // so this object will help us to map the frequency to number of days
        const renewalPeriod = {
            "daily":1,
            "weekly":7,
            "monthly":30,
            "yearly":365,
        };

        // we need to set the renewal to the starter date first
        // then we add the number of days based on the frequency of subscription plan
        // the logic of renual date must be stater date + frequency period of plan that user selected (monthly, yearly, etc)
        this.renewalDate = new Date(this.statertDate);
        // then we can add the number of days to the starter date
        // the frequency is the subscription plan that user selected monlthy, yearly, etc
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    // automatic update the status when renewal date is passed
    //why we need to set if condition to the status to expired because when when the subcription is create the status is active by default 
    // if user plan is one month so the renewal date is one month from the start date after one month the status will be expired
    if(this.renewalDate < new Date()){
     this.status ="expired";
    }


    // we call next to move to the next middleware or save the document
    // because when we using pre save the operation save is paused to run presave function then middleware we need to call next to move to the next step
});



const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;

