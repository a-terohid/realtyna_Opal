import axios from "axios"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

import { getSiteSettings } from "@/services/theme/getSiteSettings"

type FormName = "Contact Agent" | "Contact Us" | "Newsletter"

type FormFields = {
  [key: string]: string
}

type FormNameMapping = {
  [key in FormName]: {
    [key: string]: string
  }
}

/**
 * Mapping between form name and form fields
 */
const formNameMapping: FormNameMapping = {
  "Contact Agent": {
    fullname: "Fullname",
    phone_number: "Phone",
    email: "Email",
    message: "Message"
  },
  "Contact Us": {
    fullname: "Fullname",
    email: "Email",
    message: "Message"
  },
  Newsletter: {
    email: "Email"
  }
}

const isSMTP = process.env.SMTP_USER && process.env.SMTP_PASS

export async function POST(request: NextRequest) {
  const {
    site_identity: { siteName }
  } = await getSiteSettings()

  const { searchParams } = new URL(request.url)
  const formName: FormName = searchParams.get("formName") as FormName
  const formData = await request.json()
  const { fullname, email, message, phone_number, token } = formData

  try {
    /**
     * Validate recaptcha
     */
    if (token) {
      const captchaForm = `secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        captchaForm,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )

      if (!response.data.success || response.data.score < 0.5) {
        return NextResponse.json({ error: "Recaptcha error" }, { status: 500 })
      }
    }

    /**
     * Send email
     */
    if (isSMTP) {
      if (formName === "Newsletter") {
        const form = new FormData()
        form.append("address", email)
        form.append("name", email.slice(0, email.indexOf("@")))
        form.append("subscribed", "true")
        form.append("upsert", "true")

        const listAddress = process.env.MAILING_LIST_ID

        const headers = {
          Authorization:
            "Basic " +
            Buffer.from(`api:${process.env.MAILING_API_KEY}`).toString("base64")
        }

        const resp = await fetch(
          `${process.env.MAILING_API_ADDRESS}/${listAddress}/members`,
          {
            method: "POST",
            headers,
            body: form
          }
        )

        const data = await resp.text()

        if (!resp.ok) {
          return NextResponse.json({ error: data }, { status: 500 })
        }

        return NextResponse.json({ success: true })
      } else {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        })

        await transporter.sendMail({
          from: `${fullname} <${email}>`,
          to: [process.env.SMTP_TO || ""],
          bcc: [process.env.SMTP_BCC || ""],
          subject: formName + " - " + siteName,
          html: `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <title>${formName}</title>
                      <style>
                        body {
                          background-color: #f4f4f4;
                          font-family: Arial, sans-serif;
                          line-height: 1.6;
                          padding: 0;
                          margin: 0;
                        }
  
                        .container {
                          max-width: 600px;
                          margin: 20px auto;
                          background-color: #ffffff;
                          padding: 20px;
                          border-radius: 8px;
                          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
  
                        h2 {
                          font-size: 24px;
                          color: #333333;
                        }
  
                        p {
                          font-size: 16px;
                          color: #666666;
                        }
  
                        .field {
                          margin-bottom: 15px;
                        }
  
                        .field h3 {
                          font-size: 18px;
                          color: #333333;
                          margin-bottom: 5px;
                        }
  
                        .field p {
                          font-size: 16px;
                          color: #666666;
                          margin: 0;
                        }
  
                        .footer {
                          margin-top: 30px;
                          font-size: 12px;
                          color: #999999;
                          text-align: center;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <h2>New ${formName} Message</h2>
                        <p>You have received a new message from your ${siteName} ${formName}:</p>
                        <div class="field">
                          <h3>Name:</h3>
                          <p>${fullname}</p>
                        </div>
                        <div class="field">
                          <h3>Phone:</h3>
                          <p>${phone_number ?? "--"}</p>
                        </div>
                        <div class="field">
                          <h3>Email:</h3>
                          <p>${email}</p>
                        </div>
                        <div class="field">
                          <h3>Message:</h3>
                          <p>${message}</p>
                        </div>
                      </div>
                    </body>
                  </html>`
        })
      }

      /**
       * WP Gravity Forms
       */
    } else {
      const authHeader = `Basic ${Buffer.from(
        `${process.env.GRAVITYFORMS_CONSUMER_KEY}:${process.env.GRAVITYFORMS_CONSUMER_SECRET}`
      ).toString("base64")}`

      // Get all gravity forms
      const formsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/gf/v2/forms`,
        {
          headers: {
            Authorization: authHeader
          }
        }
      )

      const formsData = formsResponse.data

      let formId = null
      // Find form by searching its name
      for (const key in formsData) {
        if (formsData[key].title === formName) {
          formId = formsData[key]
          break
        }
      }

      if (!formId) {
        throw new Error("Form not found")
      }

      // Get form fields
      const formFieldsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/gf/v2/forms/${formId.id}`,
        {
          headers: {
            Authorization: authHeader
          }
        }
      )
      const formFieldsData = formFieldsResponse.data.fields

      // Get fields IDs
      const fieldsInfo: FormFields = Object.entries(
        formNameMapping[formName]
      ).reduce((fields: FormFields, [key, label]) => {
        fields[key] = formFieldsData.find(
          (item: { label: string }) => item.label === label
        )?.id
        return fields
      }, {})

      // Generate form data
      const submitForm: FormFields = Object.entries(fieldsInfo).reduce(
        (data: FormFields, [key, id]) => {
          data[`input_${id}`] = formData[key]
          return data
        },
        {}
      )

      await axios.post(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/gf/v2/forms/${formId.id}/submissions`,
        submitForm,
        {
          headers: {
            Authorization: authHeader
          }
        }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, { status: 500 })
    }
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
