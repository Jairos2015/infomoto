import whatsappService from '../services/Whatsapp.service.js';
import express from "express";
const router = express.Router();
import Moto from '../models/moto.js'
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';
//
const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId,
});
let WhatsappClass = new whatsappService();
let listOfBrands=[];
// const CustomerSession = new Map();
//******************
//**** A P I *******
//******************
import {validationResult} from 'express-validator';

//
export const getWhatsapp = async (req, res) => {
// router.get('/meta_wa_callbackurl', (req, res) => {
  // console.log(req.body);
  try {
      console.log('GET: alguien llama pidiendo datos!');
      console.log(req.query);
      let mode = req.query['hub.mode'];
      let token = req.query['hub.verify_token'];
      let challenge = req.query['hub.challenge'];

      if (
          mode &&
          token &&
          mode === 'subscribe' &&
          process.env.Meta_WA_VerifyToken === token
      ) {
          return res.status(200).send(challenge);
      } else {
          return res.sendStatus(403);
      }
  } catch (error) {
      // console.error({error})
      return res.sendStatus(500);
  }
};

export const postWhatsapp = async (req, res) => {
// router.post('/meta_wa_callbackurl', async (req, res) => {
  // console.log(JSON.stringify(req.body));
  //res.send(JSON.stringify(req.body));
  try {
    let data = Whatsapp.parseMessage(req.body);
      // console.log(data);
    if (data?.isMessage) {
        let incomingMessage = data.message;
        let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
        let recipientName = incomingMessage.from.name;
        let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
        let message_id = incomingMessage.message_id; // extract the message id
        console.log(incomingMessage);
        console.log(incomingMessage.timestamp);
        function format_time(s) {
            return new Date(s * 1e3).toISOString().slice(-13, -5);
          }
          
        console.log( format_time(incomingMessage.timestamp) );
        // var s = new Date(incomingMessage.timestamp).toLocaleTimeString("en-US")
        // console.log(s)
        // return res.sendStatus(200);
        
        if (typeOfMsg === 'text_message') {
          // let selectedCategory = button_id.split('category_')[1];
          listOfBrands = await WhatsappClass.getBrandAll();
          // console.log(listOfBrands);
          let listOfSections = [
                {           
                    title: `🏆 Top 3: `,
                    rows: listOfBrands.data.map((brand) => {
                            let id = `brand_${brand}`;
                            let title = brand.substring(0,21);
                            let description= brand.substring(0,21);
                            return {
                                id,
                                title: `${title}`,
                                description: `${description}`
                            };
                        }).slice(0, 10)
                },
             ];
          console.log(listOfSections);
         await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `InfoMoto - La Guía de las Motos`,
            bodyText: `Esta es la lista de marcas de motos.\n\nFavor seleccionar una de ellas:`,
            footerText: 'Creado por: mTTcSoft - Kassike',
            listOfSections,
         });
        }
        if (typeOfMsg === 'radio_button_message') {
            console.log(incomingMessage.list_reply);
            let selectionId = incomingMessage.list_reply.id;
            if (selectionId.startsWith('brand_')) {
                let motos = await WhatsappClass.getByBrandAll(incomingMessage.list_reply.title);
                if(motos.status === 'success') {
                    console.log("motos.data.data");
                    res.sendStatus(200);
                }
            }
            
        }
        
        /*
        if (typeOfMsg === 'radio_button_message') {
            console.log(incomingMessage.list_reply);
            let selectionId = incomingMessage.list_reply.id; // the customer clicked and submitted a radio button
            if (selectionId.startsWith('brand_')) {
                let brand_id = selectionId.split('_')[1];
                let brand = await WhatsappClass.getByBrandAll(brand_id);
                const { price, title, description, category, image: imageUrl, rating } = product.data;
            
                let emojiRating = (rvalue) => {
                    rvalue = Math.floor(rvalue || 0); // generate as many star emojis as whole number ratings
                    let output = [];
                    for (var i = 0; i < rvalue; i++) output.push('⭐');
                    return output.length ? output.join('') : 'N/A';
                };
            
                let text = `_Title_: *${title.trim()}*\n\n\n`;
                text += `_Description_: ${description.trim()}\n\n\n`;
                text += `_Price_: $${price}\n`;
                text += `_Category_: ${category}\n`;
                text += `${rating?.count || 0} shoppers liked this product.\n`;
                text += `_Rated_: ${emojiRating(rating?.rate)}\n`;
            
                await Whatsapp.sendImage({
                    recipientPhone,
                    url: imageUrl,
                    caption: text,
                });
            
                await Whatsapp.sendSimpleButtons({
                    message: `Here is the product, what do you want to do next?`,
                    recipientPhone: recipientPhone, 
                    listOfButtons: [
                        {
                            title: 'Add to cart🛒',
                            id: `add_to_cart_${product_id}`,
                        },
                        {
                            title: 'Speak to a human',
                            id: 'speak_to_human',
                        },
                        {
                            title: 'See more products',
                            id: 'see_categories',
                        },
                    ],
                });
            }
        } */
       
    }
  } catch (error) {
    console.log(error);
  }
  /*
  try {
    //
    let data = Whatsapp.parseMessage(req.body);
      console.log(data);
    if (data?.isMessage) {
        let incomingMessage = data.message;
        let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
        let recipientName = incomingMessage.from.name;
        let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
        let message_id = incomingMessage.message_id; // extract the message id
        console.log(incomingMessage);
       //
       // Start of cart logic
          if (!CustomerSession.get(recipientPhone)) {
              CustomerSession.set(recipientPhone, {
                  cart: [],
              });
          }

          let addToCart = async ({ product_id, recipientPhone }) => {
              let product = await WhatsappClass.getProductById(product_id);
              if (product.status === 'success') {
                  CustomerSession.get(recipientPhone).cart.push(product.data);
              }
          };

          let listOfItemsInCart = ({ recipientPhone }) => {
              let total = 0;
              let products = CustomerSession.get(recipientPhone).cart;
              total = products.reduce(
                  (acc, product) => acc + product.price,
                  total
              );
              let count = products.length;
              return { total, products, count };
          };

          let clearCart = ({ recipientPhone }) => {
              CustomerSession.get(recipientPhone).cart = [];
          };
          // End of cart logic

// if (typeOfMsg === 'text_message') { ... // This line already exists. Add the above lines...
        //
        if (typeOfMsg === 'text_message') {
          await Whatsapp.sendSimpleButtons({
              message: `Hola ${recipientName}, \nUsted se comunica con el chatbot.\nQué desea hacar ahora?.`,
              recipientPhone: recipientPhone, 
              listOfButtons: [
                  {
                      title: 'Mirar unos productos',
                      id: 'see_categories',
                  },
                  {
                      title: 'Hablar con humano',
                      id: 'speak_to_human',
                  },
                  {
                      title: 'Enviar PQR',
                      id: 'pqr',
                  },
              ],
          });
          // console.log(typeOfMsg);
      }
      if (typeOfMsg === 'simple_button_message') {
          let button_id = incomingMessage.button_reply.id;
          //
          if (button_id.startsWith('add_to_cart_')) {
              let product_id = button_id.split('add_to_cart_')[1];
              await addToCart({ recipientPhone, product_id });
              let numberOfItemsInCart = listOfItemsInCart({ recipientPhone }).count;
          
              await Whatsapp.sendSimpleButtons({
                  message: `Your cart has been updated.\nNumber of items in cart: ${numberOfItemsInCart}.\n\nWhat do you want to do next?`,
                  recipientPhone: recipientPhone, 
                  listOfButtons: [
                      {
                          title: 'Checkout 🛍️',
                          id: `checkout`,
                      },
                      {
                          title: 'See more products',
                          id: 'see_categories',
                      },
                  ],
              });
          }
          //
          //
          if (button_id === 'print_invoice') {
              // Send the PDF invoice
              await Whatsapp.sendDocument({
                  recipientPhone: recipientPhone,
                  caption:`Mom-N-Pop Shop invoice #${recipientName}`,
                  file_path: `./invoice_${recipientName}.pdf`,
              });
            
              // Send the location of our pickup station to the customer, so they can come and pick up their order
              let warehouse = WhatsappClass.generateRandomGeoLocation();
            
              await Whatsapp.sendText({
                  recipientPhone: recipientPhone,
                  message: `Your order has been fulfilled. Come and pick it up, as you pay, here:`,
              });
            
              await Whatsapp.sendLocation({
                  recipientPhone,
                  latitude: warehouse.latitude,
                  longitude: warehouse.longitude,
                  address: warehouse.address,
                  name: 'Mom-N-Pop Shop',
              });
            }
          //
          //
          if (button_id === 'checkout') {
              let finalBill = listOfItemsInCart({ recipientPhone });
              let invoiceText = `List of items in your cart:\n`;
            
              finalBill.products.forEach((item, index) => {
                  let serial = index + 1;
                  invoiceText += `\n#${serial}: ${item.title} @ $${item.price}`;
              });
            
              invoiceText += `\n\nTotal: $${finalBill.total}`;
            
              WhatsappClass.generatePDFInvoice({
                  order_details: invoiceText,
                  file_path: `./invoice_${recipientName}.pdf`,
              });
            
              await Whatsapp.sendText({
                  message: invoiceText,
                  recipientPhone: recipientPhone,
              });
            
              await Whatsapp.sendSimpleButtons({
                  recipientPhone: recipientPhone,
                  message: `Thank you for shopping with us, ${recipientName}.\n\nYour order has been received & will be processed shortly.`,
                  message_id,
                  listOfButtons: [
                      {
                          title: 'See more products',
                          id: 'see_categories',
                      },
                      {
                          title: 'Print my invoice',
                          id: 'print_invoice',
                      },
                  ],
              });
            
              clearCart({ recipientPhone });
            }
          //
          if (button_id === 'speak_to_human') {
              await Whatsapp.sendText({
                  recipientPhone: recipientPhone,
                  message: `Arguably, chatbots are faster than humans.\nCall my human with the below details:`,
              });
      
              await Whatsapp.sendContact({
                  recipientPhone: recipientPhone,
                  contact_profile: {
                      addresses: [
                          {
                              city: 'Nairobi',
                              country: 'Kenya',
                          },
                      ],
                      name: {
                          first_name: 'Daggie',
                          last_name: 'Blanqx',
                      },
                      org: {
                          company: 'Mom-N-Pop Shop',
                      },
                      phones: [
                          {
                              phone: '+1 (555) 025-3483',
                          },
                                              {
                              phone: '+254712345678',
                          },
                      ],
                  },
              });
          }
          if (button_id === 'see_categories') {
              let categories = await WhatsappClass.getAllCategories(); 
              await Whatsapp.sendSimpleButtons({
                  message: `We have several categories.\nChoose one of them.`,
                  recipientPhone: recipientPhone, 
                  listOfButtons: categories.data
                      .map((category) => ({
                          title: category,
                          id: `category_${category}`,
                      }))
                      .slice(0, 3)
              });
          }
          if (button_id === 'pqr') {
              let categories = await WhatsappClass.getAllCategories(); 
              await Whatsapp.sendSimpleButtons({
                  message: `We have several categories.\nChoose one of them.`,
                  recipientPhone: recipientPhone, 
                  listOfButtons: categories.data
                      .map((category) => ({
                          title: category,
                          id: `category_${category}`,
                      }))
                      .slice(0, 3)
              });
          }
          if (button_id.startsWith('category_')) {
              let selectedCategory = button_id.split('category_')[1];
              let listOfProducts = await WhatsappClass.getProductsInCategory(selectedCategory);
          
              let listOfSections = [
                  {
                      title: `🏆 Top 3: ${selectedCategory}`.substring(0,24),
                      rows: listOfProducts.data
                          .map((product) => {
                              let id = `product_${product.id}`.substring(0,256);
                              let title = product.title.substring(0,21);
                              let description = `${product.price}\n${product.description}`.substring(0,68);
                             
                              return {
                                  id,
                                  title: `${title}...`,
                                  description: `$${description}...`
                              };
                          }).slice(0, 10)
                  },
              ];
          
              await Whatsapp.sendRadioButtons({
                  recipientPhone: recipientPhone,
                  headerText: `#BlackFriday Offers: ${selectedCategory}`,
                  bodyText: `Our Santa 🎅🏿 has lined up some great products for you based on your previous shopping history.\n\nPlease select one of the products below:`,
                  footerText: 'Powered by: BMI LLC',
                  listOfSections,
              });
          }
      };
      if (typeOfMsg === 'radio_button_message') {
          let selectionId = incomingMessage.list_reply.id; // the customer clicked and submitted a radio button
          if (selectionId.startsWith('product_')) {
              let product_id = selectionId.split('_')[1];
              let product = await WhatsappClass.getProductById(product_id);
              const { price, title, description, category, image: imageUrl, rating } = product.data;
          
              let emojiRating = (rvalue) => {
                  rvalue = Math.floor(rvalue || 0); // generate as many star emojis as whole number ratings
                  let output = [];
                  for (var i = 0; i < rvalue; i++) output.push('⭐');
                  return output.length ? output.join('') : 'N/A';
              };
          
              let text = `_Title_: *${title.trim()}*\n\n\n`;
              text += `_Description_: ${description.trim()}\n\n\n`;
              text += `_Price_: $${price}\n`;
              text += `_Category_: ${category}\n`;
              text += `${rating?.count || 0} shoppers liked this product.\n`;
              text += `_Rated_: ${emojiRating(rating?.rate)}\n`;
          
              await Whatsapp.sendImage({
                  recipientPhone,
                  url: imageUrl,
                  caption: text,
              });
          
              await Whatsapp.sendSimpleButtons({
                  message: `Here is the product, what do you want to do next?`,
                  recipientPhone: recipientPhone, 
                  listOfButtons: [
                      {
                          title: 'Add to cart🛒',
                          id: `add_to_cart_${product_id}`,
                      },
                      {
                          title: 'Speak to a human',
                          id: 'speak_to_human',
                      },
                      {
                          title: 'See more products',
                          id: 'see_categories',
                      },
                  ],
              });
          }
      }
    }
    //
      console.log('POST: Alguien llama con datos!');
      return res.sendStatus(200);
  } catch (error) {
              console.error({error})
      return res.sendStatus(500);
  }
  */
}
