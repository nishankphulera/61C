import mongoose, { Document, Schema } from "mongoose";

/** One document per contact form submission (collection: `contactsubmissions`). */
export interface IContactSubmission extends Document {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmission>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    phone: { type: String, default: "", trim: true, maxlength: 80 },
    message: { type: String, required: true, trim: true, maxlength: 10000 },
  },
  { timestamps: true }
);

contactSubmissionSchema.index({ createdAt: -1 });
contactSubmissionSchema.index({ email: 1 });

const ContactSubmission =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", contactSubmissionSchema);

export default ContactSubmission;
