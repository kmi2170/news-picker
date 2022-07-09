import 'whatwg-fetch';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import { render, screen, waitFor } from '@testing-library/react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../utils/test-utils';
import Home from '../../pages/index';

const data = {
  status: 'ok',
  total_hits: 10000,
  page: 1,
  total_page: 200,
  page_size: 50,
  articles: [
    { _id: 0, published_date: 12345, topic: 'world' },
    { _id: 1, published_date: 67890, topic: 'tech' },
    { _id: 2, published_date: 67090, topic: 'sport' },
  ],
};

const handlers = [
  rest.get('/api/news', (req, res, ctx) => {
    const q = req.url.searchParams.get('q');
    // const topic = req.url.searchParams.get('topic');
    if (q && q === 'abc123ABC') {
      return res(ctx.json({ status: 'No matches found.' }), ctx.delay(150));
    }
    return res(ctx.json(data), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

const user = userEvent.setup();
const setup = () => render(<Home />);

beforeEach(async () => {
  /* eslint-disable testing-library/no-render-in-setup */
  setup();
  /* eslint-enable testing-library/no-render-in-setup */
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
});

describe('SearchBar', () => {
  it(`type in random word "abc123ABC", click search icon, then displays "No matches found."`, async () => {
    await user.type(getTextbox(), 'abc123ABC');
    await user.click(getButton('submit button'));
    expect(await screen.findByText(/No matches found/i)).toBeInTheDocument();
  });

  it(`type in "bitcoin", click search icon, then displays "Search by 'bitcoin.' Found 10000 articles"`, async () => {
    await user.type(getTextbox(), 'bitcoin');
    await user.click(getButton('submit button'));
    expect(
      await screen.findByText(/Search by 'bitcoin'./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Found 10000 articles/i)
    ).toBeInTheDocument();
  });

  describe('Topic button', () => {
    it.each(['world', 'tech', 'sport'])(
      'Click %s, then display, Topic %s.',
      async (topic) => {
        await user.click(getButton(topic));
        expect(
          await screen.findByText(`Topic '${topic}'.`)
        ).toBeInTheDocument();
      }
    );
  });
});

const getTextbox = () => screen.getByRole('textbox');

// const getButton = (icon_name: RegExp | string) =>
const getButton = (icon_name: string) =>
  screen.getByRole('button', {
    name: new RegExp(icon_name, 'i'),
  });
