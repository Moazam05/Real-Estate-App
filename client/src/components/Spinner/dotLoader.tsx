import { Box } from "@mui/material";
import { BeatLoader } from "react-spinners";

interface Props {
  color?: string;
  size?: number;
}

const DotLoader = (props: Props) => {
  return (
    <Box>
      <BeatLoader
        color={props.color ? props.color : "#36d7b7"}
        size={props?.size ? props.size : 15}
      />
    </Box>
  );
};

export default DotLoader;
