import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";
import { PHASES } from "@/lib/phase-data";

interface EmailProps {
  userFirstname: string;
  phase?: number;
}

export const NotionWaitlistEmail = ({ userFirstname, phase }: EmailProps) => {
  const phaseData = phase !== undefined ? PHASES.find((p) => p.id === phase) : undefined;

  return (
    <Html>
      <Head />
      <Preview>Thanks for Joining the Waitlist, {userFirstname}! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://nextjs-notion-waitlist.vercel.app/waitlist-logo.png`}
            width="220"
            height="100"
            alt="Notion Waitlist Logo"
            style={logo}
          />
          <Text style={greeting}>Hi {userFirstname},</Text>
          <Text style={paragraph}>
            Thanks for joining the waitlist for our Next.js + Notion CMS waitlist
            template! I'm Lakshay, the developer behind this project. I'm glad to
            have you on board.
          </Text>
          {phaseData && (
            <Container style={phaseBox}>
              <Text style={phaseTitle}>
                {phaseData.label} — {phaseData.name}
              </Text>
              <Text style={phaseItem}>
                <strong>Biggest obstacle:</strong> {phaseData.biggestObstacle}
              </Text>
              <Text style={phaseItem}>
                <strong>Primary focus:</strong> {phaseData.focusPrimary}
              </Text>
            </Container>
          )}
          <Text style={paragraph}>
            I'll keep you posted on the progress and notify you as soon as it's
            ready for you to use. In the meantime, if you have any questions or
            feedback, don't hesitate to reach out by replying directly to{" "}
            <a href="mailto:lakshb.work@gmail.com" style={link}>
              this email {""}
            </a>
            — I'm here to listen!
          </Text>
          <Text style={paragraph}>
            You can also follow me on X/Twitter for updates:{" "}
            <a href="https://x.com/blakssh" style={link}>
              @blakssh
            </a>
          </Text>
          <Text style={signOff}>
            Best regards,
            <br />
            Lakshay
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            You received this email because you signed up for the Notion waitlist.
            If you believe this is a mistake, feel free to ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

NotionWaitlistEmail.PreviewProps = {
  userFirstname: "Tyler",
  phase: 1,
} as EmailProps;

export default NotionWaitlistEmail;

const main = {
  background: "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
  fontFamily: 'figtree, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  color: "#cccccc",
};

const container = {
  margin: "0 auto",
  padding: "24px 32px 48px",
  backgroundColor: "#1a1a1a",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
  paddingBottom: "20px",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "28px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const link = {
  color: "#F7FF9B",
  textDecoration: "underline",
};

const signOff = {
  fontSize: "16px",
  lineHeight: "26px",
  marginTop: "20px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8c8c8c",
  fontSize: "12px",
};

const phaseBox = {
  backgroundColor: "#2a2a2a",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "20px",
  borderLeft: "4px solid #F7FF9B",
};

const phaseTitle = {
  fontSize: "16px",
  fontWeight: "700" as const,
  color: "#F7FF9B",
  marginBottom: "8px",
  marginTop: "0",
};

const phaseItem = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#cccccc",
  margin: "4px 0",
};
