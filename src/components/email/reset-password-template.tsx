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

const ResetPasswordTemplate = ({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Body className="bg-[#f6f9fc] py-[10px]">
        <Preview>Dropbox reset your password</Preview>
        <Container className="bg-white border border-[#f0f0f0] p-11">
          <Img src={`/assets/logo.svg`} width="40" height="33" alt="Stashio" />
          <Section>
            <Text
              className="text-base font-light text-[#404040] leading-[26px]"
              style={{ fontFamily: fontFamily }}
            >
              Hi {userFirstname ? userFirstname : ""},
            </Text>
            <Text
              className="text-base font-light text-[#404040] leading-[26px]"
              style={{ fontFamily: fontFamily }}
            >
              Someone recently requested a password change for your Dropbox
              account. If this was you, you can set a new password here:
            </Text>
            <Button
              className="bg-violet-500 rounded-sm text-white font-sans text-[15px] text-center block w-[210px] py-[14px] px-[7px]"
              href={resetPasswordLink}
            >
              Reset password
            </Button>
            <Text
              className="text-base font-light text-[#404040] leading-[26px]"
              style={{ fontFamily: fontFamily }}
            >
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

const fontFamily =
  "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif";
