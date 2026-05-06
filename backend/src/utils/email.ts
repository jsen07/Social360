import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendInviteEmail({
  to,
  inviteUrl,
  companyName,
}: {
  to: string;
  inviteUrl: string;
  companyName: string;
}) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: `You're invited to join ${companyName}`,
    html: `
      <h2>You're invited to join ${companyName}</h2>
      <p>Click the button below to accept your invite:</p>
      <a href="${inviteUrl}" 
         style="padding:10px 20px;background:#000;color:#fff;text-decoration:none;">
         Accept Invitation
      </a>
      <p>This link expires in 7 days.</p>
    `,
  });
}
