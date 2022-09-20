import DBTwitter from "../src/DBTwitter";
import { createASmallDB, destroyDB } from "../database/database";
import dotenv from "dotenv";
import { Tweet } from "../database/tweets";
dotenv.config();

const db = new DBTwitter();

describe("Query's over DBTwitter", () => {
  beforeAll(() => {
    return createASmallDB();
  });

  afterAll(() => {
    return destroyDB();
  });
  test("Deberian existir 10 tweets", async () => {
    const tweets = await db.getTweets();
    expect(tweets.length).toBe(10);
  });

  test("Deberian existir 5 usuarios", async () => {
    const numberOfTweets = await db.getNumberOfMaleUsers();
    expect(numberOfTweets).toBe(5);
  });

  test("Deberian existir 3 usuarias ", async () => {
    const numberOfTweets = await db.getNumberOfFemaleUsers();
    expect(numberOfTweets).toBe(3);
  });

  test("Deberia existir un tweet con id 10 de un usuario llamado joflaverty9 ", async () => {
    const tweet = await db.getTweetById({ id: 10 });
    expect(tweet?.user_name).toBe("joflaverty9");
  });

  test("Deberian existir 2 tweets que parecen spam, con nivel 1", async () => {
    const numberOfTweets = await db.getNumberOfTweetsByLevel({ level: 1 });
    expect(numberOfTweets).toBe(2);
  });

  test("Deberian existir 0 tweets que son spam, con nivel 5", async () => {
    const numberOfTweets = await db.getNumberOfTweetsByLevel({ level: 5 });
    expect(numberOfTweets).toBe(0);
  });

  test("Deberian existir 8 tweets con un nivel de spam entre 2 y 4", async () => {
    const numberOfTweets = await db.getNumberOfTweetsByLevelRange({
      minLevel: 2,
      maxLevel: 4,
    });
    expect(numberOfTweets).toBe(8);
  });
});

describe("CRUD Operations over DB Twitter", () => {
  beforeEach(() => {
    return createASmallDB();
  });

  afterEach(() => {
    return destroyDB();
  });

  test("Deberian existir 10 tweets", async () => {
    const tweets = await db.getTweets();
    expect(tweets.length).toBe(10);
  });

  test("Deberia existir un tweet menos tras eliminar uno", async () => {
    const tweetsBeforeDelete = (await db.getTweets()).length;
    await db.deleteTweet({ id: 9 });
    const tweetsAfterDelete = (await db.getTweets()).length;
    expect(tweetsBeforeDelete).toBe(tweetsAfterDelete + 1);
  });

  test("Deberia existir un tweet mas tras crear uno", async () => {
    const tweetsBeforeCreate = (await db.getTweets()).length;
    const tweet: Tweet = {
      _id: 11,
      user_name: "joflaverty9",
      gender: "Female",
      tweet: "Hola",
      spam_level: 1,
    };
    await db.addTweet(tweet);
    const tweetsAfterCreate = (await db.getTweets()).length;
    expect(tweetsBeforeCreate).toBe(tweetsAfterCreate - 1);
  });

  test("Deberia cambiar el nombre de usuario del primer tweet", async () => {
    const tweet = await db.getTweetById({ id: 1 });
    const nameUserBeforeUpdate = tweet?.user_name;
    await db.updateTweet({
      _id: 1,
      user_name: "joflaverty9",
    });
    const tweetAfterUpdate = await db.getTweetById({ id: 1 });
    const nameUserAfterUpdate = tweetAfterUpdate?.user_name;
    expect(nameUserBeforeUpdate).not.toBe(nameUserAfterUpdate);
  });
});
