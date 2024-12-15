import arcjet, { validateEmail } from "@arcjet/node";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    validateEmail({
      mode: "LIVE", 
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

export const arcjectValidate = asyncHandler(async (req,_,next) => {
    const {email} = req.body
  const decision = await aj.protect(req, {
    email: email,
  });
  
  let message = "";
  if (decision.reason.emailTypes.includes("DISPOSABLE")) {
    message = "We do not allow disposable email addresses.";
  } else if (decision.reason.emailTypes.includes("FREE")) {
    message =
      "We do not allow free email addresses, please use a business address.";
  } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
    message = "Your email domain does not have an MX record. Is there a typo?";
  } else if (decision.reason.emailTypes.includes("NO_GRAVATAR")) {
    message = "We require a Gravatar profile to sign up.";
  } else {
    message = "Invalid email.";
  }
  
  if (decision.isDenied()) {
    throw new ApiError(403,message)
  } 
  next()
});