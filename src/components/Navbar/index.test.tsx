import "whatwg-fetch";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

// import { render, screen, waitFor } from '@testing-library/react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../utils/test-utils";
import Home from "../../pages_old/index_old";

const data = {
  status: "ok",
  total_hits: 10000,
  page: 1,
  total_page: 200,
  page_size: 50,
  articles: [
    { _id: 0, published_date: 12345, topic: "world" },
    { _id: 1, published_date: 67890, topic: "tech" },
    { _id: 2, published_date: 67090, topic: "sport" },
  ],
};

const handlers = [
  rest.get("/api/news", (req, res, ctx) => {
    const q = req.url.searchParams.get("q");
    // const topic = req.url.searchParams.get('topic');
    if (q && q === "abc123ABC") {
      return res(ctx.json({ status: "No matches found." }), ctx.delay(150));
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
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
});

describe("SearchBar", () => {
  it(`type in random word "abc123ABC", click search icon, then displays "No matches found."`, async () => {
    await user.type(getTextbox(), "abc123ABC");
    await user.click(getButton("submit button"));
    expect(await screen.findByText(/No matches found/i)).toBeInTheDocument();
  });

  it(`type in "bitcoin", click search icon, then displays "Search by 'bitcoin.' Found 10000 articles"`, async () => {
    await user.type(getTextbox(), "bitcoin");
    await user.click(getButton("submit button"));
    expect(
      await screen.findByText(/Search by 'bitcoin'./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Found 10000 articles/i)
    ).toBeInTheDocument();
  });

  describe("Topic button", () => {
    it.each(["world", "tech", "sport"])(
      "Click %s, then display, Topic %s.",
      async (topic) => {
        await user.click(getButton(topic));
        expect(
          await screen.findByText(`Topic '${topic}'.`)
        ).toBeInTheDocument();
      }
    );
  });
});

describe("Add Favorite", () => {
  it('type in "bitcoin" and click "Add Favorite", then "bitcoin" chip appears', async () => {
    await user.type(getTextbox(), "bitcoin");
    await user.click(getButton("submit button"));
    await user.click(screen.getByText(/add favorite/i));
    expect(await screen.findByText("bitcoin")).toBeInTheDocument();
  });
});

describe("Close & open basic-options", () => {
  it("basic-options is visible by default", () => {
    expect(screen.getByTestId("basic-options")).toBeVisible();
  });
  it("close basic-options, then it is not visible", async () => {
    await user.click(getButton("basic options"));
    expect(screen.getByTestId("basic-options")).not.toBeVisible();
  });
  it("close basic-options and open it, then it is visible", async () => {
    await user.click(getButton("basic options"));
    await user.click(getButton("basic options"));
    expect(screen.getByTestId("basic-options")).toBeVisible();
  });
});

describe("Open & close advance-options", () => {
  it("advance-options is not visible by default", () => {
    expect(screen.getByTestId("advance-options")).not.toBeVisible();
  });
  it("open advance-options, then it is visible", async () => {
    await user.click(getButton("advance options"));
    expect(screen.getByTestId("advance-options")).toBeVisible();
  });
  it("close advance-options, then it is not visible", async () => {
    const button = getButton("advance options");
    await user.click(button);
    await user.click(button);
    expect(screen.getByTestId("advance-options")).not.toBeVisible();
  });
});

describe("Open advance-options and type in source,", () => {
  it('open advance-options, typ in "nytimes.com" and click "Apply Advance Options"', async () => {
    await user.click(getButton("advance options"));
    await user.type(
      screen.getByPlaceholderText(/e\.g\. nytimes\.com, cnn\.com, wsj\.com/i),
      "nytimes.com"
    );
    await user.click(getButton("apply advance options"));
    expect(await screen.findByText(/nytimes.com/i)).toBeInTheDocument();
  });
});

describe("date from to,", () => {
  it('type in "06/25/2022" in from, "07/04/2022" in to and click "Apply Advance Options", then displays "from 06/25/2022 to 07/04/2022"', async () => {
    await user.click(getButton("advance options"));

    const textbox_dateFrom = getTextbox("date from");
    await user.clear(textbox_dateFrom);
    await user.type(textbox_dateFrom, "06/25/2022");

    const textbox_dateTo = getTextbox("date to");
    await user.clear(textbox_dateTo);
    await user.type(textbox_dateTo, "07/04/2022");

    await user.click(getButton("apply advance options"));
    expect(
      await screen.findByText(/from 2022\/06\/25 to 2022\/07\/04/i)
    ).toBeInTheDocument();
  });
});

const getTextbox = (name?: string) => {
  if (!name) return screen.getByRole("textbox");

  return screen.getByRole("textbox", {
    name: new RegExp(name, "i"),
  });
};

// const getButton = (icon_name: RegExp | string) =>
const getButton = (icon_name: string) =>
  screen.getByRole("button", {
    name: new RegExp(icon_name, "i"),
  });
