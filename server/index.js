const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


const app = express();
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'limon.working@gmail.com',
    pass: 'gotm ybek jkcb gice'
  }
});

// Function to send email
const sendPaymentConfirmationEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Lead Agency" <limon.working@gmail.com>',
      to,
      subject,
      text
    });
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function run() {
  try {
    await client.connect();
    /* Seo site collection */
    const generateEmailTemplateCollections = client.db("seoWebsite").collection("generateEmailTemplate");



    const packageCollections = client.db("seoWebsite").collection("packages");
    const packageTitleCollections = client.db("seoWebsite").collection("packagesTitle");
    const featurePageCollections = client.db("seoWebsite").collection("features");
    const FaqsOptionCollections = client.db("seoWebsite").collection("faqs");
    const FaqsTitleCollections = client.db("seoWebsite").collection("faqsTitle");

    const orderCollections = client.db("seoWebsite").collection("orders");
    const paypalEmailCollections = client.db("seoWebsite").collection("email");
    const GeneralCollections = client.db("seoWebsite").collection("general");
    const AboutUsOptionCollections = client.db("seoWebsite").collection("AboutUsOption");
    const BannerOptionCollections = client.db("seoWebsite").collection("Banner");
    const SpecialityOptionCollections = client.db("seoWebsite").collection("Speciality");
    const WhyChooseOptionCollections = client.db("seoWebsite").collection("WhyChooseOption");
    const RoadMapOptionCollections = client.db("seoWebsite").collection("roadMap");
    const TeamOptionCollections = client.db("seoWebsite").collection("team");
    const TeamTitleOptionCollections = client.db("seoWebsite").collection("teamTitle");
    const TestimonialOptionCollections = client.db("seoWebsite").collection("testimonials");
    const TestimonialTitleOptionCollections = client.db("seoWebsite").collection("testimonialsTitle");

    const FooterCollections = client.db("seoWebsite").collection("footer");
    const FooterLinkCollections = client.db("seoWebsite").collection("footerLink");
    const aboutServiceCollections = client.db("seoWebsite").collection("about-service");
    const ContactPageCollections = client.db("seoWebsite").collection("contactPage");
    const ContactMessageCollections = client.db("seoWebsite").collection("contactMessage");
    const TicketCollections = client.db("seoWebsite").collection("Ticket");
    const TicketReplyCollections = client.db("seoWebsite").collection("TicketReply");
    const newsLetterCollections = client.db("seoWebsite").collection("newsLetter");
    const userCollection = client.db("seoWebsite").collection("users");

    const allLeadsCollections = client.db("seoWebsite").collection("AllLeads");
    const myleadsCollections = client.db("seoWebsite").collection("MyAllLeads");
    const userProfileCollections = client.db("seoWebsite").collection("userProfile");
    const listCollections = client.db("seoWebsite").collection("lists");



    /* generateEmailTemplateCollections */

    app.post("/add-generate-email-template", async (req, res) => {
      const { generateEmailTemplate } = req.body;

      if (!generateEmailTemplate) {
        return res.status(400).send({ error: "No template data provided" });
      }

      try {
        const result = await generateEmailTemplateCollections.insertOne({ htmlCode: generateEmailTemplate });

        if (result.insertedCount === 1) {
          res.status(201).send({ message: "Template saved successfully", id: result.insertedId });
        } else {
          res.status(500).send({ error: "Failed to save template" });
        }
      } catch (error) {
        console.error("Error saving template:", error);
        res.status(500).send({ error: "Failed to save template" });
      }
    });

    app.get("/generate-email-templates", async (req, res) => {
      const query = {};
      const cursor = generateEmailTemplateCollections.find(query);
      const leads = await cursor.toArray();
      res.send(leads);
    });

    app.get("/generate-email-template/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const website = await generateEmailTemplateCollections.findOne(query);
      res.send(website);
    });

    // Update an email template
    app.post("/edit-generate-email-template/:id", async (req, res) => {
      const id = req.params.id;
      const { generateEmailTemplate } = req.body;

      if (!generateEmailTemplate) {
        return res.status(400).send({ error: "No template data provided" });
      }

      try {
        const result = await generateEmailTemplateCollections.updateOne(
          { _id: new ObjectId(id) },
          { $set: { htmlCode: generateEmailTemplate } }
        );

        if (result.modifiedCount > 0) {
          res.status(200).send({ message: "Template updated successfully" });
        } else {
          res.status(404).send({ error: "Template not found" });
        }
      } catch (error) {
        console.error("Error updating template:", error);
        res.status(500).send({ error: "Failed to update template" });
      }
    });





    /* userProfileCollections */

    app.post("/add-profile-info", async (req, res) => {
      const addProfile = req.body;
      const result = await userProfileCollections.insertOne(addProfile);
      res.send(result);
    });

    app.get("/profiles", async (req, res) => {
      const query = {};
      const cursor = userProfileCollections.find(query);
      const leads = await cursor.toArray();
      res.send(leads);
    });

    app.get("/profile/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const profile = await userProfileCollections.findOne(query);
      res.send(profile);
    });

    app.put("/update-credit/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          userPoint: edit.userPoint,
        },
      };

      const result = await userProfileCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    app.put("/update-profile/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          userName: edit.userName,
          profileImg: edit.profileImg,
        },
      };

      const result = await userProfileCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });







    /* Seo site post */

    app.post("/add-lead", async (req, res) => {
      const leads = req.body;
      const result = await allLeadsCollections.insertOne(leads);
      res.send(result);
    });

    app.get("/all-leads", async (req, res) => {
      const query = {};
      const cursor = allLeadsCollections.find(query);
      const leads = await cursor.toArray();
      res.send(leads);
    });

    app.get("/lead/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const website = await allLeadsCollections.findOne(query);
      res.send(website);
    });

    app.put("/edit-leads/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          email: edit.email,
        },
      };

      const result = await allLeadsCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    app.put("/update-lead/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          leadAddedToList: edit.leadAddedToList,
        },
      };

      const result = await allLeadsCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });



    /*My All Leads */

    app.post("/add-my-lead", async (req, res) => {
      const lead = req.body;
      const result = await myleadsCollections.insertOne(lead);
      res.send(result);
    });

    app.get("/my-all-leads", async (req, res) => {
      const query = {};
      const cursor = myleadsCollections.find(query);
      const leads = await cursor.toArray();
      res.send(leads);
    });
    app.get("/my-lead/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const website = await myleadsCollections.findOne(query);
      res.send(website);
    });



    app.get("/my-lead/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const package = await packageCollections.findOne(query);
      res.send(package);
    });

    app.put("/my-update-lead/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          leadAddedToList: edit.leadAddedToList,
        },
      };

      const result = await myleadsCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });




    app.delete("/delete-my-leads", async (req, res) => {
      try {
        const { leads } = req.body;

        const filter = { _id: { $in: leads.map((id) => new ObjectId(id)) } };

        const result = await myleadsCollections.deleteMany(filter);

        res.json({ success: true, deletedCount: result.deletedCount });
      } catch (error) {
        console.error("Error deleting leads:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    });



    /*
    * List Section
    */
    app.post("/add-list", async (req, res) => {
      const list = req.body;
      const result = await listCollections.insertOne(list);
      res.send(result);
    });

    app.get("/lists", async (req, res) => {
      const query = {};
      const cursor = listCollections.find(query);
      const lists = await cursor.toArray();
      res.send(lists);
    });

    app.get("/list/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const list = await listCollections.findOne(query);
      res.send(list);
    });

    app.put("/edit-list/:id", async (req, res) => {
      const id = req.params.id;
      const listUpdate = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          listName: listUpdate.listName,

        },
      };

      const result = await listCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.delete("/delete-list/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      try {
        const result = await listCollections.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });




    /* Packages */
    app.post("/add-package", async (req, res) => {
      const package = req.body;
      const result = await packageCollections.insertOne(package);
      res.send(result);
    });

    app.get("/packages", async (req, res) => {
      const query = {};
      const cursor = packageCollections.find(query);
      const packages = await cursor.toArray();
      res.send(packages);
    });

    app.get("/package/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const package = await packageCollections.findOne(query);
      res.send(package);
    });

    app.put("/edit-package/:id", async (req, res) => {
      const id = req.params.id;
      const package = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          packageName: package.packageName,
          price: package.price,
          totalCredits: package.totalCredits,

          pointOne: package.pointOne,
          pointTwo: package.pointTwo,
          pointThree: package.pointThree,
          pointFour: package.pointFour,
          pointFive: package.pointFive,
          pointSix: package.pointSix,
        },
      };

      const result = await packageCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });



    app.post("/add-package-title", async (req, res) => {
      const packageTitle = req.body;
      const result = await packageTitleCollections.insertOne(packageTitle);
      res.send(result);
    });

    app.get("/package-titles/", async (req, res) => {
      const query = {};
      const cursor = packageTitleCollections.find(query);
      const packageTitle = await cursor.toArray();
      res.send(packageTitle);
    });
    app.get("/package-title/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const packageTitle = await packageTitleCollections.findOne(query);
      res.send(packageTitle);
    });


    app.put("/package-title/:id", async (req, res) => {
      const id = req.params.id;
      const packageTitle = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          titleOne: packageTitle.titleOne,
          description: packageTitle.description,
        },
      };

      const result = await packageTitleCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /*  */

    /* Order */
    app.post("/new-order", async (req, res) => {
      const order = req.body;
      const result = await orderCollections.insertOne(order);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const query = {};
      const cursor = orderCollections.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });

    app.get("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const order = await orderCollections.findOne(query);
      res.send(order);
    });

    app.put("/order/:id", async (req, res) => {
      const id = req.params.id;
      const updateOrder = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          paymentStatus: updateOrder.paymentStatus,
          orderStatus: updateOrder.orderStatus,
        },
      };

      const result = await orderCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get('/order-by-id', async (req, res) => {
      const paymentId = req.query.paymentId;
      const query = { paymentId: paymentId }; // Use the orderId from the query parameters

      try {
        const order = await orderCollections.findOne(query);
        if (!order) {
          return res.status(404).send({ error: 'Order not found' });
        }
        res.send(order);
      } catch (error) {
        console.error('Error fetching order by orderId', error);
        res.status(500).send({ error: 'An error occurred while fetching the order' });
      }
    });


    app.put("/payment-cancelled/:id", async (req, res) => {
      const id = req.params.id;
      const updateOrder = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          paymentStatus: updateOrder.paymentStatus,
        },
      };

      const result = await orderCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // app.put("/payment-received/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updateOrder = req.body;
    //   const filter = { _id: new ObjectId(id) };
    //   const options = { upsert: true };
    //   const updatedDoc = {
    //     $set: {
    //       paymentStatus: updateOrder.paymentStatus,
    //     },
    //   };

    //   const result = await orderCollections.updateOne(
    //     filter,
    //     updatedDoc,
    //     options
    //   );
    //   res.send(result);
    // });

    app.put("/payment-received/:id", async (req, res) => {
      const id = req.params.id;
      const updateOrder = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: false }; // Use `upsert: false` as you are only updating existing documents
      const updatedDoc = {
        $set: {
          paymentStatus: updateOrder.paymentStatus,
        },
      };

      try {
        // Update the payment status
        const result = await orderCollections.updateOne(filter, updatedDoc, options);

        if (result.modifiedCount === 1) {
          // Fetch the updated order to get the customer email
          const updatedOrder = await orderCollections.findOne(filter);

          if (updatedOrder && updatedOrder.customerEmail) {
            // Send email
            await sendPaymentConfirmationEmail(
              updatedOrder.customerEmail,
              'Payment Confirmation',
              `Dear ${updatedOrder.customerName},\n\nYour payment for order ID ${updatedOrder.orderId} was successfully received!\n\nDetails:\n- Package: ${updatedOrder.packageName}\n- Price: $${updatedOrder.packagePrice}\n- Total Credits: ${updatedOrder.totalCredits}\n\nThank you for your purchase.\n\nBest regards,\nYour Company Name`
            );
          }

          res.status(200).send('Payment status updated and email sent.');
        } else {
          res.status(400).send('Payment status update failed.');
        }
      } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).send('Error updating payment status');
      }
    });


    /*  */

    /* payment */

    app.post("/payment", async (req, res) => {
      const email = req.body;
      const result = await paypalEmailCollections.insertOne(email);
      res.send(result);
    });

    app.get("/payments", async (req, res) => {
      const query = {};
      const cursor = paypalEmailCollections.find(query);
      const email = await cursor.toArray();
      res.send(email);
    });
    app.get("/payment/:id", async (req, res) => {
      const query = {};
      const cursor = paypalEmailCollections.find(query);
      const email = await cursor.toArray();
      res.send(email);
    });

    app.put("/payment/:id", async (req, res) => {
      const id = req.params.id;
      const updateEmail = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          email: updateEmail.email,
        },
      };

      const result = await paypalEmailCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    /*  */

    /* User Manage */



    app.post("/add-user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    app.get("/user/:id", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });


    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const userUpdate = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          userName: userUpdate.userName,
          userEmail: userUpdate.userEmail,
          userRole: userUpdate.userRole,
        },
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      try {
        const result = await userCollection.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });


    /* payment */


    /* general Setting */

    app.post("/add-logo", async (req, res) => {
      const logo = req.body;
      const result = await GeneralCollections.insertOne(logo);
      res.send(result);
    });

    app.get("/logo", async (req, res) => {
      const query = {};
      const cursor = GeneralCollections.find(query);
      const logo = await cursor.toArray();
      res.send(logo);
    });
    app.get("/logo/:id", async (req, res) => {
      const query = {};
      const cursor = GeneralCollections.find(query);
      const logo = await cursor.toArray();
      res.send(logo);
    });

    app.put("/logo/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          logo: updateData.logo,
        },
      };

      const result = await GeneralCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* payment */




    /* About Us Option Setting */

    app.post("/add-about", async (req, res) => {
      const about = req.body;
      const result = await AboutUsOptionCollections.insertOne(about);
      res.send(result);
    });

    app.get("/about", async (req, res) => {
      const query = {};
      const cursor = AboutUsOptionCollections.find(query);
      const about = await cursor.toArray();
      res.send(about);
    });
    app.get("/about/:id", async (req, res) => {
      const query = {};
      const cursor = AboutUsOptionCollections.find(query);
      const about = await cursor.toArray();
      res.send(about);
    });

    app.put("/edit-about/:id", async (req, res) => {
      const id = req.params.id;
      const updateAbout = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          img: updateAbout.img,
          title: updateAbout.title,
          subText: updateAbout.subText,
          btnText: updateAbout.btnText,
          btnUrl: updateAbout.btnUrl,
        },
      };

      const result = await AboutUsOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* Banner area */


    app.post("/add-banner", async (req, res) => {
      const banner = req.body;
      const result = await BannerOptionCollections.insertOne(banner);
      res.send(result);
    });

    app.get("/banner", async (req, res) => {
      const query = {};
      const cursor = BannerOptionCollections.find(query);
      const banner = await cursor.toArray();
      res.send(banner);
    });
    app.get("/banner/:id", async (req, res) => {
      const query = {};
      const cursor = BannerOptionCollections.find(query);
      const banner = await cursor.toArray();
      res.send(banner);
    });

    app.put("/edit-banner/:id", async (req, res) => {
      const id = req.params.id;
      const updateBanner = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          bannerHeadingText1: updateBanner.bannerHeadingText1,
          typingHeading1: updateBanner.typingHeading1,
          typingHeading2: updateBanner.typingHeading2,
          typingHeading3: updateBanner.typingHeading3,
          bannerText: updateBanner.bannerText,
          bannerImage: updateBanner.bannerImage,
          youtube: updateBanner.youtube,
        },
      };

      const result = await BannerOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* end */



    /* Our speciality area */


    app.post("/add-speciality", async (req, res) => {
      const speciality = req.body;
      const result = await SpecialityOptionCollections.insertOne(speciality);
      res.send(result);
    });

    app.get("/speciality", async (req, res) => {
      const query = {};
      const cursor = SpecialityOptionCollections.find(query);
      const speciality = await cursor.toArray();
      res.send(speciality);
    });
    app.get("/speciality/:id", async (req, res) => {
      const query = {};
      const cursor = SpecialityOptionCollections.find(query);
      const speciality = await cursor.toArray();
      res.send(speciality);
    });

    app.put("/edit-speciality/:id", async (req, res) => {
      const id = req.params.id;
      const updateSpeciality = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          headingTitle: updateSpeciality.headingTitle,
          subText: updateSpeciality.subText,
          TitleBoxOne: updateSpeciality.TitleBoxOne,
          ParaBoxOne: updateSpeciality.ParaBoxOne,
          ImageBoxOne: updateSpeciality.ImageBoxOne,
          TitleBoxTwo: updateSpeciality.TitleBoxTwo,
          ParaBoxTwo: updateSpeciality.ParaBoxTwo,
          ImageBoxTwo: updateSpeciality.ImageBoxTwo,
          TitleBoxThree: updateSpeciality.TitleBoxThree,
          ParaBoxThree: updateSpeciality.ParaBoxThree,
          ImageBoxThree: updateSpeciality.ImageBoxThree,

          TitleBoxFour: updateSpeciality.TitleBoxFour,
          ParaBoxFour: updateSpeciality.ParaBoxFour,
          ImageBoxFour: updateSpeciality.ImageBoxFour,


        },
      };

      const result = await SpecialityOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* end */


    /* Why  choose area */


    app.post("/add-why", async (req, res) => {
      const choose = req.body;
      const result = await WhyChooseOptionCollections.insertOne(choose);
      res.send(result);
    });

    app.get("/why-choose", async (req, res) => {
      const query = {};
      const cursor = WhyChooseOptionCollections.find(query);
      const choose = await cursor.toArray();
      res.send(choose);
    });
    app.get("/why-choose/:id", async (req, res) => {
      const query = {};
      const cursor = WhyChooseOptionCollections.find(query);
      const choose = await cursor.toArray();
      res.send(choose);
    });

    app.put("/edit-why-choose/:id", async (req, res) => {
      const id = req.params.id;
      const updateChoose = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          title: updateChoose.title,
          image: updateChoose.image,
          TitleBoxOne: updateChoose.TitleBoxOne,
          ImageBoxOne: updateChoose.ImageBoxOne,
          ParaBoxOne: updateChoose.ParaBoxOne,
          TitleBoxTwo: updateChoose.TitleBoxTwo,
          ImageBoxTwo: updateChoose.ImageBoxTwo,
          ParaBoxTwo: updateChoose.ParaBoxTwo,
          TitleBoxThree: updateChoose.TitleBoxThree,
          ImageBoxThree: updateChoose.ImageBoxThree,
          ParaBoxThree: updateChoose.ParaBoxThree,

        },
      };

      const result = await WhyChooseOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* end */

    /* Road Map area */


    app.post("/add-road", async (req, res) => {
      const road = req.body;
      const result = await RoadMapOptionCollections.insertOne(road);
      res.send(result);
    });

    app.get("/road", async (req, res) => {
      const query = {};
      const cursor = RoadMapOptionCollections.find(query);
      const road = await cursor.toArray();
      res.send(road);
    });
    app.get("/road/:id", async (req, res) => {
      const query = {};
      const cursor = RoadMapOptionCollections.find(query);
      const road = await cursor.toArray();
      res.send(road);
    });

    app.put("/edit-road/:id", async (req, res) => {
      const id = req.params.id;
      const updateRoad = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          titleToptext: updateRoad.titleToptext,
          bannerHeadingText1: updateRoad.bannerHeadingText1,
          bannerHeadingText2: updateRoad.bannerHeadingText2,
          cardDateOne: updateRoad.cardDateOne,
          cardTitleOne: updateRoad.cardTitleOne,
          cardDescOne: updateRoad.cardDescOne,
          cardDateTwo: updateRoad.cardDateTwo,
          cardTitleTwo: updateRoad.cardTitleTwo,
          cardDescTwo: updateRoad.cardDescTwo,
          cardDateThree: updateRoad.cardDateThree,
          cardTitleThree: updateRoad.cardTitleThree,
          cardDescThree: updateRoad.cardDescThree,
          cardDateFour: updateRoad.cardDateFour,
          cardTitleFour: updateRoad.cardTitleFour,
          cardDescFour: updateRoad.cardDescFour,
          cardDateFive: updateRoad.cardDateFive,
          cardTitleFive: updateRoad.cardTitleFive,
          cardDescFive: updateRoad.cardDescFive,


        },
      };

      const result = await RoadMapOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* end */





    /* Team Members */

    app.post("/add-team", async (req, res) => {
      const team = req.body;
      const result = await TeamOptionCollections.insertOne(team);
      res.send(result);
    });

    app.get("/teams", async (req, res) => {
      const query = {};
      const cursor = TeamOptionCollections.find(query);
      const team = await cursor.toArray();
      res.send(team);
    });
    app.get("/team/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const team = await TeamOptionCollections.findOne(query); // Use findOne to get a single testimonial
      res.send(team);
    });


    app.put("/team/:id", async (req, res) => {
      const id = req.params.id;
      const team = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          personName: team.personName,
          personImg: team.personImg,
          personTitle: team.personTitle,
          facebook: team.facebook,
          twitter: team.twitter,
        },
      };

      const result = await TeamOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* team */

    /* Team area Title */


    app.post("/add-team-title", async (req, res) => {
      const teamTitle = req.body;
      const result = await TeamTitleOptionCollections.insertOne(teamTitle);
      res.send(result);
    });

    app.get("/team-title", async (req, res) => {
      const query = {};
      const cursor = TeamTitleOptionCollections.find(query);
      const teamTitle = await cursor.toArray();
      res.send(teamTitle);
    });
    app.get("/team-title/:id", async (req, res) => {
      const query = {};
      const cursor = TeamTitleOptionCollections.find(query);
      const teamTitle = await cursor.toArray();
      res.send(teamTitle);
    });

    app.put("/edit-team-title/:id", async (req, res) => {
      const id = req.params.id;
      const updateTeamTitle = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          titleTopText: updateTeamTitle.titleTopText,
          TitleOne: updateTeamTitle.TitleOne,
          titleTwo: updateTeamTitle.titleTwo,



        },
      };

      const result = await TeamTitleOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* end */


    /* testimonial */

    app.post("/testimonial", async (req, res) => {
      const testimonial = req.body;
      const result = await TestimonialOptionCollections.insertOne(testimonial);
      res.send(result);
    });

    app.get("/testimonials", async (req, res) => {
      const query = {};
      const cursor = TestimonialOptionCollections.find(query);
      const testimonial = await cursor.toArray();
      res.send(testimonial);
    });


    app.get("/testimonial/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const testimonial = await TestimonialOptionCollections.findOne(query); // Use findOne to get a single testimonial
      res.send(testimonial);
    });
    app.delete("/testimonial/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const result = await TestimonialOptionCollections.deleteOne(query); // Delete the document
      if (result.deletedCount === 1) {
        res.send("Testimonial deleted successfully");
      } else {
        res.status(404).send("Testimonial not found");
      }
    });



    app.put("/testimonial/:id", async (req, res) => {
      const id = req.params.id;
      const testimonial = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          personName: testimonial.personName,
          personTitle: testimonial.personTitle,
          personImg: testimonial.personImg,
          desc: testimonial.desc,
          subject: testimonial.subject,
        },
      };

      const result = await TestimonialOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* testimonial */



    /* testimonial title */

    app.post("/testimonial-title", async (req, res) => {
      const testimonialTitle = req.body;
      const result = await TestimonialTitleOptionCollections.insertOne(testimonialTitle);
      res.send(result);
    });

    app.get("/testimonials-title", async (req, res) => {
      const query = {};
      const cursor = TestimonialTitleOptionCollections.find(query);
      const testimonialTitle = await cursor.toArray();
      res.send(testimonialTitle);
    });


    app.get("/testimonial-title/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const testimonialTitle = await TestimonialTitleOptionCollections.findOne(query); // Use findOne to get a single testimonial
      res.send(testimonialTitle);
    });




    app.put("/testimonial-title/:id", async (req, res) => {
      const id = req.params.id;
      const testimonialTitle = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          titleOne: testimonialTitle.titleOne,
          img: testimonialTitle.img,
        },
      };

      const result = await TestimonialTitleOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* testimonial */






    /* faqs */

    app.post("/faq", async (req, res) => {
      const faq = req.body;
      const result = await FaqsOptionCollections.insertOne(faq);
      res.send(result);
    });


    app.get("/faqs", async (req, res) => {
      const query = {};
      const cursor = FaqsOptionCollections.find(query);
      const faqs = await cursor.toArray();
      res.send(faqs);
    });


    app.get("/faq/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const faq = await FaqsOptionCollections.findOne(query); // Use findOne to get a single testimonial
      res.send(faq);
    });
    app.delete("/faq/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const faq = await FaqsOptionCollections.deleteOne(query); // Delete the document
      if (faq.deletedCount === 1) {
        res.send("Testimonial deleted successfully");
      } else {
        res.status(404).send("Testimonial not found");
      }
    });



    app.put("/faq/:id", async (req, res) => {
      const id = req.params.id;
      const faq = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          answer: faq.answer,
          question: faq.question,

        },
      };

      const result = await FaqsOptionCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* title */
    app.post("/faq-title", async (req, res) => {
      const faq = req.body;
      const result = await FaqsTitleCollections.insertOne(faq);
      res.send(result);
    });

    app.get("/faqs-title", async (req, res) => {
      const query = {};
      const cursor = FaqsTitleCollections.find(query);
      const faqs = await cursor.toArray();
      res.send(faqs);
    });
    app.get("/faq-title/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const faq = await FaqsTitleCollections.findOne(query); // Use findOne to get a single testimonial
      res.send(faq);
    });

    app.put("/faq-title/:id", async (req, res) => {
      const id = req.params.id;
      const faq = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          titleTopText: faq.titleTopText,
          titleOne: faq.titleOne,
          titleTwo: faq.titleTwo,
        },
      };

      const result = await FaqsTitleCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* faqs */
    /* footer area */
    app.post("/footer-social", async (req, res) => {
      const footerSocial = req.body;
      const result = await FooterCollections.insertOne(footerSocial);
      res.send(result);
    });

    app.get("/footer-social", async (req, res) => {
      const query = {};
      const cursor = FooterCollections.find(query);
      const footerSocial = await cursor.toArray();
      res.send(footerSocial);
    });


    app.get("/footer-social/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const footerSocial = await FooterCollections.findOne(query); // Use findOne to get a single testimonial
      res.send(footerSocial);
    });

    app.put("/footer-social/:id", async (req, res) => {
      const id = req.params.id;
      const footerSocial = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          facebook: footerSocial.facebook,
          twitter: footerSocial.twitter,
          instragram: footerSocial.instragram,
          youtube: footerSocial.youtube,
          email: footerSocial.email,
        },
      };

      const result = await FooterCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });


    /* footer area end */
    /* footer Links */
    app.post("/footer-link", async (req, res) => {
      const footerLink = req.body;
      const result = await FooterLinkCollections.insertOne(footerLink);
      res.send(result);
    });

    app.get("/footer-links", async (req, res) => {
      const query = {};
      const cursor = FooterLinkCollections.find(query);
      const footerLink = await cursor.toArray();
      res.send(footerLink);
    });

    app.get("/footer-link/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const footerLink = await FooterLinkCollections.findOne(query);
      res.send(footerLink);
    });

    app.put("/footer-link/:id", async (req, res) => {
      const id = req.params.id;
      const footerLink = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {

          FooterAbout: footerLink.FooterAbout,
          CopyRight: footerLink.CopyRight,
        },
      };

      const result = await FooterLinkCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });


    /* footer area end */
    /* About ServiceSection */

    app.post("/add-about-service", async (req, res) => {
      const about = req.body;
      const result = await aboutServiceCollections.insertOne(about);
      res.send(result);
    });

    app.get("/about-services", async (req, res) => {
      const query = {};
      const cursor = aboutServiceCollections.find(query);
      const about = await cursor.toArray();
      res.send(about);
    });

    app.get("/about-service/:id", async (req, res) => {
      const id = req.params.id; // Get the ID from the URL
      const query = { _id: new ObjectId(id) }; // Filter by ID
      const about = await aboutServiceCollections.findOne(query); // Use findOne to get a single testimonial
      res.send(about);
    });

    app.put("/edit-about-service/:id", async (req, res) => {
      const id = req.params.id;
      const aboutUpdate = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          title: aboutUpdate.title,
          description: aboutUpdate.description,
          img: aboutUpdate.img,
          pointOne: aboutUpdate.pointOne,
          pointTwo: aboutUpdate.pointTwo,
          pointThree: aboutUpdate.pointThree,
        },
      };

      const result = await aboutServiceCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* testimonial */

    /* Contact Page */

    app.post("/add-contact", async (req, res) => {
      const contact = req.body;
      const result = await ContactPageCollections.insertOne(contact);
      res.send(result);
    });

    app.get("/contact", async (req, res) => {
      const query = {};
      const cursor = ContactPageCollections.find(query);
      const contact = await cursor.toArray();
      res.send(contact);
    });


    app.get("/contact/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const contact = await ContactPageCollections.findOne(query);
      res.send(contact);
    });
    app.delete("/contact/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ContactPageCollections.deleteOne(query);
      if (result.deletedCount === 1) {
        res.send("Testimonial deleted successfully");
      } else {
        res.status(404).send("Testimonial not found");
      }
    });

    app.put("/contact/:id", async (req, res) => {
      const id = req.params.id;
      const contact = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          titleOne: contact.titleOne,
          titleDescription: contact.titleDescription,
          address: contact.address,
          phone: contact.phone,
          email: contact.email,
          img: contact.img,
        },
      };

      const result = await ContactPageCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* contact */

    /* contact us message */

    app.post("/add-contact-message", async (req, res) => {
      const contact = req.body;
      const result = await ContactMessageCollections.insertOne(contact);
      res.send(result);
    });

    app.get("/contact-messages", async (req, res) => {
      const query = {};
      const cursor = ContactMessageCollections.find(query);
      const contact = await cursor.toArray();
      res.send(contact);
    });
    app.get("/contact-message/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const contact = await ContactMessageCollections.findOne(query);
      res.send(contact);
    });

    app.put("/contact-message/:id", async (req, res) => {
      const id = req.params.id;
      const contact = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          messageStatus: contact.messageStatus,

        },
      };

      const result = await ContactMessageCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* Ticket area */
    app.post("/add-ticket", async (req, res) => {
      const ticket = req.body;
      const result = await TicketCollections.insertOne(ticket);
      res.send(result);
    });

    app.get("/tickets", async (req, res) => {
      const query = {};
      const cursor = TicketCollections.find(query);
      const ticket = await cursor.toArray();
      res.send(ticket);
    });


    app.get("/ticket/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const ticket = await TicketCollections.findOne(query);
      res.send(ticket);
    });

    app.put("/ticket/:id", async (req, res) => {
      const id = req.params.id;
      const ticket = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          ticketStatus: ticket.ticketStatus,

        },
      };

      const result = await TicketCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* ticket */



    /* Ticket Reply Collections */

    app.post("/add-ticket-reply/", async (req, res) => {
      const ticketReply = req.body;
      const result = await TicketReplyCollections.insertOne(ticketReply);
      res.send(result);
    });

    app.get("/reply-tickets/", async (req, res) => {
      const query = {};
      const cursor = TicketReplyCollections.find(query);
      const ticketReply = await cursor.toArray();
      res.send(ticketReply);
    });



    /* feature Page */
    app.post("/add-feature", async (req, res) => {
      const feature = req.body;
      const result = await featurePageCollections.insertOne(feature);
      res.send(result);
    });
    app.get("/features", async (req, res) => {
      const query = {};
      const cursor = featurePageCollections.find(query);
      const feature = await cursor.toArray();
      res.send(feature);
    });
    app.get("/feature/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const feature = await featurePageCollections.findOne(query);
      res.send(feature);
    });
    app.put("/feature/:id", async (req, res) => {
      const id = req.params.id;
      const feature = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {

          featureTitle: feature.featureTitle,
          featureDesc: feature.featureDesc,
          featureImg: feature.featureImg,


        },
      };

      const result = await featurePageCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* contact */

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Live Now");
});
app.listen(port, () => {
  console.log(`Server is Live Now ${port}`);
});
