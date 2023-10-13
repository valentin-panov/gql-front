import React, { memo } from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://api.lvh.me:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://api.lvh.me:4000/subscriptions',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export type Props = {
  children: React.ReactChildren | React.ReactNode;
};

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const Client = memo<Props>(({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>);
