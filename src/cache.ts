import { InMemoryCache, makeVar } from '@apollo/client';
import { deepCopy } from './helper/deepCopy';
import { messagesType, QueueItem, Video } from './types';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        parties: {
          merge(existing, incoming, { readField }) {
            const merged = existing
              ? deepCopy(existing)
              : {
                  cursor: undefined,
                  hasMore: true,
                  parties: {},
                };
            console.log(incoming);
            incoming.parties.forEach((item: { __ref: string }) => {
              const id = readField('_id', item) as string;
              merged.parties[id] = item;
            });
            merged.cursor = incoming.cursor;
            merged.hasMore = incoming.hasMore;
            return merged;
          },

          read(existing) {
            if (existing) {
              return {
                cursor: existing.cursor,
                hasMore: existing.hasMore,
                parties: Object.values(existing.parties),
              };
            }
            return undefined;
          },
        },
      },
    },
  },
});
export const uidVar = makeVar<string>('ekwon');
export const sessionIdVar = makeVar<string>('member');
export const messagesVar = makeVar<messagesType[]>([]);
export const socketQueueVar = makeVar<Partial<QueueItem>[]>([]);
export const videoListVar = makeVar<Video[]>([]);
export const videoIdVar = makeVar<string>('');
export const videoTimeVar = makeVar<number>(0);
export const isTimeUpToDateVar = makeVar<boolean>(true);

export default cache;
