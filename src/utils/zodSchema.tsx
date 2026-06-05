import { z } from "zod"

// Define a type for the validated form data
export type ScheduleFormValidateSchema = z.infer<
  typeof scheduleFormValidateSchema
>
export type ReviewValidateSchema = z.infer<typeof reviewValidateSchema>
export type ReplyValidateSchema = z.infer<typeof replyValidateSchema>
export type SigninValidateSchema = z.infer<typeof signinValidateSchema>
export type SignupValidateSchema = z.infer<typeof signupValidateSchema>
export type ProfileSetupValidateSchema = z.infer<
  typeof profileSetupValidateSchema
>
export type ResetPasswordValidateSchema = z.infer<
  typeof resetPasswordValidateSchema
>
export type ContactPageValidateSchema = z.infer<
  typeof contactPageValidateSchema
>
export type ContactAgentValidateSchema = z.infer<
  typeof contactAgentValidateSchema
>

export type NewsletterValidateSchema = z.infer<typeof newsletterValidateSchema>

// Define the Zod schema for validating the schedule form data
export const scheduleFormValidateSchema = z.object({
  date: z.string(),
  fullname: z.string().min(5, { message: "Name length less than than 5" }),
  time: z.string().regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/),
  phone_number: z
    .string()
    .min(8, { message: "Min 10 number is required" })
    .max(15, { message: "Max length exceeded" }),
  email: z.string().min(3, { message: "Email is required" }).email({
    message: "Must be a valid email"
  })
})

// Define the Zod schema for validating the review form data
export const reviewValidateSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name length less than 5" })
    .max(20, { message: "Max length exceeded" }),
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .max(30, { message: "Max length exceeded" })
    .email({
      message: "Must be a valid email"
    }),
  review: z
    .string()
    .min(10, { message: "Review length less than 10" })
    .max(300, { message: "Max length exceeded" })
})

// Define the Zod schema for validating the login form data
export const signinValidateSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .max(30, { message: "Max length exceeded" })
    .email({
      message: "Must be a valid email"
    }),
  password: z.string().min(6, { message: "Password length less than 6" })
})

// Define the Zod schema for validating the signup form data
export const signupValidateSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "Name length less than 2" })
    .max(20, { message: "Max length exceeded" }),
  lastname: z
    .string()
    .min(2, { message: "Name length less than 2" })
    .max(20, { message: "Max length exceeded" }),
  phone_number: z
    .string()
    .min(8, { message: "Min 10 number is required" })
    .max(15, { message: "Max length exceeded" }),
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .max(30, { message: "Max length exceeded" })
    .email({
      message: "Must be a valid email"
    }),
  password: z.string().min(6, { message: "Password length less than 6" })
})

// Define the Zod schema for validating the resetPassword form data
export const resetPasswordValidateSchema = z
  .object({
    code: z.string().min(4, { message: "Code must be at least 4 characters" }),
    password: z.string().min(6, { message: "Password length less than 6" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password length less than 6" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })

// Define the Zod schema for validating the reply form data
export const replyValidateSchema = z.object({
  review: z
    .string()
    .min(10, { message: "Review length less than 10" })
    .max(300, { message: "Max length exceeded" })
})

// Define the Zod schema for validating the contact page form data
export const contactPageValidateSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name too short" })
    .max(30, { message: "Max length exceeded" }),
  lastname: z
    .string()
    .min(2, { message: "Last name too short" })
    .max(30, { message: "Max length exceeded" }),
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .max(100, { message: "Max length exceeded" })
    .email({
      message: "Must be a valid email"
    }),
  message: z
    .string()
    .min(10, { message: "Message length less than 10" })
    .max(300, { message: "Max length exceeded" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept Terms and Conditions" })
  })
})

export const contactAgentValidateSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Name too short" })
    .max(60, { message: "Max length exceeded" }),
  phone_number: z
    .string()
    .min(8, { message: "Min 10 number is required" })
    .max(15, { message: "Max length exceeded" }),
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .max(40, { message: "Max length exceeded" })
    .email({
      message: "Must be a valid email"
    }),
  message: z
    .string()
    .min(10, { message: "Message length less than 10" })
    .max(300, { message: "Max length exceeded" })
})

// Define the Zod schema for validating the profile setup form data
export const profileSetupValidateSchema = z.object({
  firstname: z.string().max(20, { message: "Max length exceeded" }).optional(),
  lastname: z.string().max(20, { message: "Max length exceeded" }).optional(),
  professional_phone: z
    .string()
    .max(15, { message: "Max length exceeded" })
    .optional(),
  professional_email: z
    .string()
    .max(30, { message: "Max length exceeded" })
    .email({
      message: "Must be a valid email"
    })
    .optional(),
  personal_url: z
    .string()
    .max(50, { message: "Max length exceeded" })
    .optional(),
  profile_picture: z.any().optional(),
  address: z
    .object({
      Country: z.string().optional(),
      Geometry: z
        .object({
          Point: z.array(z.number()).optional()
        })
        .optional(),
      Label: z.string().optional(),
      Municipality: z.string().optional(),
      PostalCode: z.string().optional(),
      Region: z.string().optional(),
      location_extra_data: z
        .object({
          source: z.string().optional(),
          osm_type: z.string().optional(),
          osm_id: z.number().optional(),
          place_id: z.number().optional()
        })
        .optional(),
      label: z.string(),
      value: z.number()
    })
    .optional(),
  area_of_interest: z
    .array(
      z.object({
        Country: z.string().optional(),
        Geometry: z
          .object({
            Point: z.array(z.number()).optional()
          })
          .optional(),
        Label: z.string().optional(),
        Municipality: z.string().optional(),
        PostalCode: z.string().optional(),
        Region: z.string().optional(),
        location_extra_data: z
          .object({
            source: z.string().optional(),
            osm_type: z.string().optional(),
            osm_id: z.number().optional(),
            place_id: z.number().optional()
          })
          .optional(),
        label: z.string(),
        value: z.number()
      })
    )
    .optional(),
  interested_in: z
    .array(z.object({ label: z.string(), value: z.number() }))
    .optional(),
  pro_status: z.boolean().optional(),
  profession_list: z
    .array(z.object({ label: z.string(), value: z.number() }))
    .optional(),
  expertise: z
    .array(z.object({ label: z.string(), value: z.number() }))
    .optional(),
  bio: z.string().max(500, { message: "Max length exceeded" }).optional(),
  birthday: z.date().optional(),
  gender: z.string().optional()

  /* password: z.string().min(6, { message: "Password length less than 6" }) */
})

export const newsletterValidateSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email"
  })
})
