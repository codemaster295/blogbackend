const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')
// Create Schema
const ProductSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
    },
    Discount: {
        type: Number,
    },
    Images: {

        type: Array
    },
    General: {

        Gender: { type: String },
        Series: { type: String },
        ProductType: { type: String },
        ProductCode: { type: String }
    }
    ,
    Dial: {

        DialColor: { type: String },
        DialType: { type: String },
    },

    Case: {

        CaseColor: { type: String },
        CaseShape: { type: String },
        CaseSize: { type: String },
        CaseMaterial: { type: String },
        CaseThickness: { type: String },
        CaseBazel: { type: String },

    },

    Band: {

        BandWidth: { type: String },
        BandMateriel: { type: String },
    },
    AdditionInformation: {

        Features: { type: String },
        WaterResistant: { type: String },
        CountryOrigin: { type: String },
        ManufacturedBy: { type: String },
        ImportedBy: { type: String },
        PackedBy: { type: String },
    },
    Hot: {
        type: Boolean,
        default: false
    }

});

module.exports = model("Product", ProductSchema);