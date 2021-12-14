import { Typography, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectNews, setTopic } from "../../features/newsSlice";
import { TopicType } from "../../api/type_settngs";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: "15px",
    textTransform: "capitalize",
    marginTop: "0.50rem",
    marginRight: "0.25rem",
  },
}));

export const topicButtons = [
  { id: 1, code: "news", name: { en: "News", ja: "総合" } },
  { id: 2, code: "world", name: { en: "World", ja: "ワールド" } },
  { id: 3, code: "finance", name: { en: "Finance", ja: "ファイナンス" } },
  { id: 4, code: "economics", name: { en: "Economics", ja: "経済" } },
  { id: 5, code: "politics", name: { en: "Politics", ja: "政治" } },
  { id: 6, code: "business", name: { en: "Business", ja: "ビジネス" } },
  { id: 7, code: "sport", name: { en: "Sports", ja: "スポーツ" } },
  { id: 8, code: "tech", name: { en: "Tech", ja: "テック" } },
  {
    id: 9,
    code: "entertainment",
    name: { en: "Entertainment", ja: "エンターテイメント" },
  },
  { id: 10, code: "beauty", name: { en: "Beauty", ja: "美容" } },
  { id: 11, code: "gaming", name: { en: "Gaming", ja: "ゲーム" } },
];

const ButtonsTopic: React.FC = () => {
  const classes = useStyles();

  const { lang, topic } = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  const handleClick = (topic: TopicType) => {
    dispatch(setTopic(topic));
  };

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
        >
          {name[lang]}
        </Button>
      ))}
    </>
  );
};

export default ButtonsTopic;
