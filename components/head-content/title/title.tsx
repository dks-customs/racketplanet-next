import { WEBSITE_TITLE } from "../../../constants/constants";

export type TitleProps = {
  followUp: string;
};

export default function Title({ followUp }: TitleProps) {
  return (
    <title>
      {WEBSITE_TITLE} - {followUp}
    </title>
  );
}
