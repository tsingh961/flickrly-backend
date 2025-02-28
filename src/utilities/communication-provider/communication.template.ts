export function getSMSOtpMessage(name: string, otp: string): string {
  const message = `${otp} ${process.env.SMS_MSG}`;

  return message;
}

// ... existing code ...

export function getInviteMail(
  name: string,
  inviteLink: string,
  brandName: string,
): string {
  const message = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome ${name}!</h2>
      <p>You have been invited to join our platform.</p>
      <p>Please click the button below to complete your registration:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${inviteLink}" 
           style="background-color: #4CAF50; 
                  color: white; 
                  padding: 14px 25px; 
                  text-decoration: none; 
                  border-radius: 4px;
                  display: inline-block;">
          Complete Registration
        </a>
      </div>
      <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p>${inviteLink}</p>
      <p>This invitation link will expire in 24 hours.</p>
      <p>Thank you!</p>
      <p>Best regards,<br>${brandName}</p>
    </div>
  `;

  return message;
}

export function getForgetPasswordMail(
  fullName: string,
  otp: string,
  brandName: string,
): string {
  return `
    <h1>Password Reset Request</h1>
    <p>Hi ${fullName},</p>
    <p>We received a request to reset your password. Your One-Time Password (OTP) is:</p>
    <h2>${otp}</h2>
    <p>Please enter this OTP in the application to proceed with resetting your password.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Thank you!</p>
    <p>Best regards,<br>${brandName}</p>
  `;
}

// make a template for invite pls
export function getInviteMailText(
  name: string,
  inviteLink: string,
  brandName: string,
): string {
  const message = `
      Welcome ${name}
      You have been invited to join our platform.
      Please click the button below to complete your registration:
     
      ${inviteLink}

      Complete Registration
      
      If the button doesn't work, you can copy and paste this link into your browser:
      ${inviteLink}
      This invitation link will expire in 24 hours.

      Thank you!
      Best regards,
      ${brandName}
  `;

  return message;
}

export function getForgetPasswordMailText(
  fullName: string,
  otp: string,
  brandName: string,
): string {
  return `
    Password Reset Request
    Hi ${fullName}
    We received a request to reset your password. Your One-Time Password (OTP) is:
    ${otp}
    Please enter this OTP in the application to proceed with resetting your password.
    If you did not request a password reset, please ignore this email.
    Thank you!
    Best regards,<br>${brandName}
  `;
}

// getOtpMail
export function getOtpMail(name: string, otp: string): string {
  return `
    <h1>OTP Verification</h1>
    <p>Hi ${name},</p>
    <p>Your One-Time Password (OTP) is:</p>
    <h2>${otp}</h2>
    <p>Please enter this OTP in the application to verify your email address.</p>
    <p>If you did not request this OTP, please ignore this email.</p>
    <p>Thank you!</p>
  `;
}


export function getOtpMailText(name: string, otp: string): string {
  return `
    OTP Verification
    Hi ${name},
    Your One-Time Password (OTP) is:
    ${otp}
    Please enter this OTP in the application to verify your email address.
    If you did not request this OTP, please ignore this email.
    Thank you!
  `;
}