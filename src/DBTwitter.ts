import { TweetCollection } from "../models/Tweet";
import { Tweet } from "../database/tweets";

class DBTwitter {
  async getTweets(): Promise<Tweet[]> {
    const tweets = await TweetCollection.find();
    return tweets;
  }

  async getNumberOfTweetsByLevel(params: { level: number }): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async getNumberOfTweetsByLevelRange(params: {
    minLevel?: number;
    maxLevel?: number;
  }): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async getTweetById(params: { id: number }): Promise<Tweet | null> {
    throw new Error("Method not implemented.");
  }
  async getNumberOfFemaleUsers(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async getNumberOfMaleUsers(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async deleteTweet(params: { id: number }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async addTweet(tweet: Tweet): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async updateTweet(tweet: {
    _id: number;
    user_name?: string;
    gender?: string;
    tweet?: string;
    spam_level?: number;
  }): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default DBTwitter;
