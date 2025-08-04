import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface DropboxResetPasswordEmailProps {
  userFirstname?: string | null;
  resetPasswordLink?: string;
}

const imgUrl = `${process.env.NEXT_PUBLIC_PROD_URL}/assets/logo.svg`;

const ResetPasswordTemplate = ({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Body>
        <Preview>Dropbox reset your password</Preview>
        <Container>
          <Img src={imgUrl} width="50" height="43" alt="Stashio" />
          <Section>
            <Text style={text}>Hi {userFirstname ? userFirstname : ""},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Stashio
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordTemplate;

const button = {
  backgroundColor: "#8b5cf6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
