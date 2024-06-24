// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import multer from "npm:multer@1.4.5-lts.1";
import nodemailer from "npm:nodemailer@6.9.0";

const app = express();
const upload = multer(); // Using multer to handle file uploads

// Middleware to parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>File Upload Form</title>
    </head>
    <body>
      <h2>Upload a File</h2>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" required>
        <br><br>
        <input type="submit" value="Upload">
      </form>
    </body>
    </html>
  `;
  res.type("text/html").send(htmlContent);
});

app.post("/upload", upload.single('file'), async (req, res) => {
  try {
    if (req.file) {
      const file = req.file;
      console.log("Uploaded file:", file.originalname);

      // Send the file as an attachment via email
      await sendEmailWithAttachment(file.originalname, file.buffer);

      res.send("File uploaded successfully and sent via email.");
    } else {
      throw new Error("No file uploaded.");
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function sendEmailWithAttachment(filename: string, content: Buffer) {

  // Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "amudhavamshi@gmail.com",
      pass: "tdxrctlczcvneudg",
    },
  });

  // Compose email
  const mailOptions = {
    from: "amudhavamshi@gmail.com",
    to: "floravirgin90@gmail.com",
    subject: "File Upload via Deno Server",
    text: "File attached.",
    attachments: [
      {
        filename,
        content,
      },
    ],
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
