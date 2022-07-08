import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import { render, screen, waitFor } from '@testing-library/react';
import { render, screen } from '../../../utils/test-utils';
import SearchBar from './index';

const handlers = [
  rest.get('/api/news', (req, res, ctx) => {
    return res(ctx.json([]), ctx.delay(150));
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
const setup = () => render(<SearchBar />);

const searchTerms = ['ethereum', 'formula one', 'earth enviroment'];
const searchTerm = 'test search term';

beforeEach(() => {
  /* eslint-disable testing-library/no-render-in-setup */
  setup();
  /* eslint-enable testing-library/no-render-in-setup */
});

describe('SearchBar', () => {
  describe('Input', () => {
    it.each(searchTerms)(
      'type in %s, then the value has %s',
      async (searchTerm) => {
        await user.type(getTextbox(), searchTerm);
        expect(getTextbox()).toHaveValue(searchTerm);
      }
    );
  });

  describe('Input and clear', () => {
    it(`type in "${searchTerm}", then click clear icon and the value has "" `, async () => {
      await user.type(getTextbox(), searchTerm);
      await user.click(getButton(/clear button/i));
      expect(getTextbox()).toHaveValue('');
    });
  });

  // it(`type in random text "abc123ABC", then click search icon and displays examples for search terms`, async () => {
  //   setup();
  //   await user.type(getTextbox(), 'abc123ABC');
  //   await user.click(getIcon(/search button/i));
  //   expect(await screen.findByText(/no place found/i)).toBeInTheDocument();
  // });
});

const getTextbox = () => screen.getByRole('textbox');

const getButton = (icon_name: RegExp) =>
  screen.getByRole('button', {
    name: icon_name,
  });
