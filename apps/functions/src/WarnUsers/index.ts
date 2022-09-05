import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as moment from 'moment/moment';
import 'moment-timezone';

import { ExpoPushMessage } from 'expo-server-sdk/build/ExpoClient';
import { Expo } from 'expo-server-sdk';

import { tables } from '@sfdb/supabase';

if (!process.env.FUNCTION_SECRET)
  throw new Error('Missing env-var: "FUNCTION_SECRET"');

const expo = new Expo();

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event?.queryStringParameters?.key !== process.env.FUNCTION_SECRET)
    return unauthorized(event?.queryStringParameters?.key);

  const { data: strikableUsers, error } = await tables.users()
    .select('*')
    .lte('last_posted', todayMorning().toISOString())
    .lt('strikes', 3)
    .not('notification_token', 'eq', null);

  if (error) return {
    body: JSON.stringify(error),
    statusCode: 500
  }

  const timeTillStrike = timeUntilTomorrow();

  const pushMessages = strikableUsers.map((user): ExpoPushMessage => ({
    title: 'sfdb - WARNING',
    to: user.notification_token!,
    body: strikeWarning(timeTillStrike)
  }));

  const chunks = expo.chunkPushNotifications(pushMessages);

  for (const chunk of chunks) {
    await expo.sendPushNotificationsAsync(chunk);
  }

  return {
    body: JSON.stringify("Success"),
    statusCode: 200
  }
}

function unauthorized(key: string | undefined): APIGatewayProxyResult {
  return {
    body: `Invalid "key" query string. Received: ${key}`,
    statusCode: 400
  }
}

function getNow() {
  return moment.tz("America/Mexico_City").toDate();
}

function todayMorning() {
  const date = getNow();
  date.setHours(0, 0, 0);
  return date;
}

function timeUntilTomorrow() {
  const now = getNow();
  now.setSeconds(0, 0);
  const tomorrow = getNow();
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0);

  const timeDiff = tomorrow.getTime() - now.getTime();
  const minutesLeft = Math.round(timeDiff / 60000);

  return {
    hours: Math.round(minutesLeft / 60),
    minutes: minutesLeft % 60,
  }
}

function strikeWarning(timeLeft: { hours: number, minutes: number }) {
  const timeString = (timeLeft.hours > 0)
    ? `${timeLeft.hours} hrs and ${timeLeft.minutes} mins`
    : `${timeLeft.minutes} mins`;

  return `You have not posted today, you have ${timeString} remaining before you get striked. \n\nmaybe`;
}
