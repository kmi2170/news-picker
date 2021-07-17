import { useState } from 'react';
import router, { useRouter } from 'next/router';

import { Typography, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { TopicType } from '../api/type_settngs';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '15px',
    textTransform: 'capitalize',
    marginRight: '0.10rem',
  },
}));

export const topicButtons = [
  { id: 1, code: 'news', name: { en: 'News', ja: '総合' } },
  { id: 2, code: 'world', name: { en: 'World', ja: 'ワールド' } },
  { id: 3, code: 'finance', name: { en: 'Finance', ja: 'ファイナンス' } },
  { id: 4, code: 'economics', name: { en: 'Economics', ja: '経済' } },
  { id: 5, code: 'politics', name: { en: 'Politics', ja: '政治' } },
  { id: 6, code: 'business', name: { en: 'Business', ja: 'ビジネス' } },
  { id: 7, code: 'sport', name: { en: 'Sports', ja: 'スポーツ' } },
  { id: 8, code: 'tech', name: { en: 'Tech', ja: 'テック' } },
  {
    id: 9,
    code: 'entertainment',
    name: { en: 'Entertainment', ja: 'エンタメ' },
  },
  { id: 10, code: 'beauty', name: { en: 'Beauty', ja: '美容' } },
  { id: 11, code: 'gaming', name: { en: 'Gaming', ja: 'ゲーム' } },
];

export interface ButtonsTopicProp {
  lang: string;
  // setLang: (lang: LangType) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCookieFunc: (name: string, value: string) => void;
}

const ButtonsTopic: React.FC<ButtonsTopicProp> = ({
  lang,
  // setLang,
  setIsLoading,
  setCookieFunc,
}) => {
  const classes = useStyles();
  const { query } = useRouter();

  const [topic, setTopic] = useState('news');

  const clickHandlerLang = (topic: TopicType) => {
    // setLang(lang);
    // setCookieFunc('lang', lang);
    setTopic(topic);
    setIsLoading(true);

    router.push({
      pathname: '/',
      query: { ...query, topic },
    });
  };

  return (
    <>
      {topicButtons.map(({ id, code, name }) => (
        <Button
          key={id}
          variant={code === topic ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          onClick={() => clickHandlerLang(code as TopicType)}
          className={classes.button}
        >
          {name[lang]}
        </Button>
      ))}
    </>
  );
};

export default ButtonsTopic;
