import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as moment from 'moment-timezone';

import { ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk/build/ExpoClient';
import { Expo } from 'expo-server-sdk';

import supabase from '@sfdb/supabase';

if (!process.env.FUNCTION_SECRET)
  throw new Error('Missing env-var: "FUNCTION_SECRET"');

const expo = new Expo();

process.env.TZ = 'America/Mexico_City';

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event?.queryStringParameters?.key !== process.env.FUNCTION_SECRET)
    return unauthorized(event?.queryStringParameters?.key);

  const { data: strikedUsers, error } = await supabase
    .rpc('strike_users')

  if (error)
    return {
      body: JSON.stringify(error),
      statusCode: 500
    }

  const pushMessages = strikedUsers
    .filter(user => user.notification_token)
    .map((user): ExpoPushMessage => ({
      title: 'sfdb - WARNING',
      to: user.notification_token!,
      body: strikeMessage(user.strikes)
    }));

  const chunks = expo.chunkPushNotifications(pushMessages);

  let results: ExpoPushTicket[] = [];
  for (const chunk of chunks) {
    const res = await expo.sendPushNotificationsAsync(chunk);
    results.push(...res);
  }

  return {
    body: JSON.stringify(strikedUsers),
    statusCode: 200
  }
}

function unauthorized(key: string | undefined): APIGatewayProxyResult {
  return {
    body: `Invalid "key" in querystring. Received: ${key}`,
    statusCode: 400
  }
}



function strikeMessage(strikes: number) {
  if (strikes > 3) {
    return `You did not post today, you have been striked. You've been striked too many times, you're now banned.`;
  } else {
    return `You did not post today, you have been striked. ${3 - strikes} more and you're banned.`;
  }
}
