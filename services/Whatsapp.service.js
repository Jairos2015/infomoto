import MotoModel from "../models/Moto.js";
// const whatsappService = {}; 

'use strict';
// const request = require('request');
import request from 'request';
import axios from 'axios';
// const PDFDocument = require('pdfkit');
import PDFDocument from 'pdfkit';
// const fs = require('fs');
import fs from 'fs';
// module.exports = class EcommerceStore {
export default class WhatsappService {
    constructor() {}
    async _fetchAssistant(endpoint) {
        console.log("ENDPOINT: "+endpoint);
        const url = `https://frightened-panama-hat-eel.cyclic.app/api/v1${endpoint ? endpoint : '/'}`;
        console.log(url);
        const {data} = await axios.get(url, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              // console.log(data);
              return {
                status: 'success',
                data: data,
            }
        /* return new Promise((resolve, reject) => {
            // request.get(`https://fakestoreapi.com${endpoint ? endpoint : '/'}`,
            console.log("ENDPOINT: "+endpoint);
            // request.get(`https://f08a-179-1-67-82.ngrok.io/api/v1${endpoint ? endpoint : '/'}`,
            const {data} = axios.get(`https://f08a-179-1-67-82.ngrok.io/api/v1${endpoint ? endpoint : '/'}`,{}, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              console.log(data);
                
                (error, res, body) => {
                    try {
                        if (error) {
                            reject(error);
                        } else {
                          // body lanza una página en HTML
                          console.log("BODY: "+body);
                            resolve({
                                status: 'success',
                                data: JSON.parse(body),
                            });
                        }
                    } catch (error) {
                        reject(error);
                    }
                } 
        }); */
    }

    async getByBrandAll(marcaSeleccionada) {
        console.log("SELECCION" + marcaSeleccionada);
        return await this._fetchAssistant(`/motos/listarpormarca?marca=${marcaSeleccionada}`)
    } 
    async getBrandAll() {
        return await this._fetchAssistant(`/motos/listar`, '')
    }
    async getProductById(productId) {
        return await this._fetchAssistant(`/products/${productId}`);
    }
    async getAllCategories() {
        return await this._fetchAssistant('/products/categories?limit=100');
    }
    async getProductsInCategory(categoryId) {
        return await this._fetchAssistant(
            `/products/category/${categoryId}?limit=10`
        );
    }

    generatePDFInvoice({ order_details, file_path }) {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(file_path));
        doc.fontSize(25);
        doc.text(order_details, 100, 100);
        doc.end();
        return;
    }

    generateRandomGeoLocation() {
        let storeLocations = [
            {
                latitude: 44.985613,
                longitude: 20.1568773,
                address: 'New Castle',
            },
            {
                latitude: 36.929749,
                longitude: 98.480195,
                address: 'Glacier Hill',
            },
            {
                latitude: 28.91667,
                longitude: 30.85,
                address: 'Buena Vista',
            },
        ];
        return storeLocations[
            Math.floor(Math.random() * storeLocations.length)
        ];
    }
};


