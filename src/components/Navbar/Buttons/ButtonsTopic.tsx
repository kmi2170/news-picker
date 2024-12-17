import { memo } from "react";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setTopic } from "../../../slice/newsSlice";
import { TopicType } from "../../../api/types";
import { topicButtons } from "../../../constants/buttons";

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: "15px",
    textTransform: "capitalize",
    marginTop: "0.50rem",
    marginRight: "0.25rem",
  },
}));

const ButtonsTopic = () => {
  const classes = useStyles();

  const lang = useAppSelector((state) => state.news.lang);
  const topic = useAppSelector((state) => state.news.topic);
  const topicsAvailable = useAppSelector((state) => state.news.topicsAvailable);
  const dispatch = useAppDispatch();

  const handleClick = (topic: TopicType) => {
    dispatch(setTopic(topic));
  };
  console.log(topicsAvailable);

  return (
    <>
      {topicButtons.map(({ id, code, name }) => (
        <Button
          key={id}
          variant={code === topic ? "contained" : "outlined"}
          color="primary"
          size="small"
          onClick={() => handleClick(code as TopicType)}
          className={classes.button}
          disabled={!topicsAvailable.includes(code as TopicType)}
        >
          {name[lang]}
        </Button>
      ))}
    </>
  );
};

export default memo(ButtonsTopic);
